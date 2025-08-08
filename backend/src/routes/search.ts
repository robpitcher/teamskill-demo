import express from 'express'
import { PrismaClient } from '@prisma/client'
import { requireAuth } from '../middleware/authMiddleware'

const router = express.Router()
const prisma = new PrismaClient()

// GET /search?skill=react&min=3
router.get('/', requireAuth, async (req: any, res: any) => {
  try {
    const skill = (req.query?.skill as string) || 'react'
    const min = Number(req.query?.min ?? 3)

    const users = await prisma.user.findMany({ select: { id: true, username: true } })
    const results: any[] = []

    for (const u of users) {
      const latest = await prisma.assessment.findFirst({
        where: { userId: u.id },
        orderBy: { submittedAt: 'desc' }
      })
      if (!latest) continue
      const raw = (latest as any).skills
      const skills = typeof raw === 'string' ? JSON.parse(raw) : raw
      const rating = Number((skills ?? {})[skill] ?? 0)
      if (rating >= min) {
        results.push({
          userId: u.id,
          username: u.username,
          rating,
          skills,
          submittedAt: latest.submittedAt
        })
      }
    }

    return res.json({ skill, min, results })
  } catch (e: any) {
    return res.status(500).json({ error: (e && e.message) || 'Search failed' })
  }
})

export default router
