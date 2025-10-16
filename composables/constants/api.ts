// Get API Base URL from environment variables
export const getApiBaseUrl = (): string => {
  const runtimeConfig = useRuntimeConfig()
  
  // Check if external API URL is configured
  const externalApiUrl = runtimeConfig.public.apiBaseUrl?.toString() || 
                        process.env.API_BASE_URL || 
                        process.env.NUXT_PUBLIC_API_BASE_URL
  
  if (externalApiUrl) {
    // Use external API server
    return externalApiUrl
  }
  
  // Fallback to SSR API (same domain)
  if (typeof window === 'undefined') {
    // Server-side - use relative path for SSR
    return '/api'
  } else {
    // Client-side - use current domain for SSR
    const protocol = window.location.protocol
    const host = window.location.host
    return `${protocol}//${host}/api`
  }
}

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification'
  },

  // User Management
  USERS: {
    LIST: '/users',
    SHOW: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    CHANGE_PASSWORD: (id: string) => `/users/${id}/change-password`,
    UPLOAD_AVATAR: (id: string) => `/users/${id}/avatar`
  },

  // Roles & Permissions
  ROLES: {
    LIST: '/roles',
    SHOW: (id: string) => `/roles/${id}`,
    CREATE: '/roles',
    UPDATE: (id: string) => `/roles/${id}`,
    DELETE: (id: string) => `/roles/${id}`
  },

  PERMISSIONS: {
    LIST: '/permissions',
    SHOW: (id: string) => `/permissions/${id}`,
    CREATE: '/permissions',
    UPDATE: (id: string) => `/permissions/${id}`,
    DELETE: (id: string) => `/permissions/${id}`,
    MODULES: '/permissions/modules'
  },

  // Dashboard
  DASHBOARD: {
    STATS: '/dashboard/stats',
    ANALYTICS: '/dashboard/analytics',
    ACTIVITIES: '/dashboard/activities'
  },

  // File Management
  FILES: {
    UPLOAD: '/files/upload',
    DOWNLOAD: (id: string) => `/files/${id}/download`,
    DELETE: (id: string) => `/files/${id}`
  },

  // Settings
  SETTINGS: {
    GENERAL: '/settings/general',
    SECURITY: '/settings/security',
    NOTIFICATIONS: '/settings/notifications',
    UPDATE: '/settings'
  },

  // oEmbed - Social Media Embeds
  OEMBED: {
    TIKTOK: '/oembed/tiktok'
  },

  // CMS - Content Management
  CMS: {
    // News
    NEWS: {
      LIST: '/cms/news',
      SHOW: (id: string) => `/cms/news/${id}`,
      CREATE: '/cms/news',
      UPDATE: (id: string) => `/cms/news/${id}`,
      DELETE: (id: string) => `/cms/news/${id}`
    },
    // Hotels
    HOTELS: {
      LIST: '/cms/hotels',
      SHOW: (id: string) => `/cms/hotels/${id}`,
      CREATE: '/cms/hotels',
      UPDATE: (id: string) => `/cms/hotels/${id}`,
      DELETE: (id: string) => `/cms/hotels/${id}`
    },
    // Restaurants
    RESTAURANTS: {
      LIST: '/cms/restaurants',
      SHOW: (id: string) => `/cms/restaurants/${id}`,
      CREATE: '/cms/restaurants',
      UPDATE: (id: string) => `/cms/restaurants/${id}`,
      DELETE: (id: string) => `/cms/restaurants/${id}`
    },
    // Travel Services
    TRAVEL_SERVICES: {
      LIST: '/cms/travel-services',
      SHOW: (id: string) => `/cms/travel-services/${id}`,
      CREATE: '/cms/travel-services',
      UPDATE: (id: string) => `/cms/travel-services/${id}`,
      DELETE: (id: string) => `/cms/travel-services/${id}`
    },
    // Local Products
    LOCAL_PRODUCTS: {
      LIST: '/cms/local-products',
      SHOW: (id: string) => `/cms/local-products/${id}`,
      CREATE: '/cms/local-products',
      UPDATE: (id: string) => `/cms/local-products/${id}`,
      DELETE: (id: string) => `/cms/local-products/${id}`
    },
    // Events
    EVENTS: {
      LIST: '/cms/events',
      SHOW: (id: string) => `/cms/events/${id}`,
      CREATE: '/cms/events',
      UPDATE: (id: string) => `/cms/events/${id}`,
      DELETE: (id: string) => `/cms/events/${id}`
    },
    // Image Gallery
    IMAGES: {
      LIST: '/cms/images',
      SHOW: (id: string) => `/cms/images/${id}`,
      CREATE: '/cms/images',
      UPDATE: (id: string) => `/cms/images/${id}`,
      DELETE: (id: string) => `/cms/images/${id}`,
      UPLOAD: '/cms/images/upload'
    },
    // SEO & Meta
    SEO: {
      LIST: '/cms/seo',
      SHOW: (id: string) => `/cms/seo/${id}`,
      CREATE: '/cms/seo',
      UPDATE: (id: string) => `/cms/seo/${id}`,
      DELETE: (id: string) => `/cms/seo/${id}`,
      BY_URL: (url: string) => `/cms/seo/by-url?url=${encodeURIComponent(url)}`
    },
    // Web Settings
    WEB_SETTINGS: {
      GET: '/cms/settings',
      UPDATE: '/cms/settings'
    }
  }
} as const

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503
} as const

// Request Timeouts (in milliseconds)
export const API_TIMEOUTS = {
  DEFAULT: 10000,    // 10 seconds
  UPLOAD: 60000,     // 1 minute
  DOWNLOAD: 30000,   // 30 seconds
  AUTH: 15000        // 15 seconds
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 20,
  MAX_PER_PAGE: 100
} as const