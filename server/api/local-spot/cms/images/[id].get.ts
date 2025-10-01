import { ImageGalleryContent } from '~/server/local-spot/models/CMS'
import { createPredefinedError, createSuccessResponse, API_RESPONSE_CODES } from '~/server/local-spot/utils/responseHandler'
import { connectMongoDB } from '~/server/local-spot/utils/mongodb'

export default defineEventHandler(async (event) => {
  try {
    await connectMongoDB()

    const id = getRouterParam(event, 'id')

    const image = await ImageGalleryContent.findById(id).lean()

    if (!image) {
      throw createPredefinedError(API_RESPONSE_CODES.NOT_FOUND)
    }

    return createSuccessResponse(
      image,
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