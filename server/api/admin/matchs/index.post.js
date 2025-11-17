import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader) return sendError(event, createError({ statusCode: 401 }))
  const token = authHeader.replace('Bearer ', '')
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  if (decoded.role !== 'ADMIN') return sendError(event, createError({ statusCode: 403 }))

  const body = await readBody(event)
  const { teamAId, teamBId, startTime, oddsTeamA, oddsTeamB } = body

  if (!teamAId || !teamBId || !startTime || !oddsTeamA || !oddsTeamB) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Champs manquants' }))
  }

  const match = await prisma.match.create({
    data: {
      teamAId,
      teamBId,
      startTime: new Date(startTime),
      oddsTeamA,
      oddsTeamB,
      status: 'OPEN'
    }
  })

  return match
})
