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
  const { name, logoUrl } = body
  const id = parseInt(event.context.params.id)

  const team = await prisma.team.update({
    where: { id },
    data: { name, logoUrl }
  })
  return team
})
