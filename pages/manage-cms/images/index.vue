<template>
  <div class="p-6">
    <BasePageHeader
      title="จัดการคลังรูปภาพ"
      code="IMAGE-001"
      description="จัดการรูปภาพสำหรับแสดงในระบบ CMS"
      :breadcrumbs="breadcrumbs"
    >
      <template #actions>
        <BaseButton @click="showUploadModal" variant="primary" icon-left="photo">
          อัปโหลดรูปภาพ
        </BaseButton>
      </template>
    </BasePageHeader>

    <!-- Filters -->
    <div class="card bg-base-100 shadow mb-6">
      <div class="card-body">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <BaseInput
            v-model="filters.search"
            label="ค้นหา"
            placeholder="ชื่อหรือคำอธิบาย..."
          />

          <BaseSelect
            v-model="filters.category"
            label="หมวดหมู่"
            :options="categoryOptions"
            hide-placeholder
          />

          <BaseSelect
            v-model="filters.relatedContentType"
            label="เกี่ยวข้องกับ"
            :options="contentTypeOptions"
            hide-placeholder
          />

          <BaseSelect
            v-model="filters.isActive"
            label="สถานะ"
            :options="statusOptions"
            hide-placeholder
          />
        </div>

        <div class="flex justify-between items-center mt-4">
          <BaseButton @click="resetFilters" variant="ghost" size="sm">
            ล้างตัวกรอง
          </BaseButton>
          <div class="text-sm text-base-content/70">
            พบ {{ filteredImages.length }} รายการ
          </div>
        </div>
      </div>
    </div>

    <!-- Images Grid -->
    <div class="card bg-base-100 shadow">
      <div class="card-body">
        <div v-if="loading" class="flex justify-center items-center py-20">
          <BaseLoading />
        </div>

        <div v-else-if="paginatedImages.length === 0" class="text-center py-20">
          <div class="text-base-content/50 text-lg">ไม่พบรูปภาพ</div>
        </div>

        <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          <div
            v-for="image in paginatedImages"
            :key="image._id"
            class="card bg-base-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            @click="viewImage(image)"
          >
            <figure class="aspect-square bg-base-300">
              <img
                :src="image.thumbnailUrl || image.imageUrl"
                :alt="image.altText"
                class="w-full h-full object-cover"
                loading="lazy"
              />
            </figure>
            <div class="card-body p-3">
              <div class="flex items-start justify-between gap-2">
                <div class="flex-1 min-w-0">
                  <h3 class="text-sm font-medium truncate">{{ image.title }}</h3>
                  <p class="text-xs text-base-content/70 truncate">{{ image.altText }}</p>
                </div>
                <div class="flex gap-1">
                  <button
                    @click.stop="editImage(image)"
                    class="btn btn-ghost btn-xs"
                    title="แก้ไข"
                  >
                    <BaseIcon name="pencil" size="sm" />
                  </button>
                  <button
                    @click.stop="deleteImage(image)"
                    class="btn btn-ghost btn-xs text-error"
                    title="ลบ"
                  >
                    <BaseIcon name="trash" size="sm" />
                  </button>
                </div>
              </div>
              <div class="flex items-center justify-between mt-2">
                <div class="badge badge-sm" :class="getCategoryBadgeClass(image.category)">
                  {{ getCategoryLabel(image.category) }}
                </div>
                <div class="form-control">
                  <input
                    type="checkbox"
                    :checked="image.featured"
                    @change.stop="toggleFeatured(image)"
                    class="toggle toggle-xs toggle-primary"
                    title="แนะนำ"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-6">
          <BasePagination
            :current-page="currentPage"
            :total-items="totalItems"
            :per-page="itemsPerPage"
            @change="handlePageChange"
          />
        </div>
      </div>
    </div>

    <!-- Upload Modal -->
    <dialog ref="uploadModal" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 class="font-bold text-lg mb-4">อัปโหลดรูปภาพ</h3>

        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">เลือกไฟล์รูปภาพ</span>
          </label>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            @change="handleFileSelect"
            class="file-input file-input-bordered w-full"
          />
          <label class="label">
            <span class="label-text-alt">รองรับ JPG, PNG, WebP (ไม่เกิน 5MB)</span>
          </label>
        </div>

        <BaseSelect
          v-model="uploadForm.category"
          label="หมวดหมู่"
          :options="categoryOptions.filter(opt => opt.value !== '')"
          :required="true"
        />

        <BaseInput
          v-model="uploadForm.altText"
          label="Alt Text"
          placeholder="คำอธิบายสำหรับ SEO"
          :required="true"
        />

        <BaseInput
          v-model="uploadForm.caption"
          label="Caption"
          placeholder="คำบรรยายใต้รูป (Optional)"
        />

        <div class="modal-action">
          <form method="dialog">
            <BaseButton variant="ghost">ยกเลิก</BaseButton>
          </form>
          <BaseButton
            @click="handleUpload"
            variant="primary"
            :loading="uploading"
            :disabled="!selectedFile"
          >
            อัปโหลด
          </BaseButton>
        </div>
      </div>
    </dialog>

    <!-- View Image Modal -->
    <dialog ref="viewModal" class="modal">
      <div class="modal-box max-w-4xl">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 class="font-bold text-lg mb-4">{{ selectedImage?.title }}</h3>

        <figure class="mb-4">
          <img
            :src="selectedImage?.imageUrl"
            :alt="selectedImage?.altText"
            class="w-full rounded-lg"
          />
        </figure>

        <div class="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div class="font-medium">Alt Text:</div>
            <div class="text-base-content/70">{{ selectedImage?.altText }}</div>
          </div>
          <div>
            <div class="font-medium">หมวดหมู่:</div>
            <div class="text-base-content/70">{{ getCategoryLabel(selectedImage?.category || '') }}</div>
          </div>
          <div v-if="selectedImage?.caption">
            <div class="font-medium">Caption:</div>
            <div class="text-base-content/70">{{ selectedImage?.caption }}</div>
          </div>
          <div v-if="selectedImage?.photographer">
            <div class="font-medium">ช่างภาพ:</div>
            <div class="text-base-content/70">{{ selectedImage?.photographer }}</div>
          </div>
          <div v-if="selectedImage?.dimensions">
            <div class="font-medium">ขนาด:</div>
            <div class="text-base-content/70">
              {{ selectedImage.dimensions.width }} x {{ selectedImage.dimensions.height }}
            </div>
          </div>
          <div v-if="selectedImage?.fileSize">
            <div class="font-medium">ขนาดไฟล์:</div>
            <div class="text-base-content/70">{{ formatFileSize(selectedImage.fileSize) }}</div>
          </div>
        </div>

        <div class="modal-action">
          <form method="dialog">
            <BaseButton variant="ghost">ปิด</BaseButton>
          </form>
          <BaseButton @click="copyImageUrl" variant="primary">
            คัดลอก URL
          </BaseButton>
        </div>
      </div>
    </dialog>

    <!-- Edit Modal -->
    <dialog ref="editModal" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 class="font-bold text-lg mb-4">แก้ไขข้อมูลรูปภาพ</h3>

        <CmsImageForm
          :image="selectedImage"
          :is-editing="true"
          @save="handleSaveImage"
          @cancel="closeEditModal"
        />
      </div>
    </dialog>

    <!-- Delete Confirmation Modal -->
    <dialog ref="deleteModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">ยืนยันการลบ</h3>
        <p class="py-4">คุณแน่ใจหรือไม่ว่าต้องการลบรูปภาพ "{{ imageToDelete?.title }}"?</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">ยกเลิก</button>
          </form>
          <button @click="confirmDelete" class="btn btn-error">ลบ</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import type { ImageGalleryContent } from '~/composables/data_models/cms'
import { useImagesStore } from '~/stores/images'

// Page Meta
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

// Store
const imagesStore = useImagesStore()

// Breadcrumbs
const breadcrumbs = [
  { label: 'CMS Dashboard', to: '/manage-cms' },
  { label: 'คลังรูปภาพ', to: '/manage-cms/images', current: true }
]

// Reactive data
const currentPage = ref(1)
const itemsPerPage = 20
const selectedImage = ref<ImageGalleryContent | null>(null)
const imageToDelete = ref<ImageGalleryContent | null>(null)
const selectedFile = ref<File | null>(null)
const uploading = ref(false)

// Modal refs
const uploadModal = ref<HTMLDialogElement>()
const viewModal = ref<HTMLDialogElement>()
const editModal = ref<HTMLDialogElement>()
const deleteModal = ref<HTMLDialogElement>()
const fileInput = ref<HTMLInputElement>()

// Upload form
const uploadForm = ref({
  category: 'general',
  altText: '',
  caption: ''
})

// Filters
const filters = ref({
  search: '',
  category: '',
  relatedContentType: '',
  isActive: ''
})

// Computed from store
const images = computed(() => imagesStore.list || [])
const totalItems = computed(() => imagesStore.pagination?.total || 0)
const loading = computed(() => imagesStore.isLoading)

// Filter options
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

const contentTypeOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'hotel', label: 'โรงแรม' },
  { value: 'restaurant', label: 'ร้านอาหาร' },
  { value: 'travel_service', label: 'บริการท่องเที่ยว' },
  { value: 'local_product', label: 'สินค้าท้องถิ่น' },
  { value: 'event', label: 'กิจกรรม' }
]

const statusOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'true', label: 'เปิดใช้งาน' },
  { value: 'false', label: 'ปิดใช้งาน' }
]

// Computed properties
const filteredImages = computed(() => images.value)

const paginatedImages = computed(() => images.value)

// Methods
function getCategoryLabel(category: string) {
  const option = categoryOptions.find(opt => opt.value === category)
  return option?.label || category
}

function getCategoryBadgeClass(category: string) {
  const classes: Record<string, string> = {
    hotel: 'badge-primary',
    restaurant: 'badge-secondary',
    travel_service: 'badge-accent',
    local_product: 'badge-info',
    event: 'badge-warning',
    attraction: 'badge-success',
    general: 'badge-ghost'
  }
  return classes[category] || 'badge-ghost'
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB'
}

function resetFilters() {
  filters.value = {
    search: '',
    category: '',
    relatedContentType: '',
    isActive: ''
  }
}

function handlePageChange(page: number) {
  currentPage.value = page
  loadImages()
}

function showUploadModal() {
  uploadForm.value = {
    category: 'general',
    altText: '',
    caption: ''
  }
  selectedFile.value = null
  uploadModal.value?.showModal()
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    selectedFile.value = target.files[0]
  }
}

async function handleUpload() {
  if (!selectedFile.value) return

  uploading.value = true

  try {
    await imagesStore.uploadImage({
      body: {
        file: selectedFile.value,
        category: uploadForm.value.category,
        altText: uploadForm.value.altText,
        caption: uploadForm.value.caption
      }
    })

    useToast().success('อัปโหลดรูปภาพเรียบร้อยแล้ว')
    await loadImages()
    uploadModal.value?.close()
  } catch (error: any) {
    console.error('Failed to upload image:', error)
    useToast().error('เกิดข้อผิดพลาดในการอัปโหลด')
  } finally {
    uploading.value = false
  }
}

function viewImage(image: ImageGalleryContent) {
  selectedImage.value = image
  viewModal.value?.showModal()
}

function editImage(image: ImageGalleryContent) {
  selectedImage.value = { ...image }
  editModal.value?.showModal()
}

function deleteImage(image: ImageGalleryContent) {
  imageToDelete.value = image
  deleteModal.value?.showModal()
}

async function confirmDelete() {
  if (imageToDelete.value?._id) {
    try {
      await imagesStore.deleteImage({
        body: { _id: imageToDelete.value._id }
      })
      useToast().success('ลบรูปภาพเรียบร้อยแล้ว')
      await loadImages()
    } catch (error: any) {
      console.error('Failed to delete image:', error)
      useToast().error('เกิดข้อผิดพลาดในการลบข้อมูล')
    }
  }
  deleteModal.value?.close()
  imageToDelete.value = null
}

async function toggleFeatured(image: ImageGalleryContent) {
  if (!image._id) return

  try {
    await imagesStore.updateImage({
      body: {
        _id: image._id,
        featured: !image.featured
      }
    })
    useToast().success('อัพเดทสถานะแนะนำเรียบร้อยแล้ว')
    await loadImages()
  } catch (error: any) {
    console.error('Failed to update featured status:', error)
    useToast().error('เกิดข้อผิดพลาดในการอัพเดทสถานะ')
  }
}

async function handleSaveImage(imageData: ImageGalleryContent) {
  try {
    if (selectedImage.value?._id) {
      await imagesStore.updateImage({
        body: {
          _id: selectedImage.value._id,
          ...imageData
        }
      })
      useToast().success('อัพเดทข้อมูลรูปภาพเรียบร้อยแล้ว')
    }

    await loadImages()
    closeEditModal()
  } catch (error: any) {
    console.error('Failed to save image:', error)
    useToast().error('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  }
}

function copyImageUrl() {
  if (selectedImage.value?.imageUrl) {
    navigator.clipboard.writeText(selectedImage.value.imageUrl)
    useToast().success('คัดลอก URL เรียบร้อยแล้ว')
  }
}

function closeEditModal() {
  editModal.value?.close()
  selectedImage.value = null
}

// Load images from API
async function loadImages() {
  try {
    const queryParams: any = {
      page: currentPage.value,
      limit: itemsPerPage
    }

    if (filters.value.search) queryParams.search = filters.value.search
    if (filters.value.category) queryParams.category = filters.value.category
    if (filters.value.relatedContentType) queryParams.relatedContentType = filters.value.relatedContentType
    if (filters.value.isActive !== '') queryParams.isActive = filters.value.isActive

    await imagesStore.fetchImages({
      query: queryParams
    })
  } catch (error: any) {
    console.error('Failed to load images:', error)
    alert('เกิดข้อผิดพลาดในการโหลดข้อมูล')
  }
}

// Watch filters and reload
watch(() => [filters.value.category, filters.value.relatedContentType, filters.value.isActive], () => {
  currentPage.value = 1
  loadImages()
}, { deep: true })

// Watch search with debounce
watch(() => filters.value.search, () => {
  currentPage.value = 1
  loadImages()
})

// Load images on mount
onMounted(() => {
  loadImages()
})

// SEO
useHead({
  title: 'จัดการคลังรูปภาพ - CMS',
  meta: [
    { name: 'description', content: 'จัดการคลังรูปภาพในระบบ CMS' }
  ]
})
</script>