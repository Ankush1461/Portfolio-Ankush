# Ankush Karmakar — Portfolio

A modern, interactive portfolio website built with **Next.js**, **Chakra UI**, and **Framer Motion**, featuring a 3D Spline scene, an AI chat assistant, particle backgrounds, and multi-language support.

## ✨ Features

- **3D Interactive Hero** — Spline-powered retro computer with cursor-tracking and orbiting tech tags
- **AI Chat Assistant** — Gemini-powered conversational bot that answers questions about my background
- **Glassmorphism Design** — Premium glass-card aesthetics with dark/light mode support
- **Particle Background** — Subtle animated particle canvas across all pages
- **Scroll Animations** — Direction-aware section reveal animations via Framer Motion
- **Multi-Language** — English / Bengali / Hindi / German language toggle
- **Responsive** — Fully optimized for mobile, tablet, and desktop
- **Custom Cursor** — Magnetic hover interactions with a custom pointer

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js (Pages Router) |
| UI | Chakra UI v3 |
| Animation | Framer Motion (`motion/react`) |
| 3D | Spline (`@splinetool/react-spline`) |
| Particles | tsParticles |
| AI | Google Gemini REST API |
| Styling | CSS Modules + Chakra tokens |

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## 📦 Environment Variables

Create a `.env.local` file in the project root:

```env
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_api_key_here
```

## 📁 Project Structure

```
├── components/          # Reusable UI components
│   ├── layouts/         # Page layout wrappers
│   └── ui/              # Chakra UI provider & color mode
├── lib/                 # i18n translations & theme config
├── pages/               # Next.js pages & API routes
│   └── api/chat.js      # Gemini AI endpoint
├── public/              # Static assets (fonts, images, favicon)
└── styles/              # Global CSS & CSS modules
```

## 🌐 Deployment

This project is configured for **Vercel** deployment:

1. Push to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Add `GOOGLE_GENERATIVE_AI_API_KEY` as an environment variable
4. Deploy

## 📄 License

MIT © Ankush Karmakar
