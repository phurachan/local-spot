<template>
  <form @submit.prevent="handleSubmit">
    <BaseInput
      v-model="formData.title"
      label="ชื่อรูปภาพ"
      placeholder="ชื่อรูปภาพ"
      :required="true"
      :error="errors.title"
    />

    <BaseInput
      v-model="formData.altText"
      label="Alt Text"
      placeholder="คำอธิบายสำหรับ SEO"
      :required="true"
      :error="errors.altText"
    />

    <BaseTextarea
      v-model="formData.description"
      label="คำอธิบาย"
      placeholder="คำอธิบายรูปภาพ"
      :rows="3"
    />

    <BaseInput
      v-model="formData.caption"
      label="Caption"
      placeholder="คำบรรยายใต้รูป"
    />

    <BaseSelect
      v-model="formData.category"
      label="หมวดหมู่"
      :required="true"
      :options="[
        { label: 'โรงแรม', value: 'hotel' },
        { label: 'ร้านอาหาร', value: 'restaurant' },
        { label: 'บริการท่องเที่ยว', value: 'travel_service' },
        { label: 'สินค้าท้องถิ่น', value: 'local_product' },
        { label: 'กิจกรรม', value: 'event' },
        { label: 'สถานที่ท่องเที่ยว', value: 'attraction' },
        { label: 'ทั่วไป', value: 'general' }
      ]"
    />

    <BaseInput
      v-model="formData.photographer"
      label="ช่างภาพ"
      placeholder="ชื่อช่างภาพ (Optional)"
    />

    <BaseInput
      v-model="tagsInput"
      label="แท็ก"
      placeholder="แท็ก (คั่นด้วยเครื่องหมาย ,)"
      hint="สามารถใส่หลายแท็ก คั่นด้วยเครื่องหมาย ,"
      @blur="updateTags"
    />

    <div class="grid grid-cols-2 gap-4">
      <BaseCheckbox
        v-model="formData.isActive"
        label="เปิดใช้งาน"
        variant="primary"
      />

      <BaseCheckbox
        v-model="formData.featured"
        label="แนะนำ"
        variant="secondary"
      />
    </div>

    <div class="flex justify-end gap-2 mt-4">
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
import type { ImageGalleryContent } from '~/composables/data_models/cms'

interface Props {
  image?: ImageGalleryContent | null
  isEditing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  image: null,
  isEditing: false
})

const emit = defineEmits<{
  save: [data: ImageGalleryContent]
  cancel: []
}>()

// Form data
const formData = ref<ImageGalleryContent>({
  type: 'image_gallery',
  title: '',
  description: '',
  images: [],
  isActive: true,
  featured: false,
  order: 0,
  tags: [],
  category: 'general',
  imageUrl: '',
  altText: '',
  caption: '',
  photographer: ''
})

// Helper inputs
const tagsInput = ref('')

// Form state
const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

// Reset form to initial state
function resetForm() {
  // Reset errors
  errors.value = {}

  formData.value = {
    type: 'image_gallery',
    title: '',
    description: '',
    images: [],
    isActive: true,
    featured: false,
    order: 0,
    tags: [],
    category: 'general',
    imageUrl: '',
    altText: '',
    caption: '',
    photographer: ''
  }
  tagsInput.value = ''
}

// Watch for image changes and initialize form
watch(
  () => props.image,
  (newImage) => {
    // Reset errors first
    errors.value = {}

    if (newImage && props.isEditing) {
      formData.value = { ...newImage }
      tagsInput.value = newImage.tags?.join(', ') || ''
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

// Update tags
function updateTags() {
  formData.value.tags = tagsInput.value
    .split(',')
    .map(t => t.trim())
    .filter(t => t)
}

// Validate form
function validateForm(): boolean {
  errors.value = {}

  if (!formData.value.title.trim()) {
    errors.value.title = 'กรุณากรอกชื่อรูปภาพ'
  }

  if (!formData.value.altText.trim()) {
    errors.value.altText = 'กรุณากรอก Alt Text'
  }

  return Object.keys(errors.value).length === 0
}

// Handle submit
async function handleSubmit() {
  updateTags()

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