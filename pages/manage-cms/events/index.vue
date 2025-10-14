<template>
  <div class="p-6">
    <BasePageHeader
      title="จัดการกิจกรรมและงานอีเวนต์"
      code="EVENT-001"
      description="จัดการข้อมูลกิจกรรม เทศกาล งานตลาดนัด และกิจกรรมวัฒนธรรม"
      :breadcrumbs="breadcrumbs"
    >
      <template #actions>
        <BaseButton @click="createEvent" variant="primary" icon-left="plus">
          เพิ่มกิจกรรม
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
            placeholder="ชื่อกิจกรรม..."
          />

          <BaseSelect
            v-model="filters.category"
            label="ประเภทกิจกรรม"
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
            พบ {{ filteredEvents.length }} รายการ
          </div>
        </div>
      </div>
    </div>

    <!-- Events Table -->
    <div class="card bg-base-100 shadow">
      <div class="card-body p-0">
        <BaseTable
          :data="paginatedEvents"
          :columns="columns"
          :loading="loading"
          striped
          @edit="editEvent"
          @delete="deleteEvent"
          @view="viewEvent"
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
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
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

          <template #schedule="{ row }">
            <div class="text-sm">
              <div class="font-medium">{{ formatDate(row.schedule?.startDate) }}</div>
              <div class="text-base-content/70 text-xs">ถึง {{ formatDate(row.schedule?.endDate) }}</div>
            </div>
          </template>

          <template #location="{ row }">
            <div class="text-sm">
              <div class="font-medium">{{ row.location?.venue }}</div>
              <div class="text-base-content/70">{{ row.location?.province }}</div>
            </div>
          </template>

          <template #ticketing="{ row }">
            <div class="badge" :class="row.ticketing?.freeEntry ? 'badge-success' : 'badge-info'">
              {{ row.ticketing?.freeEntry ? 'ฟรี' : row.ticketing?.price ? `${row.ticketing.price} ${row.ticketing.currency}` : 'ไม่มีข้อมูล' }}
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

    <!-- Event Form Modal -->
    <dialog ref="eventModal" class="modal">
      <div class="modal-box w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 class="font-bold text-lg mb-4">
          {{ isEditing ? 'แก้ไขกิจกรรม' : 'เพิ่มกิจกรรมใหม่' }}
        </h3>

        <CmsEventForm
          :event="selectedEvent"
          :is-editing="isEditing"
          @save="handleSaveEvent"
          @cancel="closeModal"
        />
      </div>
    </dialog>

    <!-- Delete Confirmation Modal -->
    <dialog ref="deleteModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">ยืนยันการลบ</h3>
        <p class="py-4">คุณแน่ใจหรือไม่ว่าต้องการลบกิจกรรม "{{ eventToDelete?.title }}"?</p>
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
import type { EventContent } from '~/composables/data_models/cms'
import { useEventsStore } from '~/stores/events'

// Page Meta
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

// Store
const eventsStore = useEventsStore()

// Breadcrumbs
const breadcrumbs = [
  { label: 'CMS Dashboard', to: '/manage-cms' },
  { label: 'กิจกรรม', to: '/manage-cms/events', current: true }
]

// Reactive data
const currentPage = ref(1)
const itemsPerPage = 10
const selectedEvent = ref<EventContent | null>(null)
const isEditing = ref(false)
const eventToDelete = ref<EventContent | null>(null)

// Modal refs
const eventModal = ref<HTMLDialogElement>()
const deleteModal = ref<HTMLDialogElement>()

// Filters
const filters = ref({
  search: '',
  category: '',
  province: '',
  isActive: ''
})

// Computed from store
const events = computed(() => eventsStore.list || [])
const totalItems = computed(() => eventsStore.pagination?.total || 0)
const loading = computed(() => eventsStore.isLoading)

// Filter options
const categoryOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'festival', label: 'เทศกาล' },
  { value: 'market', label: 'ตลาดนัด' },
  { value: 'cultural', label: 'วัฒนธรรม' },
  { value: 'sports', label: 'กีฬา' },
  { value: 'workshop', label: 'เวิร์กช็อป' },
  { value: 'seasonal', label: 'ตามฤดูกาล' }
]

const provinceOptions = [
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
  { key: 'title', label: 'ชื่อกิจกรรม', sortable: true },
  { key: 'category', label: 'ประเภท', sortable: true },
  { key: 'schedule', label: 'วันที่จัด', sortable: true },
  { key: 'location', label: 'สถานที่', sortable: false },
  { key: 'ticketing', label: 'ค่าเข้างาน', sortable: false },
  { key: 'status', label: 'สถานะ', sortable: true },
  { key: 'featured', label: 'แนะนำ', sortable: false },
  { key: 'actions', label: 'จัดการ', sortable: false }
]

// Computed properties
const filteredEvents = computed(() => events.value)

const paginatedEvents = computed(() => events.value)

// Methods
function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    festival: 'เทศกาล',
    market: 'ตลาดนัด',
    cultural: 'วัฒนธรรม',
    sports: 'กีฬา',
    workshop: 'เวิร์กช็อป',
    seasonal: 'ตามฤดูกาล'
  }
  return labels[category] || category
}

function formatDate(date: Date | undefined): string {
  if (!date) return '-'
  return new Date(date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
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

function createEvent() {
  selectedEvent.value = null
  isEditing.value = false
  eventModal.value?.showModal()
}

function editEvent(event: EventContent) {
  selectedEvent.value = { ...event }
  isEditing.value = true
  eventModal.value?.showModal()
}

function viewEvent(event: EventContent) {
  // Navigate to event detail page
  navigateTo(`/manage-cms/events/${event._id}`)
}

function deleteEvent(event: EventContent) {
  eventToDelete.value = event
  deleteModal.value?.showModal()
}

async function confirmDelete() {
  if (eventToDelete.value?._id) {
    try {
      await eventsStore.deleteEvent({
        body: { _id: eventToDelete.value._id }
      })
      useToast().success('ลบกิจกรรมเรียบร้อยแล้ว')
      // Reload data
      await loadEvents()
    } catch (error: any) {
      console.error('Failed to delete event:', error)
      useToast().error('เกิดข้อผิดพลาดในการลบข้อมูล')
    }
  }
  deleteModal.value?.close()
  eventToDelete.value = null
}

async function toggleFeatured(event: EventContent) {
  if (!event._id) return

  try {
    await eventsStore.updateEvent({
      body: {
        _id: event._id,
        featured: !event.featured
      }
    })
    useToast().success('อัพเดทสถานะแนะนำเรียบร้อยแล้ว')
    await loadEvents()
  } catch (error: any) {
    console.error('Failed to update featured status:', error)
    useToast().error('เกิดข้อผิดพลาดในการอัพเดทสถานะ')
  }
}

async function handleSaveEvent(eventData: EventContent) {
  try {
    if (isEditing.value && selectedEvent.value?._id) {
      // Update existing event
      await eventsStore.updateEvent({
        body: {
          _id: selectedEvent.value._id,
          ...eventData
        }
      })
      useToast().success('อัพเดทข้อมูลกิจกรรมเรียบร้อยแล้ว')
    } else {
      // Create new event
      await eventsStore.createEvent({
        body: eventData
      })
      useToast().success('เพิ่มกิจกรรมเรียบร้อยแล้ว')
    }

    // Reload data after save
    await loadEvents()
    closeModal()
  } catch (error: any) {
    console.error('Failed to save event:', error)
    useToast().error('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  }
}

// Load events from API
async function loadEvents() {
  try {
    const queryParams: any = {
      page: currentPage.value,
      limit: itemsPerPage
    }

    if (filters.value.search) queryParams.search = filters.value.search
    if (filters.value.category) queryParams.category = filters.value.category
    if (filters.value.province) queryParams.province = filters.value.province
    if (filters.value.isActive !== '') queryParams.isActive = filters.value.isActive

    await eventsStore.fetchEvents({
      query: queryParams
    })
  } catch (error: any) {
    console.error('Failed to load events:', error)
    alert('เกิดข้อผิดพลาดในการโหลดข้อมูล')
  }
}

function closeModal() {
  eventModal.value?.close()
  selectedEvent.value = null
  isEditing.value = false
}

// Watch filters and reload
watch(() => [filters.value.category, filters.value.province, filters.value.isActive], () => {
  currentPage.value = 1
  loadEvents()
}, { deep: true })

// Watch search with debounce
watch(() => filters.value.search, () => {
  currentPage.value = 1
  loadEvents()
})

// Load events on mount
onMounted(() => {
  loadEvents()
})

// SEO
useHead({
  title: 'จัดการกิจกรรม - CMS',
  meta: [
    { name: 'description', content: 'จัดการข้อมูลกิจกรรมและงานอีเวนต์ในระบบ CMS' }
  ]
})
</script>