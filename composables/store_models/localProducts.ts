import type { BaseState, BaseRequestQuery } from './base'
import type { LocalProductContent } from '~/composables/data_models/cms'

export interface LocalProductsState extends BaseState<LocalProductContent, LocalProductContent> {}

export interface LocalProductListRequest extends BaseRequestQuery {
  filter?: {
    category?: 'handicraft' | 'food_product' | 'souvenir' | 'textile' | 'art'
    isActive?: boolean
    featured?: boolean
    inStock?: boolean
  }
}

export interface LocalProductCreateRequest extends Omit<LocalProductContent, '_id' | 'type' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'> {}

export interface LocalProductUpdateRequest extends Partial<LocalProductCreateRequest> {
  _id: string
}

export interface LocalProductDeleteRequest {
  _id: string
}