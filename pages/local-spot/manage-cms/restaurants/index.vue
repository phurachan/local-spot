<template>
  <div class="p-6">
    <BasePageHeader
      title="จัดการร้านอาหาร"
      code="RESTAURANT-001"
      description="จัดการข้อมูลร้านอาหารและร้านกาแฟ"
      :breadcrumbs="breadcrumbs"
    >
      <template #actions>
        <BaseButton @click="createRestaurant" variant="primary" icon-left="plus">
          เพิ่มร้านอาหาร
        </BaseButton>
      </template>
    </BasePageHeader>

    <!-- Filters -->
    <div class="card bg-base-100 shadow mb-6">
      <div class="card-body">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <BaseInput
            v-model="filters.search"
            label="ค้นหา"
            placeholder="ชื่อร้าน..."
          />

          <BaseSelect
            v-model="filters.category"
            label="ประเภท"
            :options="categoryOptions"
            hide-placeholder
          />

          <BaseSelect
            v-model="filters.cuisine"
            label="ประเภทอาหาร"
            :options="cuisineOptions"
            hide-placeholder
          />

          <BaseSelect
            v-model="filters.priceRange"
            label="ระดับราคา"
            :options="priceRangeOptions"
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
            พบ {{ filteredRestaurants.length }} รายการ
          </div>
        </div>
      </div>
    </div>

    <!-- Restaurants Table -->
    <div class="card bg-base-100 shadow">
      <div class="card-body p-0">
        <BaseTable
          :data="paginatedRestaurants"
          :columns="columns"
          :loading="loading"
          striped
          @edit="editRestaurant"
          @delete="deleteRestaurant"
          @view="viewRestaurant"
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
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
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

          <template #priceRange="{ row }">
            <div class="badge" :class="getPriceRangeColor(row.priceRange)">
              {{ getPriceRangeLabel(row.priceRange) }}
            </div>
          </template>

          <template #cuisine="{ row }">
            <div class="flex flex-wrap gap-1">
              <div
                v-for="cuisine in row.cuisine?.slice(0, 2)"
                :key="cuisine"
                class="badge badge-sm badge-ghost"
              >
                {{ cuisine }}
              </div>
              <div
                v-if="row.cuisine && row.cuisine.length > 2"
                class="badge badge-sm badge-ghost"
              >
                +{{ row.cuisine.length - 2 }}
              </div>
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

    <!-- Restaurant Form Modal -->
    <dialog ref="restaurantModal" class="modal">
      <div class="modal-box w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 class="font-bold text-lg mb-4">
          {{ isEditing ? 'แก้ไขร้านอาหาร' : 'เพิ่มร้านอาหารใหม่' }}
        </h3>

        <CmsRestaurantForm
          :restaurant="selectedRestaurant"
          :is-editing="isEditing"
          @save="handleSaveRestaurant"
          @cancel="closeModal"
        />
      </div>
    </dialog>

    <!-- Delete Confirmation Modal -->
    <dialog ref="deleteModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">ยืนยันการลบ</h3>
        <p class="py-4">คุณแน่ใจหรือไม่ว่าต้องการลบร้านอาหาร "{{ restaurantToDelete?.title }}"?</p>
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
import type { RestaurantContent } from '~/composables/data_models/cms'
import { useRestaurantsStore } from '~/stores/restaurants'

// Page Meta
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

// Store
const restaurantsStore = useRestaurantsStore()

// Breadcrumbs
const breadcrumbs = [
  { label: 'CMS Dashboard', to: '/local-spot/manage-cms' },
  { label: 'ร้านอาหาร', to: '/local-spot/manage-cms/restaurants', current: true }
]

// Reactive data
const currentPage = ref(1)
const itemsPerPage = 10
const selectedRestaurant = ref<RestaurantContent | null>(null)
const isEditing = ref(false)
const restaurantToDelete = ref<RestaurantContent | null>(null)

// Modal refs
const restaurantModal = ref<HTMLDialogElement>()
const deleteModal = ref<HTMLDialogElement>()

// Filters
const filters = ref({
  search: '',
  category: '',
  cuisine: '',
  priceRange: '',
  isActive: ''
})

// Computed from store
const restaurants = computed(() => restaurantsStore.list || [])
const totalItems = computed(() => restaurantsStore.pagination?.total || 0)
const loading = computed(() => restaurantsStore.isLoading)

// Filter options
const categoryOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'restaurant', label: 'ร้านอาหาร' },
  { value: 'cafe', label: 'ร้านกาแฟ' },
  { value: 'street_food', label: 'อาหารริมทาง' },
  { value: 'local_cuisine', label: 'อาหารท้องถิ่น' },
  { value: 'international', label: 'อาหารนานาชาติ' }
]

const cuisineOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'ไทย', label: 'อาหารไทย' },
  { value: 'อีสาน', label: 'อาหารอีสาน' },
  { value: 'เหนือ', label: 'อาหารเหนือ' },
  { value: 'ใต้', label: 'อาหารใต้' },
  { value: 'จีน', label: 'อาหารจีน' },
  { value: 'ญี่ปุ่น', label: 'อาหารญี่ปุ่น' }
]

const priceRangeOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'budget', label: 'ราคาประหยัด' },
  { value: 'mid_range', label: 'ราคากลาง' },
  { value: 'fine_dining', label: 'ราคาสูง' }
]

const statusOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'true', label: 'เปิดใช้งาน' },
  { value: 'false', label: 'ปิดใช้งาน' }
]

// Table columns
const columns = [
  { key: 'image', label: 'รูปภาพ', sortable: false },
  { key: 'title', label: 'ชื่อร้าน', sortable: true },
  { key: 'category', label: 'ประเภท', sortable: true },
  { key: 'cuisine', label: 'อาหาร', sortable: false },
  { key: 'priceRange', label: 'ราคา', sortable: true },
  { key: 'location', label: 'ที่ตั้ง', sortable: false },
  { key: 'status', label: 'สถานะ', sortable: true },
  { key: 'featured', label: 'แนะนำ', sortable: false },
  { key: 'actions', label: 'จัดการ', sortable: false }
]

// Computed properties
const filteredRestaurants = computed(() => restaurants.value)

const totalPages = computed(() => restaurantsStore.pagination?.totalPages || 1)

const paginatedRestaurants = computed(() => restaurants.value)

// Methods
function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    restaurant: 'ร้านอาหาร',
    cafe: 'ร้านกาแฟ',
    street_food: 'อาหารริมทาง',
    local_cuisine: 'อาหารท้องถิ่น',
    international: 'อาหารนานาชาติ'
  }
  return labels[category] || category
}

function getPriceRangeLabel(priceRange: string) {
  const labels: Record<string, string> = {
    budget: 'ประหยัด',
    mid_range: 'กลาง',
    fine_dining: 'สูง'
  }
  return labels[priceRange] || priceRange
}

function getPriceRangeColor(priceRange: string) {
  const colors: Record<string, string> = {
    budget: 'badge-success',
    mid_range: 'badge-warning',
    fine_dining: 'badge-error'
  }
  return colors[priceRange] || 'badge-ghost'
}

function resetFilters() {
  filters.value = {
    search: '',
    category: '',
    cuisine: '',
    priceRange: '',
    isActive: ''
  }
}

function handlePageChange(page: number) {
  currentPage.value = page
}

function createRestaurant() {
  selectedRestaurant.value = null
  isEditing.value = false
  restaurantModal.value?.showModal()
}

function editRestaurant(restaurant: RestaurantContent) {
  selectedRestaurant.value = { ...restaurant }
  isEditing.value = true
  restaurantModal.value?.showModal()
}

function viewRestaurant(restaurant: RestaurantContent) {
  // Navigate to restaurant detail page
  navigateTo(`/local-spot/manage-cms/restaurants/${restaurant._id}`)
}

function deleteRestaurant(restaurant: RestaurantContent) {
  restaurantToDelete.value = restaurant
  deleteModal.value?.showModal()
}

async function confirmDelete() {
  if (restaurantToDelete.value?._id) {
    try {
      await restaurantsStore.deleteRestaurant({
        body: { _id: restaurantToDelete.value._id }
      })
      useToast().success('ลบร้านอาหารเรียบร้อยแล้ว')
      // Reload data
      await loadRestaurants()
    } catch (error: any) {
      console.error('Failed to delete restaurant:', error)
      useToast().error('เกิดข้อผิดพลาดในการลบข้อมูล')
    }
  }
  deleteModal.value?.close()
  restaurantToDelete.value = null
}

async function toggleFeatured(restaurant: RestaurantContent) {
  if (!restaurant._id) return

  try {
    await restaurantsStore.updateRestaurant({
      body: {
        _id: restaurant._id,
        featured: !restaurant.featured
      }
    })
    useToast().success('อัพเดทสถานะแนะนำเรียบร้อยแล้ว')
    await loadRestaurants()
  } catch (error: any) {
    console.error('Failed to update featured status:', error)
    useToast().error('เกิดข้อผิดพลาดในการอัพเดทสถานะ')
  }
}

async function handleSaveRestaurant(restaurantData: RestaurantContent) {
  try {
    if (isEditing.value && selectedRestaurant.value?._id) {
      // Update existing restaurant
      await restaurantsStore.updateRestaurant({
        body: {
          _id: selectedRestaurant.value._id,
          ...restaurantData
        }
      })
      useToast().success('อัพเดทข้อมูลร้านอาหารเรียบร้อยแล้ว')
    } else {
      // Create new restaurant
      await restaurantsStore.createRestaurant({
        body: restaurantData
      })
      useToast().success('เพิ่มร้านอาหารเรียบร้อยแล้ว')
    }

    // Reload data after save
    await loadRestaurants()
    closeModal()
  } catch (error: any) {
    console.error('Failed to save restaurant:', error)
    useToast().error('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  }
}

// Load restaurants from API
async function loadRestaurants() {
  try {
    const queryParams: any = {
      page: currentPage.value,
      limit: itemsPerPage
    }

    if (filters.value.search) queryParams.search = filters.value.search
    if (filters.value.category) queryParams.category = filters.value.category
    if (filters.value.isActive !== '') queryParams.isActive = filters.value.isActive

    await restaurantsStore.fetchRestaurants({
      query: queryParams
    })
  } catch (error: any) {
    console.error('Failed to load restaurants:', error)
    alert('เกิดข้อผิดพลาดในการโหลดข้อมูล')
  }
}

function closeModal() {
  restaurantModal.value?.close()
  selectedRestaurant.value = null
  isEditing.value = false
}

// Watch filters and reload
watch(() => [filters.value.category, filters.value.isActive], () => {
  currentPage.value = 1
  loadRestaurants()
}, { deep: true })

// Watch search with debounce
watch(() => filters.value.search, () => {
  currentPage.value = 1
  loadRestaurants()
})

// Load restaurants on mount
onMounted(() => {
  loadRestaurants()
})

// SEO
useHead({
  title: 'จัดการร้านอาหาร - CMS',
  meta: [
    { name: 'description', content: 'จัดการข้อมูลร้านอาหารและร้านกาแฟในระบบ CMS' }
  ]
})
</script>