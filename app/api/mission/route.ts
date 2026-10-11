import { NextResponse } from "next/server";

const missions = {
  Nature: [
    {
      title: "Notice the Little Things",
      emoji: "🌿",
      category: "Nature",
      description: "Spend time noticing small details in the natural world around you.",
      steps: [
        "Find a safe outdoor place where you are allowed to spend time.",
        "Observe three different plants, leaves, or natural details.",
        "Take a quiet moment to appreciate what you noticed.",
      ],
    },
    {
      title: "Sky Watch",
      emoji: "☁️",
      category: "Nature",
      description: "Take a short break outdoors and observe the sky.",
      steps: [
        "Choose a safe place to stand or sit.",
        "Notice the clouds, light, and changing shapes in the sky.",
        "Describe three things you observed.",
      ],
    },
  ],
  Birds: [
    {
      title: "Bird Listener",
      emoji: "🐦",
      category: "Birds",
      description: "Notice birds and their sounds without disturbing them.",
      steps: [
        "Choose a safe outdoor place and remain at a respectful distance.",
        "Listen for bird calls and watch for movement.",
        "Record three observations without approaching nests or wildlife.",
      ],
    },
    {
      title: "Bird Spotting",
      emoji: "🪶",
      category: "Birds",
      description: "Look for birds in their natural surroundings.",
      steps: [
        "Find a safe spot where birdwatching is allowed.",
        "Observe birds from a distance without feeding or touching them.",
        "Notice their colours, movements, or sounds.",
      ],
    },
  ],
  Garden: [
    {
      title: "Garden Explorer",
      emoji: "🌼",
      category: "Garden",
      description: "Explore the colours and textures of a garden or planted area.",
      steps: [
        "Visit a garden or planted area where entry is allowed.",
        "Notice three different leaf shapes or flower colours.",
        "Leave plants and insects undisturbed.",
      ],
    },
    {
      title: "Green Break",
      emoji: "🪴",
      category: "Garden",
      description: "Enjoy a mindful break among plants and greenery.",
      steps: [
        "Choose a safe garden or green outdoor space.",
        "Observe the plants, light, and natural sounds around you.",
        "Name three details you had not noticed before.",
      ],
    },
  ],
};

export async function POST(request: Request) {
  try {
    const { minutes, interest } = await request.json();
    const selectedMinutes = Number(minutes);

    if (![15, 30, 60].includes(selectedMinutes)) {
      return NextResponse.json(
        { error: "Please select 15, 30, or 60 minutes." },
        { status: 400 }
      );
    }

    if (!["Nature", "Birds", "Garden"].includes(interest)) {
      return NextResponse.json(
        { error: "Please select a valid interest." },
        { status: 400 }
      );
    }

    const options = missions[interest as keyof typeof missions];
    const selected = options[Math.floor(Math.random() * options.length)];

    const mission = {
      ...selected,
      duration: Math.min(selectedMinutes, 15),
    };

    return NextResponse.json({ mission });
  } catch {
    return NextResponse.json(
      { error: "Could not generate a mission. Please try again." },
      { status: 400 }
    );
  }
}
