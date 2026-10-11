
# 🌿 TouchGrassAI

### Your world is bigger than your screen.

TouchGrassAI is an AI-powered outdoor activity generator that helps people spend less time scrolling and more time exploring the world around them.

Choose how much time you have and what you enjoy. Local Gemma AI generates a practical outdoor mission with actionable steps.

## ✨ Features

- 🌱 **AI-generated missions** tailored to your available time and interests.
- ⏱️ **Flexible durations** of 15, 30, or 60 minutes.
- 🌿 **Multiple interests:** Nature exploration, birdwatching, and gardening.
- ✅ **Interactive progress tracking** for mission steps.
- 🎯 **Mission completion tracking** and the option to generate another mission.
- 🔒 **Local AI inference** through Ollama, using the Gemma 3 1B model.

## 🛠️ Tech Stack

- Next.js with App Router
- React and TypeScript
- Tailwind CSS
- Ollama
- Gemma 3 1B

## ⚙️ Prerequisites

Install the following before running the project:

- Node.js and npm
- Ollama
- Git

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Chetan786-pixel/touchgrass-ai.git
cd touchgrass-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Download the AI model

Make sure Ollama is installed and running, then execute:

```bash
ollama pull gemma3:1b
```

Verify that the model is available:

```bash
ollama list
```

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🧠 How It Works

1. **Choose:** Select your available time and preferred outdoor activity.
2. **Generate:** The Next.js API route sends a prompt to the locally running Ollama service.
3. **Explore:** Gemma generates an outdoor mission with steps.
4. **Track:** Mark steps as complete and track your progress.

## 🔌 Local AI Configuration

The mission API is available at:

`POST /api/mission`

It uses the local Ollama API at `http://localhost:11434` and the `gemma3:1b` model. Ollama must be running on the same machine as the Next.js server for the default setup to work.

## 📌 Deployment Note

This version is designed for local development. A standard cloud deployment cannot access Ollama running on your personal computer through `localhost`. Cloud deployment requires an appropriately hosted AI service or a separately accessible backend.

## 🌍 Project Vision

TouchGrassAI encourages real-world experiences, curiosity, and healthier use of screen time through small, achievable outdoor adventures.

---

Built with 🌿 for a world beyond the screen.
