import { defineStore } from 'pinia'
import { API_ENDPOINTS } from '~/composables/constants/api'
import type { BaseRequestData } from '~/composables/store_models/base'
import { initState, loadingState, successState, errorState } from '~/composables/store_models/base'
import type {
  ImageCreateRequest,
  ImageDeleteRequest,
  ImageListRequest,
  ImagesState,
  ImageUpdateRequest,
  ImageUploadRequest
} from '~/composables/store_models/images'
import { useHttpClient } from '~/composables/utilities/useHttpClient'
import { BaseResponseError } from '~/composables/utility_models/http'

export const useImagesStore = defineStore('images', {
  state: (): ImagesState => ({
    ...initState
  }),

  getters: {
    getImageById: (state) => (id: string) => state.list?.find((image: any) => image._id === id),
    totalImages: (state) => state.pagination?.total ?? 0
  },

  actions: {
    async fetchImages(requestData: BaseRequestData<ImageListRequest> = {}) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(
          API_ENDPOINTS.CMS.IMAGES.LIST,
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

    async fetchImage(requestData: BaseRequestData<{ _id: string }>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(
          API_ENDPOINTS.CMS.IMAGES.SHOW(requestData.body!._id)
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

    async createImage(requestData: BaseRequestData<ImageCreateRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.post(
          API_ENDPOINTS.CMS.IMAGES.CREATE,
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

    async updateImage(requestData: BaseRequestData<ImageUpdateRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.put(
          API_ENDPOINTS.CMS.IMAGES.UPDATE(requestData.body!._id),
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

    async deleteImage(requestData: BaseRequestData<ImageDeleteRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.delete(
          API_ENDPOINTS.CMS.IMAGES.DELETE(requestData.body!._id)
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

    async uploadImage(requestData: BaseRequestData<ImageUploadRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()

        // Create FormData for file upload
        const formData = new FormData()
        formData.append('file', requestData.body!.file)
        if (requestData.body!.category) formData.append('category', requestData.body!.category)
        if (requestData.body!.altText) formData.append('altText', requestData.body!.altText)
        if (requestData.body!.caption) formData.append('caption', requestData.body!.caption)

        const response = await httpClient.post(
          API_ENDPOINTS.CMS.IMAGES.UPLOAD,
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
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