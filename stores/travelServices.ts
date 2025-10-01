import { defineStore } from 'pinia'
import { API_ENDPOINTS } from '~/composables/constants/api'
import type { BaseRequestData } from '~/composables/store_models/base'
import { initState, loadingState, successState, errorState } from '~/composables/store_models/base'
import type {
  TravelServiceCreateRequest,
  TravelServiceDeleteRequest,
  TravelServiceListRequest,
  TravelServicesState,
  TravelServiceUpdateRequest
} from '~/composables/store_models/travelServices'
import { useHttpClient } from '~/composables/utilities/useHttpClient'
import { BaseResponseError } from '~/composables/utility_models/http'

export const useTravelServicesStore = defineStore('travelServices', {
  state: (): TravelServicesState => ({
    ...initState
  }),

  getters: {
    getTravelServiceById: (state) => (id: string) => state.list?.find((service: any) => service._id === id),
    totalTravelServices: (state) => state.pagination?.total ?? 0
  },

  actions: {
    async fetchTravelServices(requestData: BaseRequestData<TravelServiceListRequest> = {}) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(
          API_ENDPOINTS.CMS.TRAVEL_SERVICES.LIST,
          requestData.query
        )

        this.$patch(successState(response))
        // API returns array directly in data, not nested in content
        this.list = Array.isArray(response?.data) ? [...response.data] : []
        // Extract pagination from response root level if exists
        this.pagination = response?.pagination || null

        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchTravelService(requestData: BaseRequestData<{ _id: string }>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(
          API_ENDPOINTS.CMS.TRAVEL_SERVICES.SHOW(requestData.body!._id)
        )

        this.$patch(successState(response))
        this.current = { ...(response?.data || {}) }

        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async createTravelService(requestData: BaseRequestData<TravelServiceCreateRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.post(
          API_ENDPOINTS.CMS.TRAVEL_SERVICES.CREATE,
          requestData.body
        )

        this.$patch(successState(response))
        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async updateTravelService(requestData: BaseRequestData<TravelServiceUpdateRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.put(
          API_ENDPOINTS.CMS.TRAVEL_SERVICES.UPDATE(requestData.body!._id),
          requestData.body
        )

        this.$patch(successState(response))
        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async deleteTravelService(requestData: BaseRequestData<TravelServiceDeleteRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.delete(
          API_ENDPOINTS.CMS.TRAVEL_SERVICES.DELETE(requestData.body!._id)
        )

        this.$patch(successState(response))
        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    }
  }
})