import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader) return sendError(event, createError({ statusCode: 401 }))
  const token = authHeader.replace('Bearer ', '')
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  if (decoded.role !== 'ADMIN') return sendError(event, createError({ statusCode: 403 }))

  const id = parseInt(event.context.params.id)
  const body = await readBody(event)
  const { teamAId, teamBId, startTime, oddsTeamA, oddsTeamB, status, winnerTeamId } = body

  const match = await prisma.match.update({
    where: { id },
    data: {
      teamAId,
      teamBId,
      startTime: startTime ? new Date(startTime) : undefined,
      oddsTeamA,
      oddsTeamB,
      status,
      winnerTeamId
    }
  })

  return match
})
