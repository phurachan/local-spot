import { defineStore } from 'pinia'
import { API_ENDPOINTS } from '~/composables/constants/api'
import type { BaseRequestData } from '~/composables/store_models/base'
import { initState, loadingState, successState, errorState } from '~/composables/store_models/base'
import type { SocialEmbedState, SocialEmbedRequest, SocialEmbedResponse } from '~/composables/store_models/socialEmbed'
import { useHttpClient } from '~/composables/utilities/useHttpClient'
import { BaseResponseError } from '~/composables/utility_models/http'

export const useSocialEmbedStore = defineStore('socialEmbed', {
  state: (): SocialEmbedState => ({
    embedCache: {},
    isLoading: false,
    error: null,
    response: null
  }),

  getters: {
    getCachedEmbed: (state) => (url: string) => state.embedCache[url],
    hasCache: (state) => (url: string) => !!state.embedCache[url]
  },

  actions: {
    async fetchTikTokEmbed(requestData: BaseRequestData<SocialEmbedRequest>) {
      const url = requestData.body?.url || requestData.query?.url

      if (!url) {
        throw new Error('URL is required')
      }

      // Check cache first
      if (this.embedCache[url]) {
        return {
          success: true,
          data: {
            html: this.embedCache[url],
            platform: 'tiktok',
            url
          }
        }
      }

      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient({ useAuth: false })
        const response = await httpClient.get<SocialEmbedResponse>(
          API_ENDPOINTS.OEMBED.TIKTOK,
          { url }
        )

        this.$patch(successState(response))

        // Cache the embed HTML
        if (response?.data?.html) {
          this.embedCache[url] = response.data.html
        }

        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    clearCache(url?: string) {
      if (url) {
        delete this.embedCache[url]
      } else {
        this.embedCache = {}
      }
    }
  },

  persist: {
    key: 'social-embed-store',
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    paths: ['embedCache']
  }
})
