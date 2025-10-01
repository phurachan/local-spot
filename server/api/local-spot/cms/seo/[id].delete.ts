import { SEOMetaContent } from '~/server/local-spot/models/CMS'
import { createPredefinedError, createSuccessResponse, API_RESPONSE_CODES } from '~/server/local-spot/utils/responseHandler'
import { connectMongoDB } from '~/server/local-spot/utils/mongodb'

export default defineEventHandler(async (event) => {
  try {
    await connectMongoDB()

    const id = getRouterParam(event, 'id')

    const deletedSEO = await SEOMetaContent.findByIdAndDelete(id).lean()

    if (!deletedSEO) {
      throw createPredefinedError(API_RESPONSE_CODES.NOT_FOUND)
    }

    return createSuccessResponse(
      { message: 'SEO settings deleted successfully', deletedSEO },
      {
        responseType: API_RESPONSE_CODES.SUCCESS
      }
    )

  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})