import { SEOMetaContent } from '~/server/local-spot/models/CMS'
import { createPredefinedError, createSuccessResponse, API_RESPONSE_CODES } from '~/server/local-spot/utils/responseHandler'
import { connectMongoDB } from '~/server/local-spot/utils/mongodb'

export default defineEventHandler(async (event) => {
  try {
    await connectMongoDB()

    const body = await readBody(event)

    // Check if SEO for this URL already exists
    const existingSEO = await SEOMetaContent.findOne({ pageUrl: body.pageUrl })
    if (existingSEO) {
      throw createPredefinedError(API_RESPONSE_CODES.ALREADY_EXISTS, {
        message: 'SEO settings for this URL already exist'
      })
    }

    // Create new SEO
    const newSEO = new SEOMetaContent(body)
    await newSEO.save()

    return createSuccessResponse(
      newSEO.toObject(),
      {
        responseType: API_RESPONSE_CODES.CREATED
      }
    )

  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    if (error.name === API_RESPONSE_CODES.VALIDATION_ERROR_EXCEPTION_NAME) {
      const fieldErrors = Object.keys(error.errors)
      throw createPredefinedError(API_RESPONSE_CODES.VALIDATION_ERROR, {
        details: fieldErrors
      })
    }

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})