import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest {
  cookies?: Record<string, string>;
  user?: { id: number; username: string };
}

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

export function requireAuth(req: any, res: any, next: any) {
  const token = req?.cookies?.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const payload = jwt.verify(token, JWT_SECRET) as { id: number; username: string };
    req.user = { id: (payload as any).id, username: (payload as any).username };
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
