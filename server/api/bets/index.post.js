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

  const body = await readBody(event)
  const { matchId, teamId, amount } = body

  if (!matchId || !teamId || !amount) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Champs manquants' }))
  }

  const match = await prisma.match.findUnique({ where: { id: matchId } })
  if (!match || match.status !== 'OPEN') {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Match fermé ou introuvable' }))
  }

  // Calcul du gain potentiel
  const cote = teamId === match.teamAId ? match.oddsTeamA : match.oddsTeamB
  const potentialGain = amount * cote

  const bet = await prisma.bet.create({
    data: {
      userId: user.userId,
      matchId,
      teamId,
      amount,
      potentialGain
    }
  })

  return bet
})
