import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { email, password, username } = body

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) {
    return sendError(event, createError({ statusCode: 400, statusMessage: 'Email déjà utilisé' }))
  }

  const passwordHash = await bcrypt.hash(password, 10)
  const user = await prisma.user.create({
    data: { email, passwordHash, username, role: 'USER' }
  })

  const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d'
  })

  return { token, user: { id: user.id, email: user.email, username: user.username, role: user.role } }
})
