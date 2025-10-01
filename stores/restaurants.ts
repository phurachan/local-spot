import { defineStore } from 'pinia'
import { API_ENDPOINTS } from '~/composables/constants/api'
import type { BaseRequestData } from '~/composables/store_models/base'
import { initState, loadingState, successState, errorState } from '~/composables/store_models/base'
import type {
  RestaurantCreateRequest,
  RestaurantDeleteRequest,
  RestaurantListRequest,
  RestaurantsState,
  RestaurantUpdateRequest
} from '~/composables/store_models/restaurants'
import { useHttpClient } from '~/composables/utilities/useHttpClient'
import { BaseResponseError } from '~/composables/utility_models/http'

export const useRestaurantsStore = defineStore('restaurants', {
  state: (): RestaurantsState => ({
    ...initState
  }),

  getters: {
    getRestaurantById: (state) => (id: string) => state.list?.find((restaurant: any) => restaurant._id === id),
    totalRestaurants: (state) => state.pagination?.total ?? 0
  },

  actions: {
    async fetchRestaurants(requestData: BaseRequestData<RestaurantListRequest> = {}) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(
          API_ENDPOINTS.CMS.RESTAURANTS.LIST,
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

    async fetchRestaurant(requestData: BaseRequestData<{ _id: string }>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(
          API_ENDPOINTS.CMS.RESTAURANTS.SHOW(requestData.body!._id)
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

    async createRestaurant(requestData: BaseRequestData<RestaurantCreateRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.post(
          API_ENDPOINTS.CMS.RESTAURANTS.CREATE,
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

    async updateRestaurant(requestData: BaseRequestData<RestaurantUpdateRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.put(
          API_ENDPOINTS.CMS.RESTAURANTS.UPDATE(requestData.body!._id),
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

    async deleteRestaurant(requestData: BaseRequestData<RestaurantDeleteRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.delete(
          API_ENDPOINTS.CMS.RESTAURANTS.DELETE(requestData.body!._id)
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