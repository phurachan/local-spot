import type { BaseState, BaseRequestQuery } from './base'
import type { EventContent } from '~/composables/data_models/cms'

export interface EventsState extends BaseState<EventContent, EventContent> {}

export interface EventListRequest extends BaseRequestQuery {
  filter?: {
    category?: 'festival' | 'market' | 'cultural' | 'sports' | 'workshop' | 'seasonal'
    province?: string
    startDate?: string
    endDate?: string
    isActive?: boolean
    featured?: boolean
  }
}

export interface EventCreateRequest extends Omit<EventContent, '_id' | 'type' | 'createdAt' | 'updatedAt' | 'createdBy' | 'updatedBy'> {}

export interface EventUpdateRequest extends Partial<EventCreateRequest> {
  _id: string
}

export interface EventDeleteRequest {
  _id: string
}