import jwt from 'jsonwebtoken'

export default defineEventHandler(async (event) => {
  if (event.node.req.url.startsWith('/api/auth')) {
    return
  }

  const authHeader = getHeader(event, 'authorization')
  if (!authHeader) return sendError(event, createError({ statusCode: 401, statusMessage: 'Token manquant' }))

  const token = authHeader.replace('Bearer ', '')
  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Token invalide' }))
  }

  if (decoded.role !== 'ADMIN') {
    return sendError(event, createError({ statusCode: 403, statusMessage: 'Accès refusé' }))
  }

  event.context.user = decoded
})
