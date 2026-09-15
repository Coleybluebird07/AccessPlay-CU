# AccessPlay

A web application that helps people discover mobile games by accessibility features, genre and platform.

Built as a Cardiff University group software engineering project. Users can browse games, read accessibility information and reviews, and save titles to revisit later. This repository is a portfolio copy of the university project.

## My contribution

I am David Cole. My work included:

- Developing MariaDB-backed registration, login, account management and game retrieval.
- Implementing favourites across the browse, game-profile and account pages, including adding and removing games and opening saved games from the account page.
- Refining the favourites interface and writing tests.
- Resolving merge conflicts and integrating feature branches into the team's development branch.

The full application was a team effort. The features below describe the project as a whole, rather than work completed solely by me.

## Features

- Search for games and filter by genre and accessibility features.
- View game details, accessibility information and user reviews.
- Register, sign in and update account details.
- Save and remove favourite games.
- Submit game reviews and ratings.
- Use voice navigation where supported by the browser.

## Technology

| Area | Tools |
| --- | --- |
| Frontend | React, JavaScript, Vite, React Router |
| Backend | Node.js, Express |
| Database | MariaDB |
| Authentication | JSON Web Tokens, bcrypt |
| Testing | Vitest, React Testing Library, Supertest |

## Project structure

```text
auth-server/
  src/             API routes, authentication and database access
  test/            Backend tests
  schema.sql       Database and table definitions
  data.sql         Sample game data
vite-project/
  src/             React pages, components and utilities
  test/            Frontend tests
```

## Run locally

You will need Node.js and npm compatible with the versions in the two `package.json` files, and a running MariaDB server. The instructions below describe the checked-in configuration.

### 1. Clone the repository

```bash
git clone https://github.com/Coleybluebird07/AccessPlay-CU.git
cd AccessPlay-CU
```

### 2. Prepare the database

Using a MariaDB account with permission to create the local database, import `auth-server/schema.sql`, then `auth-server/data.sql`. For example:

```bash
mariadb -u YOUR_DATABASE_USER -p < auth-server/schema.sql
mariadb -u YOUR_DATABASE_USER -p < auth-server/data.sql
```

The schema creates a database named `group7_auth`. Import the sample data once into a fresh database.

### 3. Configure and start the backend

Create `auth-server/.env` with your local settings. Replace the example values before use and keep the file out of version control.

```dotenv
DB_HOST=localhost
DB_PORT=3306
DB_USER=your_local_database_user
DB_PASSWORD=your_local_database_password
DB_NAME=group7_auth
PORT=4000
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=replace_with_a_long_random_secret
JWT_EXPIRES_IN=7d
```

```bash
cd auth-server
npm install
npm run dev
```

The API runs at `http://localhost:4000`. Its health endpoint is `http://localhost:4000/health`.

### 4. Start the frontend

In a separate terminal, from the repository root:

```bash
cd vite-project
npm install
npm run dev
```

Open `http://localhost:5173`. Keep the backend on port 4000: some pages use that address directly, while others read `VITE_API_URL`.

## Tests and build

Run these commands from the indicated directory:

| Directory | Command | Purpose |
| --- | --- | --- |
| `auth-server` | `npm test -- --run` | Run backend tests once |
| `vite-project` | `npm test -- --run` | Run frontend tests once |
| `vite-project` | `npm run lint` | Check frontend lint rules |
| `vite-project` | `npm run build` | Build the frontend |

The repository contains tests; this README does not claim that every test currently passes. Some API tests mock database responses, so they do not verify the underlying SQL against a live database.

## Scope and known limitations

This is a university demonstration, not a deployed production service.

- The authentication code retains a demonstration administrator password override, a fallback JWT secret and login debug logging. These need to be removed before any public deployment or use with real accounts.
- Favourites are stored in browser local storage. They are not synchronised between devices or stored separately for each account.
- API base URLs need to be made consistent before deploying outside the local setup.
- Voice navigation depends on browser support. An accessibility-focused feature set does not establish compliance with an accessibility standard.

## Credits

Developed by Cardiff University Group 7. This portfolio copy highlights my contributions while retaining the team's work.

[David Cole on GitHub](https://github.com/Coleybluebird07)
