import { EventContent } from '~/server/local-spot/models/CMS'
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

    // Validate schedule information
    if (!body.schedule?.startDate || !body.schedule?.endDate) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.FIELD_START_DATE_REQUIRED, VALIDATION_DETAILS.FIELD_END_DATE_REQUIRED]
      })
    }

    // Validate location information
    if (!body.location?.venue || !body.location?.address || !body.location?.district || !body.location?.province) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [
          VALIDATION_DETAILS.FIELD_VENUE_REQUIRED,
          VALIDATION_DETAILS.FIELD_ADDRESS_REQUIRED,
          VALIDATION_DETAILS.FIELD_DISTRICT_REQUIRED,
          VALIDATION_DETAILS.FIELD_PROVINCE_REQUIRED
        ]
      })
    }

    // Validate organizer information
    if (!body.organizer?.name) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.FIELD_ORGANIZER_NAME_REQUIRED]
      })
    }

    // Validate date logic
    const startDate = new Date(body.schedule.startDate)
    const endDate = new Date(body.schedule.endDate)

    if (startDate >= endDate) {
      throw createPredefinedError(API_RESPONSE_CODES.VALIDATION_ERROR, {
        details: [VALIDATION_DETAILS.END_DATE_BEFORE_START_DATE]
      })
    }

    // Create event data
    const eventData = {
      ...body,
      type: 'event',
      schedule: {
        ...body.schedule,
        startDate: startDate,
        endDate: endDate
      },
      createdBy: decoded.userId,
      updatedBy: decoded.userId,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    // Create event
    const eventDoc = new EventContent(eventData)
    await eventDoc.save()

    return createSuccessResponse(eventDoc, { responseType: API_RESPONSE_CODES.CREATED })

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