# Skills Tracker MVP (Local-Only)

Small internal skills-tracking app to help managers find the right people for tasks.

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

Default credentials (seeded)
- username: manager
- password: Password123!

How it works
- Frontend calls the API via /api. Nginx proxies /api -> http://backend:4000.
- Backend sets an HTTP-only cookie on /auth/login and /auth/signup.
- SQLite schema is bootstrapped on startup (CREATE TABLE IF NOT EXISTS). No prisma migrate needed.
- Demo seed is enabled by compose when the DB is empty.

Endpoints (prefix with /api from the browser)
- Auth
  - POST /auth/signup { username, password }
  - POST /auth/login  { username, password }
  - GET  /auth/me
  - POST /auth/logout
- Assessments (auth required)
  - POST /assessments { skills: { react,node,sql,azure: 1..5 } }
  - GET  /assessments/me
- Health: GET /health -> { ok: true }

Environment variables (compose)
Backend
- PORT=4000
- DATABASE_URL=file:/data/dev.db
- JWT_SECRET=change-me
- SEED_ON_BOOT=true

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
- Docker build fails at "Prisma schema validation ... Field `skills` can't be of type Json" on SQLite:
  - Fixed: the schema uses `skills String` and the app serializes/parses JSON manually.
- If Prisma complains about OpenSSL in Docker, the base image already provides required libraries in runtime; generation happens during build. If issues persist on your environment, try rebuilding:
  - PowerShell
    docker compose build --no-cache
- Reset DB: stop stack and remove volume
  - PowerShell
    docker compose down -v

Prisma/OpenSSL fix
- The backend Dockerfile installs openssl in both build and runtime layers.
- Prisma client binaryTargets are set to include debian-openssl-3.0.x to match Node 20 bookworm images.
- If you still see libssl errors, force a clean rebuild:
  - pwsh
    docker compose build --no-cache backend
    docker compose up -d

Notes
- Cookies use sameSite=lax and secure=false for localhost. Use HTTPS and secure cookies in production.
- Search/filter API is not included in this MVP; the dashboard heat map uses static sample data.

Next iterations (not included here)
- Azure AD authentication
- NoSQL backend (e.g., Azure Cosmos DB)
- Azure hosting (App Service, Container Apps, or AKS)