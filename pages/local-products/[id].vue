<template>
  <div class="min-h-screen bg-gray-50">

    <PublicHeaderWrapper active-page="local-products" />

    <BaseLoading v-if="loading" class="py-12 sm:py-20" />

    <div v-else-if="product" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex mb-6 text-sm">
        <NuxtLink to="/" class="text-gray-500 hover:text-gray-700">หน้าแรก</NuxtLink>
        <span class="mx-2 text-gray-400">/</span>
        <NuxtLink to="/local-products" class="text-gray-500 hover:text-gray-700">สินค้าท้องถิ่น</NuxtLink>
        <span class="mx-2 text-gray-400">/</span>
        <span class="text-gray-900">{{ product.title }}</span>
      </nav>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Image Gallery -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-4 sm:mb-6">
            <div class="aspect-square bg-gray-200">
              <img
                v-if="currentImage"
                :src="currentImage"
                :alt="product.title"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-400 to-yellow-500">
                <svg class="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            <div v-if="product.images && product.images.length > 1" class="grid grid-cols-4 gap-2 p-4">
              <div
                v-for="(image, index) in product.images"
                :key="index"
                @click="currentImageIndex = index"
                class="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                :class="{ 'ring-2 ring-amber-500': index === currentImageIndex }"
              >
                <img :src="image" :alt="`${product.title} ${index + 1}`" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <!-- Product Info -->
          <div class="bg-white rounded-xl shadow-lg p-6 mb-4 sm:mb-6">
            <div class="flex items-start justify-between mb-4">
              <h1 class="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">{{ product.title }}</h1>
              <span v-if="product.featured" class="badge badge-secondary">แนะนำ</span>
            </div>

            <div class="flex items-center gap-4 mb-4 sm:mb-6">
              <span class="badge badge-warning badge-lg">{{ getCategoryLabel(product.category) }}</span>
              <div v-if="product.price" class="text-xl sm:text-2xl md:text-3xl font-bold text-amber-600">
                ฿{{ product.price.toLocaleString() }}
              </div>
            </div>

            <div v-if="product.availability" class="mb-4 sm:mb-6">
              <span class="badge badge-success">
                มีสินค้า
                <span v-if="product.availability.stockQuantity"> ({{ product.availability.stockQuantity }} ชิ้น)</span>
              </span>
              <span v-if="product.availability.seasonality" class="badge badge-outline ml-2">
                {{ product.availability.seasonality }}
              </span>
            </div>

            <div class="prose max-w-none">
              <h2 class="text-xl font-semibold mb-3 text-gray-900">รายละเอียดสินค้า</h2>
              <p class="text-gray-700 whitespace-pre-line">{{ product.description }}</p>
            </div>
          </div>

          <!-- Product Details -->
          <div class="bg-white rounded-xl shadow-lg p-6 mb-4 sm:mb-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900">ข้อมูลสินค้า</h2>

            <div class="space-y-4">
              <!-- Materials -->
              <div v-if="product.materials && product.materials.length > 0">
                <h3 class="font-semibold text-gray-900 mb-2">วัสดุ</h3>
                <div class="flex flex-wrap gap-2">
                  <span v-for="material in product.materials" :key="material" class="badge badge-outline">{{ material }}</span>
                </div>
              </div>

              <!-- Dimensions -->
              <div v-if="product.dimensions">
                <h3 class="font-semibold text-gray-900 mb-2">ขนาด</h3>
                <p class="text-gray-700">
                  <span v-if="product.dimensions.width">กว้าง {{ product.dimensions.width }} ซม.</span>
                  <span v-if="product.dimensions.height"> x สูง {{ product.dimensions.height }} ซม.</span>
                  <span v-if="product.dimensions.length"> x ยาว {{ product.dimensions.length }} ซม.</span>
                  <span v-if="product.dimensions.weight"> (น้ำหนัก {{ product.dimensions.weight }} กรัม)</span>
                </p>
              </div>

              <!-- Origin -->
              <div v-if="product.origin">
                <h3 class="font-semibold text-gray-900 mb-2">แหล่งผลิต</h3>
                <p class="text-gray-700">{{ product.origin }}</p>
              </div>

              <!-- Certifications -->
              <div v-if="product.certifications && product.certifications.length > 0">
                <h3 class="font-semibold text-gray-900 mb-2">การรับรอง</h3>
                <div class="flex flex-wrap gap-2">
                  <span v-for="cert in product.certifications" :key="cert" class="badge badge-success badge-outline">{{ cert }}</span>
                </div>
              </div>

              <!-- Features -->
              <div v-if="product.features && product.features.length > 0">
                <h3 class="font-semibold text-gray-900 mb-2">จุดเด่น</h3>
                <ul class="list-disc list-inside space-y-1 text-gray-700">
                  <li v-for="feature in product.features" :key="feature">{{ feature }}</li>
                </ul>
              </div>

              <!-- Care Instructions -->
              <div v-if="product.careInstructions && product.careInstructions.length > 0">
                <h3 class="font-semibold text-gray-900 mb-2">วิธีดูแล</h3>
                <ul class="list-disc list-inside space-y-1 text-gray-700">
                  <li v-for="instruction in product.careInstructions" :key="instruction">{{ instruction }}</li>
                </ul>
              </div>

              <!-- Shelf Life -->
              <div v-if="product.shelfLife">
                <h3 class="font-semibold text-gray-900 mb-2">อายุการเก็บ</h3>
                <p class="text-gray-700">{{ product.shelfLife }}</p>
              </div>

              <!-- Ingredients -->
              <div v-if="product.ingredients && product.ingredients.length > 0">
                <h3 class="font-semibold text-gray-900 mb-2">ส่วนประกอบ</h3>
                <p class="text-gray-700">{{ product.ingredients.join(', ') }}</p>
              </div>
            </div>
          </div>

          <!-- Vendor Info -->
          <div v-if="product.vendor" class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900">ผู้ผลิต/จำหน่าย</h2>

            <div class="flex items-start space-x-4">
              <div v-if="product.vendor.logo" class="flex-shrink-0">
                <img :src="product.vendor.logo" :alt="product.vendor.name" class="w-16 h-16 rounded-lg object-cover" />
              </div>
              <div class="flex-1">
                <h3 class="font-semibold text-gray-900 mb-2">{{ product.vendor.name }}</h3>
                <p v-if="product.vendor.description" class="text-gray-700 mb-2">{{ product.vendor.description }}</p>

                <div v-if="product.vendor.contactInfo" class="text-sm text-gray-600 space-y-1">
                  <div v-if="product.vendor.contactInfo.phone && product.vendor.contactInfo.phone.length > 0">
                    <span class="font-semibold">โทร:</span>
                    <span v-for="(phone, index) in product.vendor.contactInfo.phone" :key="phone">
                      {{ phone }}<span v-if="index < product.vendor.contactInfo.phone.length - 1">, </span>
                    </span>
                  </div>
                  <div v-if="product.vendor.contactInfo.email">
                    <span class="font-semibold">Email:</span> {{ Array.isArray(product.vendor.contactInfo.email) ? product.vendor.contactInfo.email.join(', ') : product.vendor.contactInfo.email }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12 mt-12">
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
    <PublicFooterWrapper />

  </div>
</template>

<script setup lang="ts">
import { useLocalProductsStore } from '~/stores/localProducts'

definePageMeta({
  layout: false
})

const route = useRoute()
const localProductsStore = useLocalProductsStore()

const loading = ref(true)
const currentImageIndex = ref(0)

// Public header with settings
const { siteName } = usePublicSettings()

const product = computed(() => localProductsStore.current)
const currentImage = computed(() => {
  if (!product.value?.images || product.value.images.length === 0) return null
  return product.value.images[currentImageIndex.value]
})

function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    food: 'อาหาร',
    handicraft: 'หัตถกรรม',
    textile: 'ผ้าและสิ่งทอ',
    souvenir: 'ของฝาก',
    agriculture: 'เกษตรกรรม'
  }
  return labels[category] || category
}

function getAvailabilityLabel(availability: string) {
  const labels: Record<string, string> = {
    in_stock: 'มีสินค้า',
    low_stock: 'เหลือน้อย',
    out_of_stock: 'สินค้าหมด',
    pre_order: 'รับสั่งล่วงหน้า'
  }
  return labels[availability] || availability
}

onMounted(async () => {
  loading.value = true
  try {
    const id = route.params.id as string
    await localProductsStore.fetchLocalProduct({ body: { _id: id } })
  } catch (error) {
    console.error('Failed to load local product:', error)
  } finally {
    loading.value = false
  }
})

// SEO
useHead({
  title: computed(() => product.value ? `${product.value.title} - ${siteName.value}` : 'สินค้าท้องถิ่น - ${siteName.value}'),
  meta: computed(() => [
    { name: 'description', content: product.value?.description || 'สินค้าท้องถิ่นคุณภาพ' }
  ])
})
</script>

<style scoped>

.prose {
  max-width: none;
}
</style>
