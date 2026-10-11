
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { minutes, interest } = await request.json();

    const allowedMinutes = [15, 30, 60];
    const allowedInterests = ["Nature", "Birds", "Garden"];

    if (!allowedMinutes.includes(Number(minutes))) {
      return NextResponse.json(
        { error: "Please select 15, 30, or 60 minutes." },
        { status: 400 }
      );
    }

    if (!allowedInterests.includes(interest)) {
      return NextResponse.json(
        { error: "Please select a valid interest." },
        { status: 400 }
      );
    }

    const response = await fetch(
      "http://localhost:11434/api/generate",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gemma3:1b",
          stream: false,
          format: "json",
          prompt: `You are TouchGrass AI, a safe outdoor activity assistant.

Create one practical outdoor mission.
Available time: ${Number(minutes)} minutes maximum.
Interest: ${interest}.

Return a valid JSON object with:
"title": string,
"emoji": string,
"category": string,
"description": string,
"duration": number,
"steps": array of exactly 3 strings.

Rules:
- Duration must be between 1 and ${Number(minutes)} minutes.
- Never assume the user's city or location.
- Do not invent park names, addresses, or specific locations.
- Suggest a familiar, safe public outdoor area when appropriate.
- Match the selected interest.
- Suggest only safe, legal, accessible activities.
- Use simple English.
- Each step must be plain text without numbering.
- Return JSON only, without markdown fences.`,
        }),
        signal: AbortSignal.timeout(120000),
      }
    );

    if (!response.ok) {
      const details = await response.text();
      throw new Error(
        `Ollama request failed (${response.status}): ${details}`
      );
    }

    const result = await response.json();

    if (typeof result.response !== "string") {
      throw new Error("Ollama returned an empty response.");
    }

    const mission = JSON.parse(result.response);

  if (
  typeof mission.title !== "string" ||
  typeof mission.description !== "string" ||
  !Array.isArray(mission.steps) ||
  mission.steps.length === 0 ||
  !mission.steps.every((step: unknown) => typeof step === "string")
) {
  console.error("Invalid mission received from AI:", mission);
  throw new Error("AI returned an invalid mission format.");
}

    const duration = Number(mission.duration);

    if (!Number.isFinite(duration) || duration < 1) {
      throw new Error("AI returned an invalid mission duration.");
    }

    mission.duration = Math.min(duration, Number(minutes));
    mission.emoji =
      typeof mission.emoji === "string" ? mission.emoji : "🌿";
    mission.category =
      typeof mission.category === "string"
        ? mission.category
        : "Explore";

    return NextResponse.json({ mission });
  } catch (error) {
    console.error("Mission generation error:", error);

    const message =
      error instanceof Error
        ? error.message
        : "Unknown error occurred.";

    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
