import { WebSettings } from '~/server/models/CMS'
import { createPredefinedError, createSuccessResponse, API_RESPONSE_CODES } from '~/server/utils/responseHandler'
import { connectMongoDB } from '~/server/utils/mongodb'

export default defineEventHandler(async (event) => {
  try {
    await connectMongoDB()

    // Get settings (should only be one document)
    let settings = await WebSettings.findOne().lean()

    // If no settings exist, create default settings
    if (!settings) {
      settings = await WebSettings.create({
        siteName: 'Local Spot',
        siteDescription: 'แพลตฟอร์มท่องเที่ยวท้องถิ่น',
        colors: {
          primary: '#10b981',
          secondary: '#0d9488'
        },
        hero: {
          enabled: true,
          title: 'ค้นพบสถานที่ท่องเที่ยวท้องถิ่น',
          description: 'สำรวจโรงแรม ร้านอาหาร และกิจกรรมท้องถิ่นที่น่าสนใจ'
        },
        features: {
          enableHotels: true,
          enableRestaurants: true,
          enableTravelServices: true,
          enableLocalProducts: true,
          enableEvents: true,
          enableNews: true
        }
      })
    }

    return createSuccessResponse(settings, {
      responseType: API_RESPONSE_CODES.RETRIEVED
    })

  } catch (error: any) {
    // If it's already a createError, throw it as is
    if (error.statusCode) {
      throw error
    }

    // Log unexpected errors
    console.error('Get settings error:', error)
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})
