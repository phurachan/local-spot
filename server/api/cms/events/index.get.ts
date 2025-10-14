import { EventContent } from '~/server/models/CMS'
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
        { 'location.venue': { $regex: query.search, $options: 'i' } },
        { 'organizer.name': { $regex: query.search, $options: 'i' } }
      ]
    }

    if (query.category) {
      filters.category = query.category
    }

    if (query.province) {
      filters['location.province'] = query.province
    }

    if (query.district) {
      filters['location.district'] = query.district
    }

    if (query.venue) {
      filters['location.venue'] = { $regex: query.venue, $options: 'i' }
    }

    if (query.organizer) {
      filters['organizer.name'] = { $regex: query.organizer, $options: 'i' }
    }

    if (query.isActive !== undefined) {
      filters.isActive = query.isActive === 'true'
    }

    if (query.featured !== undefined) {
      filters.featured = query.featured === 'true'
    }

    if (query.freeEntry !== undefined) {
      filters['ticketing.freeEntry'] = query.freeEntry === 'true'
    }

    if (query.tags) {
      const tags = Array.isArray(query.tags) ? query.tags : [query.tags]
      filters.tags = { $in: tags }
    }

    // Date filtering
    if (query.startDate || query.endDate) {
      filters['schedule.startDate'] = {}
      if (query.startDate) {
        filters['schedule.startDate'].$gte = new Date(query.startDate as string)
      }
      if (query.endDate) {
        filters['schedule.startDate'].$lte = new Date(query.endDate as string)
      }
    }

    // Current and upcoming events
    if (query.upcoming === 'true') {
      filters['schedule.endDate'] = { $gte: new Date() }
    }

    // Build sort
    const sort: any = {}
    if (query.sortField && query.sortDirection) {
      sort[query.sortField as string] = query.sortDirection === 'desc' ? -1 : 1
    } else {
      // Default sort - upcoming events first
      sort['schedule.startDate'] = 1
      sort.featured = -1
      sort.order = 1
    }

    // Execute queries
    const [events, total] = await Promise.all([
      EventContent.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      EventContent.countDocuments(filters)
    ])

    const totalPages = Math.ceil(total / limit)

    return createPaginatedResponse(
      events,
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
            province: query.province,
            district: query.district,
            venue: query.venue,
            organizer: query.organizer,
            isActive: query.isActive,
            featured: query.featured,
            freeEntry: query.freeEntry,
            upcoming: query.upcoming,
            startDate: query.startDate,
            endDate: query.endDate,
            tags: query.tags
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