import { LocalProductContent } from '~/server/models/CMS'
import { createPredefinedError, createSuccessResponse, API_RESPONSE_CODES, VALIDATION_DETAILS } from '~/server/utils/responseHandler'
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

    // Get request body
    const body = await readBody(event)

    // Check if local product exists
    const existingLocalProduct = await LocalProductContent.findById(id)
    if (!existingLocalProduct) {
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

    // Validate vendor information if provided
    if (body.vendor?.name !== undefined && !body.vendor.name) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.FIELD_VENDOR_NAME_REQUIRED]
      })
    }

    // Validate pricing information if provided
    if (body.pricing?.price !== undefined && (body.pricing.price === null || body.pricing.price < 0)) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        details: [VALIDATION_DETAILS.FIELD_PRICING_PRICE_REQUIRED]
      })
    }

    // Update local product
    const updateData = {
      ...body,
      updatedBy: decoded.userId,
      updatedAt: new Date()
    }

    // Don't allow changing the type
    delete updateData.type

    const updatedLocalProduct = await LocalProductContent.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean()

    return createSuccessResponse(updatedLocalProduct, { responseType: API_RESPONSE_CODES.UPDATED })

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