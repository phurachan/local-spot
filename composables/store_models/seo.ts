import type { BaseState, BaseRequestQuery } from './base'
import type { SEOMetaContent } from '~/composables/data_models/cms'

export interface SEOState extends BaseState<SEOMetaContent, SEOMetaContent> {}

export interface SEOListRequest extends BaseRequestQuery {
  filter?: {
    isActive?: boolean
    pageUrl?: string
  }
}

export interface SEOCreateRequest extends Omit<SEOMetaContent, '_id' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'> {}

export interface SEOUpdateRequest extends Partial<SEOCreateRequest> {
  _id: string
}

export interface SEODeleteRequest {
  _id: string
}