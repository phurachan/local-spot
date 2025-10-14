<template>
  <div class="p-6">
    <BasePageHeader
      title="จัดการบริการท่องเที่ยว"
      code="TRAVEL-SERVICE-001"
      description="จัดการข้อมูลบริการท่องเที่ยว เช่น ขนส่ง ทัวร์ ไกด์ เช่าอุปกรณ์"
      :breadcrumbs="breadcrumbs"
    >
      <template #actions>
        <BaseButton @click="createTravelService" variant="primary" icon-left="plus">
          เพิ่มบริการ
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
            placeholder="ชื่อบริการ..."
          />

          <BaseSelect
            v-model="filters.category"
            label="ประเภทบริการ"
            :options="categoryOptions"
            hide-placeholder
          />

          <BaseSelect
            v-model="filters.serviceArea"
            label="พื้นที่บริการ"
            :options="serviceAreaOptions"
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
            พบ {{ filteredTravelServices.length }} รายการ
          </div>
        </div>
      </div>
    </div>

    <!-- Travel Services Table -->
    <div class="card bg-base-100 shadow">
      <div class="card-body p-0">
        <BaseTable
          :data="paginatedTravelServices"
          :columns="columns"
          :loading="loading"
          striped
          @edit="editTravelService"
          @delete="deleteTravelService"
          @view="viewTravelService"
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
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
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

          <template #pricing="{ row }">
            <div class="text-sm">
              <div class="font-medium">{{ row.pricing?.amount.toLocaleString() }} {{ row.pricing?.currency }}</div>
              <div class="text-base-content/70 text-xs">{{ getPricingTypeLabel(row.pricing?.type) }}</div>
            </div>
          </template>

          <template #serviceArea="{ row }">
            <div class="flex flex-wrap gap-1">
              <div
                v-for="area in row.location?.serviceArea?.slice(0, 2)"
                :key="area"
                class="badge badge-sm badge-ghost"
              >
                {{ area }}
              </div>
              <div
                v-if="row.location?.serviceArea && row.location.serviceArea.length > 2"
                class="badge badge-sm badge-ghost"
              >
                +{{ row.location.serviceArea.length - 2 }}
              </div>
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

    <!-- Travel Service Form Modal -->
    <dialog ref="travelServiceModal" class="modal">
      <div class="modal-box w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 class="font-bold text-lg mb-4">
          {{ isEditing ? 'แก้ไขบริการท่องเที่ยว' : 'เพิ่มบริการท่องเที่ยวใหม่' }}
        </h3>

        <CmsTravelServiceForm
          :travel-service="selectedTravelService"
          :is-editing="isEditing"
          @save="handleSaveTravelService"
          @cancel="closeModal"
        />
      </div>
    </dialog>

    <!-- Delete Confirmation Modal -->
    <dialog ref="deleteModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">ยืนยันการลบ</h3>
        <p class="py-4">คุณแน่ใจหรือไม่ว่าต้องการลบบริการ "{{ travelServiceToDelete?.title }}"?</p>
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
import type { TravelServiceContent } from '~/composables/data_models/cms'
import { useTravelServicesStore } from '~/stores/travelServices'

// Page Meta
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

// Store
const travelServicesStore = useTravelServicesStore()

// Breadcrumbs
const breadcrumbs = [
  { label: 'CMS Dashboard', to: '/manage-cms' },
  { label: 'บริการท่องเที่ยว', to: '/manage-cms/travel-services', current: true }
]

// Reactive data
const currentPage = ref(1)
const itemsPerPage = 10
const selectedTravelService = ref<TravelServiceContent | null>(null)
const isEditing = ref(false)
const travelServiceToDelete = ref<TravelServiceContent | null>(null)

// Modal refs
const travelServiceModal = ref<HTMLDialogElement>()
const deleteModal = ref<HTMLDialogElement>()

// Filters
const filters = ref({
  search: '',
  category: '',
  serviceArea: '',
  isActive: ''
})

// Computed from store
const travelServices = computed(() => travelServicesStore.list || [])
const totalItems = computed(() => travelServicesStore.pagination?.total || 0)
const loading = computed(() => travelServicesStore.isLoading)

// Filter options
const categoryOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'transport', label: 'ขนส่ง' },
  { value: 'tour', label: 'ทัวร์' },
  { value: 'guide', label: 'ไกด์นำเที่ยว' },
  { value: 'rental', label: 'เช่าอุปกรณ์' },
  { value: 'activity', label: 'กิจกรรม' }
]

const serviceAreaOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'กรุงเทพมหานคร', label: 'กรุงเทพมหานคร' },
  { value: 'เชียงใหม่', label: 'เชียงใหม่' },
  { value: 'ภูเก็ต', label: 'ภูเก็ต' },
  { value: 'ขอนแก่น', label: 'ขอนแก่น' }
]

const statusOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'true', label: 'เปิดใช้งาน' },
  { value: 'false', label: 'ปิดใช้งาน' }
]

// Table columns
const columns = [
  { key: 'image', label: 'รูปภาพ', sortable: false },
  { key: 'title', label: 'ชื่อบริการ', sortable: true },
  { key: 'category', label: 'ประเภท', sortable: true },
  { key: 'serviceArea', label: 'พื้นที่บริการ', sortable: false },
  { key: 'pricing', label: 'ราคา', sortable: true },
  { key: 'status', label: 'สถานะ', sortable: true },
  { key: 'featured', label: 'แนะนำ', sortable: false },
  { key: 'actions', label: 'จัดการ', sortable: false }
]

// Computed properties
const filteredTravelServices = computed(() => travelServices.value)

const paginatedTravelServices = computed(() => travelServices.value)

// Methods
function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    transport: 'ขนส่ง',
    tour: 'ทัวร์',
    guide: 'ไกด์นำเที่ยว',
    rental: 'เช่าอุปกรณ์',
    activity: 'กิจกรรม'
  }
  return labels[category] || category
}

function getPricingTypeLabel(type: string | undefined) {
  const labels: Record<string, string> = {
    per_person: 'ต่อคน',
    per_group: 'ต่อกลุ่ม',
    per_hour: 'ต่อชั่วโมง',
    per_day: 'ต่อวัน'
  }
  return type ? labels[type] || type : ''
}

function resetFilters() {
  filters.value = {
    search: '',
    category: '',
    serviceArea: '',
    isActive: ''
  }
}

function handlePageChange(page: number) {
  currentPage.value = page
}

function createTravelService() {
  selectedTravelService.value = null
  isEditing.value = false
  travelServiceModal.value?.showModal()
}

function editTravelService(service: TravelServiceContent) {
  selectedTravelService.value = { ...service }
  isEditing.value = true
  travelServiceModal.value?.showModal()
}

function viewTravelService(service: TravelServiceContent) {
  // Navigate to travel service detail page
  navigateTo(`/manage-cms/travel-services/${service._id}`)
}

function deleteTravelService(service: TravelServiceContent) {
  travelServiceToDelete.value = service
  deleteModal.value?.showModal()
}

async function confirmDelete() {
  if (travelServiceToDelete.value?._id) {
    try {
      await travelServicesStore.deleteTravelService({
        body: { _id: travelServiceToDelete.value._id }
      })
      useToast().success('ลบบริการเรียบร้อยแล้ว')
      // Reload data
      await loadTravelServices()
    } catch (error: any) {
      console.error('Failed to delete travel service:', error)
      useToast().error('เกิดข้อผิดพลาดในการลบข้อมูล')
    }
  }
  deleteModal.value?.close()
  travelServiceToDelete.value = null
}

async function toggleFeatured(service: TravelServiceContent) {
  if (!service._id) return

  try {
    await travelServicesStore.updateTravelService({
      body: {
        _id: service._id,
        featured: !service.featured
      }
    })
    useToast().success('อัพเดทสถานะแนะนำเรียบร้อยแล้ว')
    await loadTravelServices()
  } catch (error: any) {
    console.error('Failed to update featured status:', error)
    useToast().error('เกิดข้อผิดพลาดในการอัพเดทสถานะ')
  }
}

async function handleSaveTravelService(serviceData: TravelServiceContent) {
  try {
    if (isEditing.value && selectedTravelService.value?._id) {
      // Update existing travel service
      await travelServicesStore.updateTravelService({
        body: {
          _id: selectedTravelService.value._id,
          ...serviceData
        }
      })
      useToast().success('อัพเดทข้อมูลบริการเรียบร้อยแล้ว')
    } else {
      // Create new travel service
      await travelServicesStore.createTravelService({
        body: serviceData
      })
      useToast().success('เพิ่มบริการเรียบร้อยแล้ว')
    }

    // Reload data after save
    await loadTravelServices()
    closeModal()
  } catch (error: any) {
    console.error('Failed to save travel service:', error)
    useToast().error('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  }
}

// Load travel services from API
async function loadTravelServices() {
  try {
    const queryParams: any = {
      page: currentPage.value,
      limit: itemsPerPage
    }

    if (filters.value.search) queryParams.search = filters.value.search
    if (filters.value.category) queryParams.category = filters.value.category
    if (filters.value.serviceArea) queryParams.serviceArea = filters.value.serviceArea
    if (filters.value.isActive !== '') queryParams.isActive = filters.value.isActive

    await travelServicesStore.fetchTravelServices({
      query: queryParams
    })
  } catch (error: any) {
    console.error('Failed to load travel services:', error)
    alert('เกิดข้อผิดพลาดในการโหลดข้อมูล')
  }
}

function closeModal() {
  travelServiceModal.value?.close()
  selectedTravelService.value = null
  isEditing.value = false
}

// Watch filters and reload
watch(() => [filters.value.category, filters.value.serviceArea, filters.value.isActive], () => {
  currentPage.value = 1
  loadTravelServices()
}, { deep: true })

// Watch search with debounce
watch(() => filters.value.search, () => {
  currentPage.value = 1
  loadTravelServices()
})

// Load travel services on mount
onMounted(() => {
  loadTravelServices()
})

// SEO
useHead({
  title: 'จัดการบริการท่องเที่ยว - CMS',
  meta: [
    { name: 'description', content: 'จัดการข้อมูลบริการท่องเที่ยวในระบบ CMS' }
  ]
})
</script>