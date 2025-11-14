# Minimal Auth Server (Express + MariaDB)

This is a tiny REST API exposing `/api/auth/register` and `/api/auth/login` for your React app.

## Endpoints

- `POST /api/auth/register` → { email, password } → creates a user (hashed) and returns `{ ok, user, token }`
- `POST /api/auth/login` → { email, password } → verifies credentials and returns `{ ok, user, token }`

## Quick start

1) Install MariaDB locally or run via Docker.

   **Windows installer:** https://mariadb.org/download/
   - During setup, create a root password you remember.

   **Docker (optional):**
   ```bash
   docker run --name mariadb -e MARIADB_ROOT_PASSWORD=pass -p 3306:3306 -d mariadb:11
   ```

2) Create DB and table:
   - Open a MariaDB client (e.g., `mysql` CLI or HeidiSQL) and run `schema.sql`:

   ```sql
   SOURCE schema.sql;
   ```

3) Configure environment:
   - Copy `.env.example` → `.env` and fill in values.

4) Install dependencies and run:
   ```bash
   npm install
   npm run dev
   ```

5) Test:
   ```bash
   curl -X POST http://localhost:4000/api/auth/register -H "Content-Type: application/json" \
     -d '{ "email":"test@example.com", "password":"Password123!" }'

   curl -X POST http://localhost:4000/api/auth/login -H "Content-Type: application/json" \
     -d '{ "email":"test@example.com", "password":"Password123!" }'
   ```

## CORS
Set `CORS_ORIGIN` in `.env` to your Vite dev URL (usually `http://localhost:5173`).

## Notes
- Passwords are hashed with bcrypt (12 rounds).
- A JWT is returned; store it in memory (e.g., React state) or `localStorage` if needed.
