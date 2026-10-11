
import { NextResponse } from "next/server";

const missionBank = {
  Nature: [
    {
      title: "Leaf Detective",
      emoji: "🌿",
      description: "Explore the hidden details of leaves and plants.",
      steps: [
        "Find a safe outdoor spot with plants.",
        "Observe three different leaf shapes.",
        "Notice their colours and textures.",
        "Compare how the leaves are different.",
        "Look for patterns in their veins.",
        "Observe how sunlight falls on the plants.",
        "Sketch your favourite leaf.",
        "Write down three things you learned.",
      ],
    },
    {
      title: "Sky Explorer",
      emoji: "☁️",
      description: "Discover the sky, light and shadows around you.",
      steps: [
        "Choose a safe place to observe the sky.",
        "Notice the clouds and their shapes.",
        "Observe the direction of the sunlight.",
        "Find two interesting shadows.",
        "Notice how the light changes across objects.",
        "Describe the weather using three words.",
        "Sketch an interesting cloud shape.",
        "Record your favourite observation.",
      ],
    },
    {
      title: "Nature Colour Hunt",
      emoji: "🎨",
      description: "Find interesting colours in the natural world.",
      steps: [
        "Find a safe outdoor place.",
        "Spot three different natural colours.",
        "Look for two more colours.",
        "Compare colours on leaves and flowers.",
        "Notice which colours appear most often.",
        "Find an interesting natural pattern.",
        "Sketch a colourful natural scene.",
        "Write down your favourite discovery.",
      ],
    },
    {
      title: "Tiny Wonders",
      emoji: "🔎",
      description: "Discover small details you usually overlook.",
      steps: [
        "Choose a plant or tree to observe.",
        "Notice its shapes and textures.",
        "Look for small details on its leaves.",
        "Observe nearby natural patterns.",
        "Notice how light changes its appearance.",
        "Compare two plants from a distance.",
        "Sketch one detail you found interesting.",
        "Record three new discoveries.",
      ],
    },
  ],
  Birds: [
    {
      title: "Bird Listener",
      emoji: "🐦",
      description: "Notice bird calls without disturbing wildlife.",
      steps: [
        "Choose a safe and quiet outdoor spot.",
        "Listen for bird calls.",
        "Notice the direction of the sounds.",
        "Look for birds from a respectful distance.",
        "Observe their movements.",
        "Compare two different sounds if possible.",
        "Record your observations.",
        "Write one question about local birds.",
      ],
    },
    {
      title: "Bird Spotter",
      emoji: "🪶",
      description: "Observe birds and their surroundings.",
      steps: [
        "Find a safe place where birdwatching is allowed.",
        "Look for birds from a distance.",
        "Notice their colours and shapes.",
        "Observe how they move.",
        "Look for differences between birds.",
        "Listen for their calls.",
        "Record a bird you found interesting.",
        "Write one thing you learned.",
      ],
    },
    {
      title: "Feathered Neighbours",
      emoji: "🌳",
      description: "Discover the birds sharing your surroundings.",
      steps: [
        "Choose a safe outdoor observation spot.",
        "Look around trees and open spaces.",
        "Notice where birds are perched.",
        "Observe their movements from afar.",
        "Listen for different calls.",
        "Count the birds you can see.",
        "Record your observations.",
        "Reflect on what makes the area suitable for birds.",
      ],
    },
    {
      title: "Bird Behaviour Watch",
      emoji: "🔭",
      description: "Pay attention to how birds behave naturally.",
      steps: [
        "Choose a safe place to observe birds.",
        "Watch their movements from a distance.",
        "Notice whether they are standing or flying.",
        "Listen for any calls.",
        "Observe how they interact with their surroundings.",
        "Compare two observations.",
        "Write down one interesting behaviour.",
        "Record what you would like to learn next.",
      ],
    },
  ],
  Garden: [
    {
      title: "Garden Explorer",
      emoji: "🌼",
      description: "Explore the colours, shapes and textures of a garden.",
      steps: [
        "Visit a garden where entry is allowed.",
        "Notice three different leaf shapes.",
        "Find flowers or plants with different colours.",
        "Compare the textures you can see without touching.",
        "Look for patterns in the leaves.",
        "Observe insects from a safe distance.",
        "Sketch your favourite plant.",
        "Write down three discoveries.",
      ],
    },
    {
      title: "Green Break",
      emoji: "🪴",
      description: "Enjoy a mindful break among plants and greenery.",
      steps: [
        "Choose a safe green space.",
        "Observe the plants around you.",
        "Listen to the natural sounds.",
        "Notice the light and shadows.",
        "Find three interesting plant details.",
        "Observe the variety of colours.",
        "Sketch a small part of the garden.",
        "Record your favourite moment.",
      ],
    },
    {
      title: "Garden Colour Hunt",
      emoji: "🎨",
      description: "Discover the variety of colours in a planted area.",
      steps: [
        "Choose a garden you are allowed to visit.",
        "Find three different shades of green.",
        "Look for other flower or plant colours.",
        "Compare the colours you observed.",
        "Notice how sunlight affects their appearance.",
        "Find an interesting colour combination.",
        "Sketch a colourful garden scene.",
        "Write down your favourite discovery.",
      ],
    },
    {
      title: "Plant Pattern Explorer",
      emoji: "🍃",
      description: "Discover repeating patterns in plants and leaves.",
      steps: [
        "Choose a plant to observe.",
        "Notice the arrangement of its leaves.",
        "Look for repeating shapes.",
        "Compare two different plants.",
        "Observe their visible textures.",
        "Find a pattern that catches your attention.",
        "Sketch the pattern.",
        "Write down what makes it interesting.",
      ],
    },
  ],
};

export async function POST(request: Request) {
  try {
    const { minutes, interest } = await request.json();
    const duration = Number(minutes);

    if (![15, 30, 60].includes(duration)) {
      return NextResponse.json(
        { error: "Please select 15, 30, or 60 minutes." },
        { status: 400 }
      );
    }

    if (!Object.hasOwn(missionBank, interest)) {
      return NextResponse.json(
        { error: "Please select a valid interest." },
        { status: 400 }
      );
    }

    const options = missionBank[
      interest as keyof typeof missionBank
    ];

    const selected = options[
      Math.floor(Math.random() * options.length)
    ];

    const stepCount =
      duration === 15 ? 4 : duration === 30 ? 5 : 8;

    return NextResponse.json({
      mission: {
        title: selected.title,
        emoji: selected.emoji,
        category: interest,
        description: selected.description,
        steps: selected.steps.slice(0, stepCount),
        duration,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Could not generate a mission. Please try again." },
      { status: 400 }
    );
  }
}
