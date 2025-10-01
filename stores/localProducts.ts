import { defineStore } from 'pinia'
import { API_ENDPOINTS } from '~/composables/constants/api'
import type { BaseRequestData } from '~/composables/store_models/base'
import { initState, loadingState, successState, errorState } from '~/composables/store_models/base'
import type {
  LocalProductCreateRequest,
  LocalProductDeleteRequest,
  LocalProductListRequest,
  LocalProductsState,
  LocalProductUpdateRequest
} from '~/composables/store_models/localProducts'
import { useHttpClient } from '~/composables/utilities/useHttpClient'
import { BaseResponseError } from '~/composables/utility_models/http'

export const useLocalProductsStore = defineStore('localProducts', {
  state: (): LocalProductsState => ({
    ...initState
  }),

  getters: {
    getLocalProductById: (state) => (id: string) => state.list?.find((product: any) => product._id === id),
    totalLocalProducts: (state) => state.pagination?.total ?? 0
  },

  actions: {
    async fetchLocalProducts(requestData: BaseRequestData<LocalProductListRequest> = {}) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(
          API_ENDPOINTS.CMS.LOCAL_PRODUCTS.LIST,
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

    async fetchLocalProduct(requestData: BaseRequestData<{ _id: string }>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(
          API_ENDPOINTS.CMS.LOCAL_PRODUCTS.SHOW(requestData.body!._id)
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

    async createLocalProduct(requestData: BaseRequestData<LocalProductCreateRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.post(
          API_ENDPOINTS.CMS.LOCAL_PRODUCTS.CREATE,
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

    async updateLocalProduct(requestData: BaseRequestData<LocalProductUpdateRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.put(
          API_ENDPOINTS.CMS.LOCAL_PRODUCTS.UPDATE(requestData.body!._id),
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

    async deleteLocalProduct(requestData: BaseRequestData<LocalProductDeleteRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.delete(
          API_ENDPOINTS.CMS.LOCAL_PRODUCTS.DELETE(requestData.body!._id)
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