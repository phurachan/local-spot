<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    
    <!-- Global Loading Component -->
    <BaseLoading
      :visible="isLoadingActive"
      :message="loadingMessage"
      v-bind="loadingConfig"
    />

    <!-- Global Alert Component -->
    <BaseGlobalAlert />
  </div>
</template>

<script setup>
const { isActive: isLoadingActive, getMessage: loadingMessage, getConfig: loadingConfig } = useLoading()

// Apply custom colors from Web Settings
const { initColors } = useApplyWebColors()

// Initialize colors on mount
onMounted(async () => {
  await initColors()
})
</script>
