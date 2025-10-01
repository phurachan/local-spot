import { EventContent } from '~/server/local-spot/models/CMS'
import { createPredefinedError, createSuccessResponse, API_RESPONSE_CODES, VALIDATION_DETAILS } from '~/server/local-spot/utils/responseHandler'
import { connectMongoDB } from '~/server/local-spot/utils/mongodb'
import { verifyToken } from '~/server/local-spot/utils/jwt'
import { isValidObjectId } from 'mongoose'

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

    const id = getRouterParam(event, 'id')

    // Validate ObjectId
    if (!id || !isValidObjectId(id)) {
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_ID_FORMAT)
    }

    // Get request body
    const body = await readBody(event)

    // Check if event exists
    const existingEvent = await EventContent.findById(id)
    if (!existingEvent) {
      throw createPredefinedError(API_RESPONSE_CODES.NOT_FOUND)
    }

    // Validate required fields if provided
    if (body.title !== undefined && !body.title) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.FIELD_TITLE_REQUIRED]
      })
    }

    if (body.description !== undefined && !body.description) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.FIELD_DESCRIPTION_REQUIRED]
      })
    }

    if (body.category !== undefined && !body.category) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.FIELD_CATEGORY_REQUIRED]
      })
    }

    // Validate schedule information if provided
    if (body.schedule) {
      if (body.schedule.startDate !== undefined && !body.schedule.startDate) {
        throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
          details: [VALIDATION_DETAILS.FIELD_START_DATE_REQUIRED]
        })
      }

      if (body.schedule.endDate !== undefined && !body.schedule.endDate) {
        throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
          details: [VALIDATION_DETAILS.FIELD_END_DATE_REQUIRED]
        })
      }

      // Validate date logic if both dates are provided
      if (body.schedule.startDate && body.schedule.endDate) {
        const startDate = new Date(body.schedule.startDate)
        const endDate = new Date(body.schedule.endDate)

        if (startDate >= endDate) {
          throw createPredefinedError(API_RESPONSE_CODES.VALIDATION_ERROR, {
            details: [VALIDATION_DETAILS.END_DATE_BEFORE_START_DATE]
          })
        }

        // Convert to Date objects
        body.schedule.startDate = startDate
        body.schedule.endDate = endDate
      }
    }

    // Validate location information if provided
    if (body.location) {
      if (body.location.venue !== undefined && !body.location.venue) {
        throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
          details: [VALIDATION_DETAILS.FIELD_VENUE_REQUIRED]
        })
      }

      if (body.location.address !== undefined && !body.location.address) {
        throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
          details: [VALIDATION_DETAILS.FIELD_ADDRESS_REQUIRED]
        })
      }

      if (body.location.district !== undefined && !body.location.district) {
        throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
          details: [VALIDATION_DETAILS.FIELD_DISTRICT_REQUIRED]
        })
      }

      if (body.location.province !== undefined && !body.location.province) {
        throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
          details: [VALIDATION_DETAILS.FIELD_PROVINCE_REQUIRED]
        })
      }
    }

    // Validate organizer information if provided
    if (body.organizer?.name !== undefined && !body.organizer.name) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.FIELD_ORGANIZER_NAME_REQUIRED]
      })
    }

    // Update event
    const updateData = {
      ...body,
      updatedBy: decoded.userId,
      updatedAt: new Date()
    }

    // Don't allow changing the type
    delete updateData.type

    const updatedEvent = await EventContent.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean()

    return createSuccessResponse(updatedEvent, { responseType: API_RESPONSE_CODES.UPDATED })

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