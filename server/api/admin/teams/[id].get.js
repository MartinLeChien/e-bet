import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader) return sendError(event, createError({ statusCode: 401 }))

  const token = authHeader.replace('Bearer ', '')
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  if (decoded.role !== 'ADMIN') {
    return sendError(event, createError({ statusCode: 403 }))
  }

  const id = parseInt(event.context.params.id)

  const team = await prisma.team.findUnique({
    where: { id }
  })

  if (!team) {
    return sendError(event, createError({ statusCode: 404, statusMessage: 'Équipe introuvable' }))
  }

  return team
})
