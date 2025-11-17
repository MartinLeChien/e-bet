import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const user = (() => {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) throw createError({ statusCode: 401, statusMessage: 'Token manquant' })
    const token = authHeader.replace('Bearer ', '')
    return jwt.verify(token, process.env.JWT_SECRET)
  })()

  const bets = await prisma.bet.findMany({
    where: { userId: user.userId },
    include: { match: { include: { teamA: true, teamB: true } } }
  })

  return bets
})
