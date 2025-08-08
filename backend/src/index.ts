import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth';
import assessmentsRouter from './routes/assessments';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import searchRouter from './routes/search';

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/assessments', assessmentsRouter);
app.use('/search', searchRouter);

app.get('/health', (_req, res) => res.json({ ok: true }));

// --- Lightweight runtime bootstrap for SQLite (no npx migrate needed) ---
const prisma = new PrismaClient();
async function ensureSqliteSchemaAndMaybeSeed() {
  // Ensure tables and indexes exist. Safe to run repeatedly.
  await prisma.$executeRawUnsafe(`PRAGMA foreign_keys=ON;`);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "User" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "username" TEXT NOT NULL UNIQUE,
      "password" TEXT NOT NULL
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE TABLE IF NOT EXISTS "Assessment" (
      "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
      "submittedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      "skills" TEXT NOT NULL,
      "userId" INTEGER NOT NULL,
      CONSTRAINT "Assessment_userId_fkey" FOREIGN KEY ("userId")
        REFERENCES "User" ("id") ON DELETE CASCADE
    );
  `);

  await prisma.$executeRawUnsafe(`
    CREATE INDEX IF NOT EXISTS "Assessment_userId_submittedAt_idx"
    ON "Assessment"("userId", "submittedAt");
  `);

  // Optional seed: create a demo user if none exists
  const shouldSeed = (process.env.SEED_ON_BOOT || '').toLowerCase() === 'true';
  const userCount = await prisma.user.count();
  if (shouldSeed && userCount === 0) {
    const hash = await bcrypt.hash('Password123!', 10);
    const demo = await prisma.user.create({ data: { username: 'manager', password: hash } });
    await prisma.assessment.create({
      data: {
        userId: demo.id,
        submittedAt: new Date(),
        skills: { react: 4, node: 5, sql: 3, azure: 4 } as unknown as any,
      },
    });
  }
}

const port = process.env.PORT || 4000;
(async () => {
  try {
    await ensureSqliteSchemaAndMaybeSeed();
    app.listen(port, () => {
      console.log(`API listening on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Failed to bootstrap database', err);
    process.exit(1);
  }
})();
