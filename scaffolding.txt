/*
Skills App MVP - Containerized, Local-Only Version
Fully self-contained: built-in auth + SQLite + React frontend
*/

// Project Structure:
// skills-app/
// ├── docker-compose.yml
// ├── backend/
// │   ├── Dockerfile
// │   ├── package.json
// │   ├── prisma/
// │   │   ├── schema.prisma
// │   └── src/
// │       ├── index.ts
// │       ├── routes/
// │       │   ├── auth.ts
// │       │   ├── assessments.ts
// │       └── middleware/
// │           └── authMiddleware.ts
// └── frontend/
//     ├── Dockerfile
//     ├── package.json
//     └── src/
//         ├── main.tsx
//         ├── App.tsx
//         ├── pages/
//         │   ├── Login.tsx
//         │   ├── Dashboard.tsx
//         │   ├── Assess.tsx
//         │   └── Search.tsx
//         └── components/
//             ├── SkillForm.tsx
//             └── Heatmap.tsx

// MVP Feature Notes:
// - Auth: username/password, bcrypt hashed, JWT in HTTP-only cookie
// - DB: SQLite via Prisma ORM, stored in volume
// - API routes: /api/auth, /api/assessments, /api/search
// - Frontend: React + Vite + Chakra UI
// - Local dev: Docker Compose

// Next steps (from here):
// 1. Scaffold backend routes (signup/login, assessments)
// 2. Scaffold frontend pages for login + skill submission
// 3. Wire up fetch to API with token-based auth
// 4. Add dummy heatmap with mock data
// 5. Test full local dev experience with Docker Compose
