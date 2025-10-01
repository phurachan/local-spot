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
            <NuxtLink to="/local-spot" class="text-gray-600 hover:text-green-600">หน้าแรก</NuxtLink>
            <NuxtLink to="/local-spot/hotels" class="text-green-600 font-semibold">โรงแรม</NuxtLink>
            <NuxtLink to="/local-spot/restaurants" class="text-gray-600 hover:text-green-600">ร้านอาหาร</NuxtLink>
            <NuxtLink to="/local-spot/events" class="text-gray-600 hover:text-green-600">กิจกรรม</NuxtLink>
            <NuxtLink to="/local-spot/travel-services" class="text-gray-600 hover:text-green-600">บริการท่องเที่ยว</NuxtLink>
            <NuxtLink to="/local-spot/local-products" class="text-gray-600 hover:text-green-600">สินค้าท้องถิ่น</NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <BaseLoading v-if="loading" class="py-20" />

    <div v-else-if="hotel" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              <NuxtLink to="/local-spot/hotels" class="ml-1 text-gray-700 hover:text-green-600">โรงแรม</NuxtLink>
            </div>
          </li>
          <li aria-current="page">
            <div class="flex items-center">
              <svg class="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path>
              </svg>
              <span class="ml-1 text-gray-500 md:ml-2">{{ hotel.title }}</span>
            </div>
          </li>
        </ol>
      </nav>

      <!-- Title & Category -->
      <div class="mb-8">
        <div class="flex items-center gap-3 mb-4">
          <span class="badge badge-primary badge-lg">{{ getCategoryLabel(hotel.category) }}</span>
          <span v-if="hotel.featured" class="badge badge-secondary badge-lg">แนะนำ</span>
        </div>
        <h1 class="text-4xl font-bold text-gray-900 mb-4">{{ hotel.title }}</h1>
        <div class="flex items-center text-gray-600">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {{ hotel.location?.address }}, {{ hotel.location?.district }}, {{ hotel.location?.province }}
        </div>
      </div>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Left Column - Images & Details -->
        <div class="lg:col-span-2 space-y-8">
          <!-- Images Gallery -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden">
            <div v-if="hotel.images && hotel.images.length > 0" class="aspect-video bg-gray-200">
              <img
                :src="hotel.images[currentImageIndex]"
                :alt="hotel.title"
                class="w-full h-full object-cover"
              />
            </div>
            <div v-else class="aspect-video bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
              <svg class="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>

            <!-- Thumbnails -->
            <div v-if="hotel.images && hotel.images.length > 1" class="p-4 grid grid-cols-5 gap-2">
              <div
                v-for="(image, index) in hotel.images"
                :key="index"
                class="aspect-video bg-gray-200 rounded cursor-pointer overflow-hidden"
                :class="{ 'ring-2 ring-green-600': index === currentImageIndex }"
                @click="currentImageIndex = index"
              >
                <img :src="image" :alt="`${hotel.title} - ${index + 1}`" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <!-- Description -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">รายละเอียด</h2>
            <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ hotel.description }}</p>
          </div>

          <!-- Amenities -->
          <div v-if="hotel.amenities && hotel.amenities.length > 0" class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">สิ่งอำนวยความสะดวก</h2>
            <div class="grid md:grid-cols-2 gap-3">
              <div v-for="amenity in hotel.amenities" :key="amenity" class="flex items-center text-gray-700">
                <svg class="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                {{ amenity }}
              </div>
            </div>
          </div>

          <!-- Room Types -->
          <div v-if="hotel.roomTypes && hotel.roomTypes.length > 0" class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">ประเภทห้องพัก</h2>
            <div class="space-y-4">
              <div v-for="(room, index) in hotel.roomTypes" :key="index" class="border-l-4 border-green-600 pl-4 py-2">
                <h3 class="font-bold text-lg text-gray-900">{{ room.name }}</h3>
                <p v-if="room.description" class="text-gray-600 text-sm mt-1">{{ room.description }}</p>
                <div class="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span v-if="room.maxGuests">จำนวน: {{ room.maxGuests }} คน</span>
                  <span v-if="room.priceRange">
                    ราคา: ฿{{ room.priceRange.min?.toLocaleString() }} - ฿{{ room.priceRange.max?.toLocaleString() }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- Nearby Attractions -->
          <div v-if="hotel.nearbyAttractions && hotel.nearbyAttractions.length > 0" class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">สถานที่ท่องเที่ยวใกล้เคียง</h2>
            <ul class="space-y-2">
              <li v-for="attraction in hotel.nearbyAttractions" :key="attraction" class="flex items-start text-gray-700">
                <svg class="w-5 h-5 text-green-600 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ attraction }}
              </li>
            </ul>
          </div>
        </div>

        <!-- Right Column - Contact & Info -->
        <div class="space-y-6">
          <!-- Contact Card -->
          <div class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-gray-900 mb-4">ข้อมูลติดต่อ</h2>

            <!-- Phone -->
            <div v-if="hotel.contactInfo?.phone && hotel.contactInfo.phone.length > 0" class="mb-4">
              <div class="flex items-center text-gray-600 mb-2">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span class="font-semibold">โทรศัพท์</span>
              </div>
              <div class="space-y-1 pl-7">
                <a
                  v-for="phone in hotel.contactInfo.phone"
                  :key="phone"
                  :href="`tel:${phone}`"
                  class="block text-green-600 hover:text-green-700"
                >
                  {{ phone }}
                </a>
              </div>
            </div>

            <!-- Email -->
            <div v-if="hotel.contactInfo?.email" class="mb-4">
              <div class="flex items-center text-gray-600 mb-2">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span class="font-semibold">อีเมล</span>
              </div>
              <a :href="`mailto:${hotel.contactInfo.email}`" class="block text-green-600 hover:text-green-700 pl-7">
                {{ hotel.contactInfo.email }}
              </a>
            </div>

            <!-- Website -->
            <div v-if="hotel.contactInfo?.website" class="mb-4">
              <div class="flex items-center text-gray-600 mb-2">
                <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                <span class="font-semibold">เว็บไซต์</span>
              </div>
              <a :href="hotel.contactInfo.website" target="_blank" class="block text-green-600 hover:text-green-700 pl-7 break-words">
                {{ hotel.contactInfo.website }}
              </a>
            </div>

            <!-- Check-in/Check-out -->
            <div v-if="hotel.checkInOut" class="mb-4 pt-4 border-t">
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <p class="text-gray-600 text-sm mb-1">เช็คอิน</p>
                  <p class="font-semibold text-gray-900">{{ hotel.checkInOut.checkIn }}</p>
                </div>
                <div>
                  <p class="text-gray-600 text-sm mb-1">เช็คเอาท์</p>
                  <p class="font-semibold text-gray-900">{{ hotel.checkInOut.checkOut }}</p>
                </div>
              </div>
            </div>

            <!-- CTA Button -->
            <button class="btn btn-primary w-full mt-6">
              จองเลย
            </button>
          </div>

          <!-- Map -->
          <div v-if="hotel.location?.coordinates" class="bg-white rounded-xl shadow-lg p-6">
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
      <h1 class="text-2xl font-bold text-gray-900 mb-2">ไม่พบโรงแรม</h1>
      <p class="text-gray-600 mb-8">ขออภัย ไม่พบโรงแรมที่คุณค้นหา</p>
      <NuxtLink to="/local-spot/hotels" class="btn btn-primary">
        กลับไปยังรายการโรงแรม
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useHotelsStore } from '~/stores/hotels'

definePageMeta({
  layout: false
})

const route = useRoute()
const hotelsStore = useHotelsStore()

const loading = ref(true)
const currentImageIndex = ref(0)

const hotel = computed(() => hotelsStore.current)

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

onMounted(async () => {
  loading.value = true
  try {
    const id = route.params.id as string
    await hotelsStore.fetchHotel({ body: { _id: id } })
  } catch (error) {
    console.error('Failed to load hotel:', error)
  } finally {
    loading.value = false
  }
})

// SEO
useHead(() => ({
  title: hotel.value ? `${hotel.value.title} - Local Spot` : 'โรงแรม - Local Spot',
  meta: [
    { name: 'description', content: hotel.value?.description || 'รายละเอียดโรงแรม' }
  ]
}))
</script>
