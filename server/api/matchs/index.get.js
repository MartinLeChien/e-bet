// server/api/matchs/index.get.js
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  try {
    const matches = await prisma.match.findMany({
      where: {
        status: 'OPEN' // seulement les matchs ouverts
      },
      include: {
        teamA: true,
        teamB: true
      },
      orderBy: { startTime: 'asc' }
    })
    return matches
  } catch (err) {
    console.error(err)
    return sendError(event, createError({ statusCode: 500, statusMessage: 'Erreur serveur' }))
  }
})
