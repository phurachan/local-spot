import { put } from '@vercel/blob'
import sharp from 'sharp'
import { ImageGalleryContent } from '~/server/local-spot/models/CMS'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/local-spot/utils/responseHandler'
import { connectMongoDB } from '~/server/local-spot/utils/mongodb'

export default defineEventHandler(async (event) => {
  try {
    await connectMongoDB()

    const form = await readMultipartFormData(event)

    if (!form || form.length === 0) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        message: 'No file uploaded'
      })
    }

    const file = form.find(item => item.name === 'file')
    if (!file || !file.data) {
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_INPUT, {
        message: 'Invalid file'
      })
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
    if (!allowedTypes.includes(file.type || '')) {
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_INPUT, {
        message: 'Invalid file type. Only JPG, PNG, WebP, and GIF are allowed'
      })
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (file.data.length > maxSize) {
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_INPUT, {
        message: 'File size exceeds 5MB limit'
      })
    }

    // สร้างชื่อไฟล์ unique
    const timestamp = Date.now()
    const originalName = file.filename || 'image.jpg'
    const ext = originalName.split('.').pop()
    const filename = `${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`

    // Get image metadata
    const metadata = await sharp(file.data).metadata()

    // Upload original image to Vercel Blob
    const { url: imageUrl } = await put(`images/${filename}`, file.data, {
      access: 'public',
      contentType: file.type || 'image/jpeg'
    })

    // Create and upload thumbnail
    const thumbnailBuffer = await sharp(file.data)
      .resize(400, 400, {
        fit: 'cover',
        position: 'center'
      })
      .toBuffer()

    const thumbnailFilename = `thumb-${filename}`
    const { url: thumbnailUrl } = await put(`images/${thumbnailFilename}`, thumbnailBuffer, {
      access: 'public',
      contentType: file.type || 'image/jpeg'
    })

    // Create image record in database
    const imageData = {
      title: form.find(item => item.name === 'title')?.data?.toString() || originalName,
      description: form.find(item => item.name === 'description')?.data?.toString() || '',
      category: form.find(item => item.name === 'category')?.data?.toString() || 'general',
      altText: form.find(item => item.name === 'altText')?.data?.toString() || originalName,
      caption: form.find(item => item.name === 'caption')?.data?.toString(),
      imageUrl,
      thumbnailUrl,
      dimensions: {
        width: metadata.width || 0,
        height: metadata.height || 0
      },
      fileSize: file.data.length,
      mimeType: file.type,
      isActive: true,
      featured: false,
      order: 0,
      tags: [],
      type: 'image_gallery'
    }

    const newImage = new ImageGalleryContent(imageData)
    await newImage.save()

    return createSuccessResponse(newImage.toObject(), {
      responseType: API_RESPONSE_CODES.CREATED
    })

  } catch (error: any) {
    if (error.statusCode) {
      throw error
    }

    console.error('Upload error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    })

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR, {
      message: error.message || 'Failed to upload image'
    })
  }
})
