import { LocalProductContent } from '~/server/local-spot/models/CMS'
import { createPredefinedError, createSuccessResponse, API_RESPONSE_CODES, VALIDATION_DETAILS } from '~/server/local-spot/utils/responseHandler'
import { connectMongoDB } from '~/server/local-spot/utils/mongodb'
import { verifyToken } from '~/server/local-spot/utils/jwt'

export default defineEventHandler(async (event) => {
  try {
    await connectMongoDB()

    // Verify authentication
    const token = getCookie(event, 'auth-token') || getHeader(event, 'authorization')?.replace('Bearer ', '')

    if (!token) {
      throw createPredefinedError(API_RESPONSE_CODES.AUTHENTICATION_REQUIRED)
    }

    let decoded
    try {
      decoded = verifyToken(token)
    } catch (error) {
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_OR_EXPIRED_TOKEN)
    }

    // Get request body
    const body = await readBody(event)

    // Validate required fields
    if (!body.title || !body.description || !body.category) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [
          VALIDATION_DETAILS.FIELD_TITLE_REQUIRED,
          VALIDATION_DETAILS.FIELD_DESCRIPTION_REQUIRED,
          VALIDATION_DETAILS.FIELD_CATEGORY_REQUIRED
        ]
      })
    }

    // Validate vendor information
    if (!body.vendor?.name) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.FIELD_VENDOR_NAME_REQUIRED]
      })
    }

    // Validate pricing information
    if (!body.pricing?.price || body.pricing.price < 0) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.FIELD_PRICING_PRICE_REQUIRED]
      })
    }

    // Create local product data
    const localProductData = {
      ...body,
      type: 'local_product',
      createdBy: decoded.userId,
      updatedBy: decoded.userId,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Create local product
    const localProduct = new LocalProductContent(localProductData)
    await localProduct.save()

    return createSuccessResponse(localProduct, { responseType: API_RESPONSE_CODES.CREATED })

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

    // Handle duplicate key errors
    if (error.code === 11000) {
      throw createPredefinedError(API_RESPONSE_CODES.ALREADY_EXISTS)
    }

    // Log unexpected errors
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})