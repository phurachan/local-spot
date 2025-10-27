<template>
  <header class="site-header bg-white shadow-sm sticky top-0 z-40 transition-transform duration-300" :class="{ 'nav-hidden': navbarHidden }">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="text-2xl font-bold text-green-600">
          {{ siteName }}
        </NuxtLink>

        <!-- Desktop Menu (hidden on mobile/tablet) -->
        <nav class="hidden lg:flex items-center space-x-6">
          <NuxtLink to="/" class="text-gray-600 hover:text-green-600 transition-colors" :class="{ 'text-green-600 font-semibold': activePage === 'home' }">
            หน้าแรก
          </NuxtLink>
          <NuxtLink to="/news" class="text-gray-600 hover:text-green-600 transition-colors" :class="{ 'text-green-600 font-semibold': activePage === 'news' }">
            ข่าวสาร
          </NuxtLink>
          <NuxtLink to="/hotels" class="text-gray-600 hover:text-green-600 transition-colors" :class="{ 'text-green-600 font-semibold': activePage === 'hotels' }">
            โรงแรม
          </NuxtLink>
          <NuxtLink to="/restaurants" class="text-gray-600 hover:text-green-600 transition-colors" :class="{ 'text-green-600 font-semibold': activePage === 'restaurants' }">
            ร้านอาหาร
          </NuxtLink>
          <NuxtLink to="/events" class="text-gray-600 hover:text-green-600 transition-colors" :class="{ 'text-green-600 font-semibold': activePage === 'events' }">
            กิจกรรม
          </NuxtLink>
          <NuxtLink to="/travel-services" class="text-gray-600 hover:text-green-600 transition-colors" :class="{ 'text-green-600 font-semibold': activePage === 'travel-services' }">
            บริการท่องเที่ยว
          </NuxtLink>
          <NuxtLink to="/local-products" class="text-gray-600 hover:text-green-600 transition-colors" :class="{ 'text-green-600 font-semibold': activePage === 'local-products' }">
            สินค้าท้องถิ่น
          </NuxtLink>
          <NuxtLink to="/contact" class="text-gray-600 hover:text-green-600 transition-colors" :class="{ 'text-green-600 font-semibold': activePage === 'contact' }">
            ติดต่อเรา
          </NuxtLink>
        </nav>

        <!-- Mobile Menu Button (visible on mobile/tablet) -->
        <button
          @click="toggleMobileMenu"
          class="lg:hidden text-gray-600 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          aria-label="Toggle menu"
        >
          <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
          </svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>

      <!-- Mobile Dropdown Menu -->
      <Transition name="mobile-menu">
        <nav v-if="mobileMenuOpen" class="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
          <div class="flex flex-col space-y-2">
            <NuxtLink to="/" @click="closeMobileMenu" class="py-2 px-4 text-gray-600 hover:bg-gray-100 hover:text-green-600 rounded-lg transition-colors" :class="{ 'text-green-600 font-semibold bg-green-50': activePage === 'home' }">
              หน้าแรก
            </NuxtLink>
            <NuxtLink to="/news" @click="closeMobileMenu" class="py-2 px-4 text-gray-600 hover:bg-gray-100 hover:text-green-600 rounded-lg transition-colors" :class="{ 'text-green-600 font-semibold bg-green-50': activePage === 'news' }">
              ข่าวสาร
            </NuxtLink>
            <NuxtLink to="/hotels" @click="closeMobileMenu" class="py-2 px-4 text-gray-600 hover:bg-gray-100 hover:text-green-600 rounded-lg transition-colors" :class="{ 'text-green-600 font-semibold bg-green-50': activePage === 'hotels' }">
              โรงแรม
            </NuxtLink>
            <NuxtLink to="/restaurants" @click="closeMobileMenu" class="py-2 px-4 text-gray-600 hover:bg-gray-100 hover:text-green-600 rounded-lg transition-colors" :class="{ 'text-green-600 font-semibold bg-green-50': activePage === 'restaurants' }">
              ร้านอาหาร
            </NuxtLink>
            <NuxtLink to="/events" @click="closeMobileMenu" class="py-2 px-4 text-gray-600 hover:bg-gray-100 hover:text-green-600 rounded-lg transition-colors" :class="{ 'text-green-600 font-semibold bg-green-50': activePage === 'events' }">
              กิจกรรม
            </NuxtLink>
            <NuxtLink to="/travel-services" @click="closeMobileMenu" class="py-2 px-4 text-gray-600 hover:bg-gray-100 hover:text-green-600 rounded-lg transition-colors" :class="{ 'text-green-600 font-semibold bg-green-50': activePage === 'travel-services' }">
              บริการท่องเที่ยว
            </NuxtLink>
            <NuxtLink to="/local-products" @click="closeMobileMenu" class="py-2 px-4 text-gray-600 hover:bg-gray-100 hover:text-green-600 rounded-lg transition-colors" :class="{ 'text-green-600 font-semibold bg-green-50': activePage === 'local-products' }">
              สินค้าท้องถิ่น
            </NuxtLink>
            <NuxtLink to="/contact" @click="closeMobileMenu" class="py-2 px-4 text-gray-600 hover:bg-gray-100 hover:text-green-600 rounded-lg transition-colors" :class="{ 'text-green-600 font-semibold bg-green-50': activePage === 'contact' }">
              ติดต่อเรา
            </NuxtLink>
          </div>
        </nav>
      </Transition>
    </div>
  </header>
</template>

<script setup lang="ts">
interface PublicHeaderProps {
  activePage?: 'home' | 'news' | 'hotels' | 'restaurants' | 'events' | 'travel-services' | 'local-products' | 'contact'
}

const props = withDefaults(defineProps<PublicHeaderProps>(), {
  activePage: 'home'
})

// State
const mobileMenuOpen = ref(false)

// Public header with settings
const { siteName, navbarHidden } = usePublicHeader()

// Methods
function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
}
</script>

<style scoped>
.site-header.nav-hidden {
  transform: translateY(-100%);
}

/* Mobile Menu Animation */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s ease;
}

.mobile-menu-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
