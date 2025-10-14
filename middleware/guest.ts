export default defineNuxtRouteMiddleware(async (to, from) => {
  // Only run on client-side after hydration to ensure Pinia is ready
  if (process.server) {
    return
  }

  // Check authentication using cookies directly instead of Pinia store
  try {
    const tokenCookie = useCookie('token', { default: () => null })
    const userCookie = useCookie('user', { default: () => null })

    // If both token and user exist, consider user authenticated
    if (tokenCookie.value && userCookie.value) {
      const redirect = to.query.redirect as string
      const targetPath = redirect ? decodeURIComponent(redirect) : '/'
      return navigateTo(targetPath)
    }
  } catch (error) {
    console.warn('Error in guest middleware:', error)
    // If there's an error, allow access to continue
    return
  }
})