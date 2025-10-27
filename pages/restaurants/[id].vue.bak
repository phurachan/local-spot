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
            <NuxtLink to="/restaurants" class="text-green-600 font-semibold">ร้านอาหาร</NuxtLink>
            <NuxtLink to="/events" class="text-gray-600 hover:text-green-600">กิจกรรม</NuxtLink>
            <NuxtLink to="/travel-services" class="text-gray-600 hover:text-green-600">บริการท่องเที่ยว</NuxtLink>
            <NuxtLink to="/local-products" class="text-gray-600 hover:text-green-600">สินค้าท้องถิ่น</NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <BaseLoading v-if="loading" class="py-20" />

    <div v-else-if="restaurant" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <!-- Breadcrumb -->
      <nav class="flex mb-8 text-sm" aria-label="Breadcrumb">
        <ol class="inline-flex items-center space-x-1 md:space-x-3">
          <li class="inline-flex items-center">
            <NuxtLink to="/" class="text-gray-700 hover:text-green-600">หน้าหลัก</NuxtLink>
          </li>
          <li>
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <NuxtLink to="/restaurants" class="ml-1 text-gray-700 hover:text-green-600">ร้านอาหาร</NuxtLink>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <span class="ml-1 text-gray-500 md:ml-2">{{ restaurant.title }}</span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Title & Category -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <span class="badge badge-warning badge-lg">{{ getCategoryLabel(restaurant.category) }}</span>
          <span v-if="restaurant.featured" class="badge badge-secondary badge-lg">แนะนำ</span>
          <span v-if="restaurant.priceRange" class="badge badge-info badge-lg">{{ getPriceRangeLabel(restaurant.priceRange) }}</span>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ restaurant.title }}</h1>
        <div class="flex items-center text-gray-600">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {{ restaurant.location?.address }}, {{ restaurant.location?.district }}, {{ restaurant.location?.province }}
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Left Column - Images & Details -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Images Gallery -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div v-if="restaurant.images && restaurant.images.length > 0" class="aspect-video bg-gray-200">
              <img
                :src="restaurant.images[currentImageIndex]"
                :alt="restaurant.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div v-else class="aspect-video bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
              <svg class="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>

            <!-- Thumbnails -->
            <div v-if="restaurant.images && restaurant.images.length > 1" class="p-4 grid grid-cols-5 gap-2">
              <div
                v-for="(image, index) in restaurant.images"
                :key="index"
                class="aspect-video bg-gray-200 rounded cursor-pointer overflow-hidden"
                :class="{ 'ring-2 ring-orange-600': index === currentImageIndex }"
                @click="currentImageIndex = index"
              >
                <img :src="image" :alt="`${restaurant.title} - ${index + 1}`" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">รายละเอียด</h2>
            <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ restaurant.description }}</p>
          </div>

          <!-- Cuisine -->
          <div v-if="restaurant.cuisine && restaurant.cuisine.length > 0" class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">ประเภทอาหาร</h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="c in restaurant.cuisine"
                :key="c"
                class="bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-semibold"
              >
                {{ c }}
              </span>
            </div>
          </div>

          <!-- Specialties -->
          <div v-if="restaurant.specialties && restaurant.specialties.length > 0" class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">เมนูแนะนำ</h2>
            <div class="grid md:grid-cols-2 gap-3">
              <div v-for="specialty in restaurant.specialties" :key="specialty" class="flex items-start text-gray-700">
                <svg class="w-5 h-5 text-orange-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ specialty }}
              </div>
            </div>
          </div>

          <!-- Dietary Options -->
          <div v-if="restaurant.dietaryOptions && restaurant.dietaryOptions.length > 0" class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">ตัวเลือกอาหาร</h2>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="option in restaurant.dietaryOptions"
                :key="option"
                class="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
              >
                {{ option }}
              </span>
            </div>
          </div>

          <!-- Operating Hours -->
          <div v-if="restaurant.operatingHours" class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">เวลาทำการ</h2>
            <div class="space-y-3">
              <div v-for="(hours, day) in restaurant.operatingHours" :key="day" class="flex justify-between items-center border-b pb-2">
                <span class="font-semibold text-gray-700">{{ getDayLabel(day) }}</span>
                <span v-if="hours.closed" class="text-red-600">ปิด</span>
                <span v-else class="text-gray-600">{{ hours.open }} - {{ hours.close }}</span>
              </div>
            </div>
          </div>

          <!-- Delivery -->
          <div v-if="restaurant.delivery?.available" class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">บริการจัดส่ง</h2>
            <p class="text-green-600 font-semibold mb-3">✓ มีบริการจัดส่ง</p>
            <div v-if="restaurant.delivery.platforms && restaurant.delivery.platforms.length > 0" class="flex flex-wrap gap-2">
              <span
                v-for="platform in restaurant.delivery.platforms"
                :key="platform"
                class="bg-blue-100 text-blue-800 px-3 py-1 rounded"
              >
                {{ platform }}
              </span>
            </div>
          </div>
        </div>

        <!-- Right Column - Contact & Info -->
        <div class="space-y-6">
          <!-- Contact Card -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">ข้อมูลติดต่อ</h2>

            <!-- Phone -->
            <div v-if="restaurant.contactInfo?.phone && restaurant.contactInfo.phone.length > 0" class="mb-4">
              <div class="flex items-center text-gray-600 mb-2">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="font-semibold">โทรศัพท์</span>
              </div>
              <div class="space-y-1 pl-7">
                <a
                  v-for="phone in restaurant.contactInfo.phone"
                  :key="phone"
                  :href="`tel:${phone}`"
                  class="block text-green-600 hover:text-green-700"
                >
                  {{ phone }}
                </a>
              </div>
            </div>

            <!-- Email -->
            <div v-if="restaurant.contactInfo?.email" class="mb-4">
              <div class="flex items-center text-gray-600 mb-2">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="font-semibold">อีเมล</span>
              </div>
              <a :href="`mailto:${restaurant.contactInfo.email}`" class="block text-green-600 hover:text-green-700 pl-7">
                {{ restaurant.contactInfo.email }}
              </a>
            </div>

            <!-- Website -->
            <div v-if="restaurant.contactInfo?.website" class="mb-4">
              <div class="flex items-center text-gray-600 mb-2">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span class="font-semibold">เว็บไซต์</span>
              </div>
              <a :href="restaurant.contactInfo.website" target="_blank" class="block text-green-600 hover:text-green-700 pl-7 break-words">
                {{ restaurant.contactInfo.website }}
              </a>
            </div>

            <!-- CTA Button -->
            <button class="btn btn-primary w-full mt-6">
              จองโต๊ะ
            </button>
          </div>

          <!-- Map -->
          <div v-if="restaurant.location?.coordinates" class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">แผนที่</h2>
            <div class="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
              <p class="text-gray-500">แผนที่ (Google Maps)</p>
              <!-- TODO: Integrate Google Maps -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
      <svg class="w-20 h-20 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01M12 12h.01" />
      </svg>
      <h1 class="text-2xl font-bold text-gray-900 mb-2">ไม่พบร้านอาหาร</h1>
      <p class="text-gray-600 mb-8">ขออภัย ไม่พบร้านอาหารที่คุณค้นหา</p>
      <NuxtLink to="/restaurants" class="btn btn-primary">
        กลับไปยังรายการร้านอาหาร
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRestaurantsStore } from '~/stores/restaurants'

definePageMeta({
  layout: false
})

const route = useRoute()
const restaurantsStore = useRestaurantsStore()

const loading = ref(true)
const currentImageIndex = ref(0)

// Public header with settings
const { siteName, navbarHidden } = usePublicHeader()

const restaurant = computed(() => restaurantsStore.current)

function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    restaurant: 'ร้านอาหาร',
    cafe: 'คาเฟ่',
    street_food: 'อาหารริมทาง',
    local_cuisine: 'อาหารท้องถิ่น',
    international: 'นานาชาติ'
  }
  return labels[category] || category
}

function getPriceRangeLabel(range: string) {
  const labels: Record<string, string> = {
    budget: 'ราคาประหยัด',
    mid_range: 'ราคากลาง',
    fine_dining: 'Fine Dining'
  }
  return labels[range] || range
}

function getDayLabel(day: string) {
  const labels: Record<string, string> = {
    monday: 'จันทร์',
    tuesday: 'อังคาร',
    wednesday: 'พุธ',
    thursday: 'พฤหัสบดี',
    friday: 'ศุกร์',
    saturday: 'เสาร์',
    sunday: 'อาทิตย์'
  }
  return labels[day] || day
}

onMounted(async () => {
  loading.value = true
  try {
    const id = route.params.id as string
    await restaurantsStore.fetchRestaurant({ body: { _id: id } })
  } catch (error) {
    console.error('Failed to load restaurant:', error)
  } finally {
    loading.value = false
  }
})

// SEO
useHead(() => ({
  title: computed(() => restaurant.value ? `${restaurant.value.title} - ${siteName.value}` : `ร้านอาหาร - ${siteName.value}`),
  meta: [
    { name: 'description', content: restaurant.value?.description || 'รายละเอียดร้านอาหาร' }
  ]
}))
</script>

<style scoped>
.site-header.nav-hidden {
  transform: translateY(-100%);
}
</style>
