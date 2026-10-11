
"use client";

import { useState } from "react";

type Mission = {
  title: string;
  emoji: string;
  category: string;
  description: string;
  duration: number;
  steps: string[];
};

const times = ["15", "30", "60"];

const interests = [
  { value: "Nature", label: "Nature exploration", emoji: "🌿" },
  { value: "Birds", label: "Birdwatching", emoji: "🐦" },
  { value: "Garden", label: "Gardening", emoji: "🌱" },
];

export default function Home() {
  const [minutes, setMinutes] = useState("30");
  const [interest, setInterest] = useState("Nature");
  const [mission, setMission] = useState<Mission | null>(null);
  const [completed, setCompleted] = useState(false);
  const [doneSteps, setDoneSteps] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateMission() {
    setLoading(true);
    setError("");
    setMission(null);
    setCompleted(false);
    setDoneSteps([]);

    try {
      const response = await fetch("/api/mission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ minutes: Number(minutes), interest }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Could not generate your mission.");
      }

      const result = data.mission;

      if (
        !result ||
        typeof result.title !== "string" ||
        typeof result.description !== "string" ||
        !Array.isArray(result.steps) ||
        result.steps.length === 0 ||
        !result.steps.every((step: unknown) => typeof step === "string")
      ) {
        throw new Error("AI returned an invalid mission. Please try again.");
      }

      setMission(result);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function toggleStep(index: number) {
    setDoneSteps((previous) =>
      previous.includes(index)
        ? previous.filter((item) => item !== index)
        : [...previous, index]
    );
  }

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f5ec] text-[#183c2b]">
      {/* NAVBAR */}
      <nav className="absolute inset-x-0 top-0 z-20 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 text-white sm:px-8 lg:px-12">
        <a href="#home" className="text-xl font-black tracking-tight text-white drop-shadow-lg sm:text-2xl">
          <span className="mr-2 text-[#c5f477]">🌿</span>
          TouchGrass<span className="text-[#c5f477]">AI</span>
        </a>

        <div className="hidden items-center gap-7 text-sm font-semibold md:flex">
          <a href="#home" className="transition hover:text-[#c5f477]">Home</a>
          <a href="#how-it-works" className="transition hover:text-[#c5f477]">How it works</a>
          <a href="#mission" className="transition hover:text-[#c5f477]">Mission</a>
        </div>

        <a
          href="#mission"
          className="rounded-full bg-[#c5f477] px-4 py-3 text-sm font-extrabold text-[#142719] shadow-lg transition hover:-translate-y-0.5 hover:bg-[#d5fa96] sm:px-5"
        >
          Find a mission →
        </a>
      </nav>

      {/* FULL-SCREEN FOREST HERO */}
      <section
        id="home"
        className="relative isolate flex min-h-screen w-full items-end overflow-hidden bg-[#07140d] bg-cover bg-center bg-no-repeat sm:items-center"
        style={{
          
       backgroundImage: "url('/Nature%20view.jpg')",

        }}
      >
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-r from-black/70 via-black/30 to-black/10" />
        <div className="pointer-events-none absolute inset-0 z-0 bg-gradient-to-t from-[#06150b]/75 via-transparent to-black/30" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-16 pt-32 sm:px-8 sm:pb-20 sm:pt-36 lg:px-12 lg:pb-24">
          <div className="max-w-5xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/35 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.16em] text-[#d5f99a] backdrop-blur-md sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-[#c5f477]" />
              Your next adventure starts here
            </div>

            <h1 className="max-w-5xl text-5xl font-black leading-[0.99] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
              Your world is bigger than your{" "}
              <span className="text-[#c5f477]">screen.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
              Step outside, discover something new, and let local Gemma AI turn
              your free time into a real-world adventure.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#mission"
                className="rounded-xl bg-[#c5f477] px-6 py-4 font-extrabold text-[#142719] shadow-xl transition hover:-translate-y-1 hover:bg-[#d5fa96]"
              >
                Find my mission →
              </a>
              <a
                href="#how-it-works"
                className="rounded-xl border border-white/30 bg-black/30 px-5 py-4 font-bold text-white backdrop-blur-md transition hover:bg-white/15"
              >
                Explore how it works
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm font-semibold text-white/90">
              <span>🌿 Real outdoor activities</span>
              <span>◷ 15–60 minute missions</span>
              <span>✳ Powered by local Gemma AI</span>
            </div>
          </div>
        </div>
      </section>

      {/* DARK AI WORKFLOW */}
      <section id="how-it-works" className="scroll-mt-4 overflow-hidden bg-[#07140d] px-5 py-16 text-white sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.23em] text-[#c5f477]">
                From screen to outside
              </p>
              <h2 className="mt-4 max-w-2xl text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
                A little AI. A lot more life.
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#b1c0b3] sm:text-base">
              Your interests become practical outdoor missions. The adventure
              happens in the real world.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#192a1c] to-[#0c1910] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c5f477]/50 sm:p-7">
              <span className="rounded-full border border-[#c5f477]/25 px-3 py-1.5 text-xs font-bold text-[#c5f477]">01 / DISCOVER</span>
              <div className="mt-8 flex h-28 items-center justify-center rounded-2xl border border-white/5 bg-black/20 text-3xl">
                🌿 <span className="mx-4 text-[#c5f477]">⟶</span> 🐦
              </div>
              <h3 className="mt-6 text-xl font-extrabold">Discover nature</h3>
              <p className="mt-3 text-sm leading-7 text-[#b1c0b3]">
                Choose your available time and what you enjoy — nature
                exploration, birdwatching, or gardening.
              </p>
              <p className="mt-5 text-sm font-bold text-[#c5f477]">Your interests, your choice</p>
            </article>

            <article className="rounded-3xl border border-[#c5f477]/30 bg-gradient-to-br from-[#203322] to-[#0c1910] p-6 shadow-xl shadow-black/20 transition duration-300 hover:-translate-y-1 hover:border-[#c5f477]/60 sm:p-7">
              <span className="rounded-full border border-[#c5f477]/25 px-3 py-1.5 text-xs font-bold text-[#c5f477]">02 / GENERATE</span>
              <div className="mt-8 flex h-28 flex-col items-center justify-center rounded-2xl border border-[#c5f477]/15 bg-black/20">
                <div className="flex items-center gap-3 text-3xl">
                  ✦ <span className="font-black text-[#c5f477]">AI</span> ✦
                </div>
                <div className="mt-4 h-1.5 w-3/4 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full w-2/3 rounded-full bg-[#c5f477]" />
                </div>
              </div>
              <h3 className="mt-6 text-xl font-extrabold">Let Gemma create</h3>
              <p className="mt-3 text-sm leading-7 text-[#b1c0b3]">
                A local open-weight AI model generates an outdoor mission
                based on your selected time and interest.
              </p>
              <p className="mt-5 text-sm font-bold text-[#c5f477]">Powered by local AI</p>
            </article>

            <article className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#192a1c] to-[#0c1910] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#c5f477]/50 sm:p-7">
              <span className="rounded-full border border-[#c5f477]/25 px-3 py-1.5 text-xs font-bold text-[#c5f477]">03 / EXPERIENCE</span>
              <div className="mt-8 flex h-28 items-center justify-center rounded-2xl border border-white/5 bg-black/20 text-3xl">
                🌳 <span className="mx-4 text-[#c5f477]">+</span> ☀️
              </div>
              <h3 className="mt-6 text-xl font-extrabold">Make it real</h3>
              <p className="mt-3 text-sm leading-7 text-[#b1c0b3]">
                Follow your steps outdoors, track your progress, and mark
                your adventure complete.
              </p>
              <p className="mt-5 text-sm font-bold text-[#c5f477]">Less scrolling. More living.</p>
            </article>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
            <p className="text-sm text-[#b1c0b3]">Built around real-world experiences, not endless feeds.</p>
            <a href="#mission" className="rounded-full bg-[#c5f477] px-5 py-3 text-sm font-extrabold text-[#102416] transition hover:bg-[#d5fa96]">
              Try the AI mission →
            </a>
          </div>
        </div>
      </section>

      {/* WORKING GEMMA AI MISSION GENERATOR */}
      <section id="mission" className="scroll-mt-6 px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-2xl">
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-[#167b43]">Your adventure starts now</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight sm:text-4xl">Find your outdoor mission.</h2>
            <p className="mt-3 leading-7 text-[#657469]">
              Pick your available time and favourite activity. Let Gemma help
              you find your next adventure.
            </p>
          </div>

          <div className="grid items-start gap-6 lg:grid-cols-[0.85fr_1.15fr]">
            <div className="rounded-[2rem] border border-[#e2e9de] bg-white p-6 shadow-sm sm:p-8">
              <label className="block font-extrabold">How much time do you have?</label>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {times.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setMinutes(time)}
                    aria-pressed={minutes === time}
                    className={`min-h-14 cursor-pointer rounded-xl border px-2 py-3 text-sm font-bold transition ${
                      minutes === time
                        ? "border-[#167b43] bg-[#167b43] text-white"
                        : "border-[#e1e8dd] hover:border-[#167b43]"
                    }`}
                  >
                    {time} min
                  </button>
                ))}
              </div>

              <p className="mb-3 mt-8 font-extrabold">Choose your interest</p>
              <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                {interests.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    onClick={() => setInterest(item.value)}
                    aria-pressed={interest === item.value}
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 text-left transition ${
                      interest === item.value
                        ? "border-[#167b43] bg-[#edf5e8] ring-1 ring-[#167b43]"
                        : "border-[#e2e8df] hover:border-[#a6c5a2]"
                    }`}
                  >
                    <span className="text-2xl" aria-hidden="true">{item.emoji}</span>
                    <span className="text-sm font-bold">{item.label}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={generateMission}
                disabled={loading}
                className="mt-8 flex min-h-14 w-full cursor-pointer items-center justify-center gap-3 rounded-2xl bg-[#167b43] px-5 py-4 font-extrabold text-white shadow-lg transition hover:bg-[#105f33] disabled:cursor-wait disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    Gemma is thinking...
                  </>
                ) : (
                  <>Find my outdoor mission →</>
                )}
              </button>

              <p className="mt-4 text-xs leading-5 text-[#758378]">
                AI-generated suggestions. Choose a familiar, safe outdoor place.
              </p>

              {error && (
                <div role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-700">
                  {error}
                  <button type="button" onClick={generateMission} className="mt-2 block cursor-pointer font-bold underline">
                    Try again
                  </button>
                </div>
              )}
            </div>

            <div aria-live="polite" aria-busy={loading} className="min-h-[430px] rounded-[2rem] border border-[#dce8d5] bg-[#eaf2e4] p-5 sm:p-8">
              {loading ? (
                <div className="flex min-h-[380px] flex-col items-center justify-center text-center">
                  <div className="animate-pulse text-6xl">🌱</div>
                  <h3 className="mt-5 text-2xl font-black">Growing your next adventure...</h3>
                  <p className="mt-3 max-w-sm leading-7 text-[#657469]">
                    Gemma is creating a mission for your selected time and interest.
                    This can take a little while.
                  </p>
                </div>
              ) : mission ? (
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-full bg-white px-3 py-2 text-xs font-extrabold uppercase tracking-wider text-[#247644]">
                      {mission.category || "Explore"}
                    </span>
                    <span className="text-sm font-bold text-[#477054]">
                      ⏱ {mission.duration || minutes} minutes
                    </span>
                  </div>

                  <div className="mt-6 text-5xl">{mission.emoji || "🌿"}</div>
                  <h3 className="mt-4 text-2xl font-black leading-tight sm:text-3xl">{mission.title}</h3>
                  <p className="mt-4 leading-7 text-[#596e5e]">{mission.description}</p>

                  <div className="mt-8 flex items-center justify-between gap-3">
                    <h4 className="font-extrabold">Your mission steps</h4>
                    <span className="text-xs font-bold text-[#59745d]">
                      {doneSteps.length}/{mission.steps.length} complete
                    </span>
                  </div>

                  <div
                    className="mt-3 h-2 overflow-hidden rounded-full bg-white"
                    role="progressbar"
                    aria-label="Mission step progress"
                    aria-valuemin={0}
                    aria-valuemax={mission.steps.length}
                    aria-valuenow={doneSteps.length}
                  >
                    <div
                      className="h-full rounded-full bg-[#25854c] transition-all duration-300"
                      style={{ width: `${(doneSteps.length / mission.steps.length) * 100}%` }}
                    />
                  </div>

                  <ol className="mt-5 space-y-3">
                    {mission.steps.map((step, index) => {
                      const checked = doneSteps.includes(index);
                      return (
                        <li key={`${index}-${step}`}>
                          <button
                            type="button"
                            onClick={() => toggleStep(index)}
                            aria-pressed={checked}
                            className={`flex w-full cursor-pointer items-start gap-3 rounded-xl border p-4 text-left transition ${
                              checked
                                ? "border-[#b9d7b6] bg-[#dcebd7]"
                                : "border-white bg-white/85 hover:border-[#b9d7b6]"
                            }`}
                          >
                            <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-extrabold ${
                              checked ? "bg-[#167b43] text-white" : "bg-[#e6f0e0] text-[#287346]"
                            }`}>
                              {checked ? "✓" : index + 1}
                            </span>
                            <span className={`pt-1 text-sm leading-6 ${
                              checked ? "text-[#6b806e] line-through" : "text-[#385442]"
                            }`}>
                              {step}
                            </span>
                          </button>
                        </li>
                      );
                    })}
                  </ol>

                  <button
                    type="button"
                    onClick={() => {
                      if (doneSteps.length !== mission.steps.length) {
                        setDoneSteps(mission.steps.map((_, index) => index));
                      }
                      setCompleted((previous) => !previous);
                    }}
                    aria-pressed={completed}
                    className={`mt-6 w-full cursor-pointer rounded-2xl px-5 py-4 font-extrabold transition ${
                      completed ? "bg-white text-[#167b43]" : "bg-[#167b43] text-white hover:bg-[#105f33]"
                    }`}
                  >
                    {completed ? "✓ Mission completed!" : "Mark mission complete"}
                  </button>

                  {completed && (
                    <p className="mt-4 rounded-xl bg-white/80 p-4 text-sm font-semibold leading-6 text-[#287346]">
                      Well done! You made time for the world beyond your screen. 🌿
                    </p>
                  )}

                  <button
                    type="button"
                    onClick={generateMission}
                    className="mt-4 w-full cursor-pointer rounded-xl border border-[#b9d7b6] px-4 py-3 text-sm font-bold text-[#28683d] transition hover:bg-white/70"
                  >
                    Generate another mission ↻
                  </button>
                </div>
              ) : (
                <div className="flex min-h-[380px] flex-col items-center justify-center px-3 text-center">
                  <div className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white text-5xl shadow-sm">🌳</div>
                  <p className="mt-6 text-xs font-extrabold uppercase tracking-[0.2em] text-[#438253]">Your next chapter</p>
                  <h3 className="mt-3 max-w-sm text-2xl font-black sm:text-3xl">A little adventure awaits.</h3>
                  <p className="mt-3 max-w-sm leading-7 text-[#657469]">
                    Choose your preferences and let Gemma create an outdoor mission just for you.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#e2e8df] bg-white px-5 py-8 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <a href="#home" className="font-black">
            🌿 TouchGrass<span className="text-[#159447]">AI</span>
          </a>
          <p className="text-sm text-[#718174]">Built for real life, not endless screen time.</p>
          <p className="text-sm text-[#718174]">Local Gemma AI · Made with purpose</p>
        </div>
      </footer>
    </main>
  );
}
