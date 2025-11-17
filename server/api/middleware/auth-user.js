import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'authorization')
  if (!authHeader) return sendError(event, createError({ statusCode: 401, message: 'Token manquant' }))

  const token = authHeader.replace('Bearer ', '')
  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    return sendError(event, createError({ statusCode: 401, message: 'Token invalide' }))
  }

  event.context.user = decoded
})
