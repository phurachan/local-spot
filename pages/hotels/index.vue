<template>
  <div class="min-h-screen bg-gray-50">
    <PublicHeaderWrapper active-page="hotels" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-green-600 to-teal-600 text-white py-10 sm:py-12 md:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">โรงแรมและที่พัก</h1>
        <p class="text-lg sm:text-xl text-green-100">ค้นพบที่พักสะดวกสบาย บรรยากาศดี ในท้องถิ่น</p>
      </div>
    </section>

    <!-- Filters & Search -->
    <section class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          <!-- Search -->
          <div class="md:col-span-2">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="ค้นหาโรงแรม..."
              class="input input-bordered w-full bg-white border-gray-300 text-gray-900 placeholder-gray-500"
              @input="handleSearch"
            />
          </div>

          <!-- Category Filter -->
          <select
            v-model="selectedCategory"
            class="select select-bordered bg-white border-gray-300 text-gray-900"
            @change="handleFilter"
          >
            <option value="">ทุกประเภท</option>
            <option value="hotel">โรงแรม</option>
            <option value="resort">รีสอร์ท</option>
            <option value="hostel">โฮสเทล</option>
            <option value="guesthouse">เกสต์เฮาส์</option>
            <option value="villa">วิลลา</option>
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

    <!-- Hotels Grid -->
    <section class="py-8 sm:py-10 md:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BaseLoading v-if="loading" class="py-12 sm:py-20" />

        <div v-else-if="hotels.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          <NuxtLink
            v-for="hotel in hotels"
            :key="hotel._id"
            :to="`/hotels/${hotel._id}`"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div class="aspect-video bg-gray-200 overflow-hidden">
              <img
                v-if="hotel.images && hotel.images[0]"
                :src="hotel.images[0]"
                :alt="hotel.title"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-400 to-blue-500">
                <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
            </div>
            <div class="p-4">
              <div class="flex items-center justify-between mb-2">
                <span class="badge badge-primary">{{ getCategoryLabel(hotel.category) }}</span>
                <span v-if="hotel.featured" class="badge badge-secondary">แนะนำ</span>
              </div>
              <h3 class="text-lg font-bold text-gray-800 mb-2">{{ hotel.title }}</h3>
              <p class="text-gray-600 text-sm mb-3 line-clamp-2">{{ hotel.description }}</p>
              <div class="flex items-center text-sm text-gray-500">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ hotel.location?.district }}, {{ hotel.location?.province }}
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="text-center py-20">
          <svg class="w-20 h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
          <p class="text-gray-500 text-lg">ไม่พบโรงแรมที่ตรงกับเงื่อนไขการค้นหา</p>
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

    <PublicFooterWrapper />
  </div>
</template>

<script setup lang="ts">
import { useHotelsStore } from '~/stores/hotels'

definePageMeta({
  layout: false
})

const hotelsStore = useHotelsStore()

// State
const loading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref('')
const selectedProvince = ref('')

// Computed
const hotels = computed(() => hotelsStore.list || [])
const pagination = computed(() => hotelsStore.pagination)

// Methods
function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    hotel: 'โรงแรม',
    resort: 'รีสอร์ท',
    hostel: 'โฮสเทล',
    guesthouse: 'เกสต์เฮาส์',
    villa: 'วิลลา'
  }
  return labels[category] || category
}

let searchTimeout: NodeJS.Timeout | null = null

function handleSearch() {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  searchTimeout = setTimeout(() => {
    loadHotels()
  }, 500)
}

function handleFilter() {
  loadHotels()
}

async function loadHotels(page = 1) {
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

    if (selectedCategory.value) {
      query.category = selectedCategory.value
    }

    if (selectedProvince.value) {
      query['location.province'] = selectedProvince.value
    }

    await hotelsStore.fetchHotels({ query })
  } catch (error) {
    console.error('Failed to load hotels:', error)
  } finally {
    loading.value = false
  }
}

function goToPage(page: number) {
  loadHotels(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  loadHotels()
})

// SEO
const { siteName } = usePublicSettings()
useHead({
  title: computed(() => `โรงแรมและที่พัก - ${siteName.value}`),
  meta: [
    { name: 'description', content: 'ค้นพบโรงแรมและที่พักคุณภาพในท้องถิ่น บรรยากาศดี ราคาเป็นมิตร' }
  ]
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
