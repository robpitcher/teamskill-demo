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
      skills: JSON.stringify(skills) as any,
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
  return res.json({
    ...latest,
    skills: typeof (latest as any).skills === 'string' ? JSON.parse((latest as any).skills) : (latest as any).skills,
  });
});

// GET /assessments/heatmap - get all latest assessments for heatmap visualization
router.get('/heatmap', requireAuth, async (req, res) => {
  try {
    const users = await prisma.user.findMany({ select: { id: true, username: true } });
    const assessments = [];

    for (const user of users) {
      const latest = await prisma.assessment.findFirst({
        where: { userId: user.id },
        orderBy: { submittedAt: 'desc' },
      });
      
      if (latest) {
        const skills = typeof (latest as any).skills === 'string' 
          ? JSON.parse((latest as any).skills) 
          : (latest as any).skills;
        
        assessments.push({
          userId: user.id,
          username: user.username,
          skills,
          submittedAt: latest.submittedAt
        });
      }
    }

    return res.json({ assessments });
  } catch (e: any) {
    return res.status(500).json({ error: e.message || 'Failed to get heatmap data' });
  }
});

export default router;
