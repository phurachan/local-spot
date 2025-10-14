import { LocalProductContent } from '~/server/models/CMS'
import { createPredefinedError, createPaginatedResponse, API_RESPONSE_CODES } from '~/server/utils/responseHandler'
import { connectMongoDB } from '~/server/utils/mongodb'
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
        { 'vendor.name': { $regex: query.search, $options: 'i' } },
        { 'product.materials': { $regex: query.search, $options: 'i' } }
      ]
    }

    if (query.category) {
      filters.category = query.category
    }

    if (query.vendorLocation) {
      filters['vendor.location'] = { $regex: query.vendorLocation, $options: 'i' }
    }

    if (query.materials) {
      const materials = Array.isArray(query.materials) ? query.materials : [query.materials]
      filters['product.materials'] = { $in: materials }
    }

    if (query.isActive !== undefined) {
      filters.isActive = query.isActive === 'true'
    }

    if (query.featured !== undefined) {
      filters.featured = query.featured === 'true'
    }

    if (query.inStock !== undefined) {
      filters['availability.inStock'] = query.inStock === 'true'
    }

    if (query.tags) {
      const tags = Array.isArray(query.tags) ? query.tags : [query.tags]
      filters.tags = { $in: tags }
    }

    if (query.minPrice || query.maxPrice) {
      filters['pricing.price'] = {}
      if (query.minPrice) {
        filters['pricing.price'].$gte = parseFloat(query.minPrice as string)
      }
      if (query.maxPrice) {
        filters['pricing.price'].$lte = parseFloat(query.maxPrice as string)
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
    const [localProducts, total] = await Promise.all([
      LocalProductContent.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      LocalProductContent.countDocuments(filters)
    ])

    const totalPages = Math.ceil(total / limit)

    return createPaginatedResponse(
      localProducts,
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
            vendorLocation: query.vendorLocation,
            materials: query.materials,
            isActive: query.isActive,
            featured: query.featured,
            inStock: query.inStock,
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