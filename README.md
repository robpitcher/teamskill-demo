# Skills Tracker MVP (Local-Only)

Small internal skills-tracking app to help managers find the right people for tasks.

SECURITY NOTE
- Never hardcode or commit passwords, secrets, JWT keys, or connection strings.
- Seed an initial admin user only via runtime environment variables (not committed).

Included
- Backend: Node.js + Express, Prisma + SQLite, JWT auth (HTTP-only cookie)
- Frontend: React + Vite build, Chakra UI, React Router, served by Nginx
- Features: Self-assessments (1–5), protected routes, sample heat map dashboard
- Local-only: Docker Compose, no local npm installs or prisma migrate

Quick start (Docker)
1) Prerequisite: Docker Desktop
2) Build and start:
   - PowerShell
     docker compose up -d --build
3) Open:
   - App:  http://localhost:5173
   - API:  http://localhost:4000

Seed an admin user (optional, local only)
- If the DB is empty, the backend will create an admin user when both ADMIN_USERNAME and ADMIN_PASSWORD are provided at runtime.
- Example using a local .env (do NOT commit this file):
  - pwsh
    @"
    ADMIN_USERNAME=admin
    ADMIN_PASSWORD=ChangeThisLocally!
    JWT_SECRET=ChangeJwtSecretLocally!
    "@ | Out-File -Encoding utf8NoBOM .env
    docker compose --env-file .env up -d --build
- Or specify environment variables on the command line (PowerShell):
  - pwsh
    $env:ADMIN_USERNAME = "admin";
    $env:ADMIN_PASSWORD = "ChangeThisLocally!";
    $env:JWT_SECRET = "ChangeJwtSecretLocally!";
    docker compose up -d --build

How it works
- Frontend calls the API via /api. Nginx proxies /api -> http://backend:4000.
- Backend sets an HTTP-only cookie on /auth/login and /auth/signup.
- SQLite schema is bootstrapped on startup (CREATE TABLE IF NOT EXISTS). No prisma migrate needed.
- Optional admin seeding uses ADMIN_USERNAME/ADMIN_PASSWORD envs only.

Endpoints (prefix with /api from the browser)
- Auth
  - POST /auth/signup { username, password }
  - POST /auth/login  { username, password }
  - GET  /auth/me
  - POST /auth/logout
- Assessments (auth required)
  - POST /assessments { skills: { react,node,sql,azure: 1..5 } }
  - GET  /assessments/me
- Search (auth required)
  - GET /search?skill=react&min=3
- Health: GET /health -> { ok: true }

Environment variables
Backend
- PORT=4000
- DATABASE_URL=file:/data/dev.db
- JWT_SECRET=<set-at-runtime>
- ADMIN_USERNAME=<set-at-runtime> (optional)
- ADMIN_PASSWORD=<set-at-runtime> (optional)

Frontend
- VITE_API_BASE=/api
- BACKEND_URL=http://backend:4000 (used by Nginx proxy)

Data persistence
- SQLite file lives in named volume sqlite_data mounted at /data in backend.
- Reset DB:
  - PowerShell
    docker compose down -v

Common operations
- Rebuild after code changes:
  docker compose up -d --build
- Tail logs:
  docker compose logs -f
- Stop stack:
  docker compose down

Troubleshooting
- Prisma JSON with SQLite: schema uses String for skills; app serializes/parses JSON manually.
- OpenSSL in Docker: backend Dockerfile installs openssl; Prisma binaryTargets include debian-openssl-3.0.x.
- Force clean rebuild if needed:
  - pwsh
    docker compose build --no-cache backend
    docker compose up -d

Notes
- Cookies use sameSite=lax and secure=false for localhost. Use HTTPS and secure cookies in production.