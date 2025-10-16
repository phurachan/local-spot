<template>
  <div class="p-6">
    <BasePageHeader
      title="ตั้งค่าเว็บไซต์"
      code="SETTINGS-001"
      description="จัดการการตั้งค่าทั่วไปของเว็บไซต์"
      :breadcrumbs="breadcrumbs"
    />

    <BaseLoading v-if="loading" class="py-20" />

    <form v-else @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Brand & Identity -->
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h3 class="card-title text-lg mb-4">แบรนด์และข้อมูลพื้นฐาน</h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BaseInput
              v-model="formData.siteName"
              label="ชื่อเว็บไซต์"
              placeholder="Local Spot"
              :required="true"
            />

            <BaseInput
              v-model="formData.siteTagline"
              label="สโลแกน"
              placeholder="แพลตฟอร์มท่องเที่ยวท้องถิ่น"
            />
          </div>

          <BaseTextarea
            v-model="formData.siteDescription"
            label="คำอธิบายเว็บไซต์"
            placeholder="แพลตฟอร์มท่องเที่ยวท้องถิ่น ค้นพบที่พัก ร้านอาหาร และกิจกรรมท้องถิ่น"
            :required="true"
            :rows="3"
          />

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">โลโก้</span>
              </label>
              <BaseImagePicker
                v-model="logoImages"
                :multiple="false"
                :max-images="1"
                category="general"
              />
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">Favicon</span>
              </label>
              <BaseImagePicker
                v-model="faviconImages"
                :multiple="false"
                :max-images="1"
                category="general"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Colors & Theme -->
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h3 class="card-title text-lg mb-4">สีและธีม</h3>

          <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div class="form-control">
              <label class="label">
                <span class="label-text">สีหลัก (Primary)</span>
              </label>
              <div class="flex gap-2">
                <input
                  type="color"
                  :value="formData.colors.primary || '#10b981'"
                  @input="formData.colors.primary = $event.target.value"
                  class="w-14 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  v-model="formData.colors.primary"
                  class="input input-bordered flex-1"
                  placeholder="#10b981"
                />
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">สีรอง (Secondary)</span>
              </label>
              <div class="flex gap-2">
                <input
                  type="color"
                  :value="formData.colors.secondary || '#0d9488'"
                  @input="formData.colors.secondary = $event.target.value"
                  class="w-14 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  v-model="formData.colors.secondary"
                  class="input input-bordered flex-1"
                  placeholder="#0d9488"
                />
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">สีเสริม (Accent)</span>
              </label>
              <div class="flex gap-2">
                <input
                  type="color"
                  :value="formData.colors.accent || '#f59e0b'"
                  @input="formData.colors.accent = $event.target.value"
                  class="w-14 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  v-model="formData.colors.accent"
                  class="input input-bordered flex-1"
                  placeholder="#f59e0b"
                />
              </div>
            </div>

            <div class="form-control">
              <label class="label">
                <span class="label-text">สีกลาง (Neutral)</span>
              </label>
              <div class="flex gap-2">
                <input
                  type="color"
                  :value="formData.colors.neutral || '#6b7280'"
                  @input="formData.colors.neutral = $event.target.value"
                  class="w-14 h-10 rounded cursor-pointer"
                />
                <input
                  type="text"
                  v-model="formData.colors.neutral"
                  class="input input-bordered flex-1"
                  placeholder="#6b7280"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Hero Section -->
      <HeroSettingsForm v-model="formData.hero" />

      <!-- Contact Information -->
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h3 class="card-title text-lg mb-4">ข้อมูลติดต่อ</h3>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <BaseInput
              v-model="formData.contact.email"
              label="อีเมล"
              type="email"
              placeholder="info@localspot.com"
            />

            <BaseInput
              v-model="formData.contact.phone"
              label="เบอร์โทรศัพท์"
              placeholder="02-xxx-xxxx"
            />

            <BaseInput
              v-model="formData.contact.address"
              label="ที่อยู่"
              placeholder="123 ถนน..."
            />
          </div>

          <div class="divider">โซเชียลมีเดีย</div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <BaseInput
              v-model="formData.contact.socialMedia.facebook"
              label="Facebook"
              placeholder="https://facebook.com/..."
            />

            <BaseInput
              v-model="formData.contact.socialMedia.instagram"
              label="Instagram"
              placeholder="https://instagram.com/..."
            />

            <BaseInput
              v-model="formData.contact.socialMedia.twitter"
              label="Twitter"
              placeholder="https://twitter.com/..."
            />

            <BaseInput
              v-model="formData.contact.socialMedia.line"
              label="LINE"
              placeholder="@localspot"
            />

            <BaseInput
              v-model="formData.contact.socialMedia.youtube"
              label="YouTube"
              placeholder="https://youtube.com/..."
            />
          </div>
        </div>
      </div>

      <!-- SEO & Meta -->
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h3 class="card-title text-lg mb-4">SEO & Meta Tags</h3>

          <div class="grid grid-cols-1 gap-4">
            <BaseInput
              v-model="formData.seo.metaTitle"
              label="Meta Title"
              placeholder="Local Spot - แพลตฟอร์มท่องเที่ยวท้องถิ่น"
            />

            <BaseTextarea
              v-model="formData.seo.metaDescription"
              label="Meta Description"
              placeholder="ค้นพบที่พัก ร้านอาหาร และกิจกรรมท้องถิ่น..."
              :rows="2"
            />

            <BaseInput
              v-model="keywordsInput"
              label="Keywords (คั่นด้วยเครื่องหมาย ,)"
              placeholder="ท่องเที่ยว, โรงแรม, ร้านอาหาร"
              @blur="updateKeywords"
            />

            <BaseInput
              v-model="formData.seo.ogImage"
              label="OG Image URL"
              placeholder="https://..."
            />
          </div>
        </div>
      </div>

      <!-- Features & Modules -->
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h3 class="card-title text-lg mb-4">เปิด/ปิด โมดูล</h3>

          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <BaseCheckbox
              v-model="formData.features.enableHotels"
              label="โรงแรม"
              variant="primary"
            />

            <BaseCheckbox
              v-model="formData.features.enableRestaurants"
              label="ร้านอาหาร"
              variant="primary"
            />

            <BaseCheckbox
              v-model="formData.features.enableTravelServices"
              label="บริการท่องเที่ยว"
              variant="primary"
            />

            <BaseCheckbox
              v-model="formData.features.enableLocalProducts"
              label="ผลิตภัณฑ์ท้องถิ่น"
              variant="primary"
            />

            <BaseCheckbox
              v-model="formData.features.enableEvents"
              label="กิจกรรม"
              variant="primary"
            />

            <BaseCheckbox
              v-model="formData.features.enableNews"
              label="ข่าวสาร"
              variant="primary"
            />
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="card bg-base-100 shadow">
        <div class="card-body">
          <h3 class="card-title text-lg mb-4">Footer</h3>

          <BaseInput
            v-model="formData.footer.copyrightText"
            label="ข้อความลิขสิทธิ์"
            placeholder="© 2024 Local Spot. All rights reserved."
          />
        </div>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-4">
        <BaseButton
          @click="loadSettings"
          variant="ghost"
          type="button"
        >
          รีเซ็ต
        </BaseButton>
        <BaseButton
          type="submit"
          variant="primary"
          :loading="saving"
        >
          บันทึกการตั้งค่า
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { WebSettings } from '~/composables/data_models/cms'
import { useWebSettingsStore } from '~/stores/webSettings'
import HeroSettingsForm from '~/components/cms/HeroSettingsForm.vue'

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const settingsStore = useWebSettingsStore()
const { applyColors } = useApplyWebColors()

// Breadcrumbs
const breadcrumbs = [
  { label: 'CMS Dashboard', to: '/manage-cms' },
  { label: 'ตั้งค่าเว็บไซต์', to: '/manage-cms/settings', current: true }
]

const loading = ref(true)
const saving = ref(false)
const keywordsInput = ref('')
const logoImages = ref<string[]>([])
const faviconImages = ref<string[]>([])

// Form data with defaults
const formData = ref<Partial<WebSettings>>({
  siteName: 'Local Spot',
  siteDescription: 'แพลตฟอร์มท่องเที่ยวท้องถิ่น',
  siteTagline: '',
  logo: '',
  favicon: '',
  colors: {
    primary: '#10b981',
    secondary: '#0d9488',
    accent: '',
    neutral: ''
  },
  hero: {
    enabled: true,
    type: 'standard',
    title: 'ค้นพบสถานที่ท่องเที่ยวท้องถิ่น',
    description: 'สำรวจโรงแรม ร้านอาหาร และกิจกรรมท้องถิ่นที่น่าสนใจ',
    image: '',
    ctaText: '',
    ctaLink: '',
    carousel: {
      slides: [],
      autoplay: true,
      interval: 5000,
      showIndicators: true,
      showControls: true
    }
  },
  contact: {
    email: '',
    phone: '',
    address: '',
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      line: '',
      youtube: ''
    }
  },
  seo: {
    metaTitle: '',
    metaDescription: '',
    keywords: [],
    ogImage: ''
  },
  features: {
    enableHotels: true,
    enableRestaurants: true,
    enableTravelServices: true,
    enableLocalProducts: true,
    enableEvents: true,
    enableNews: true
  },
  footer: {
    copyrightText: '',
    links: []
  }
})

// Load settings
async function loadSettings() {
  loading.value = true
  try {
    await settingsStore.fetchSettings()
    if (settingsStore.settings) {
      formData.value = {
        ...formData.value,
        ...settingsStore.settings
      }
      keywordsInput.value = settingsStore.settings.seo?.keywords?.join(', ') || ''

      // Convert logo and favicon strings to arrays for ImagePicker
      logoImages.value = settingsStore.settings.logo ? [settingsStore.settings.logo] : []
      faviconImages.value = settingsStore.settings.favicon ? [settingsStore.settings.favicon] : []
    }
  } catch (error) {
    console.error('Error loading settings:', error)
  } finally {
    loading.value = false
  }
}

// Update keywords array from input
function updateKeywords() {
  if (keywordsInput.value) {
    formData.value.seo = formData.value.seo || {}
    formData.value.seo.keywords = keywordsInput.value
      .split(',')
      .map(k => k.trim())
      .filter(k => k.length > 0)
  }
}

// Submit form
async function handleSubmit() {
  updateKeywords()

  // Convert logo and favicon arrays back to strings
  formData.value.logo = logoImages.value[0] || ''
  formData.value.favicon = faviconImages.value[0] || ''

  saving.value = true
  try {
    await settingsStore.updateSettings(formData.value)
    // Apply colors immediately after save
    applyColors()
  } catch (error) {
    console.error('Error saving settings:', error)
  } finally {
    saving.value = false
  }
}

// Load on mount
onMounted(() => {
  loadSettings()
})
</script>
