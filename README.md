# Mentis — AI Teaching Resource Platform

A nonprofit AI-powered teaching research platform for educators, showcasing project vision, core features, target audiences, and development roadmap.

[中文文档](./README_zh.md)

## Tech Stack

- **Frontend**: React 19 + TypeScript + Vite
- **Animation**: Motion (Framer Motion successor)
- **Backend**: Node.js + Express
- **Storage**: JSON files (server-local)

## Features

- **Hero Section**: Project vision and four core direction cards
- **Highlights**: Lesson prep efficiency, educational equity, nonprofit commitment
- **Core Features**: Six key capability areas
- **How It Works**: Four-step pipeline walkthrough
- **Curriculum Tree**: Interactive tree visualization of textbook structure
- **Personas**: Four educator profile archetypes
- **Roadmap**: Phase 01–04 milestones
- **Early Access**: Email collection form, stored locally on server

## Requirements

- Node.js >= 18
- npm >= 9

## Quick Start

### Install dependencies

```bash
npm install
```

### Development

| Command | Description |
|---------|-------------|
| `npm run dev` | Frontend only (Vite) at http://localhost:5173 |
| `npm run server` | Backend API only, port 3001 |
| `npm run dev:full` | Frontend + backend together (recommended) |

```bash
# Recommended: run frontend and backend together
npm run dev:full
```

In development mode, Vite proxies `/api` requests to `http://localhost:3001`.

### Build

```bash
npm run build
```

Output is placed in the `dist/` directory.

### Preview build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Project Structure

```
├── public/              # Static assets
├── server/              # Backend service
│   ├── index.js         # Express entry, email collection API
│   └── data/            # Data directory (emails.json auto-generated)
├── src/
│   ├── components/      # Page components
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Highlights.tsx
│   │   ├── Features.tsx
│   │   ├── HowItWorks.tsx
│   │   ├── TreeVisualization.tsx
│   │   ├── Personas.tsx
│   │   ├── Roadmap.tsx
│   │   ├── CTA.tsx      # Call-to-action and email form
│   │   └── ParticleCanvas.tsx
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css        # Global styles and CSS variables
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Backend API

### POST /api/early-access

Collects early-access email addresses.

**Request body:**

```json
{ "email": "user@example.com" }
```

**Response:**

Success:
```json
{ "ok": true }
```

Error:
```json
{ "ok": false, "message": "error description" }
```

**Storage**: `server/data/emails.json`, example format:

```json
[
  { "email": "user@example.com", "timestamp": "2026-02-20T12:00:00.000Z" }
]
```

## Deployment

### Option 1: Static site + standalone API server

1. **Frontend**: Run `npm run build`, deploy `dist/` to Nginx, Vercel, Netlify, etc.
2. **Backend**: Deploy `server/` to a Node environment (e.g. VPS, Railway, Render), run `node server/index.js`
3. **CORS**: If frontend and backend are on different domains, point API requests to the backend URL or use Nginx as a reverse proxy

### Option 2: Same server

Use Nginx as reverse proxy:

- `/` → frontend static files
- `/api` → proxy to Node service (e.g. `http://127.0.0.1:3001`)

Backend port is configurable via environment variable:

```bash
PORT=3001 node server/index.js
```

## Disclaimer

Mentis ("教材帮手") is an independent project with no affiliation to Tianxing Education or its product "天星教材帮".

## License

Private.
