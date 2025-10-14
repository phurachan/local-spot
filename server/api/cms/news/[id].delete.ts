import { NewsContent } from '~/server/models/CMS'
import { createPredefinedError, createSuccessResponse, API_RESPONSE_CODES } from '~/server/utils/responseHandler'
import { connectMongoDB } from '~/server/utils/mongodb'

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

    const deletedNews = await NewsContent.findByIdAndDelete(id).lean()

    if (!deletedNews) {
      throw createPredefinedError(API_RESPONSE_CODES.RESOURCE_NOT_FOUND, {
        details: ['News article not found']
      })
    }

    return createSuccessResponse(
      { _id: id, deleted: true },
      {
        responseType: API_RESPONSE_CODES.DELETED
      }
    )

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
    console.error('Delete news error:', error)
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})
