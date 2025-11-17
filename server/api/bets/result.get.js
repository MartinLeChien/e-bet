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
    include: { match: true }
  })

  const results = bets.map(b => ({
    matchId: b.matchId,
    teamId: b.teamId,
    amount: b.amount,
    potentialGain: b.potentialGain,
    won: b.won
  }))

  const totalGains = results.filter(r => r.won).reduce((sum, r) => sum + r.potentialGain, 0)
  const totalLosses = results.filter(r => r.won === false).reduce((sum, r) => sum + r.amount, 0)

  return { results, totalGains, totalLosses }
})
