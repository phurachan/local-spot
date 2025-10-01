import type { BaseState, BaseRequestQuery } from './base'
import type { RestaurantContent } from '~/composables/data_models/cms'

export interface RestaurantsState extends BaseState<RestaurantContent, RestaurantContent> {}

export interface RestaurantListRequest extends BaseRequestQuery {
  filter?: {
    category?: 'restaurant' | 'cafe' | 'street_food' | 'local_cuisine' | 'international'
    province?: string
    isActive?: boolean
    featured?: boolean
  }
}

export interface RestaurantCreateRequest extends Omit<RestaurantContent, '_id' | 'type' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'> {}

export interface RestaurantUpdateRequest extends Partial<RestaurantCreateRequest> {
  _id: string
}

export interface RestaurantDeleteRequest {
  _id: string
}