import { TravelServiceContent } from '~/server/local-spot/models/CMS'
import { createPredefinedError, createPaginatedResponse, API_RESPONSE_CODES } from '~/server/local-spot/utils/responseHandler'
import { connectMongoDB } from '~/server/local-spot/utils/mongodb'
import type { CMSContentFilters } from '~/composables/data_models/cms'

export default defineEventHandler(async (event) => {
  try {
    await connectMongoDB()

    const query = getQuery(event)

    // Parse query parameters
    const page = parseInt(query.page as string) || 1
    const limit = parseInt(query.limit as string) || 10
    const skip = (page - 1) * limit

    // Build filters
    const filters: any = {}

    if (query.search) {
      filters.$or = [
        { title: { $regex: query.search, $options: 'i' } },
        { description: { $regex: query.search, $options: 'i' } },
        { serviceType: { $regex: query.search, $options: 'i' } }
      ]
    }

    if (query.category) {
      filters.category = query.category
    }

    if (query.serviceType) {
      filters.serviceType = query.serviceType
    }

    if (query.serviceArea) {
      filters['location.serviceArea'] = { $in: Array.isArray(query.serviceArea) ? query.serviceArea : [query.serviceArea] }
    }

    if (query.isActive !== undefined) {
      filters.isActive = query.isActive === 'true'
    }

    if (query.featured !== undefined) {
      filters.featured = query.featured === 'true'
    }

    if (query.tags) {
      const tags = Array.isArray(query.tags) ? query.tags : [query.tags]
      filters.tags = { $in: tags }
    }

    if (query.minPrice || query.maxPrice) {
      filters['pricing.amount'] = {}
      if (query.minPrice) {
        filters['pricing.amount'].$gte = parseFloat(query.minPrice as string)
      }
      if (query.maxPrice) {
        filters['pricing.amount'].$lte = parseFloat(query.maxPrice as string)
      }
    }

    // Build sort
    const sort: any = {}
    if (query.sortField && query.sortDirection) {
      sort[query.sortField as string] = query.sortDirection === 'desc' ? -1 : 1
    } else {
      // Default sort
      sort.featured = -1
      sort.order = 1
      sort.createdAt = -1
    }

    // Execute queries
    const [travelServices, total] = await Promise.all([
      TravelServiceContent.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      TravelServiceContent.countDocuments(filters)
    ])

    const totalPages = Math.ceil(total / limit)

    return createPaginatedResponse(
      travelServices,
      {
        page,
        limit,
        total,
        pages: totalPages
      },
      {
        responseType: API_RESPONSE_CODES.LIST_RETRIEVED,
        additionalData: {
          filters: {
            search: query.search,
            category: query.category,
            serviceType: query.serviceType,
            serviceArea: query.serviceArea,
            isActive: query.isActive,
            featured: query.featured,
            tags: query.tags,
            minPrice: query.minPrice,
            maxPrice: query.maxPrice
          }
        }
      }
    )

  } catch (error: any) {
    // If it's already a createError, throw it as is
    if (error.statusCode) {
      throw error
    }

    // Handle validation errors
    if (error.name === API_RESPONSE_CODES.VALIDATION_ERROR_EXCEPTION_NAME) {
      const fieldErrors = Object.keys(error.errors)
      throw createPredefinedError(API_RESPONSE_CODES.VALIDATION_ERROR, {
        details: fieldErrors
      })
    }

    // Log unexpected errors
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})