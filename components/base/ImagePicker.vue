<template>
  <div>
    <!-- Selected Images Preview -->
    <div v-if="selectedImages.length > 0" class="mb-4">
      <label class="label">
        <span class="label-text">รูปภาพที่เลือก</span>
      </label>
      <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        <div
          v-for="(image, index) in selectedImages"
          :key="image"
          class="relative group"
        >
          <img
            :src="image"
            class="w-full aspect-square object-cover rounded-lg"
          />
          <button
            @click="removeImage(index)"
            class="btn btn-xs btn-circle btn-error absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-2">
      <BaseButton
        @click="openModal"
        variant="outline"
        icon-left="photo"
      >
        เลือกจาก Gallery
      </BaseButton>

      <BaseButton
        @click="openUploadModal"
        variant="primary"
        icon-left="arrow-up-tray"
      >
        อัปโหลดใหม่
      </BaseButton>
    </div>

    <!-- Image Gallery Modal -->
    <dialog ref="galleryModal" class="modal">
      <div class="modal-box max-w-6xl">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 class="font-bold text-lg mb-4">เลือกรูปภาพจาก Gallery</h3>

        <!-- Filters -->
        <div class="mb-4">
          <BaseSelect
            v-model="filterCategory"
            label="หมวดหมู่"
            :options="categoryOptions"
            @change="loadGalleryImages"
          />
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex justify-center p-8">
          <BaseLoading />
        </div>

        <!-- Images Grid -->
        <div v-else class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-96 overflow-y-auto">
          <div
            v-for="image in galleryImages"
            :key="image._id"
            @click="toggleSelectImage(image.imageUrl)"
            class="cursor-pointer relative group"
            :class="{ 'ring-4 ring-primary': isSelected(image.imageUrl) }"
          >
            <img
              :src="image.thumbnailUrl || image.imageUrl"
              :alt="image.altText"
              class="w-full aspect-square object-cover rounded-lg"
            />
            <div
              v-if="isSelected(image.imageUrl)"
              class="absolute inset-0 bg-primary/20 rounded-lg flex items-center justify-center"
            >
              <BaseIcon name="check-circle" size="lg" class="text-primary" />
            </div>
          </div>
        </div>

        <div class="modal-action">
          <form method="dialog">
            <BaseButton variant="ghost">ยกเลิก</BaseButton>
          </form>
          <BaseButton @click="confirmSelection" variant="primary">
            เลือก ({{ tempSelected.length }})
          </BaseButton>
        </div>
      </div>
    </dialog>

    <!-- Upload Modal -->
    <dialog ref="uploadModal" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 class="font-bold text-lg mb-4">อัปโหลดรูปภาพใหม่</h3>

        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">เลือกไฟล์</span>
          </label>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            multiple
            @change="handleFileSelect"
            class="file-input file-input-bordered"
          />
        </div>

        <BaseSelect
          v-model="uploadCategory"
          label="หมวดหมู่"
          :options="categoryOptions"
          :required="true"
        />

        <BaseInput
          v-model="uploadAltText"
          label="Alt Text"
          placeholder="คำอธิบายรูปภาพ"
          :required="true"
        />

        <div class="modal-action">
          <form method="dialog">
            <BaseButton variant="ghost">ยกเลิก</BaseButton>
          </form>
          <BaseButton
            @click="handleUpload"
            variant="primary"
            :loading="uploading"
            :disabled="!selectedFiles.length"
          >
            อัปโหลด
          </BaseButton>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { useImagesStore } from '~/stores/images'

interface Props {
  modelValue: string[]
  category?: string
  multiple?: boolean
  maxImages?: number
}

const props = withDefaults(defineProps<Props>(), {
  category: 'general',
  multiple: true,
  maxImages: 10
})

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

// Stores
const imagesStore = useImagesStore()

// State
const selectedImages = ref<string[]>([...props.modelValue])
const tempSelected = ref<string[]>([])
const galleryImages = ref<any[]>([])
const loading = ref(false)
const filterCategory = ref(props.category)
const selectedFiles = ref<File[]>([])
const uploading = ref(false)
const uploadCategory = ref(props.category)
const uploadAltText = ref('')

// Modal refs
const galleryModal = ref<HTMLDialogElement>()
const uploadModal = ref<HTMLDialogElement>()
const fileInput = ref<HTMLInputElement>()

// Options
const categoryOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'hotel', label: 'โรงแรม' },
  { value: 'restaurant', label: 'ร้านอาหาร' },
  { value: 'travel_service', label: 'บริการท่องเที่ยว' },
  { value: 'local_product', label: 'สินค้าท้องถิ่น' },
  { value: 'event', label: 'กิจกรรม' },
  { value: 'attraction', label: 'สถานที่ท่องเที่ยว' },
  { value: 'general', label: 'ทั่วไป' }
]

// Methods
function openModal() {
  tempSelected.value = [...selectedImages.value]
  loadGalleryImages()
  galleryModal.value?.showModal()
}

function openUploadModal() {
  selectedFiles.value = []
  uploadCategory.value = props.category
  uploadAltText.value = ''
  uploadModal.value?.showModal()
}

async function loadGalleryImages() {
  loading.value = true
  try {
    await imagesStore.fetchImages({
      query: {
        category: filterCategory.value || undefined,
        limit: 100
      }
    })
    galleryImages.value = imagesStore.list || []
  } catch (error) {
    console.error('Failed to load gallery images:', error)
  } finally {
    loading.value = false
  }
}

function isSelected(imageUrl: string): boolean {
  return tempSelected.value.includes(imageUrl)
}

function toggleSelectImage(imageUrl: string) {
  if (!props.multiple) {
    tempSelected.value = [imageUrl]
    return
  }

  const index = tempSelected.value.indexOf(imageUrl)
  if (index > -1) {
    tempSelected.value.splice(index, 1)
  } else {
    if (tempSelected.value.length < props.maxImages) {
      tempSelected.value.push(imageUrl)
    } else {
      useToast().warning(`เลือกได้สูงสุด ${props.maxImages} รูป`)
    }
  }
}

function confirmSelection() {
  selectedImages.value = [...tempSelected.value]
  emit('update:modelValue', selectedImages.value)
  galleryModal.value?.close()
}

function removeImage(index: number) {
  selectedImages.value.splice(index, 1)
  emit('update:modelValue', selectedImages.value)
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    selectedFiles.value = Array.from(target.files)
  }
}

async function handleUpload() {
  if (!selectedFiles.value.length) return

  uploading.value = true

  try {
    const uploadedUrls: string[] = []

    for (const file of selectedFiles.value) {
      const response = await imagesStore.uploadImage({
        body: {
          file,
          category: uploadCategory.value,
          altText: uploadAltText.value || file.name
        }
      })

      if (response?.data?.imageUrl) {
        uploadedUrls.push(response.data.imageUrl)
      }
    }

    // Add uploaded images to selected
    selectedImages.value = [...selectedImages.value, ...uploadedUrls]
    emit('update:modelValue', selectedImages.value)

    useToast().success(`อัปโหลด ${uploadedUrls.length} รูปเรียบร้อยแล้ว`)
    uploadModal.value?.close()

  } catch (error) {
    console.error('Upload failed:', error)
    useToast().error('เกิดข้อผิดพลาดในการอัปโหลด')
  } finally {
    uploading.value = false
  }
}

// Watch props changes
watch(() => props.modelValue, (newValue) => {
  selectedImages.value = [...newValue]
})
</script>
