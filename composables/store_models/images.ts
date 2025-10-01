import type { BaseState, BaseRequestQuery } from './base'
import type { ImageGalleryContent } from '~/composables/data_models/cms'

export interface ImagesState extends BaseState<ImageGalleryContent, ImageGalleryContent> {}

export interface ImageListRequest extends BaseRequestQuery {
  filter?: {
    category?: 'hotel' | 'restaurant' | 'travel_service' | 'local_product' | 'event' | 'general' | 'attraction'
    isActive?: boolean
    featured?: boolean
    relatedContentType?: string
    relatedContentId?: string
  }
}

export interface ImageCreateRequest extends Omit<ImageGalleryContent, '_id' | 'type' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'> {}

export interface ImageUpdateRequest extends Partial<ImageCreateRequest> {
  _id: string
}

export interface ImageDeleteRequest {
  _id: string
}

export interface ImageUploadRequest {
  file: File
  category?: string
  altText?: string
  caption?: string
}