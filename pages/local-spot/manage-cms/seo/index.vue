<template>
  <div class="p-6">
    <BasePageHeader
      title="จัดการ SEO & Meta Tags"
      code="SEO-001"
      description="จัดการ SEO และ Meta Tags สำหรับแต่ละหน้าเว็บไซต์"
      :breadcrumbs="breadcrumbs"
    >
      <template #actions>
        <BaseButton @click="createSEO" variant="primary" icon-left="plus">
          เพิ่ม SEO Setting
        </BaseButton>
      </template>
    </BasePageHeader>

    <!-- Filters -->
    <div class="card bg-base-100 shadow mb-6">
      <div class="card-body">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="filters.search"
            label="ค้นหา"
            placeholder="URL หรือชื่อหน้า..."
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
            พบ {{ filteredSEO.length }} รายการ
          </div>
        </div>
      </div>
    </div>

    <!-- SEO Table -->
    <div class="card bg-base-100 shadow">
      <div class="card-body p-0">
        <BaseTable
          :data="paginatedSEO"
          :columns="columns"
          :loading="loading"
          striped
          @edit="editSEO"
          @delete="deleteSEO"
          @view="viewSEO"
        >
          <template #pageUrl="{ row }">
            <div class="text-sm">
              <a
                :href="row.pageUrl"
                target="_blank"
                class="link link-primary truncate max-w-md block"
              >
                {{ row.pageUrl }}
              </a>
            </div>
          </template>

          <template #pageTitle="{ row }">
            <div class="text-sm">
              <div class="font-medium truncate max-w-xs">{{ row.pageTitle }}</div>
              <div class="text-base-content/70 text-xs truncate max-w-xs">
                {{ row.metaDescription }}
              </div>
            </div>
          </template>

          <template #status="{ row }">
            <div class="badge" :class="row.isActive ? 'badge-success' : 'badge-error'">
              {{ row.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน' }}
            </div>
          </template>

          <template #ogImage="{ row }">
            <div v-if="row.ogImage" class="avatar">
              <div class="w-16 h-12 rounded">
                <img
                  :src="row.ogImage"
                  :alt="row.pageTitle"
                  class="object-cover"
                />
              </div>
            </div>
            <div v-else class="text-xs text-base-content/50">ไม่มีรูป</div>
          </template>

          <template #updatedAt="{ row }">
            <div class="text-xs text-base-content/70">
              {{ formatDate(row.updatedAt) }}
            </div>
          </template>
        </BaseTable>

        <!-- Pagination -->
        <div class="flex justify-center p-4">
          <BasePagination
            :current-page="currentPage"
            :total-items="totalItems"
            :per-page="itemsPerPage"
            @change="handlePageChange"
          />
        </div>
      </div>
    </div>

    <!-- SEO Form Modal -->
    <dialog ref="seoModal" class="modal">
      <div class="modal-box w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 class="font-bold text-lg mb-4">
          {{ isEditing ? 'แก้ไข SEO Setting' : 'เพิ่ม SEO Setting ใหม่' }}
        </h3>

        <CmsSEOForm
          :seo="selectedSEO"
          :is-editing="isEditing"
          @save="handleSaveSEO"
          @cancel="closeModal"
        />
      </div>
    </dialog>

    <!-- Delete Confirmation Modal -->
    <dialog ref="deleteModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">ยืนยันการลบ</h3>
        <p class="py-4">คุณแน่ใจหรือไม่ว่าต้องการลบ SEO Setting สำหรับ "{{ seoToDelete?.pageTitle }}"?</p>
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
import type { SEOMetaContent } from '~/composables/data_models/cms'
import { useSEOStore } from '~/stores/seo'

// Page Meta
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

// Store
const seoStore = useSEOStore()

// Breadcrumbs
const breadcrumbs = [
  { label: 'CMS Dashboard', to: '/local-spot/manage-cms' },
  { label: 'SEO & Meta Tags', to: '/local-spot/manage-cms/seo', current: true }
]

// Reactive data
const currentPage = ref(1)
const itemsPerPage = 10
const selectedSEO = ref<SEOMetaContent | null>(null)
const isEditing = ref(false)
const seoToDelete = ref<SEOMetaContent | null>(null)

// Modal refs
const seoModal = ref<HTMLDialogElement>()
const deleteModal = ref<HTMLDialogElement>()

// Filters
const filters = ref({
  search: '',
  isActive: ''
})

// Computed from store
const seoList = computed(() => seoStore.list || [])
const totalItems = computed(() => seoStore.pagination?.total || 0)
const loading = computed(() => seoStore.isLoading)

// Filter options
const statusOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'true', label: 'เปิดใช้งาน' },
  { value: 'false', label: 'ปิดใช้งาน' }
]

// Table columns
const columns = [
  { key: 'pageUrl', label: 'URL', sortable: true },
  { key: 'pageTitle', label: 'หน้า & คำอธิบาย', sortable: true },
  { key: 'ogImage', label: 'OG Image', sortable: false },
  { key: 'status', label: 'สถานะ', sortable: true },
  { key: 'updatedAt', label: 'แก้ไขล่าสุด', sortable: true },
  { key: 'actions', label: 'จัดการ', sortable: false }
]

// Computed properties
const filteredSEO = computed(() => seoList.value)

const paginatedSEO = computed(() => seoList.value)

// Methods
function formatDate(date: Date | undefined): string {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function resetFilters() {
  filters.value = {
    search: '',
    isActive: ''
  }
}

function handlePageChange(page: number) {
  currentPage.value = page
}

function createSEO() {
  selectedSEO.value = null
  isEditing.value = false
  seoModal.value?.showModal()
}

function editSEO(seo: SEOMetaContent) {
  selectedSEO.value = { ...seo }
  isEditing.value = true
  seoModal.value?.showModal()
}

function viewSEO(seo: SEOMetaContent) {
  // Navigate to SEO detail page or open in new tab
  if (seo.pageUrl) {
    window.open(seo.pageUrl, '_blank')
  }
}

function deleteSEO(seo: SEOMetaContent) {
  seoToDelete.value = seo
  deleteModal.value?.showModal()
}

async function confirmDelete() {
  if (seoToDelete.value?._id) {
    try {
      await seoStore.deleteSEO({
        body: { _id: seoToDelete.value._id }
      })
      useToast().success('ลบ SEO Setting เรียบร้อยแล้ว')
      // Reload data
      await loadSEO()
    } catch (error: any) {
      console.error('Failed to delete SEO:', error)
      useToast().error('เกิดข้อผิดพลาดในการลบข้อมูล')
    }
  }
  deleteModal.value?.close()
  seoToDelete.value = null
}

async function handleSaveSEO(seoData: SEOMetaContent) {
  try {
    if (isEditing.value && selectedSEO.value?._id) {
      // Update existing SEO
      await seoStore.updateSEO({
        body: {
          _id: selectedSEO.value._id,
          ...seoData
        }
      })
      useToast().success('อัพเดท SEO Setting เรียบร้อยแล้ว')
    } else {
      // Create new SEO
      await seoStore.createSEO({
        body: seoData
      })
      useToast().success('เพิ่ม SEO Setting เรียบร้อยแล้ว')
    }

    // Reload data after save
    await loadSEO()
    closeModal()
  } catch (error: any) {
    console.error('Failed to save SEO:', error)
    useToast().error('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  }
}

// Load SEO from API
async function loadSEO() {
  try {
    const queryParams: any = {
      page: currentPage.value,
      limit: itemsPerPage
    }

    if (filters.value.search) queryParams.search = filters.value.search
    if (filters.value.isActive !== '') queryParams.isActive = filters.value.isActive

    await seoStore.fetchSEOList({
      query: queryParams
    })
  } catch (error: any) {
    console.error('Failed to load SEO:', error)
    alert('เกิดข้อผิดพลาดในการโหลดข้อมูล')
  }
}

function closeModal() {
  seoModal.value?.close()
  selectedSEO.value = null
  isEditing.value = false
}

// Watch filters and reload
watch(() => filters.value.isActive, () => {
  currentPage.value = 1
  loadSEO()
})

// Watch search with debounce
watch(() => filters.value.search, () => {
  currentPage.value = 1
  loadSEO()
})

// Load SEO on mount
onMounted(() => {
  loadSEO()
})

// SEO
useHead({
  title: 'จัดการ SEO & Meta Tags - CMS',
  meta: [
    { name: 'description', content: 'จัดการ SEO และ Meta Tags ในระบบ CMS' }
  ]
})
</script>