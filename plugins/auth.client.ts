export default defineNuxtPlugin({
  name: 'auth-init',
  parallel: false,
  async setup() {
    // Only run on client side
    if (process.server) {
      return
    }

    // Wait for next tick and ensure DOM is ready
    await nextTick()

    // Wait a bit more to ensure Pinia is fully initialized
    await new Promise(resolve => setTimeout(resolve, 100))

    try {
      const authStore = useAuthStore()

      // Initialize auth on app start (client-side only)
      if (!authStore.hasInitialized) {
        await authStore.initializeAuth()
      }
    } catch (error) {
      console.warn('Failed to initialize auth store:', error)
    }
  }
})