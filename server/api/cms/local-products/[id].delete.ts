import { LocalProductContent } from '~/server/models/CMS'
import { createPredefinedError, createSuccessResponse, API_RESPONSE_CODES } from '~/server/utils/responseHandler'
import { connectMongoDB } from '~/server/utils/mongodb'
import { verifyToken } from '~/server/utils/jwt'
import { isValidObjectId } from 'mongoose'

export default defineEventHandler(async (event) => {
  try {
    await connectMongoDB()

    // Verify authentication
    const token = getCookie(event, 'token') || getHeader(event, 'authorization')?.replace('Bearer ', '')

    if (!token) {
      throw createPredefinedError(API_RESPONSE_CODES.AUTHENTICATION_REQUIRED)
    }

    let decoded
    try {
      decoded = verifyToken(token)
    } catch (error) {
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_OR_EXPIRED_TOKEN)
    }

    const id = getRouterParam(event, 'id')

    // Validate ObjectId
    if (!id || !isValidObjectId(id)) {
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_ID_FORMAT)
    }

    // Check if local product exists
    const existingLocalProduct = await LocalProductContent.findById(id)
    if (!existingLocalProduct) {
      throw createPredefinedError(API_RESPONSE_CODES.NOT_FOUND)
    }

    // Delete local product
    await LocalProductContent.findByIdAndDelete(id)

    return createSuccessResponse(
      { id, message: 'Local product deleted successfully' },
      { responseType: API_RESPONSE_CODES.DELETED }
    )

  } catch (error: any) {
    // If it's already a createError, throw it as is
    if (error.statusCode) {
      throw error
    }

    // Handle JWT errors
    if (error.message === API_RESPONSE_CODES.INVALID_OR_EXPIRED_TOKEN) {
      throw createPredefinedError(API_RESPONSE_CODES.TOKEN_EXPIRED)
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