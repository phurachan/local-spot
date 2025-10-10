import { watch } from 'vue'
import { useWebSettingsStore } from '~/stores/webSettings'

/**
 * Apply custom colors from Web Settings to DaisyUI theme
 * This composable updates CSS variables to override DaisyUI default colors
 */
export const useApplyWebColors = () => {
  const settingsStore = useWebSettingsStore()

  /**
   * Convert hex color to HSL
   */
  const hexToHSL = (hex: string): string => {
    // Remove # if present
    hex = hex.replace('#', '')

    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16) / 255
    const g = parseInt(hex.substring(2, 4), 16) / 255
    const b = parseInt(hex.substring(4, 6), 16) / 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0, s = 0, l = (max + min) / 2

    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
        case g: h = ((b - r) / d + 2) / 6; break
        case b: h = ((r - g) / d + 4) / 6; break
      }
    }

    h = Math.round(h * 360)
    s = Math.round(s * 100)
    l = Math.round(l * 100)

    return `${h} ${s}% ${l}%`
  }

  /**
   * Apply colors to CSS variables
   */
  const applyColors = () => {
    if (typeof window === 'undefined') return

    const colors = settingsStore.settings?.colors

    if (colors) {
      const root = document.documentElement

      // Apply primary color
      if (colors.primary) {
        const primaryHSL = hexToHSL(colors.primary)
        root.style.setProperty('--p', primaryHSL)

        // Calculate darker shade for primary-focus
        const [h, s, l] = primaryHSL.split(' ')
        const newL = Math.max(0, parseInt(l) - 10)
        root.style.setProperty('--pf', `${h} ${s} ${newL}%`)

        // Calculate primary-content (contrasting text color)
        const lightness = parseInt(l)
        root.style.setProperty('--pc', lightness > 50 ? '0 0% 0%' : '0 0% 100%')
      }

      // Apply secondary color
      if (colors.secondary) {
        const secondaryHSL = hexToHSL(colors.secondary)
        root.style.setProperty('--s', secondaryHSL)

        // Calculate darker shade for secondary-focus
        const [h, s, l] = secondaryHSL.split(' ')
        const newL = Math.max(0, parseInt(l) - 10)
        root.style.setProperty('--sf', `${h} ${s} ${newL}%`)

        // Calculate secondary-content
        const lightness = parseInt(l)
        root.style.setProperty('--sc', lightness > 50 ? '0 0% 0%' : '0 0% 100%')
      }

      // Apply accent color if set
      if (colors.accent) {
        const accentHSL = hexToHSL(colors.accent)
        root.style.setProperty('--a', accentHSL)

        const [h, s, l] = accentHSL.split(' ')
        const newL = Math.max(0, parseInt(l) - 10)
        root.style.setProperty('--af', `${h} ${s} ${newL}%`)

        const lightness = parseInt(l)
        root.style.setProperty('--ac', lightness > 50 ? '0 0% 0%' : '0 0% 100%')
      }

      // Apply neutral color if set
      if (colors.neutral) {
        const neutralHSL = hexToHSL(colors.neutral)
        root.style.setProperty('--n', neutralHSL)

        const [h, s, l] = neutralHSL.split(' ')
        const newL = Math.max(0, parseInt(l) - 10)
        root.style.setProperty('--nf', `${h} ${s} ${newL}%`)

        const lightness = parseInt(l)
        root.style.setProperty('--nc', lightness > 50 ? '0 0% 0%' : '0 0% 100%')
      }
    }
  }

  /**
   * Initialize colors and watch for changes
   */
  const initColors = async () => {
    // Load settings if not already loaded
    if (!settingsStore.settings) {
      await settingsStore.fetchSettings()
    }

    // Apply initial colors
    applyColors()

    // Watch for settings changes
    watch(
      () => settingsStore.settings?.colors,
      () => {
        applyColors()
      },
      { deep: true }
    )
  }

  return {
    applyColors,
    initColors
  }
}
