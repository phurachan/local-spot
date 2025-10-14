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

    const body = await readBody(event)

    // Remove fields that shouldn't be updated directly
    const { _id, createdAt, createdBy, type, ...updateData } = body

    // Update the news article
    const updatedNews = await NewsContent.findByIdAndUpdate(
      id,
      {
        ...updateData,
        updatedAt: new Date()
      },
      {
        new: true,
        runValidators: true
      }
    ).lean()

    if (!updatedNews) {
      throw createPredefinedError(API_RESPONSE_CODES.RESOURCE_NOT_FOUND, {
        details: ['News article not found']
      })
    }

    return createSuccessResponse(updatedNews, {
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

    // Handle invalid ObjectId
    if (error.name === 'CastError') {
      throw createPredefinedError(API_RESPONSE_CODES.VALIDATION_ERROR, {
        details: ['Invalid news ID format']
      })
    }

    // Log unexpected errors
    console.error('Update news error:', error)
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})
