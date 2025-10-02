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
          </nav>
        </div>
      </div>
    </header>

    <BaseLoading v-if="loading" class="py-20" />

    <div v-else-if="news" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-8">
      <!-- Breadcrumb -->
      <nav class="flex mb-8 text-sm" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <NuxtLink to="/local-spot" class="text-gray-700 hover:text-green-600">หน้าหลัก</NuxtLink>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <NuxtLink to="/local-spot/news" class="ml-1 text-gray-700 hover:text-green-600">ข่าวสาร</NuxtLink>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <span class="ml-1 text-gray-500 md:ml-2">{{ news.title }}</span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Category & Featured Badge -->
      <div class="flex items-center gap-3 mb-4">
        <span class="badge badge-primary badge-lg">{{ getCategoryLabel(news.category) }}</span>
        <span v-if="news.featured" class="badge badge-secondary badge-lg">แนะนำ</span>
      </div>

      <!-- Title -->
      <h1 class="text-4xl font-bold text-gray-900 mb-6">{{ news.title }}</h1>

      <!-- Meta Information -->
      <div class="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 pb-8 border-b">
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="font-medium">{{ news.author?.name }}</span>
        </div>
        <div class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          {{ formatDate(news.publishDate) }}
        </div>
        <div v-if="news.readTime" class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          เวลาอ่าน {{ news.readTime }} นาที
        </div>
        <div v-if="news.viewCount" class="flex items-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          {{ news.viewCount.toLocaleString() }} ครั้ง
        </div>
      </div>

      <!-- Cover Image -->
      <div v-if="news.images && news.images[0]" class="mb-8">
        <img
          :src="news.images[0]"
          :alt="news.title"
          class="w-full rounded-xl shadow-lg"
        />
      </div>
      <div v-else class="mb-8 aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
        <svg class="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      </div>

      <!-- Excerpt -->
      <div v-if="news.excerpt" class="bg-green-50 border-l-4 border-green-600 p-6 mb-8">
        <p class="text-lg text-gray-700 italic">{{ news.excerpt }}</p>
      </div>

      <!-- Content -->
      <div class="prose prose-lg max-w-none mb-12">
        <div v-html="news.content" class="text-gray-800 leading-relaxed"></div>
      </div>

      <!-- Tags -->
      <div v-if="news.tags && news.tags.length > 0" class="mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-3">แท็ก</h3>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in news.tags"
            :key="tag"
            class="badge badge-outline badge-lg"
          >
            {{ tag }}
          </span>
        </div>
      </div>

      <!-- Source -->
      <div v-if="news.source" class="text-sm text-gray-500 mb-8">
        <span class="font-medium">แหล่งที่มา:</span> {{ news.source }}
      </div>

      <!-- Author Bio -->
      <div v-if="news.author?.bio" class="bg-gray-100 rounded-xl p-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-2">เกี่ยวกับผู้เขียน</h3>
        <p class="text-gray-700">{{ news.author.bio }}</p>
        <div v-if="news.author.email" class="mt-2 text-sm text-gray-600">
          <a :href="`mailto:${news.author.email}`" class="text-green-600 hover:text-green-700">
            {{ news.author.email }}
          </a>
        </div>
      </div>

      <!-- Share Section -->
      <div class="border-t border-b py-6 mb-8">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">แชร์บทความนี้</h3>
        <div class="flex gap-4">
          <button class="btn btn-circle btn-outline btn-primary">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
          </button>
          <button class="btn btn-circle btn-outline btn-info">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
          </button>
          <button class="btn btn-circle btn-outline btn-success">
            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>
          </button>
        </div>
      </div>

      <!-- Back Button -->
      <div class="text-center mb-8">
        <NuxtLink to="/local-spot/news" class="btn btn-outline btn-primary">
          กลับไปยังรายการข่าว
        </NuxtLink>
      </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-4">
          <div class="sticky top-24">
            <!-- Table of Contents -->
            <div v-if="tableOfContents.length > 0" class="bg-white rounded-xl shadow-lg p-6 mb-6">
              <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                สารบัญ
              </h3>
              <nav class="space-y-2">
                <a
                  v-for="(item, index) in tableOfContents"
                  :key="index"
                  :href="`#${item.id}`"
                  @click.prevent="scrollToHeading(item.id)"
                  :class="[
                    'block py-2 px-3 rounded-lg hover:bg-green-50 transition-colors',
                    item.level === 1 ? 'text-base font-semibold text-gray-900' : 'text-sm text-gray-600 ml-4'
                  ]"
                >
                  {{ item.text }}
                </a>
              </nav>
            </div>

            <!-- Related Content -->
            <div v-if="news.relatedContent && news.relatedContent.length > 0" class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                </svg>
                ข้อมูลที่เกี่ยวข้อง
              </h3>
              <div class="space-y-3">
                <NuxtLink
                  v-for="related in news.relatedContent"
                  :key="related.contentId"
                  :to="getContentTypeUrl(related.contentType, related.contentId)"
                  class="flex items-start p-3 bg-gray-50 rounded-lg hover:bg-green-50 transition-colors group"
                >
                  <div class="flex-1">
                    <div class="badge badge-sm mb-1">{{ getContentTypeLabel(related.contentType) }}</div>
                    <h4 class="font-medium text-gray-900 group-hover:text-green-600 transition-colors text-sm">
                      {{ related.title || 'รายการที่เกี่ยวข้อง' }}
                    </h4>
                  </div>
                  <svg class="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <svg class="w-20 h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01" />
      </svg>
      <h1 class="text-2xl font-bold text-gray-900 mb-2">ไม่พบข่าว</h1>
      <p class="text-gray-600 mb-8">ขออภัย ไม่พบข่าวที่คุณค้นหา</p>
      <NuxtLink to="/local-spot/news" class="btn btn-primary">
        กลับไปยังรายการข่าว
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNewsStore } from '~/stores/news'

definePageMeta({
  layout: false
})

const route = useRoute()
const newsStore = useNewsStore()

const loading = ref(true)

const news = computed(() => newsStore.current)

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

function getContentTypeLabel(type: string) {
  const labels: Record<string, string> = {
    hotel: 'โรงแรม',
    restaurant: 'ร้านอาหาร',
    travel_service: 'บริการท่องเที่ยว',
    local_product: 'ผลิตภัณฑ์ท้องถิ่น',
    event: 'กิจกรรม'
  }
  return labels[type] || type
}

function getContentTypeUrl(type: string, id: string) {
  const typeMap: Record<string, string> = {
    hotel: 'hotels',
    restaurant: 'restaurants',
    travel_service: 'travel-services',
    local_product: 'local-products',
    event: 'events'
  }
  const path = typeMap[type] || type
  return `/local-spot/${path}/${id}`
}

function formatDate(date: any) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Table of Contents
const tableOfContents = ref<Array<{ id: string; text: string; level: number }>>([])

function generateTableOfContents() {
  if (!news.value?.content) return

  // Wait a bit for DOM to be ready
  setTimeout(() => {
    const contentDiv = document.querySelector('.prose')
    if (!contentDiv) return

    const headings = contentDiv.querySelectorAll('h1, h2')
    const toc: Array<{ id: string; text: string; level: number }> = []

    headings.forEach((heading, index) => {
      const level = parseInt(heading.tagName.substring(1))
      const text = heading.textContent || ''
      const id = `heading-${index}`

      // Add ID to the actual heading element
      heading.id = id

      toc.push({ id, text, level })
    })

    tableOfContents.value = toc
  }, 100)
}

function scrollToHeading(id: string) {
  const element = document.getElementById(id)
  if (element) {
    const offset = 100
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

onMounted(async () => {
  loading.value = true
  try {
    const id = route.params.id as string
    await newsStore.fetchNewsArticle({ body: { _id: id } })

    // Generate TOC after content is loaded
    await nextTick()
    generateTableOfContents()
  } catch (error) {
    console.error('Failed to load news:', error)
  } finally {
    loading.value = false
  }
})

// Watch for content changes
watch(() => news.value?.content, () => {
  nextTick(() => {
    generateTableOfContents()
  })
})

// SEO
useHead(() => ({
  title: news.value ? `${news.value.title} - Local Spot` : 'ข่าว - Local Spot',
  meta: [
    { name: 'description', content: news.value?.description || 'รายละเอียดข่าว' }
  ]
}))
</script>

<style scoped>
.prose {
  max-width: none;
}

.prose :deep(p.indent-paragraph) {
  text-indent: 2em;
}

.prose :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 0.5rem;
  margin: 1rem 0;
}
</style>
