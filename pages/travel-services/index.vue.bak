<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="site-header bg-white shadow-sm sticky top-0 z-40 transition-transform duration-300" :class="{ 'nav-hidden': navbarHidden }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-2xl font-bold text-green-600">
            {{ siteName }}
          </NuxtLink>
          <nav class="flex items-center space-x-6">
            <NuxtLink to="/" class="text-gray-600 hover:text-green-600">หน้าแรก</NuxtLink>
            <NuxtLink to="/news" class="text-gray-600 hover:text-green-600">ข่าวสาร</NuxtLink>
            <NuxtLink to="/hotels" class="text-gray-600 hover:text-green-600">โรงแรม</NuxtLink>
            <NuxtLink to="/restaurants" class="text-gray-600 hover:text-green-600">ร้านอาหาร</NuxtLink>
            <NuxtLink to="/events" class="text-gray-600 hover:text-green-600">กิจกรรม</NuxtLink>
            <NuxtLink to="/travel-services" class="text-green-600 font-semibold">บริการท่องเที่ยว</NuxtLink>
            <NuxtLink to="/local-products" class="text-gray-600 hover:text-green-600">สินค้าท้องถิ่น</NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">บริการท่องเที่ยว</h1>
        <p class="text-xl text-blue-100">บริการที่ช่วยให้การเดินทางของคุณสะดวกสบาย</p>
      </div>
    </section>

    <!-- Filters & Search -->
    <section class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="grid md:grid-cols-4 gap-4">
          <!-- Search -->
          <div class="md:col-span-2">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="ค้นหาบริการ..."
              class="input input-bordered w-full bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              @input="handleSearch"
            />
          </div>

          <!-- Service Type Filter -->
          <select
            v-model="selectedServiceType"
            class="select select-bordered bg-white border-gray-300 text-gray-900"
            @change="handleFilter"
          >
            <option value="">ทุกประเภท</option>
            <option value="transportation">รถรับส่ง</option>
            <option value="tour_guide">ไกด์นำเที่ยว</option>
            <option value="car_rental">เช่ารถ</option>
            <option value="tour_package">แพ็คเกจทัวร์</option>
          </select>

          <!-- Province Filter -->
          <select
            v-model="selectedProvince"
            class="select select-bordered bg-white border-gray-300 text-gray-900"
            @change="handleFilter"
          >
            <option value="">ทุกจังหวัด</option>
            <option value="กรุงเทพมหานคร">กรุงเทพมหานคร</option>
            <option value="เชียงใหม่">เชียงใหม่</option>
            <option value="ภูเก็ต">ภูเก็ต</option>
            <option value="ขอนแก่น">ขอนแก่น</option>
            <option value="สงขลา">สงขลา</option>
          </select>
        </div>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BaseLoading v-if="loading" class="py-20" />

        <div v-else-if="services.length > 0" class="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
          <NuxtLink
            v-for="service in services"
            :key="service._id"
            :to="`/travel-services/${service._id}`"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div class="aspect-video bg-gray-200 overflow-hidden">
              <img
                v-if="service.images && service.images[0]"
                :src="service.images[0]"
                :alt="service.title"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-cyan-500">
                <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
            </div>
            <div class="p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="badge badge-info">{{ getServiceTypeLabel(service.serviceType) }}</span>
                <span v-if="service.featured" class="badge badge-secondary">แนะนำ</span>
              </div>
              <h3 class="text-lg font-bold text-gray-800 mb-2">{{ service.title }}</h3>
              <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ service.description }}</p>
              <div v-if="service.serviceArea && service.serviceArea.length > 0" class="mb-2">
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="area in service.serviceArea.slice(0, 2)"
                    :key="area"
                    class="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                  >
                    {{ area }}
                  </span>
                </div>
              </div>
              <div class="flex items-center text-sm text-gray-500">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ service.location?.district }}, {{ service.location?.province }}
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="text-center py-20">
          <svg class="w-20 h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          <p class="text-gray-500 text-lg">ไม่พบบริการท่องเที่ยวที่ตรงกับเงื่อนไขการค้นหา</p>
        </div>

        <!-- Pagination -->
        <div v-if="pagination && pagination.totalPages > 1" class="flex justify-center mt-12">
          <div class="join">
            <button
              v-for="page in pagination.totalPages"
              :key="page"
              class="join-item btn"
              :class="{ 'btn-active': page === pagination.currentPage }"
              @click="goToPage(page)"
            >
              {{ page }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">{{ siteName }}</h3>
            <p class="text-gray-400">แพลตฟอร์มท่องเที่ยวท้องถิ่น ค้นพบที่พัก ร้านอาหาร และกิจกรรมท้องถิ่น</p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">สำรวจ</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/" class="text-gray-400 hover:text-white">หน้าแรก</NuxtLink></li>
              <li><NuxtLink to="/news" class="text-gray-400 hover:text-white">ข่าวสาร</NuxtLink></li>
              <li><NuxtLink to="/hotels" class="text-gray-400 hover:text-white">โรงแรม</NuxtLink></li>
              <li><NuxtLink to="/restaurants" class="text-gray-400 hover:text-white">ร้านอาหาร</NuxtLink></li>
              <li><NuxtLink to="/events" class="text-gray-400 hover:text-white">กิจกรรม</NuxtLink></li>
              <li><NuxtLink to="/travel-services" class="text-gray-400 hover:text-white">บริการท่องเที่ยว</NuxtLink></li>
              <li><NuxtLink to="/local-products" class="text-gray-400 hover:text-white">สินค้าท้องถิ่น</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">เกี่ยวกับเรา</h4>
            <ul class="space-y-2">
              <li><a href="/#about" class="text-gray-400 hover:text-white">เกี่ยวกับ</a></li>
              <li><a href="/#contact" class="text-gray-400 hover:text-white">ติดต่อเรา</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">ติดตามเรา</h4>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.945 7.612c.097.306.155.627.155.958 0 9.805-7.465 21.106-21.106 21.106-4.193 0-8.093-1.227-11.37-3.33.58.07 1.17.1 1.77.1 3.473 0 6.668-1.184 9.204-3.17-3.243-.06-5.98-2.202-6.923-5.148.453.087.918.134 1.395.134.676 0 1.33-.09 1.95-.258-3.388-.68-5.94-3.676-5.94-7.267v-.092c.998.554 2.14.886 3.353.924-1.988-1.328-3.296-3.597-3.296-6.167 0-1.36.365-2.634 1.003-3.73 3.653 4.483 9.114 7.432 15.27 7.74-.127-.547-.193-1.116-.193-1.702 0-4.123 3.343-7.465 7.465-7.465 2.147 0 4.086.906 5.448 2.356 1.7-.335 3.297-.957 4.74-1.813-.558 1.743-1.742 3.204-3.283 4.127 1.51-.18 2.948-.581 4.287-1.175-.999 1.498-2.263 2.813-3.72 3.867z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 {{ siteName }}. สงวนลิขสิทธิ์.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useTravelServicesStore } from '~/stores/travelServices'

definePageMeta({
  layout: false
})

const travelServicesStore = useTravelServicesStore()

// State
const loading = ref(true)
const searchQuery = ref('')
const selectedServiceType = ref('')
const selectedProvince = ref('')

// Public header with settings
const { siteName, navbarHidden } = usePublicHeader()

// Computed
const services = computed(() => travelServicesStore.list || [])
const pagination = computed(() => travelServicesStore.pagination)

// Methods
function getServiceTypeLabel(type: string) {
  const labels: Record<string, string> = {
    transportation: 'รถรับส่ง',
    tour_guide: 'ไกด์นำเที่ยว',
    car_rental: 'เช่ารถ',
    tour_package: 'แพ็คเกจทัวร์'
  }
  return labels[type] || type
}

let searchTimeout: NodeJS.Timeout | null = null

function handleSearch() {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  searchTimeout = setTimeout(() => {
    loadServices()
  }, 500)
}

function handleFilter() {
  loadServices()
}

async function loadServices(page = 1) {
  loading.value = true
  try {
    const query: any = {
      isActive: true,
      page,
      limit: 12
    }

    if (searchQuery.value) {
      query.search = searchQuery.value
    }

    if (selectedServiceType.value) {
      query.serviceType = selectedServiceType.value
    }

    if (selectedProvince.value) {
      query['location.province'] = selectedProvince.value
    }

    await travelServicesStore.fetchTravelServices({ query })
  } catch (error) {
    console.error('Failed to load travel services:', error)
  } finally {
    loading.value = false
  }
}

function goToPage(page: number) {
  loadServices(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  loadServices()
})

// SEO
useHead({
  title: computed(() => `บริการท่องเที่ยว - ${siteName.value}`),
  meta: [
    { name: 'description', content: 'ค้นพบบริการท่องเที่ยวที่ช่วยให้การเดินทางของคุณสะดวกสบาย ไกด์ รถรับส่ง แพ็คเกจทัวร์' }
  ]
})
</script>

<style scoped>
.site-header.nav-hidden {
  transform: translateY(-100%);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
