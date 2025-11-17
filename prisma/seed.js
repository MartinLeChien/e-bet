import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('password', 10)

  // Admin
  await prisma.user.upsert({
    where: { email: 'admin@gmail.com' },
    update: {},
    create: {
      email: 'admin@gmail.com',
      passwordHash,
      username: 'admin',
      role: 'ADMIN'
    }
  })

  // User
  await prisma.user.upsert({
    where: { email: 'user@gmail.com' },
    update: {},
    create: {
      email: 'user@gmail.com',
      passwordHash,
      username: 'user',
      role: 'USER'
    }
  })

  // Teams
  const KC = await prisma.team.create({
    data: {
      name: 'KCorp',
      logoUrl: '/uploads/KC.png'
    }
  })

  const M8 = await prisma.team.create({
    data: {
      name: 'Gentle Mates',
      logoUrl: '/uploads/M8.png'
    }
  })

  // Match
  await prisma.match.create({
    data: {
      teamAId: KC.id,
      teamBId: M8.id,
      startTime: new Date(Date.now() + 1000 * 60 * 60 * 24),
      oddsTeamA: 1.8,
      oddsTeamB: 2.0
    }
  })

  console.log('initialisation BDD, ok.')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
