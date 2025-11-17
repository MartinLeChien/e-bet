import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password } = body

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Utilisateur non trouvé' }))
  }

  const valid = await bcrypt.compare(password, user.passwordHash)
  if (!valid) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Mot de passe incorrect' }))
  }

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  })

  return { token, user: { id: user.id, email: user.email, username: user.username, role: user.role } }
})
