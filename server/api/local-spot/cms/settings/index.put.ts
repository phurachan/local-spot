import { WebSettings } from '~/server/local-spot/models/CMS'
import { createPredefinedError, createSuccessResponse, API_RESPONSE_CODES } from '~/server/local-spot/utils/responseHandler'
import { connectMongoDB } from '~/server/local-spot/utils/mongodb'

export default defineEventHandler(async (event) => {
  try {
    await connectMongoDB()

    const body = await readBody(event)

    // Remove fields that shouldn't be updated directly
    const { _id, createdAt, createdBy, ...updateData } = body

    // Find existing settings
    let settings = await WebSettings.findOne()

    if (settings) {
      // Update existing settings
      settings = await WebSettings.findByIdAndUpdate(
        settings._id,
        {
          ...updateData,
          updatedAt: new Date()
        },
        {
          new: true,
          runValidators: true
        }
      ).lean()
    } else {
      // Create new settings if none exist
      settings = await WebSettings.create({
        ...updateData,
        updatedAt: new Date()
      })
    }

    return createSuccessResponse(settings, {
      responseType: API_RESPONSE_CODES.UPDATED
    })

  } catch (error: any) {
    // If it's already a createError, throw it as is
    if (error.statusCode) {
      throw error
    }

    // Handle validation errors
    if (error.name === API_RESPONSE_CODES.VALIDATION_ERROR_EXCEPTION_NAME) {
      const fieldErrors = Object.keys(error.errors || {}).map(field => {
        return `${field}: ${error.errors[field].message}`
      })
      throw createPredefinedError(API_RESPONSE_CODES.VALIDATION_ERROR, {
        details: fieldErrors
      })
    }

    // Log unexpected errors
    console.error('Update settings error:', error)
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})
