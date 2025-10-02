import { NewsContent } from '~/server/local-spot/models/CMS'
import { createPredefinedError, createSuccessResponse, API_RESPONSE_CODES } from '~/server/local-spot/utils/responseHandler'
import { connectMongoDB } from '~/server/local-spot/utils/mongodb'

export default defineEventHandler(async (event) => {
  try {
    await connectMongoDB()

    // Get ID from URL parameter
    const id = event.context.params?.id

    if (!id) {
      throw createPredefinedError(API_RESPONSE_CODES.VALIDATION_ERROR, {
        details: ['News ID is required']
      })
    }

    const news = await NewsContent.findById(id).lean()

    if (!news) {
      throw createPredefinedError(API_RESPONSE_CODES.RESOURCE_NOT_FOUND, {
        details: ['News article not found']
      })
    }

    // Increment view count
    await NewsContent.findByIdAndUpdate(id, { $inc: { viewCount: 1 } })

    return createSuccessResponse(news, {
      responseType: API_RESPONSE_CODES.RETRIEVED
    })

  } catch (error: any) {
    // If it's already a createError, throw it as is
    if (error.statusCode) {
      throw error
    }

    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      throw createPredefinedError(API_RESPONSE_CODES.VALIDATION_ERROR, {
        details: ['Invalid news ID format']
      })
    }

    // Log unexpected errors
    console.error('Get news error:', error)
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})
