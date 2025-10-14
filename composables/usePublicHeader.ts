// Composable for public page header with settings
export function usePublicHeader() {
  const { siteName, enabledFeatures } = usePublicSettings()
  const { navbarHidden } = useStickyNavbar()

  return {
    siteName,
    enabledFeatures,
    navbarHidden
  }
}
