import express from 'express';
import { PrismaClient } from '@prisma/client';
import { requireAuth } from '../middleware/authMiddleware';

const router = express.Router();
const prisma = new PrismaClient();

router.post('/', requireAuth, async (req, res) => {
  const userId = req.user!.id;
  const { skills } = req.body as { skills?: Record<string, number> };
  if (!skills || typeof skills !== 'object') return res.status(400).json({ error: 'skills JSON required' });

  const assessment = await prisma.assessment.create({
    data: {
      userId,
      skills,
      submittedAt: new Date(),
    },
  });
  return res.status(201).json(assessment);
});

router.get('/me', requireAuth, async (req, res) => {
  const userId = req.user!.id;
  const latest = await prisma.assessment.findFirst({
    where: { userId },
    orderBy: { submittedAt: 'desc' },
  });
  if (!latest) return res.status(404).json({ error: 'no assessment found' });
  return res.json(latest);
});

export default router;
