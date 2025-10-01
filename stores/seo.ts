import { defineStore } from 'pinia'
import { API_ENDPOINTS } from '~/composables/constants/api'
import type { BaseRequestData } from '~/composables/store_models/base'
import { initState, loadingState, successState, errorState } from '~/composables/store_models/base'
import type {
  SEOCreateRequest,
  SEODeleteRequest,
  SEOListRequest,
  SEOState,
  SEOUpdateRequest
} from '~/composables/store_models/seo'
import { useHttpClient } from '~/composables/utilities/useHttpClient'
import { BaseResponseError } from '~/composables/utility_models/http'

export const useSEOStore = defineStore('seo', {
  state: (): SEOState => ({
    ...initState
  }),

  getters: {
    getSEOById: (state) => (id: string) => state.list?.find((seo: any) => seo._id === id),
    getSEOByUrl: (state) => (url: string) => state.list?.find((seo: any) => seo.pageUrl === url),
    totalSEO: (state) => state.pagination?.total ?? 0
  },

  actions: {
    async fetchSEOList(requestData: BaseRequestData<SEOListRequest> = {}) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(
          API_ENDPOINTS.CMS.SEO.LIST,
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

    async fetchSEO(requestData: BaseRequestData<{ _id: string }>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(
          API_ENDPOINTS.CMS.SEO.SHOW(requestData.body!._id)
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

    async fetchSEOByUrl(url: string) {
      try {
        this.$patch(loadingState({}))

        const httpClient = useHttpClient()
        const response = await httpClient.get(
          API_ENDPOINTS.CMS.SEO.BY_URL(url)
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

    async createSEO(requestData: BaseRequestData<SEOCreateRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.post(
          API_ENDPOINTS.CMS.SEO.CREATE,
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

    async updateSEO(requestData: BaseRequestData<SEOUpdateRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.put(
          API_ENDPOINTS.CMS.SEO.UPDATE(requestData.body!._id),
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

    async deleteSEO(requestData: BaseRequestData<SEODeleteRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.delete(
          API_ENDPOINTS.CMS.SEO.DELETE(requestData.body!._id)
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