<template>
  <div class="p-6">
    <BasePageHeader
      title="จัดการโรงแรม"
      code="HOTEL-001"
      description="จัดการข้อมูลโรงแรมและสถานที่พัก"
      :breadcrumbs="breadcrumbs"
    >
      <template #actions>
        <BaseButton @click="createHotel" variant="primary" icon-left="plus">
          เพิ่มโรงแรม
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
            placeholder="ชื่อโรงแรม..."
          />

          <BaseSelect
            v-model="filters.category"
            label="ประเภท"
            :options="categoryOptions"
            hide-placeholder
          />

          <BaseSelect
            v-model="filters.province"
            label="จังหวัด"
            :options="provinceOptions"
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
            พบ {{ filteredHotels.length }} รายการ
          </div>
        </div>
      </div>
    </div>

    <!-- Hotels Table -->
    <div class="card bg-base-100 shadow">
      <div class="card-body p-0">
        <BaseTable
          :data="paginatedHotels"
          :columns="columns"
          :loading="loading"
          striped
          @edit="editHotel"
          @delete="deleteHotel"
          @view="viewHotel"
        >
          <template #image="{ row }">
            <div class="avatar">
              <div class="w-16 h-12 rounded">
                <img
                  v-if="row.images && row.images.length > 0"
                  :src="row.images[0]"
                  :alt="row.title"
                  class="object-cover"
                />
                <div v-else class="bg-base-300 w-full h-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-base-content/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </template>

          <template #status="{ row }">
            <div class="badge" :class="row.isActive ? 'badge-success' : 'badge-error'">
              {{ row.isActive ? 'เปิดใช้งาน' : 'ปิดใช้งาน' }}
            </div>
          </template>

          <template #featured="{ row }">
            <div class="form-control">
              <input
                type="checkbox"
                :checked="row.featured"
                @change="toggleFeatured(row)"
                class="toggle toggle-primary toggle-sm"
              />
            </div>
          </template>

          <template #category="{ row }">
            <div class="badge badge-outline">
              {{ getCategoryLabel(row.category) }}
            </div>
          </template>

          <template #location="{ row }">
            <div class="text-sm">
              <div class="font-medium">{{ row.location?.district }}</div>
              <div class="text-base-content/70">{{ row.location?.province }}</div>
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

    <!-- Hotel Form Modal -->
    <dialog ref="hotelModal" class="modal">
      <div class="modal-box w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 class="font-bold text-lg mb-4">
          {{ isEditing ? 'แก้ไขโรงแรม' : 'เพิ่มโรงแรมใหม่' }}
        </h3>

        <CmsHotelForm
          :hotel="selectedHotel"
          :is-editing="isEditing"
          @save="handleSaveHotel"
          @cancel="closeModal"
        />
      </div>
    </dialog>

    <!-- Delete Confirmation Modal -->
    <dialog ref="deleteModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">ยืนยันการลบ</h3>
        <p class="py-4">คุณแน่ใจหรือไม่ว่าต้องการลบโรงแรม "{{ hotelToDelete?.title }}"?</p>
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
import type { HotelContent } from '~/composables/data_models/cms'
import { useHotelsStore } from '~/stores/hotels'
import { THAILAND_PROVINCES } from '~/composables/constants/provinces'

// Page Meta
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

// Store
const hotelsStore = useHotelsStore()

// Breadcrumbs
const breadcrumbs = [
  { label: 'CMS Dashboard', to: '/manage-cms' },
  { label: 'โรงแรม', to: '/manage-cms/hotels', current: true }
]

// Reactive data
const currentPage = ref(1)
const itemsPerPage = 10
const selectedHotel = ref<HotelContent | null>(null)
const isEditing = ref(false)
const hotelToDelete = ref<HotelContent | null>(null)

// Modal refs
const hotelModal = ref<HTMLDialogElement>()
const deleteModal = ref<HTMLDialogElement>()

// Filters
const filters = ref({
  search: '',
  category: '',
  province: '',
  isActive: ''
})

// Computed from store
const hotels = computed(() => hotelsStore.list || [])
const totalItems = computed(() => hotelsStore.pagination?.total || 0)
const loading = computed(() => hotelsStore.isLoading)

// Filter options
const categoryOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'hotel', label: 'โรงแรม' },
  { value: 'resort', label: 'รีสอร์ท' },
  { value: 'hostel', label: 'โฮสเทล' },
  { value: 'guesthouse', label: 'เกสต์เฮาส์' },
  { value: 'villa', label: 'วิลลา' }
]

const provinceOptions = [
  { value: '', label: 'ทั้งหมด' },
  ...THAILAND_PROVINCES.slice(1) // Skip the first empty option from THAILAND_PROVINCES
]

const statusOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'true', label: 'เปิดใช้งาน' },
  { value: 'false', label: 'ปิดใช้งาน' }
]

// Table columns
const columns = [
  { key: 'image', label: 'รูปภาพ', sortable: false },
  { key: 'title', label: 'ชื่อโรงแรม', sortable: true },
  { key: 'category', label: 'ประเภท', sortable: true },
  { key: 'location', label: 'ที่ตั้ง', sortable: false },
  { key: 'status', label: 'สถานะ', sortable: true },
  { key: 'featured', label: 'แนะนำ', sortable: false },
  { key: 'actions', label: 'จัดการ', sortable: false }
]

// Computed properties
const filteredHotels = computed(() => hotels.value)

const totalPages = computed(() => hotelsStore.pagination?.totalPages || 1)

const paginatedHotels = computed(() => hotels.value)

// Methods
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

function resetFilters() {
  filters.value = {
    search: '',
    category: '',
    province: '',
    isActive: ''
  }
}

function handlePageChange(page: number) {
  currentPage.value = page
}

function createHotel() {
  selectedHotel.value = null
  isEditing.value = false
  hotelModal.value?.showModal()
}

function editHotel(hotel: HotelContent) {
  selectedHotel.value = { ...hotel }
  isEditing.value = true
  hotelModal.value?.showModal()
}

function viewHotel(hotel: HotelContent) {
  // Navigate to hotel detail page
  navigateTo(`/manage-cms/hotels/${hotel._id}`)
}

function deleteHotel(hotel: HotelContent) {
  hotelToDelete.value = hotel
  deleteModal.value?.showModal()
}

async function confirmDelete() {
  if (hotelToDelete.value?._id) {
    try {
      await hotelsStore.deleteHotel({
        body: { _id: hotelToDelete.value._id }
      })
      useToast().success('ลบโรงแรมเรียบร้อยแล้ว')
      // Reload data
      await loadHotels()
    } catch (error: any) {
      console.error('Failed to delete hotel:', error)
      useToast().error('เกิดข้อผิดพลาดในการลบข้อมูล')
    }
  }
  deleteModal.value?.close()
  hotelToDelete.value = null
}

async function toggleFeatured(hotel: HotelContent) {
  if (!hotel._id) return

  try {
    await hotelsStore.updateHotel({
      body: {
        _id: hotel._id,
        featured: !hotel.featured
      }
    })
    useToast().success('อัพเดทสถานะแนะนำเรียบร้อยแล้ว')
    await loadHotels()
  } catch (error: any) {
    console.error('Failed to update featured status:', error)
    useToast().error('เกิดข้อผิดพลาดในการอัพเดทสถานะ')
  }
}

async function handleSaveHotel(hotelData: HotelContent) {
  try {
    if (isEditing.value && selectedHotel.value?._id) {
      // Update existing hotel
      await hotelsStore.updateHotel({
        body: {
          _id: selectedHotel.value._id,
          ...hotelData
        }
      })
      useToast().success('อัพเดทข้อมูลโรงแรมเรียบร้อยแล้ว')
    } else {
      // Create new hotel
      await hotelsStore.createHotel({
        body: hotelData
      })
      useToast().success('เพิ่มโรงแรมเรียบร้อยแล้ว')
    }

    // Reload data after save
    await loadHotels()
    closeModal()
  } catch (error: any) {
    console.error('Failed to save hotel:', error)
    useToast().error('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  }
}

// Load hotels from API
async function loadHotels() {
  try {
    const queryParams: any = {
      page: currentPage.value,
      limit: itemsPerPage
    }

    if (filters.value.search) queryParams.search = filters.value.search
    if (filters.value.category) queryParams.category = filters.value.category
    if (filters.value.province) queryParams.province = filters.value.province
    if (filters.value.isActive !== '') queryParams.isActive = filters.value.isActive

    await hotelsStore.fetchHotels({
      query: queryParams
    })
  } catch (error: any) {
    console.error('Failed to load hotels:', error)
    alert('เกิดข้อผิดพลาดในการโหลดข้อมูล')
  }
}

function closeModal() {
  hotelModal.value?.close()
  selectedHotel.value = null
  isEditing.value = false
}

// Watch filters and reload
watch(() => [filters.value.category, filters.value.province, filters.value.isActive], () => {
  currentPage.value = 1
  loadHotels()
}, { deep: true })

// Watch search with debounce
watch(() => filters.value.search, () => {
  currentPage.value = 1
  loadHotels()
})

// Load hotels on mount
onMounted(() => {
  loadHotels()
})

// SEO
useHead({
  title: 'จัดการโรงแรม - CMS',
  meta: [
    { name: 'description', content: 'จัดการข้อมูลโรงแรมและสถานที่พักในระบบ CMS' }
  ]
})
</script>