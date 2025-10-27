<template>
  <div class="min-h-screen bg-gray-50">
    <PublicHeaderWrapper active-page="news" />


    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-green-600 to-teal-600 text-white py-10 sm:py-12 md:py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">ข่าวสารและบทความ</h1>
        <p class="text-lg sm:text-xl text-green-100">อัพเดทข่าวสาร เคล็ดลับการท่องเที่ยว และเรื่องราวท้องถิ่น</p>
      </div>
    </section>

    <!-- Filters & Search -->
    <section class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
          <!-- Search -->
          <div class="md:col-span-2">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="ค้นหาข่าว..."
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
            <option value="">ทุกหมวดหมู่</option>
            <option value="announcement">ประกาศ</option>
            <option value="promotion">โปรโมชั่น</option>
            <option value="event_news">ข่าวกิจกรรม</option>
            <option value="travel_tips">เคล็ดลับการท่องเที่ยว</option>
            <option value="local_story">เรื่องราวท้องถิ่น</option>
            <option value="business_update">อัพเดทธุรกิจ</option>
          </select>
        </div>
      </div>
    </section>

    <!-- News Grid -->
    <section class="py-8 sm:py-10 md:py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BaseLoading v-if="loading" class="py-12 sm:py-20" />

        <div v-else-if="newsList.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          <NuxtLink
            v-for="news in newsList"
            :key="news._id"
            :to="`/news/${news._id}`"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div class="aspect-video bg-gray-200 overflow-hidden">
              <img
                v-if="news.images && news.images[0]"
                :src="news.images[0]"
                :alt="news.title"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-500">
                <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="badge badge-primary">{{ getCategoryLabel(news.category) }}</span>
                <span v-if="news.featured" class="badge badge-secondary">แนะนำ</span>
              </div>
              <h3 class="text-xl font-bold text-gray-800 mb-2">{{ news.title }}</h3>
              <p class="text-gray-600 text-sm mb-4 line-clamp-2">{{ news.excerpt || news.description }}</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {{ news.author?.name }}
                </div>
                <div class="flex items-center">
                  <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ formatDate(news.publishDate) }}
                </div>
              </div>
              <div v-if="news.readTime" class="mt-2 text-xs text-gray-400">
                เวลาอ่าน {{ news.readTime }} นาที
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="text-center py-20">
          <svg class="w-20 h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
          </svg>
          <p class="text-gray-500 text-lg">ไม่พบข่าวที่ตรงกับเงื่อนไขการค้นหา</p>
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
import { useNewsStore } from '~/stores/news'

definePageMeta({
  layout: false
})

const newsStore = useNewsStore()

// State
const loading = ref(true)
const searchQuery = ref('')
const selectedCategory = ref('')

// Computed
const newsList = computed(() => newsStore.list || [])
const pagination = computed(() => newsStore.pagination)

// Methods
function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    announcement: 'ประกาศ',
    promotion: 'โปรโมชั่น',
    event_news: 'ข่าวกิจกรรม',
    travel_tips: 'เคล็ดลับการท่องเที่ยว',
    local_story: 'เรื่องราวท้องถิ่น',
    business_update: 'อัพเดทธุรกิจ'
  }
  return labels[category] || category
}

function formatDate(date: any) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

let searchTimeout: NodeJS.Timeout | null = null

function handleSearch() {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  searchTimeout = setTimeout(() => {
    loadNews()
  }, 500)
}

function handleFilter() {
  loadNews()
}

async function loadNews(page = 1) {
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

    await newsStore.fetchNews({ query })
  } catch (error) {
    console.error('Failed to load news:', error)
  } finally {
    loading.value = false
  }
}

function goToPage(page: number) {
  loadNews(page)
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  loadNews()
})

// SEO
const { siteName } = usePublicSettings()
useHead({
  title: computed(() => `ข่าวสารและบทความ - ${siteName.value}`),
  meta: [
    { name: 'description', content: 'อัพเดทข่าวสาร เคล็ดลับการท่องเที่ยว และเรื่องราวท้องถิ่น' }
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
