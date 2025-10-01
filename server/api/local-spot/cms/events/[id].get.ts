import { EventContent } from '~/server/local-spot/models/CMS'
import { createPredefinedError, createSuccessResponse, API_RESPONSE_CODES } from '~/server/local-spot/utils/responseHandler'
import { connectMongoDB } from '~/server/local-spot/utils/mongodb'
import { isValidObjectId } from 'mongoose'

export default defineEventHandler(async (event) => {
  try {
    await connectMongoDB()

    const id = getRouterParam(event, 'id')

    // Validate ObjectId
    if (!id || !isValidObjectId(id)) {
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_ID_FORMAT)
    }

    // Find event by ID
    const eventDoc = await EventContent.findById(id).lean()

    if (!eventDoc) {
      throw createPredefinedError(API_RESPONSE_CODES.NOT_FOUND)
    }

    return createSuccessResponse(eventDoc, { responseType: API_RESPONSE_CODES.RETRIEVED })

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