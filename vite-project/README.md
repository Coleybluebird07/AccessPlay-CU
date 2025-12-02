# AccessPlay — Frontend (Vite + React)

Minimal, production-ready frontend for AccessPlay built with Vite, React and React Router.

---

## Table of contents
- [Overview](#overview)
- [Features](#features)
- [Tech stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Quick start (Windows)](#quick-start-windows)
- [Environment variables](#environment-variables)
- [Available scripts](#available-scripts)
- [Project structure](#project-structure)
- [API usage example](#api-usage-example)
- [Routing overview](#routing-overview)
- [Testing & linting](#testing--linting)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## Overview
A single-page React application scaffolded with Vite to provide fast HMR during development and optimized production builds. Designed to consume an authentication/game API via `VITE_API_URL`.

## Features
- Fast development with Vite HMR
- React + React Router for SPA routing
- Unit tests with Vitest
- ESLint rules and conventions
- Simple environment-based API configuration

## Tech stack
- `vite`
- `react`, `react-dom`
- `react-router-dom`
- `vitest`
- `eslint`
- Vanilla CSS

## Prerequisites
- Node.js: Recommended `>= 20` (Vite 7+)
- npm: `v8+`
- OS: Windows / macOS / Linux
- Backend server accessible (see repository `../auth-server`)

## Quick start (Windows)
1. Install dependencies:
   ```powershell
   npm install
   ```
2. Set `VITE_API_URL` (temporary PowerShell session) and start dev server:
   ```powershell
   $env:VITE_API_URL="http://localhost:4000"; npm run dev
   ```
   Or create a `.`env` file at project root:
   ```ini
   VITE_API_URL=http://localhost:4000
   ```
3. Open the app:
    - Development: `http://localhost:5173`
4. Build / preview:
   ```powershell
   npm run build
   npm run preview
   ```

## Environment variables
- Vite only exposes variables prefixed with `VITE_`.
- Recommended variable: `VITE_API_URL`
- Access in code:
  ```javascript
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  ```

## Available scripts
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run test` — run Vitest (`--environment jsdom`)
- `npm run lint` — run ESLint

Key files: `package.json`, `vite.config.js`, `index.html`

## Project structure
```
vite-project/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── routes/
│   ├── services/
│   ├── styles/
│   ├── tests/
│   ├── App.jsx
│   └── main.jsx
├── .env
├── index.html
├── package.json
└── vite.config.js
```

## API usage example
- Centralize API calls in `src/services/api.js`. Example:
  ```javascript
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';
  export async function login(email, password) {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  }
  ```
- In UI, show loading / error states and prefer `useNavigate` from `react-router-dom` over `window.location`.

## Routing overview
- `/` — HomePage
- `/login` — LoginPage
- `/register` — RegisterPage
- `/games` — GamesListPage
- `/games/:id` — GameDetailPage
- `/profile` — UserProfilePage
- `*` — NotFoundPage

## Testing & linting
- Tests located in `src/tests/`
- Run tests:
  ```powershell
  npm run test
  ```
- Lint code:
  ```powershell
  npm run lint
  ```

## Troubleshooting
- If `import.meta.env` is `undefined`, ensure dev server is running and variable name is prefixed with `VITE_`.
- Static assets not loading: import assets from `src/assets` or use absolute `/src/...` paths.
- Node engine mismatch: upgrade Node to recommended version.
- If issues persist: remove `node_modules` and reinstall (`npm install`).

## Contributing
- Follow existing code style and lint rules.
- Add unit tests for new features in `src/tests/`.
- Open PRs against the main branch with a clear description and related issue reference.

## License
This project is licensed under the MIT License