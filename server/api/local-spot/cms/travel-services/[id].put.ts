import { TravelServiceContent } from '~/server/local-spot/models/CMS'
import { createPredefinedError, createSuccessResponse, API_RESPONSE_CODES, VALIDATION_DETAILS } from '~/server/local-spot/utils/responseHandler'
import { connectMongoDB } from '~/server/local-spot/utils/mongodb'
import { verifyToken } from '~/server/local-spot/utils/jwt'
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

    // Get request body
    const body = await readBody(event)

    // Check if travel service exists
    const existingTravelService = await TravelServiceContent.findById(id)
    if (!existingTravelService) {
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

    if (body.serviceType !== undefined && !body.serviceType) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.FIELD_SERVICE_TYPE_REQUIRED]
      })
    }

    // Validate location fields if provided
    if (body.location?.serviceArea !== undefined && (!Array.isArray(body.location.serviceArea) || body.location.serviceArea.length === 0)) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.FIELD_SERVICE_AREA_REQUIRED]
      })
    }

    // Validate pricing if provided
    if (body.pricing && (body.pricing.type !== undefined || body.pricing.amount !== undefined)) {
      if (!body.pricing.type || body.pricing.amount === undefined) {
        throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
          details: [VALIDATION_DETAILS.FIELD_PRICING_TYPE_REQUIRED, VALIDATION_DETAILS.FIELD_PRICING_AMOUNT_REQUIRED]
        })
      }
    }

    // Update travel service
    const updateData = {
      ...body,
      updatedBy: decoded.userId,
      updatedAt: new Date()
    }

    // Don't allow changing the type
    delete updateData.type

    const updatedTravelService = await TravelServiceContent.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean()

    return createSuccessResponse(updatedTravelService, { responseType: API_RESPONSE_CODES.UPDATED })

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