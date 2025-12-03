# Group 7 — AccessPlay

AccessPlay is a full-stack accessibility-focused mobile game discovery platform developed by Group 7 as part of
Cardiff University’s Software Engineering course.

The system is composed of:
- **A React + Vite frontend** (`vite-project/`)
- **A Node.js + Express backend** (`auth-server/`)
- **A MariaDB relational database**

The platform enables users to:
- Browse mobile games
- Filter based on accessibility features
- View full game accessibility details
- Register, log in, and authenticate with JWT
- Submit and read reviews
- Use voice navigation for improved accessibility

---

## Project Structure

```
group-7/
├── auth-server/         # Backend API server (Node.js + Express)
├── vite-project/        # Frontend application (Vite + React)
└── README.md            # Project README (this file)
```


---

## Getting Started

This repository contains **two separate applications**:

| Folder          | Description               |
|-----------------|---------------------------|
| `vite-project/` | React + Vite frontend     |
| `auth-server/`  | Express + MariaDB backend |

Both must be installed and run independently.

---

# Development Workflow (GitLab)

### Add your files / upload project
```bash
cd existing_repo
git remote add origin https://git.cardiff.ac.uk/c23044539/group-7.git
git branch -M main
git push -uf origin main
```


## Collaborate with your team

Workflow features help your team collaborate effectively.
- [ ] [Create a new feature branch](https://docs.gitlab.com/ee/user/project/repository/branches/#create-a-branch)
- [ ] [Commit changes](https://docs.gitlab.com/ee/user/project/repository/commits/#create-a-commit)
- [ ] [Push changes](https://docs.gitlab.com/ee/user/project/repository/commits/#push-commits-to-gitlab)
- [ ] [Open a merge request into Development](https://docs.gitlab.com/ee/user/project/merge_requests/#create-a-merge-request)
- [ ] [Review code](https://docs.gitlab.com/ee/user/project/merge_requests/reviews/)
- [ ] [Manage issues](https://docs.gitlab.com/ee/user/project/issues/)
- [ ] [Merge into Main](https://docs.gitlab.com/ee/user/project/merge_requests/merge_when_pipeline_succeeds.html)

Recommended GitLab Features:
- Issue tracking
- Merge requests with code reviews
- CI/CD pipelines
- Code scanning / linting

## Test and Deployment

Use the built-in continuous integration in GitLab.

- Frontend Testing with Vitest (React components).
- Backend Testing with Supertest (API endpoints), and Vitest(service-level tests).
- Manual MariaDB testing with sample data and SQL schema included.

You can set up CI/CD pipelines to automate testing and deployment.
- Linting
- Building
- Testing
- Deployment

***

# Project Documentation

## Name
AccessPlay - An accessible mobile game discovery platform

---

## Description
AccessPlay is a web platform that helps users discover games based on their 
- Accessibility features
- User reviews
- Genres
- Platform compatibility (iOS, Android)

### Core features
- JWT-based user authentication
- Game browsing with filter and search
- Full game details with accessibility information
- User reviews and ratings
- Voice-controlled navigation
- Responsive UI design for mobile and desktop

### Tech stack
- Frontend: React, Vite, React Router
- Backend: Node.js, Express
- Database: MariaDB
- Testing: Vitest, Supertest

## Visuals
Screenshots and mockups can be found in the `docs/` folder (if applicable).

## Installation
1. Clone the repository:
   ```bash
   git clone https://git.cardiff.ac.uk/c23044539/group-7.git
   cd group-7
   ```
2. Setup Database:
    MariaDB (Local or Remote)
   - Create a database and run the provided `schema.sql` to set up tables.
   - (Optional) Load sample data with `data.sql`.
   - Update database connection settings in `auth-server/.env`.

---
## Usage
### Backend (auth-server)
1. Navigate to the backend directory:
   ```bash
   cd auth-server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm run dev
   ```

### Frontend (vite-project)
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd vite-project
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173` to access the application.

## Support
For support:
- Open an issue on GitLab
- Contact the maintainers
- Speak to the module coordinator

## Roadmap
Planned Improvements and features for future releases.
- Enhanced accessibility features
- More comprehensive game database
- Improved UI/UX design
- Mobile app version
- Social features (friends, sharing)

## Contributing
Guidelines for contributing.

- Fork the repository
- Create a feature branch (e.g., `feature/my-feature`)
- Commit your changes with clear messages (e.g., `git commit -m "Add feature X"`)
- Make your changes
- Write tests for your changes
- Submit a merge request
- Use eslint for formatting and linting (``` npm run lint ```)

## Authors and acknowledgment
Group 7 Members-Cardiff University Software Engineering Course
- 1846727 
- 22033692
- 22059852
- 23044539
- 23037459

Special thanks to our module coordinator and teaching assistants for their support and guidance.

## License
None (for educational use only)

## Project status
Active development: Ongoing as part of Cardiff University's Software Engineering course.
- Last updated: December 2025
- Current version: 1.0.0