import { useWebSettingsStore } from '~/stores/webSettings'

export function usePublicSettings() {
  const settingsStore = useWebSettingsStore()

  // Initialize settings on first use
  onMounted(async () => {
    if (!settingsStore.settings) {
      try {
        await settingsStore.fetchSettings()
      } catch (error) {
        console.error('Failed to load settings:', error)
      }
    }
  })

  // Computed properties for easy access
  const siteName = computed(() => settingsStore.siteName)
  const siteDescription = computed(() => settingsStore.siteDescription)
  const siteLogo = computed(() => settingsStore.settings?.logo)
  const primaryColor = computed(() => settingsStore.primaryColor)
  const secondaryColor = computed(() => settingsStore.secondaryColor)

  const heroSettings = computed(() => settingsStore.settings?.hero)
  const contactInfo = computed(() => settingsStore.settings?.contact)
  const socialMedia = computed(() => settingsStore.settings?.contact?.socialMedia)
  const footerSettings = computed(() => settingsStore.settings?.footer)
  const enabledFeatures = computed(() => settingsStore.enabledFeatures)

  // Apply theme colors to CSS variables
  watch([primaryColor, secondaryColor], ([primary, secondary]) => {
    if (typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--primary-color', primary)
      document.documentElement.style.setProperty('--secondary-color', secondary)
    }
  }, { immediate: true })

  return {
    // Store
    settingsStore,

    // Settings data
    siteName,
    siteDescription,
    siteLogo,
    primaryColor,
    secondaryColor,
    heroSettings,
    contactInfo,
    socialMedia,
    footerSettings,
    enabledFeatures,

    // Raw settings object
    settings: computed(() => settingsStore.settings)
  }
}
