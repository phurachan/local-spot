import { defineStore } from 'pinia'
import { API_ENDPOINTS } from '~/composables/constants/api'
import type { BaseRequestData } from '~/composables/store_models/base'
import { initState, loadingState, successState, errorState } from '~/composables/store_models/base'
import type { NewsContent } from '~/composables/data_models/cms'
import { useHttpClient } from '~/composables/utilities/useHttpClient'
import { BaseResponseError } from '~/composables/utility_models/http'

export interface NewsState {
  list: NewsContent[] | null
  current: NewsContent | null
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  } | null
  isLoading: boolean
  error: any
  response: any
}

export interface NewsListRequest {
  search?: string
  category?: string
  province?: string
  district?: string
  isActive?: boolean
  featured?: boolean
  tags?: string[]
  page?: number
  limit?: number
  sortField?: string
  sortDirection?: 'asc' | 'desc'
}

export interface NewsCreateRequest extends Partial<NewsContent> {}
export interface NewsUpdateRequest extends Partial<NewsContent> {
  _id: string
}
export interface NewsDeleteRequest {
  _id: string
}

export const useNewsStore = defineStore('news', {
  state: (): NewsState => ({
    ...initState
  }),

  getters: {
    getNewsById: (state) => (id: string) => state.list?.find((news: any) => news._id === id),
    totalNews: (state) => state.pagination?.total ?? 0
  },

  actions: {
    async fetchNews(requestData: BaseRequestData<NewsListRequest> = {}) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(
          API_ENDPOINTS.CMS.NEWS.LIST,
          requestData.query
        )

        this.$patch(successState(response))
        this.list = Array.isArray(response?.data) ? [...response.data] : []
        this.pagination = response?.pagination || null

        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchNewsArticle(requestData: BaseRequestData<{ _id: string }>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(
          API_ENDPOINTS.CMS.NEWS.SHOW(requestData.body!._id)
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

    async createNews(requestData: BaseRequestData<NewsCreateRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.post(
          API_ENDPOINTS.CMS.NEWS.CREATE,
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

    async updateNews(requestData: BaseRequestData<NewsUpdateRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.put(
          API_ENDPOINTS.CMS.NEWS.UPDATE(requestData.body!._id),
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

    async deleteNews(requestData: BaseRequestData<NewsDeleteRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.delete(
          API_ENDPOINTS.CMS.NEWS.DELETE(requestData.body!._id)
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
