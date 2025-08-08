import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const count = await prisma.user.count();
  if (count > 0) {
    console.log('Users already exist, skipping seed');
    return;
  }
  const password = await bcrypt.hash('Password123!', 10);
  const u1 = await prisma.user.create({ data: { username: 'manager', password } });
  const u2 = await prisma.user.create({ data: { username: 'alice', password } });
  const u3 = await prisma.user.create({ data: { username: 'bob', password } });

  await prisma.assessment.createMany({
    data: [
      { userId: u1.id, submittedAt: new Date(), skills: { react: 4, node: 5, sql: 3, azure: 4 } as any },
      { userId: u2.id, submittedAt: new Date(), skills: { react: 3, node: 3, sql: 4, azure: 2 } as any },
      { userId: u3.id, submittedAt: new Date(), skills: { react: 5, node: 2, sql: 2, azure: 3 } as any }
    ]
  });

  console.log('Seed complete');
}

main().finally(async () => {
  await prisma.$disconnect();
});
