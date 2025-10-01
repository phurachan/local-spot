import type { BaseState, BaseRequestQuery } from './base'
import type { HotelContent } from '~/composables/data_models/cms'

export interface HotelsState extends BaseState<HotelContent, HotelContent> {}

export interface HotelListRequest extends BaseRequestQuery {
  filter?: {
    category?: 'hotel' | 'resort' | 'hostel' | 'guesthouse' | 'villa'
    province?: string
    isActive?: boolean
    featured?: boolean
  }
}

export interface HotelCreateRequest extends Omit<HotelContent, '_id' | 'type' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'> {}

export interface HotelUpdateRequest extends Partial<HotelCreateRequest> {
  _id: string
}

export interface HotelDeleteRequest {
  _id: string
}