import { SEOMetaContent } from '~/server/local-spot/models/CMS'
import { createPredefinedError, createPaginatedResponse, API_RESPONSE_CODES } from '~/server/local-spot/utils/responseHandler'
import { connectMongoDB } from '~/server/local-spot/utils/mongodb'

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
        { pageUrl: { $regex: query.search, $options: 'i' } },
        { pageTitle: { $regex: query.search, $options: 'i' } },
        { metaDescription: { $regex: query.search, $options: 'i' } }
      ]
    }

    if (query.pageUrl) {
      filters.pageUrl = query.pageUrl
    }

    if (query.isActive !== undefined) {
      filters.isActive = query.isActive === 'true'
    }

    // Build sort
    const sort: any = {}
    if (query.sortField && query.sortDirection) {
      sort[query.sortField as string] = query.sortDirection === 'desc' ? -1 : 1
    } else {
      // Default sort
      sort.updatedAt = -1
    }

    // Execute queries
    const [seoList, total] = await Promise.all([
      SEOMetaContent.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      SEOMetaContent.countDocuments(filters)
    ])

    const totalPages = Math.ceil(total / limit)

    return createPaginatedResponse(
      seoList,
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
            pageUrl: query.pageUrl,
            isActive: query.isActive
          }
        }
      }
    )

  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    if (error.name === API_RESPONSE_CODES.VALIDATION_ERROR_EXCEPTION_NAME) {
      const fieldErrors = Object.keys(error.errors)
      throw createPredefinedError(API_RESPONSE_CODES.VALIDATION_ERROR, {
        details: fieldErrors
      })
    }

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})