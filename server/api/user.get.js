export default defineEventHandler((event) => {
  const user = event.context.user
  if (!user) {
    return sendError(event, createError({ statusCode: 401, statusMessage: 'Non authentifié' }))
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  }
})
