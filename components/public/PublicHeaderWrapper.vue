<template>
  <ClientOnly>
    <PublicHeader :active-page="activePage" />
    <template #fallback>
      <header class="site-header bg-white shadow-sm sticky top-0 z-40">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div class="flex items-center justify-between">
            <NuxtLink to="/" class="text-2xl font-bold text-green-600">
              Local Spot
            </NuxtLink>
            <nav class="hidden lg:flex items-center space-x-6">
              <NuxtLink to="/" class="text-gray-600 hover:text-green-600 transition-colors">หน้าแรก</NuxtLink>
              <NuxtLink to="/news" class="text-gray-600 hover:text-green-600 transition-colors">ข่าวสาร</NuxtLink>
              <NuxtLink to="/hotels" class="text-gray-600 hover:text-green-600 transition-colors">โรงแรม</NuxtLink>
              <NuxtLink to="/restaurants" class="text-gray-600 hover:text-green-600 transition-colors">ร้านอาหาร</NuxtLink>
              <NuxtLink to="/events" class="text-gray-600 hover:text-green-600 transition-colors">กิจกรรม</NuxtLink>
              <NuxtLink to="/travel-services" class="text-gray-600 hover:text-green-600 transition-colors">บริการท่องเที่ยว</NuxtLink>
              <NuxtLink to="/local-products" class="text-gray-600 hover:text-green-600 transition-colors">สินค้าท้องถิ่น</NuxtLink>
            </nav>
            <div class="lg:hidden w-10 h-10"></div>
          </div>
        </div>
      </header>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
interface Props {
  activePage?: 'home' | 'news' | 'hotels' | 'restaurants' | 'events' | 'travel-services' | 'local-products'
}

defineProps<Props>()
</script>

<style scoped>
.site-header {
  transition: transform 0.3s ease;
}
</style>
