# AccessPlay — Backend (Minimal Auth Server)

This folder contains the backend for AccessPlay: a minimal authentication and game data API built using **Node.js, Express, and MariaDB**.

---

## Quick Links
- Main source: `src/`
- Database schema: `schema.sql`
- Sample data: `data.sql`
- Tests: `test/`
- Environment example: `.env.example`

---

## Features
- User registration (`/api/auth/register`)
- User login (`/api/auth/login`)
- Password hashing using **bcrypt**
- JWT authentication
- Input validation using **Joi**
- MariaDB connection pooling
- Basic endpoints for:
  - games  
  - reviews  
  - genres  
  - game features  
- CORS support for the Vite frontend

---

## Requirements
- Node.js 16+
- MariaDB (local or Docker)
- npm
- Git

Optional:
- Docker Desktop
- Postman / API client

---

## Environment Variables

Copy `.env.example` → `.env`:

Required keys:
- `DB_HOST`
- `DB_PORT`
- `DB_USER`
- `DB_PASSWORD`
- `DB_NAME`
- `JWT_SECRET`
- `JWT_EXPIRES` (e.g. `1h`)
- `PORT` (optional)
- `CORS_ORIGIN` (e.g. `http://localhost:5173`)

Configure environment variables:
- macOS / Linux / Git Bash:
  ```bash
  NODE_ENV=production npm start
  ```
- Windows Command Prompt:
  ```bat
  set NODE_ENV=production && npm start
  ```
- PowerShell:
  ```powershell
  $env:NODE_ENV='production'; npm start
  ```

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create DB and tables:
   - Run `schema.sql` with your MariaDB client:
     ```sql
     SOURCE schema.sql;
     ```
   - (Optional) Load sample data:
     ```sql
     SOURCE data.sql;
     ```
   - Or:
     ```bash
     mysql -u root -p < schema.sql
     ```
3. Start server (development):
   ```bash
   npm run dev
   ```
4. Start server (production):
   - PowerShell:
     ```powershell
     $env:NODE_ENV='production'; npm start
     ```
   - Or install `cross-env` and set `"start": "cross-env NODE_ENV=production node src/index.js"` in `package.json`.

### Windows note
`NODE_ENV=production node ...` is POSIX-style and does not work in CMD. Use PowerShell or `cross-env`.

## API (summary)
All endpoints use JSON.

- `POST /api/auth/register`  
  Body: `{ "email", "password" }` → returns `{ ok, user, token }`

- `POST /api/auth/login`  
  Body: `{ "email", "password" }` → returns `{ ok, user, token }`

- `POST /api/auth/change-password` (protected)  
  Body: `{ currentPassword, newPassword }`

- `POST /api/auth/change-email` (protected)  
  Body: `{ newEmail, password }`

Protected routes require header:
```
Authorization: Bearer <token>
```

## Database (summary)
Default DB name: `group7_auth`  
Key tables: `users`, `games`, `genres`, `reviews`, `game_images`, `accessibility_features`, `game_features`, `game_genres`, `user_favorites`.  
Triggers update `games.avg_rating` on review changes.

Reset DB:
```sql
DROP DATABASE IF EXISTS group7_auth;
SOURCE schema.sql;
SOURCE data.sql;
```

## Testing
- Tests in `test/` use `vitest` and `supertest`.
- Use a separate test DB and implement setup/teardown in `test-db.js`.
- Run:
  ```bash
  npm test
  ```

## Common commands
- `npm install`
- `npm run dev` — dev server (nodemon)
- `npm start` — production start
- `npm test`

## CORS
Set `CORS_ORIGIN` in `.env` to your frontend URL (e.g. `http://localhost:5173`).

## Security notes
- Use a strong `JWT_SECRET` and HTTPS in production.
- Store JWTs securely (in memory or secure storage).
- Validate inputs via `Joi`.

## Troubleshooting
- DB connection refused: check `DB_HOST`, `DB_USER`, `DB_PASSWORD`, and DB service.
- `NODE_ENV` issues on Windows: use PowerShell or `cross-env`.
- Port conflicts: change `PORT` in `.env`.
- If bcrypt fails: ensure native build tools are available for your Node version.

## Contributing
- Follow existing patterns in `src/`
- Add tests for new endpoints
- Update `test-db.js` for automated test DB setup

## License
None (for educational use only)