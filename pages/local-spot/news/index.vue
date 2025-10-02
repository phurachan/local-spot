<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-40">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/local-spot" class="text-2xl font-bold text-green-600">
            Local Spot
          </NuxtLink>
          <nav class="flex items-center space-x-6">
            <NuxtLink to="/local-spot/news" class="text-green-600 font-semibold">ข่าวสาร</NuxtLink>
            <NuxtLink to="/local-spot" class="text-gray-600 hover:text-green-600">หน้าแรก</NuxtLink>
            <NuxtLink to="/local-spot/hotels" class="text-gray-600 hover:text-green-600">โรงแรม</NuxtLink>
            <NuxtLink to="/local-spot/restaurants" class="text-gray-600 hover:text-green-600">ร้านอาหาร</NuxtLink>
            <NuxtLink to="/local-spot/events" class="text-gray-600 hover:text-green-600">กิจกรรม</NuxtLink>
            <NuxtLink to="/local-spot/travel-services" class="text-gray-600 hover:text-green-600">บริการท่องเที่ยว</NuxtLink>
            <NuxtLink to="/local-spot/local-products" class="text-gray-600 hover:text-green-600">สินค้าท้องถิ่น</NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl md:text-5xl font-bold mb-4">ข่าวสารและบทความ</h1>
        <p class="text-xl text-green-100">อัพเดทข่าวสาร เคล็ดลับการท่องเที่ยว และเรื่องราวท้องถิ่น</p>
      </div>
    </section>

    <!-- Filters & Search -->
    <section class="bg-white shadow-sm border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div class="grid md:grid-cols-3 gap-4">
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
    <section class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BaseLoading v-if="loading" class="py-20" />

        <div v-else-if="newsList.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="news in newsList"
            :key="news._id"
            :to="`/local-spot/news/${news._id}`"
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

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">Local Spot</h3>
            <p class="text-gray-400">แพลตฟอร์มท่องเที่ยวท้องถิ่น ค้นพบที่พัก ร้านอาหาร และกิจกรรมท้องถิ่น</p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">สำรวจ</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/local-spot/news" class="text-gray-400 hover:text-white">ข่าวสาร</NuxtLink></li>
              <li><NuxtLink to="/local-spot/hotels" class="text-gray-400 hover:text-white">โรงแรม</NuxtLink></li>
              <li><NuxtLink to="/local-spot/restaurants" class="text-gray-400 hover:text-white">ร้านอาหาร</NuxtLink></li>
              <li><NuxtLink to="/local-spot/events" class="text-gray-400 hover:text-white">กิจกรรม</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">เกี่ยวกับเรา</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white">เกี่ยวกับ</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">ติดต่อเรา</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">นโยบายความเป็นส่วนตัว</a></li>
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
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Local Spot. All rights reserved.</p>
        </div>
      </div>
    </footer>
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
useHead({
  title: 'ข่าวสารและบทความ - Local Spot',
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
