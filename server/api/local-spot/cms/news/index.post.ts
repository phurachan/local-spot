import { NewsContent } from '~/server/local-spot/models/CMS'
import { createPredefinedError, createSuccessResponse, API_RESPONSE_CODES } from '~/server/local-spot/utils/responseHandler'
import { connectMongoDB } from '~/server/local-spot/utils/mongodb'

export default defineEventHandler(async (event) => {
  try {
    await connectMongoDB()

    const body = await readBody(event)

    // Validate required fields
    if (!body.title || !body.description || !body.category || !body.content || !body.author?.name) {
      throw createPredefinedError(API_RESPONSE_CODES.VALIDATION_ERROR, {
        details: ['title, description, category, content, and author.name are required']
      })
    }

    // Create new news article
    const newsData = {
      ...body,
      type: 'news'
    }

    const newNews = new NewsContent(newsData)
    await newNews.save()

    return createSuccessResponse(newNews.toObject(), {
      responseType: API_RESPONSE_CODES.CREATED
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

    // Handle duplicate key errors
    if (error.code === 11000) {
      throw createPredefinedError(API_RESPONSE_CODES.DUPLICATE_RESOURCE, {
        details: ['A news article with this title may already exist']
      })
    }

    // Log unexpected errors
    console.error('Create news error:', error)
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})
