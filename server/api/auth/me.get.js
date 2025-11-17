import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader) return sendError(event, createError({ statusCode: 401, statusMessage: 'Token manquant' }))

  const token = authHeader.replace('Bearer ', '')
  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Token invalide' }))
  }

  const user = await prisma.user.findUnique({ where: { id: decoded.userId } })
  if (!user) return sendError(event, createError({ statusCode: 404, statusMessage: 'Utilisateur introuvable' }))

  return { id: user.id, email: user.email, username: user.username, role: user.role }
})
