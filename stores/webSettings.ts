import { defineStore } from 'pinia'
import { API_ENDPOINTS } from '~/composables/constants/api'
import type { WebSettings } from '~/composables/data_models/cms'
import { useHttpClient } from '~/composables/utilities/useHttpClient'

export const useWebSettingsStore = defineStore('webSettings', {
  state: () => ({
    settings: null as WebSettings | null,
    isLoading: false,
    error: null as string | null
  }),

  getters: {
    siteName: (state) => state.settings?.siteName || 'Local Spot',
    siteDescription: (state) => state.settings?.siteDescription || '',
    primaryColor: (state) => state.settings?.colors?.primary || '#10b981',
    secondaryColor: (state) => state.settings?.colors?.secondary || '#0d9488',
    heroEnabled: (state) => state.settings?.hero?.enabled ?? true,
    enabledFeatures: (state) => state.settings?.features || {}
  },

  actions: {
    async fetchSettings() {
      this.isLoading = true
      this.error = null

      try {
        const httpClient = useHttpClient({ useAuth: false })
        const response = await httpClient.get(API_ENDPOINTS.CMS.WEB_SETTINGS.GET)

        this.settings = response.data as WebSettings
        return this.settings
      } catch (error: any) {
        this.error = error.message || 'Failed to fetch settings'
        console.error('Error fetching settings:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async updateSettings(data: Partial<WebSettings>) {
      this.isLoading = true
      this.error = null

      try {
        const httpClient = useHttpClient()
        const response = await httpClient.put(API_ENDPOINTS.CMS.WEB_SETTINGS.UPDATE, data)

        this.settings = response.data as WebSettings
        useToast().success('บันทึกการตั้งค่าสำเร็จ')
        return this.settings
      } catch (error: any) {
        this.error = error.message || 'Failed to update settings'
        useToast().error('เกิดข้อผิดพลาดในการบันทึกการตั้งค่า')
        console.error('Error updating settings:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    // Initialize settings on app load
    async initSettings() {
      if (!this.settings) {
        await this.fetchSettings()
      }
    }
  },

  // Persist settings in localStorage
  persist: {
    key: 'web-settings',
    storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    paths: ['settings']
  }
})
