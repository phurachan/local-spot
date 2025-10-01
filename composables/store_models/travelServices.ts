import type { BaseState, BaseRequestQuery } from './base'
import type { TravelServiceContent } from '~/composables/data_models/cms'

export interface TravelServicesState extends BaseState<TravelServiceContent, TravelServiceContent> {}

export interface TravelServiceListRequest extends BaseRequestQuery {
  filter?: {
    category?: 'transport' | 'tour' | 'guide' | 'rental' | 'activity'
    isActive?: boolean
    featured?: boolean
  }
}

export interface TravelServiceCreateRequest extends Omit<TravelServiceContent, '_id' | 'type' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'> {}

export interface TravelServiceUpdateRequest extends Partial<TravelServiceCreateRequest> {
  _id: string
}

export interface TravelServiceDeleteRequest {
  _id: string
}