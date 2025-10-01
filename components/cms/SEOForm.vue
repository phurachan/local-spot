<template>
  <form @submit.prevent="handleSubmit">
    <!-- Basic Information -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ข้อมูลพื้นฐาน</h4>

        <BaseInput
          v-model="formData.pageUrl"
          label="URL หน้าเว็บ"
          placeholder="/local-spot/hotels"
          :required="true"
          :error="errors.pageUrl"
        />

        <BaseInput
          v-model="formData.pageTitle"
          label="Page Title"
          placeholder="ชื่อหน้าเว็บ (แสดงบน Browser Tab)"
          :required="true"
          :error="errors.pageTitle"
          hint="แนะนำ 50-60 ตัวอักษร"
        />

        <BaseTextarea
          v-model="formData.metaDescription"
          label="Meta Description"
          placeholder="คำอธิบายหน้าเว็บ (แสดงใน Search Result)"
          :required="true"
          :error="errors.metaDescription"
          :rows="3"
          hint="แนะนำ 150-160 ตัวอักษร"
        />

        <BaseInput
          v-model="metaKeywordsInput"
          label="Meta Keywords"
          placeholder="คำค้นหา (คั่นด้วยเครื่องหมาย ,)"
          hint="เช่น โรงแรม, ที่พัก, เชียงใหม่"
          @blur="updateMetaKeywords"
        />

        <BaseInput
          v-model="formData.canonicalUrl"
          type="url"
          label="Canonical URL"
          placeholder="https://example.com/page"
          hint="URL หลักที่ต้องการให้ Search Engine จัดอันดับ"
        />
      </div>
    </div>

    <!-- Open Graph (Facebook) -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">Open Graph (Facebook)</h4>

        <BaseInput
          v-model="formData.ogTitle"
          label="OG Title"
          placeholder="ชื่อสำหรับแชร์บน Facebook"
        />

        <BaseTextarea
          v-model="formData.ogDescription"
          label="OG Description"
          placeholder="คำอธิบายสำหรับแชร์บน Facebook"
          :rows="2"
        />

        <BaseInput
          v-model="formData.ogImage"
          type="url"
          label="OG Image"
          placeholder="https://example.com/og-image.jpg"
          hint="แนะนำ 1200x630 px"
        />

        <BaseSelect
          v-model="formData.ogType"
          label="OG Type"
          :options="[
            { label: 'Website', value: 'website' },
            { label: 'Article', value: 'article' },
            { label: 'Product', value: 'product' },
            { label: 'Place', value: 'place' }
          ]"
        />
      </div>
    </div>

    <!-- Twitter Card -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">Twitter Card</h4>

        <BaseSelect
          v-model="formData.twitterCard"
          label="Twitter Card Type"
          :options="[
            { label: 'Summary', value: 'summary' },
            { label: 'Summary Large Image', value: 'summary_large_image' },
            { label: 'App', value: 'app' },
            { label: 'Player', value: 'player' }
          ]"
        />

        <BaseInput
          v-model="formData.twitterTitle"
          label="Twitter Title"
          placeholder="ชื่อสำหรับแชร์บน Twitter"
        />

        <BaseTextarea
          v-model="formData.twitterDescription"
          label="Twitter Description"
          placeholder="คำอธิบายสำหรับแชร์บน Twitter"
          :rows="2"
        />

        <BaseInput
          v-model="formData.twitterImage"
          type="url"
          label="Twitter Image"
          placeholder="https://example.com/twitter-image.jpg"
          hint="แนะนำ 800x418 px"
        />
      </div>
    </div>

    <!-- Structured Data (Schema.org) -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">Structured Data (Schema.org)</h4>

        <BaseTextarea
          v-model="structuredDataInput"
          label="JSON-LD Schema"
          placeholder='{"@context": "https://schema.org", "@type": "Organization", "name": "..."}'
          :rows="6"
          hint="Structured Data ในรูปแบบ JSON-LD"
          @blur="updateStructuredData"
        />
      </div>
    </div>

    <!-- Status -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <BaseCheckbox
          v-model="formData.isActive"
          label="เปิดใช้งาน"
          variant="primary"
        />
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-2">
      <BaseButton @click="$emit('cancel')" variant="ghost">
        ยกเลิก
      </BaseButton>
      <BaseButton type="submit" variant="primary" :loading="isSubmitting">
        บันทึก
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { SEOMetaContent } from '~/composables/data_models/cms'

interface Props {
  seo?: SEOMetaContent | null
  isEditing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  seo: null,
  isEditing: false
})

const emit = defineEmits<{
  save: [data: SEOMetaContent]
  cancel: []
}>()

// Form data
const formData = ref<SEOMetaContent>({
  pageUrl: '',
  pageTitle: '',
  metaDescription: '',
  metaKeywords: [],
  ogTitle: '',
  ogDescription: '',
  ogImage: '',
  ogType: 'website',
  twitterCard: 'summary',
  twitterTitle: '',
  twitterDescription: '',
  twitterImage: '',
  canonicalUrl: '',
  structuredData: {},
  isActive: true
})

// Helper inputs
const metaKeywordsInput = ref('')
const structuredDataInput = ref('')

// Form state
const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

// Reset form to initial state
function resetForm() {
  // Reset errors
  errors.value = {}

  formData.value = {
    pageUrl: '',
    pageTitle: '',
    metaDescription: '',
    metaKeywords: [],
    ogTitle: '',
    ogDescription: '',
    ogImage: '',
    ogType: 'website',
    twitterCard: 'summary',
    twitterTitle: '',
    twitterDescription: '',
    twitterImage: '',
    canonicalUrl: '',
    structuredData: {},
    isActive: true
  }
  metaKeywordsInput.value = ''
  structuredDataInput.value = ''
}

// Watch for SEO changes and initialize form
watch(
  () => props.seo,
  (newSEO) => {
    // Reset errors first
    errors.value = {}

    if (newSEO && props.isEditing) {
      formData.value = { ...newSEO }
      metaKeywordsInput.value = newSEO.metaKeywords?.join(', ') || ''
      structuredDataInput.value = newSEO.structuredData
        ? JSON.stringify(newSEO.structuredData, null, 2)
        : ''
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

// Update meta keywords
function updateMetaKeywords() {
  formData.value.metaKeywords = metaKeywordsInput.value
    .split(',')
    .map(k => k.trim())
    .filter(k => k)
}

// Update structured data
function updateStructuredData() {
  try {
    if (structuredDataInput.value.trim()) {
      formData.value.structuredData = JSON.parse(structuredDataInput.value)
    } else {
      formData.value.structuredData = {}
    }
  } catch (error) {
    console.error('Invalid JSON in structured data:', error)
    useToast().error('รูปแบบ JSON ไม่ถูกต้อง')
  }
}

// Validate form
function validateForm(): boolean {
  errors.value = {}

  if (!formData.value.pageUrl.trim()) {
    errors.value.pageUrl = 'กรุณากรอก URL หน้าเว็บ'
  }

  if (!formData.value.pageTitle.trim()) {
    errors.value.pageTitle = 'กรุณากรอก Page Title'
  }

  if (!formData.value.metaDescription.trim()) {
    errors.value.metaDescription = 'กรุณากรอก Meta Description'
  }

  // Check character length recommendations
  if (formData.value.pageTitle.length > 60) {
    useToast().warning('Page Title ยาวเกินไป แนะนำไม่เกิน 60 ตัวอักษร')
  }

  if (formData.value.metaDescription.length > 160) {
    useToast().warning('Meta Description ยาวเกินไป แนะนำไม่เกิน 160 ตัวอักษร')
  }

  return Object.keys(errors.value).length === 0
}

// Handle submit
async function handleSubmit() {
  // Update all fields before validation
  updateMetaKeywords()
  updateStructuredData()

  if (!validateForm()) {
    useToast().error('กรุณากรอกข้อมูลให้ครบถ้วน')
    return
  }

  isSubmitting.value = true

  try {
    emit('save', formData.value)
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>