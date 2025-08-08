# Copilot Instructions: TeamSkill Demo

## Repository Overview

This is a **Skills Tracker MVP** - a containerized full-stack web application for internal employee skills tracking. It enables form-based self-assessments, search/filter capabilities for managers, and dashboard visualizations. The application is designed for local development using Docker Compose with no local npm installations required.

**Key Technologies:**
- Backend: Node.js + Express + TypeScript + Prisma ORM + SQLite
- Frontend: React + TypeScript + Vite + Chakra UI + React Router  
- Deployment: Docker Compose with multi-stage builds
- Authentication: JWT with HTTP-only cookies
- Database: SQLite with automatic schema bootstrapping

**Repository Size:** Small (~17 TypeScript files, containerized architecture)

## Build Instructions

### Prerequisites
- Docker Desktop installed and running
- Required environment variables (see Environment Setup below)

### Environment Setup
**ALWAYS set these environment variables before any build operations:**

```bash
export JWT_SECRET="your-jwt-secret-here"
export ADMIN_USERNAME="admin" 
export ADMIN_PASSWORD="your-admin-password"
```

**Critical:** Never commit these values to the repository. Use runtime environment variables only.

### Build Commands

**Full Stack Build (15+ minutes):**
```bash
# ALWAYS set environment variables first
export JWT_SECRET="test-secret" ADMIN_USERNAME="admin" ADMIN_PASSWORD="admin"
docker compose build --no-cache
```

**Quick Start:**
```bash
# Set required environment variables
export JWT_SECRET="test-secret" ADMIN_USERNAME="admin" ADMIN_PASSWORD="admin"
docker compose up -d --build
```

**Individual Service Builds:**
```bash
# Backend only (10+ minutes)
docker compose build backend

# Frontend only (10+ minutes)  
docker compose build frontend
```

**Rebuild after code changes:**
```bash
docker compose up -d --build
```

### Build Timing and Known Issues

**Expected Build Times:**
- Initial build: 15-20 minutes (npm install phases are very slow)
- Rebuild after changes: 2-5 minutes (uses cached layers)
- Backend npm install: ~10 minutes
- Frontend npm install: ~10 minutes

**Common Build Issues:**
1. **Long npm install times:** This is expected. Use timeouts of 15+ minutes for initial builds.
2. **Docker Compose version warning:** `version` attribute is obsolete - safe to ignore.
3. **Environment variable warnings:** Set JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD before building.
4. **No package-lock.json:** Uses `npm install` instead of `npm ci` - longer but works correctly.

**Build Validation:**
```bash
# Check containers are running
docker compose ps

# View logs
docker compose logs -f

# Test health endpoint
curl http://localhost:4000/health
```

### Running and Testing

**Start Services:**
```bash
docker compose up -d
```

**Access Points:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:4000
- Health Check: http://localhost:4000/health

**Stop Services:**
```bash
docker compose down
```

**Reset Database:**
```bash
docker compose down -v  # Removes volumes
```

## Project Layout and Architecture

### Root Directory Structure
```
/
├── docker-compose.yml          # Main orchestration file
├── README.md                   # User documentation  
├── scaffolding.txt            # Architecture notes
├── .gitignore                 # Excludes node_modules, .env, build artifacts
├── LICENSE                    # MIT license
├── backend/                   # Node.js API service
└── frontend/                  # React SPA service
```

### Backend Architecture (`/backend/`)
```
backend/
├── Dockerfile                 # Multi-stage build (Node.js)
├── package.json              # Dependencies, scripts
├── tsconfig.json             # TypeScript configuration
├── .env                      # Local dev environment (not committed)
├── prisma/
│   └── schema.prisma         # Database schema (SQLite)
└── src/
    ├── index.ts              # Entry point, schema bootstrap
    ├── seed.ts               # Database seeding
    ├── routes/               # API endpoints
    │   ├── auth.ts          # Authentication (/auth/*)
    │   ├── assessments.ts   # Skills assessments (/assessments/*)
    │   └── search.ts        # User search (/search)
    ├── middleware/          # Express middleware
    └── types/               # TypeScript definitions
```

**Key Backend Files:**
- `src/index.ts`: Main entry point with automatic SQLite schema creation
- `prisma/schema.prisma`: Database models (User, Assessment)
- `routes/auth.ts`: JWT authentication with HTTP-only cookies
- Docker builds to production-ready image with OpenSSL for Prisma

### Frontend Architecture (`/frontend/`)
```
frontend/
├── Dockerfile                # Multi-stage build (Node.js → Nginx)
├── package.json             # React dependencies
├── vite.config.ts           # Vite build configuration
├── nginx.conf               # Production Nginx config with API proxy
├── index.html               # SPA entry point
└── src/
    ├── main.tsx             # React entry point
    ├── App.tsx              # Main app component with routing
    ├── api.ts               # API client utilities
    ├── pages/               # Route components
    │   ├── Login.tsx        # Authentication page
    │   ├── Dashboard.tsx    # Main dashboard with heat map
    │   └── Assess.tsx       # Skills assessment form
    ├── components/          # Reusable UI components
    ├── state/               # State management
    └── types/               # TypeScript definitions
```

**Key Frontend Files:**
- `src/App.tsx`: Main router and authentication state
- `nginx.conf`: Proxies `/api/*` to backend service
- `vite.config.ts`: Dev server proxy configuration
- Built with Chakra UI for consistent styling

### API Endpoints
**Base URL:** `/api` (proxied to backend:4000)

- **Auth:** `POST /api/auth/signup`, `POST /api/auth/login`, `GET /api/auth/me`, `POST /api/auth/logout`
- **Assessments:** `POST /api/assessments`, `GET /api/assessments/me`  
- **Search:** `GET /api/search?skill=react&min=3`
- **Health:** `GET /api/health`

### Database
- **Engine:** SQLite with Prisma ORM
- **Location:** Docker volume `sqlite_data` mounted at `/data`
- **Models:** User (id, username, password), Assessment (id, submittedAt, skills JSON, userId)
- **Bootstrap:** Automatic schema creation on startup (no migrations needed)

## Validation and CI

**No formal CI/CD pipelines** are configured. Validation steps:

1. **Build Validation:**
   ```bash
   docker compose build --no-cache
   ```

2. **Runtime Validation:**
   ```bash
   # Start services
   docker compose up -d
   
   # Check health
   curl http://localhost:4000/health
   
   # Check frontend loads
   curl http://localhost:5173
   ```

3. **Database Validation:**
   ```bash
   # Check admin user seeded (if env vars provided)
   docker compose logs backend | grep "Seeded admin"
   ```

## Development Workflow

**Making Changes:**
1. Edit source files in `backend/src/` or `frontend/src/`
2. Rebuild: `docker compose up -d --build`
3. Test changes at http://localhost:5173
4. Check logs: `docker compose logs -f`

**Troubleshooting:**
- **Build failures:** Check environment variables are set
- **Long builds:** Expected behavior, wait 15+ minutes for npm installs
- **Database issues:** Reset with `docker compose down -v`
- **API errors:** Check backend logs with `docker compose logs backend`

## Security Notes

- **Never commit:** JWT_SECRET, ADMIN_USERNAME, ADMIN_PASSWORD, or any .env files
- **Local only:** Uses `secure=false` cookies for localhost development
- **Production:** Requires HTTPS and secure cookie settings

## Trust These Instructions

These instructions are comprehensive and tested. Only search for additional information if:
- You encounter errors not covered in "Known Issues"
- You need to understand specific implementation details not documented here
- The build process differs significantly from the documented timings