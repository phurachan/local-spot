import { TravelServiceContent } from '~/server/local-spot/models/CMS'
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
    if (!body.title || !body.description || !body.category || !body.serviceType) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [
          VALIDATION_DETAILS.FIELD_TITLE_REQUIRED,
          VALIDATION_DETAILS.FIELD_DESCRIPTION_REQUIRED,
          VALIDATION_DETAILS.FIELD_CATEGORY_REQUIRED,
          VALIDATION_DETAILS.FIELD_SERVICE_TYPE_REQUIRED
        ]
      })
    }

    // Validate location fields
    if (!body.location?.serviceArea || !Array.isArray(body.location.serviceArea) || body.location.serviceArea.length === 0) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.FIELD_SERVICE_AREA_REQUIRED]
      })
    }

    // Validate pricing if provided
    if (body.pricing && (!body.pricing.type || body.pricing.amount === undefined)) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.FIELD_PRICING_TYPE_REQUIRED, VALIDATION_DETAILS.FIELD_PRICING_AMOUNT_REQUIRED]
      })
    }

    // Remove _id if it exists in body (MongoDB will generate it automatically)
    const { _id, ...bodyWithoutId } = body

    // Create travel service data
    const travelServiceData = {
      ...bodyWithoutId,
      type: 'travel_service',
      createdBy: decoded.userId,
      updatedBy: decoded.userId,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Create travel service
    const travelService = new TravelServiceContent(travelServiceData)
    await travelService.save()

    return createSuccessResponse(travelService, { responseType: API_RESPONSE_CODES.CREATED })

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
      // Extract the duplicate field from error message
      const duplicateField = error.keyPattern ? Object.keys(error.keyPattern)[0] : 'unknown'
      const duplicateValue = error.keyValue ? error.keyValue[duplicateField] : 'unknown'

      console.error('Duplicate key error:', {
        field: duplicateField,
        value: duplicateValue,
        message: error.message
      })

      throw createPredefinedError(API_RESPONSE_CODES.ALREADY_EXISTS, {
        details: [`Duplicate value for field: ${duplicateField}`]
      })
    }

    // Log unexpected errors
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})