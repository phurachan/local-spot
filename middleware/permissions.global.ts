import { usePermissions } from '~/composables/utilities/usePermissions'

export default defineNuxtRouteMiddleware(async (to, from) => {
  const { $router } = useNuxtApp()
  const authStore = useAuthStore()
  const { hasPermission, canAccessModule, isAdmin } = usePermissions()
  
  // Debug logging can be enabled when needed
  // console.log('MIDDLEWARE: Running for route:', to.path)
  
  // Skip middleware for home page, local-spot homepage, login page and API routes
  if (to.path === '/' || to.path === '/local-spot' || to.path === '/local-spot/login' || to.path.startsWith('/api/')) {
    return
  }
  
  // Wait for auth initialization to complete
  if (!authStore.hasInitialized) {
    await authStore.initializeAuth()
  }
  
  // Check if user is authenticated after initialization
  if (!authStore.isAuthenticated) {
    return navigateTo(`/local-spot/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }
  
  // If user is authenticated but user data isn't loaded yet, allow access
  if (!authStore.user) {
    return
  }
  
  // Define route permissions mapping
  const routePermissions: Record<string, string[]> = {
    '/local-spot/admin': ['dashboard.access'],
    '/local-spot/admin/components': ['components.access'],
    '/local-spot/admin/demo': ['demo.access'],
    '/local-spot/admin/user_management': ['user_management.access'],
  }
  
  // Get the base path (without query parameters)
  const basePath = to.path?.split('?')[0] ?? ''
  
  // Check if route requires specific permissions
  const requiredPermissions = routePermissions[basePath]
  
  if (requiredPermissions) {
    // Admin users bypass all permission checks
    if (isAdmin.value) {
      return
    }
    
    // Check if user has required permissions
    const hasRequiredPermission = requiredPermissions.some((permission: string) => {
      return hasPermission(permission)
    })
    
    if (!hasRequiredPermission) {
      // Redirect to dashboard if user doesn't have permission
      if (basePath !== '/local-spot/admin') {
        return navigateTo('/local-spot/admin')
      } else {
        // If user can't access dashboard, redirect to login
        return navigateTo(`/local-spot/login?redirect=${encodeURIComponent(to.fullPath)}`)
      }
    }
  }
  
  // For dynamic routes, check module access
  if (basePath.startsWith('/local-spot/admin/user_management/') && !canAccessModule('user_management')) {
    return navigateTo('/local-spot/admin')
  }
})