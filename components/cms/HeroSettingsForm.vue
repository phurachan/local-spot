<template>
  <div class="card bg-base-100 shadow">
    <div class="card-body">
      <div class="flex items-center justify-between mb-4">
        <h3 class="card-title text-lg">ส่วน Hero (หน้าแรก)</h3>
        <BaseCheckbox
          v-model="heroData.enabled"
          label="เปิดใช้งาน"
          variant="primary"
        />
      </div>

      <div v-if="heroData.enabled" class="space-y-4">
        <!-- Hero Type Selector -->
        <div class="form-control">
          <label class="label">
            <span class="label-text font-semibold">รูปแบบ Hero</span>
          </label>
          <div class="flex gap-4">
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                v-model="heroData.type"
                value="standard"
                class="radio radio-primary"
              />
              <span>แบบปกติ (Standard)</span>
            </label>
            <label class="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                v-model="heroData.type"
                value="carousel"
                class="radio radio-primary"
              />
              <span>แบบสไลด์รูป (Carousel)</span>
            </label>
          </div>
        </div>

        <!-- Standard Hero Form -->
        <div v-if="heroData.type === 'standard'" class="space-y-4 border-l-4 border-primary pl-4">
          <h4 class="font-semibold text-sm text-gray-600">การตั้งค่าแบบปกติ</h4>

          <BaseInput
            v-model="heroData.title"
            label="หัวข้อ"
            placeholder="ค้นพบสถานที่ท่องเที่ยวท้องถิ่น"
          />

          <BaseTextarea
            v-model="heroData.description"
            label="คำอธิบาย"
            placeholder="สำรวจโรงแรม ร้านอาหาร และกิจกรรมท้องถิ่นที่น่าสนใจ"
            :rows="2"
          />

          <div class="form-control">
            <label class="label">
              <span class="label-text">รูปภาพพื้นหลัง</span>
            </label>
            <div class="flex gap-2">
              <input
                type="text"
                v-model="heroData.image"
                class="input input-bordered flex-1"
                placeholder="https://... หรือเลือกจาก Gallery"
              />
              <button
                type="button"
                @click="openImageGallery('standard')"
                class="btn btn-outline btn-primary"
              >
                <BaseIcon name="photo" size="sm" />
                Gallery
              </button>
            </div>
            <div v-if="heroData.image" class="mt-2">
              <img :src="heroData.image" alt="Preview" class="w-full h-40 object-cover rounded" />
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput
              v-model="heroData.ctaText"
              label="ข้อความปุ่ม CTA"
              placeholder="เริ่มสำรวจ"
            />

            <BaseInput
              v-model="heroData.ctaLink"
              label="ลิงก์ปุ่ม CTA"
              placeholder="/hotels"
            />
          </div>
        </div>

        <!-- Carousel Hero Form -->
        <div v-else-if="heroData.type === 'carousel'" class="space-y-4 border-l-4 border-secondary pl-4">
          <div class="flex items-center justify-between">
            <h4 class="font-semibold text-sm text-gray-600">การตั้งค่าแบบสไลด์รูป</h4>
            <button
              type="button"
              @click="addSlide"
              class="btn btn-sm btn-primary"
            >
              <BaseIcon name="plus" size="sm" />
              เพิ่มสไลด์
            </button>
          </div>

          <!-- Carousel Settings -->
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-base-200 rounded">
            <BaseCheckbox
              v-model="heroData.carousel.autoplay"
              label="เล่นอัตโนมัติ"
              variant="primary"
            />
            <BaseCheckbox
              v-model="heroData.carousel.showIndicators"
              label="แสดง Indicators"
              variant="primary"
            />
            <BaseCheckbox
              v-model="heroData.carousel.showControls"
              label="แสดงปุ่มควบคุม"
              variant="primary"
            />
            <div class="form-control col-span-2 md:col-span-3">
              <label class="label">
                <span class="label-text">ระยะเวลาแสดงแต่ละสไลด์ (มิลลิวินาที)</span>
              </label>
              <input
                type="number"
                v-model.number="heroData.carousel.interval"
                class="input input-bordered"
                min="1000"
                step="1000"
                placeholder="5000"
              />
            </div>
          </div>

          <!-- Slides List -->
          <div v-if="heroData.carousel.slides && heroData.carousel.slides.length > 0" class="space-y-3">
            <div
              v-for="(slide, index) in heroData.carousel.slides"
              :key="index"
              class="card bg-base-200 shadow-sm"
            >
              <div class="card-body p-4">
                <div class="flex items-center justify-between mb-3">
                  <h5 class="font-semibold">สไลด์ที่ {{ index + 1 }}</h5>
                  <div class="flex gap-2">
                    <button
                      type="button"
                      @click="moveSlide(index, 'up')"
                      :disabled="index === 0"
                      class="btn btn-xs btn-ghost"
                    >
                      <BaseIcon name="arrow-up" size="xs" />
                    </button>
                    <button
                      type="button"
                      @click="moveSlide(index, 'down')"
                      :disabled="index === heroData.carousel.slides.length - 1"
                      class="btn btn-xs btn-ghost"
                    >
                      <BaseIcon name="arrow-down" size="xs" />
                    </button>
                    <button
                      type="button"
                      @click="removeSlide(index)"
                      class="btn btn-xs btn-error"
                    >
                      <BaseIcon name="trash" size="xs" />
                    </button>
                  </div>
                </div>

                <div class="space-y-3">
                  <div class="form-control">
                    <label class="label">
                      <span class="label-text">รูปภาพ</span>
                    </label>
                    <div class="flex gap-2">
                      <input
                        type="text"
                        v-model="slide.image"
                        class="input input-sm input-bordered flex-1"
                        placeholder="https://... หรือเลือกจาก Gallery"
                      />
                      <button
                        type="button"
                        @click="openImageGallery('carousel', index)"
                        class="btn btn-sm btn-outline btn-primary"
                      >
                        <BaseIcon name="photo" size="xs" />
                        Gallery
                      </button>
                    </div>
                    <div v-if="slide.image" class="mt-2">
                      <img :src="slide.image" alt="Preview" class="w-full h-32 object-cover rounded" />
                    </div>
                  </div>

                  <input
                    type="text"
                    v-model="slide.title"
                    class="input input-sm input-bordered w-full"
                    placeholder="หัวข้อสไลด์"
                  />

                  <textarea
                    v-model="slide.description"
                    class="textarea textarea-sm textarea-bordered w-full"
                    rows="2"
                    placeholder="คำอธิบาย"
                  ></textarea>

                  <div class="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      v-model="slide.ctaText"
                      class="input input-sm input-bordered"
                      placeholder="ข้อความปุ่ม"
                    />
                    <input
                      type="text"
                      v-model="slide.ctaLink"
                      class="input input-sm input-bordered"
                      placeholder="ลิงก์"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div v-else class="alert">
            <BaseIcon name="information-circle" size="sm" />
            <span>ยังไม่มีสไลด์ กรุณาเพิ่มสไลด์อย่างน้อย 1 สไลด์</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Gallery Modal -->
    <div v-if="showImageGallery" class="fixed inset-0 z-50 overflow-y-auto" @click="showImageGallery = false">
      <div class="flex min-h-screen items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="fixed inset-0 bg-black bg-opacity-50"></div>

        <!-- Modal Content -->
        <div class="relative bg-base-100 rounded-lg shadow-xl max-w-5xl w-full max-h-[90vh] overflow-hidden" @click.stop>
          <!-- Header -->
          <div class="flex items-center justify-between p-6 border-b">
            <h3 class="text-lg font-bold">เลือกรูปภาพจาก Gallery</h3>
            <button @click="showImageGallery = false" class="btn btn-sm btn-circle btn-ghost">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
            <div class="space-y-4">
              <div class="flex gap-2">
                <input
                  type="text"
                  v-model="imageSearchQuery"
                  class="input input-bordered flex-1"
                  placeholder="ค้นหารูปภาพ..."
                  @keyup.enter="searchImages"
                />
                <button class="btn btn-primary" @click="searchImages">
                  <BaseIcon name="magnifying-glass" size="sm" />
                  ค้นหา
                </button>
              </div>

              <BaseLoading v-if="loadingImages" />

              <div v-else-if="galleryImages.length > 0" class="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div
                  v-for="image in galleryImages"
                  :key="image._id"
                  @click="selectImage(image.imageUrl)"
                  class="cursor-pointer hover:opacity-80 transition-opacity border rounded-lg overflow-hidden hover:border-primary"
                >
                  <img
                    :src="image.thumbnailUrl || image.imageUrl"
                    :alt="image.altText"
                    class="w-full h-32 object-cover"
                  />
                  <p class="text-xs p-2 truncate">{{ image.altText }}</p>
                </div>
              </div>

              <div v-else class="alert">
                <BaseIcon name="information-circle" size="sm" />
                <span>ไม่พบรูปภาพ</span>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex justify-end gap-2 p-6 border-t">
            <button @click="showImageGallery = false" class="btn btn-ghost">
              ยกเลิก
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { API_ENDPOINTS } from '~/composables/constants/api'
import { useHttpClient } from '~/composables/utilities/useHttpClient'

interface HeroSlide {
  image: string
  title: string
  description: string
  ctaText: string
  ctaLink: string
  order: number
}

interface HeroSettings {
  enabled: boolean
  type: 'standard' | 'carousel'
  title: string
  description: string
  image: string
  ctaText: string
  ctaLink: string
  carousel: {
    slides: HeroSlide[]
    autoplay: boolean
    interval: number
    showIndicators: boolean
    showControls: boolean
  }
}

interface GalleryImage {
  _id: string
  imageUrl: string
  thumbnailUrl?: string
  altText: string
}

const props = defineProps<{
  modelValue: HeroSettings
}>()

const emit = defineEmits<{
  'update:modelValue': [value: HeroSettings]
}>()

// HTTP Client
const httpClient = useHttpClient()

// Image gallery
const showImageGallery = ref(false)
const imageSearchQuery = ref('')
const galleryImages = ref<GalleryImage[]>([])
const loadingImages = ref(false)
const selectedImageTarget = ref<{ type: 'standard' | 'carousel'; index?: number }>({ type: 'standard' })

// Local reactive data - initialize with default carousel
const initHeroData = (): HeroSettings => {
  const data = { ...props.modelValue }
  if (!data.carousel) {
    data.carousel = {
      slides: [],
      autoplay: true,
      interval: 5000,
      showIndicators: true,
      showControls: true
    }
  }
  return data
}

const heroData = ref<HeroSettings>(initHeroData())

// Watch for changes and emit (with immediate: false to prevent initial trigger)
watch(heroData, (newValue) => {
  emit('update:modelValue', newValue)
}, { deep: true })

// Watch for prop changes (only update if different)
watch(() => props.modelValue, (newValue) => {
  // Only update if the values are actually different to avoid infinite loop
  if (JSON.stringify(newValue) !== JSON.stringify(heroData.value)) {
    heroData.value = initHeroData()
  }
}, { deep: true })

// Slide management
function addSlide() {
  if (!heroData.value.carousel.slides) {
    heroData.value.carousel.slides = []
  }
  heroData.value.carousel.slides.push({
    image: '',
    title: '',
    description: '',
    ctaText: '',
    ctaLink: '',
    order: heroData.value.carousel.slides.length
  })
}

function removeSlide(index: number) {
  if (confirm('ต้องการลบสไลด์นี้หรือไม่?')) {
    heroData.value.carousel.slides.splice(index, 1)
    // Update order
    heroData.value.carousel.slides.forEach((slide, idx) => {
      slide.order = idx
    })
  }
}

function moveSlide(index: number, direction: 'up' | 'down') {
  const newIndex = direction === 'up' ? index - 1 : index + 1
  if (newIndex >= 0 && newIndex < heroData.value.carousel.slides.length) {
    const slides = heroData.value.carousel.slides
    const temp = slides[index]
    if (temp && slides[newIndex]) {
      slides[index] = slides[newIndex]
      slides[newIndex] = temp
      // Update order
      slides.forEach((slide, idx) => {
        if (slide) {
          slide.order = idx
        }
      })
    }
  }
}

// Image gallery functions
function openImageGallery(type: 'standard' | 'carousel', index?: number) {
  selectedImageTarget.value = { type, index }
  showImageGallery.value = true
  searchImages()
}

async function searchImages() {
  loadingImages.value = true
  try {
    const params: any = {}
    if (imageSearchQuery.value) {
      params.search = imageSearchQuery.value
    }

    const response: any = await httpClient.get(API_ENDPOINTS.CMS.IMAGES.LIST, params)
    console.log('Images API response:', response)

    // Handle different response formats
    if (Array.isArray(response)) {
      galleryImages.value = response
    } else if (response.data && Array.isArray(response.data)) {
      galleryImages.value = response.data
    } else if (response.items && Array.isArray(response.items)) {
      galleryImages.value = response.items
    } else {
      console.warn('Unexpected response format:', response)
      galleryImages.value = []
    }

    console.log('Gallery images loaded:', galleryImages.value.length)
  } catch (error) {
    console.error('Error loading images:', error)
    galleryImages.value = []
  } finally {
    loadingImages.value = false
  }
}

function selectImage(imageUrl: string) {
  if (selectedImageTarget.value.type === 'standard') {
    heroData.value.image = imageUrl
  } else if (selectedImageTarget.value.type === 'carousel' && selectedImageTarget.value.index !== undefined) {
    const slide = heroData.value.carousel.slides[selectedImageTarget.value.index]
    if (slide) {
      slide.image = imageUrl
    }
  }
  showImageGallery.value = false
}
</script>
