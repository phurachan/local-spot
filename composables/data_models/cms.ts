// CMS Content Types Data Models
// Based on Local Travel Business Network flow

// Base Content Interface
export interface BaseContent {
  _id?: string
  title: string
  description: string
  images: string[]
  isActive: boolean
  featured: boolean
  order: number
  tags: string[]
  createdAt?: Date
  updatedAt?: Date
  createdBy?: string
  updatedBy?: string
}

// Hotel/Accommodation Content
export interface HotelContent extends BaseContent {
  type: 'hotel'
  category: 'hotel' | 'resort' | 'hostel' | 'guesthouse' | 'villa'
  location: {
    address: string
    district: string
    province: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  contactInfo: {
    phone: string[]
    email?: string
    website?: string
    lineOA?: string
  }
  amenities: string[]
  roomTypes: {
    name: string
    description: string
    maxGuests: number
    priceRange: {
      min: number
      max: number
    }
    images: string[]
  }[]
  checkInOut: {
    checkIn: string
    checkOut: string
  }
  policies: string[]
  nearbyAttractions: string[]
}

// Restaurant/Food Content
export interface RestaurantContent extends BaseContent {
  type: 'restaurant'
  category: 'restaurant' | 'cafe' | 'street_food' | 'local_cuisine' | 'international'
  location: {
    address: string
    district: string
    province: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  contactInfo: {
    phone: string[]
    email?: string
    website?: string
    lineOA?: string
  }
  cuisine: string[]
  priceRange: 'budget' | 'mid_range' | 'fine_dining'
  operatingHours: {
    [key: string]: {
      open: string
      close: string
      closed?: boolean
    }
  }
  specialties: string[]
  dietaryOptions: string[] // vegetarian, vegan, halal, etc.
  delivery: {
    available: boolean
    platforms: string[]
  }
}

// Travel Service Content
export interface TravelServiceContent extends BaseContent {
  type: 'travel_service'
  category: 'transport' | 'tour' | 'guide' | 'rental' | 'activity'
  serviceType: string
  location: {
    serviceArea: string[]
    meetingPoint?: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  contactInfo: {
    phone: string[]
    email?: string
    website?: string
    lineOA?: string
  }
  pricing: {
    type: 'per_person' | 'per_group' | 'per_hour' | 'per_day'
    amount: number
    currency: string
    includes: string[]
    excludes: string[]
  }
  duration: {
    min: number
    max: number
    unit: 'hours' | 'days'
  }
  capacity: {
    min: number
    max: number
  }
  requirements: string[]
  availability: string[]
}

// Local Product Content
export interface LocalProductContent extends BaseContent {
  type: 'local_product'
  category: 'handicraft' | 'food_product' | 'souvenir' | 'textile' | 'art'
  vendor: {
    name: string
    description: string
    location: string
    contactInfo: {
      phone: string[]
      email?: string
      website?: string
      lineOA?: string
    }
  }
  product: {
    materials: string[]
    sizes: string[]
    colors: string[]
    weight?: number
    dimensions?: string
  }
  pricing: {
    price: number
    currency: string
    discounts?: {
      quantity: number
      discountPercent: number
    }[]
  }
  availability: {
    inStock: boolean
    stockQuantity?: number
    seasonality?: string
  }
  shipping: {
    available: boolean
    areas: string[]
    cost?: number
  }
}

// Event Content
export interface EventContent extends BaseContent {
  type: 'event'
  category: 'festival' | 'market' | 'cultural' | 'sports' | 'workshop' | 'seasonal'
  schedule: {
    startDate: Date
    endDate: Date
    times: {
      start: string
      end: string
    }[]
    recurring?: {
      pattern: 'daily' | 'weekly' | 'monthly' | 'yearly'
      interval: number
    }
  }
  location: {
    venue: string
    address: string
    district: string
    province: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  organizer: {
    name: string
    contactInfo: {
      phone: string[]
      email?: string
      website?: string
      lineOA?: string
    }
  }
  ticketing: {
    required: boolean
    price?: number
    currency?: string
    bookingUrl?: string
    freeEntry?: boolean
  }
  capacity?: number
  targetAudience: string[]
  activities: string[]
}

// News Content
export interface NewsContent extends BaseContent {
  type: 'news'
  category: 'announcement' | 'promotion' | 'event_news' | 'travel_tips' | 'local_story' | 'business_update'
  author: {
    name: string
    email?: string
    bio?: string
  }
  content: string // Full article content (HTML or Markdown)
  excerpt?: string // Short summary for listing
  coverImage?: string
  publishDate: Date
  source?: string
  location?: {
    province?: string
    district?: string
  }
  relatedContent?: {
    contentType: 'hotel' | 'restaurant' | 'travel_service' | 'local_product' | 'event'
    contentId: string
    title?: string
  }[]
  viewCount?: number
  readTime?: number // in minutes
}

// Image Gallery Content
export interface ImageGalleryContent extends BaseContent {
  type: 'image_gallery'
  category: 'hotel' | 'restaurant' | 'travel_service' | 'local_product' | 'event' | 'general' | 'attraction'
  imageUrl: string
  thumbnailUrl?: string
  altText: string
  caption?: string
  photographer?: string
  location?: {
    name?: string
    coordinates?: {
      lat: number
      lng: number
    }
  }
  dimensions?: {
    width: number
    height: number
  }
  fileSize?: number
  mimeType?: string
  relatedContent?: {
    contentType: 'hotel' | 'restaurant' | 'travel_service' | 'local_product' | 'event'
    contentId: string
  }
}

// SEO & Meta Content
export interface SEOMetaContent {
  _id?: string
  pageUrl: string
  pageTitle: string
  metaDescription: string
  metaKeywords: string[]
  ogTitle?: string
  ogDescription?: string
  ogImage?: string
  ogType?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: string
  canonicalUrl?: string
  structuredData?: Record<string, any>
  isActive: boolean
  createdAt?: Date
  updatedAt?: Date
  createdBy?: string
  updatedBy?: string
}

// Union type for all content types
export type CMSContent =
  | NewsContent
  | HotelContent
  | RestaurantContent
  | TravelServiceContent
  | LocalProductContent
  | EventContent
  | ImageGalleryContent

// Content creation/update request types
export type CreateContentRequest<T extends CMSContent> = Omit<T, '_id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'>
export type UpdateContentRequest<T extends CMSContent> = Partial<CreateContentRequest<T>> & { _id: string }

// API Response types
export interface CMSContentListResponse {
  content: CMSContent[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  filters?: {
    type?: string
    category?: string
    isActive?: boolean
    featured?: boolean
  }
}

export interface CMSContentResponse {
  content: CMSContent
}

// Search and filter types
export interface CMSContentFilters {
  type?: CMSContent['type']
  category?: string
  isActive?: boolean
  featured?: boolean
  location?: {
    province?: string
    district?: string
  }
  tags?: string[]
  search?: string
}

export interface CMSContentSort {
  field: 'title' | 'createdAt' | 'updatedAt' | 'order' | 'featured'
  direction: 'asc' | 'desc'
}

// Web Settings
export interface WebSettings {
  _id?: string
  // Brand & Identity
  siteName: string
  siteDescription: string
  siteTagline?: string
  logo?: string
  favicon?: string

  // Colors & Theme
  colors: {
    primary: string
    secondary: string
    accent?: string
    neutral?: string
  }

  // Hero Section
  hero: {
    enabled: boolean
    title: string
    description: string
    image?: string
    ctaText?: string
    ctaLink?: string
  }

  // Contact Information
  contact: {
    email?: string
    phone?: string
    address?: string
    socialMedia?: {
      facebook?: string
      instagram?: string
      twitter?: string
      line?: string
      youtube?: string
    }
  }

  // SEO & Meta
  seo: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
    ogImage?: string
  }

  // Features & Modules
  features: {
    enableHotels: boolean
    enableRestaurants: boolean
    enableTravelServices: boolean
    enableLocalProducts: boolean
    enableEvents: boolean
    enableNews: boolean
  }

  // Footer
  footer: {
    copyrightText?: string
    links?: Array<{
      label: string
      url: string
    }>
  }

  createdAt?: Date
  updatedAt?: Date
  createdBy?: string
  updatedBy?: string
}