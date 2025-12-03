# AccessPlay — Frontend (Vite + React)

This is the frontend for **AccessPlay**, built using **Vite**, **React**, and **React Router**.  
It communicates with the backend API for authentication, games, and user reviews.

---

## Overview

This project provides:
- Fast React development using Vite HMR
- Modern SPA routing with React Router
- API integration via `VITE_API_URL`
- Voice navigation (SpeechRecognition)
- Full game browsing and review experience
- Vitest support for unit tests

---

## Features

- Fast HMR via Vite  
- SPA architecture  
- Modular React component structure  
- Unit tests via Vitest  
- ESLint for code quality  
- Environment-based backend configuration  

---

## Tech Stack

| Category   | Tools        |
|------------|--------------|
| Build Tool | Vite         |
| Framework  | React        |
| Routing    | React Router |
| Testing    | Vitest       |
| Linting    | ESLint       |
| Styling    | CSS          |

---

## Prerequisites

- Node.js (>= 18 recommended, >= 20 ideal)
- npm
- Backend API running on `localhost:4000`

---

## Quick start (Windows)
1. Install dependencies:
   ```powershell
   npm install
   ```
2. Create a `.`env` file at project root:
   ```ini
   VITE_API_URL=http://localhost:4000
   ``` 
   or set `VITE_API_URL` (temporary PowerShell session) and start dev server:
   ```powershell
   $env:VITE_API_URL="http://localhost:4000"; npm run dev
   ```
   
3. Start development server:
   ```powershell
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. To build for production:
   ```powershell
   npm run build
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
Test location: `src/tests/`

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
None (for educational use only)