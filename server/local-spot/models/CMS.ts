import mongoose from 'mongoose'

// Base Content Schema
const baseContentSchema = {
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  images: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  },
  tags: [{
    type: String,
    trim: true
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}

// Location Schema (reusable)
const locationSchema = {
  address: {
    type: String,
    required: true
  },
  district: {
    type: String,
    required: true
  },
  province: {
    type: String,
    required: true
  },
  coordinates: {
    lat: Number,
    lng: Number
  }
}

// Contact Info Schema (reusable)
const contactInfoSchema = {
  phone: [String],
  email: String,
  website: String,
  lineOA: String
}

// Hotel Content Schema
const hotelContentSchema = new mongoose.Schema({
  ...baseContentSchema,
  type: {
    type: String,
    default: 'hotel',
    immutable: true
  },
  category: {
    type: String,
    enum: ['hotel', 'resort', 'hostel', 'guesthouse', 'villa'],
    required: true
  },
  location: locationSchema,
  contactInfo: contactInfoSchema,
  amenities: [String],
  roomTypes: [{
    name: {
      type: String,
      required: true
    },
    description: String,
    maxGuests: {
      type: Number,
      min: 1
    },
    priceRange: {
      min: Number,
      max: Number
    },
    images: [String]
  }],
  checkInOut: {
    checkIn: String,
    checkOut: String
  },
  policies: [String],
  nearbyAttractions: [String]
})

// Restaurant Content Schema
const restaurantContentSchema = new mongoose.Schema({
  ...baseContentSchema,
  type: {
    type: String,
    default: 'restaurant',
    immutable: true
  },
  category: {
    type: String,
    enum: ['restaurant', 'cafe', 'street_food', 'local_cuisine', 'international'],
    required: true
  },
  location: locationSchema,
  contactInfo: contactInfoSchema,
  cuisine: [String],
  priceRange: {
    type: String,
    enum: ['budget', 'mid_range', 'fine_dining']
  },
  operatingHours: {
    monday: {
      open: String,
      close: String,
      closed: Boolean
    },
    tuesday: {
      open: String,
      close: String,
      closed: Boolean
    },
    wednesday: {
      open: String,
      close: String,
      closed: Boolean
    },
    thursday: {
      open: String,
      close: String,
      closed: Boolean
    },
    friday: {
      open: String,
      close: String,
      closed: Boolean
    },
    saturday: {
      open: String,
      close: String,
      closed: Boolean
    },
    sunday: {
      open: String,
      close: String,
      closed: Boolean
    }
  },
  specialties: [String],
  dietaryOptions: [String],
  delivery: {
    available: {
      type: Boolean,
      default: false
    },
    platforms: [String]
  }
})

// Travel Service Content Schema
const travelServiceContentSchema = new mongoose.Schema({
  ...baseContentSchema,
  type: {
    type: String,
    default: 'travel_service',
    immutable: true
  },
  category: {
    type: String,
    enum: ['transport', 'tour', 'guide', 'rental', 'activity'],
    required: true
  },
  serviceType: {
    type: String,
    required: true
  },
  location: {
    serviceArea: [String],
    meetingPoint: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  contactInfo: contactInfoSchema,
  pricing: {
    type: {
      type: String,
      enum: ['per_person', 'per_group', 'per_hour', 'per_day']
    },
    amount: Number,
    currency: {
      type: String,
      default: 'THB'
    },
    includes: [String],
    excludes: [String]
  },
  duration: {
    min: Number,
    max: Number,
    unit: {
      type: String,
      enum: ['hours', 'days']
    }
  },
  capacity: {
    min: Number,
    max: Number
  },
  requirements: [String],
  availability: [String]
})

// Local Product Content Schema
const localProductContentSchema = new mongoose.Schema({
  ...baseContentSchema,
  type: {
    type: String,
    default: 'local_product',
    immutable: true
  },
  category: {
    type: String,
    enum: ['handicraft', 'food_product', 'souvenir', 'textile', 'art'],
    required: true
  },
  vendor: {
    name: {
      type: String,
      required: true
    },
    description: String,
    location: String,
    contactInfo: contactInfoSchema
  },
  product: {
    materials: [String],
    sizes: [String],
    colors: [String],
    weight: Number,
    dimensions: String
  },
  pricing: {
    price: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'THB'
    },
    discounts: [{
      quantity: Number,
      discountPercent: Number
    }]
  },
  availability: {
    inStock: {
      type: Boolean,
      default: true
    },
    stockQuantity: Number,
    seasonality: String
  },
  shipping: {
    available: {
      type: Boolean,
      default: false
    },
    areas: [String],
    cost: Number
  }
})

// Event Content Schema
const eventContentSchema = new mongoose.Schema({
  ...baseContentSchema,
  type: {
    type: String,
    default: 'event',
    immutable: true
  },
  category: {
    type: String,
    enum: ['festival', 'market', 'cultural', 'sports', 'workshop', 'seasonal'],
    required: true
  },
  schedule: {
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    times: [{
      start: String,
      end: String
    }],
    recurring: {
      pattern: {
        type: String,
        enum: ['daily', 'weekly', 'monthly', 'yearly']
      },
      interval: Number
    }
  },
  location: {
    venue: {
      type: String,
      required: true
    },
    ...locationSchema
  },
  organizer: {
    name: {
      type: String,
      required: true
    },
    contactInfo: contactInfoSchema
  },
  ticketing: {
    required: {
      type: Boolean,
      default: false
    },
    price: Number,
    currency: {
      type: String,
      default: 'THB'
    },
    bookingUrl: String,
    freeEntry: Boolean
  },
  capacity: Number,
  targetAudience: [String],
  activities: [String]
})

// Add indexes for better performance
hotelContentSchema.index({ category: 1, isActive: 1 })
hotelContentSchema.index({ featured: -1, order: 1 })
hotelContentSchema.index({ 'location.province': 1, 'location.district': 1 })

restaurantContentSchema.index({ category: 1, isActive: 1 })
restaurantContentSchema.index({ cuisine: 1 })
restaurantContentSchema.index({ 'location.province': 1, 'location.district': 1 })

travelServiceContentSchema.index({ category: 1, isActive: 1 })
travelServiceContentSchema.index({ 'location.serviceArea': 1 })

localProductContentSchema.index({ category: 1, isActive: 1 })
localProductContentSchema.index({ 'vendor.location': 1 })

eventContentSchema.index({ 'schedule.startDate': 1 })
eventContentSchema.index({ 'location.province': 1, 'location.district': 1 })
eventContentSchema.index({ category: 1, isActive: 1 })

// Pre-save middleware to update the updatedAt field
const updateTimestamp = function(this: any, next: any) {
  this.updatedAt = new Date()
  next()
}

hotelContentSchema.pre('save', updateTimestamp)
restaurantContentSchema.pre('save', updateTimestamp)
travelServiceContentSchema.pre('save', updateTimestamp)
localProductContentSchema.pre('save', updateTimestamp)
eventContentSchema.pre('save', updateTimestamp)

// Image Gallery Schema
const imageGalleryContentSchema = new mongoose.Schema({
  ...baseContentSchema,
  type: {
    type: String,
    default: 'image_gallery'
  },
  // Override title and description from baseContentSchema to make them optional for images
  title: {
    type: String,
    required: false,
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  category: {
    type: String,
    enum: ['hotel', 'restaurant', 'travel_service', 'local_product', 'event', 'general', 'attraction'],
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  thumbnailUrl: String,
  altText: {
    type: String,
    required: true
  },
  caption: String,
  photographer: String,
  location: {
    name: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  dimensions: {
    width: Number,
    height: Number
  },
  fileSize: Number,
  mimeType: String,
  relatedContent: {
    contentType: {
      type: String,
      enum: ['hotel', 'restaurant', 'travel_service', 'local_product', 'event']
    },
    contentId: {
      type: mongoose.Schema.Types.ObjectId
    }
  }
})

// SEO Meta Schema
const seoMetaSchema = new mongoose.Schema({
  pageUrl: {
    type: String,
    required: true,
    unique: true
  },
  pageTitle: {
    type: String,
    required: true
  },
  metaDescription: {
    type: String,
    required: true
  },
  metaKeywords: [{
    type: String
  }],
  ogTitle: String,
  ogDescription: String,
  ogImage: String,
  ogType: String,
  twitterCard: String,
  twitterTitle: String,
  twitterDescription: String,
  twitterImage: String,
  canonicalUrl: String,
  structuredData: {
    type: mongoose.Schema.Types.Mixed
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

// Create and export models
export const HotelContent = mongoose.models.HotelContent || mongoose.model('HotelContent', hotelContentSchema)
export const RestaurantContent = mongoose.models.RestaurantContent || mongoose.model('RestaurantContent', restaurantContentSchema)
export const TravelServiceContent = mongoose.models.TravelServiceContent || mongoose.model('TravelServiceContent', travelServiceContentSchema)
export const LocalProductContent = mongoose.models.LocalProductContent || mongoose.model('LocalProductContent', localProductContentSchema)
export const EventContent = mongoose.models.EventContent || mongoose.model('EventContent', eventContentSchema)
export const ImageGalleryContent = mongoose.models.ImageGalleryContent || mongoose.model('ImageGalleryContent', imageGalleryContentSchema)
export const SEOMetaContent = mongoose.models.SEOMetaContent || mongoose.model('SEOMetaContent', seoMetaSchema)

// Export all models as a map for dynamic access
export const CMSModels = {
  hotel: HotelContent,
  restaurant: RestaurantContent,
  travel_service: TravelServiceContent,
  local_product: LocalProductContent,
  event: EventContent,
  image_gallery: ImageGalleryContent,
  seo: SEOMetaContent
} as const