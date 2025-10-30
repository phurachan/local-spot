<template>
  <div class="p-6">
    <BasePageHeader
      title="จัดการสินค้าท้องถิ่น"
      code="LOCAL-PRODUCT-001"
      description="จัดการข้อมูลสินค้าท้องถิ่น หัตถกรรม ของฝาก อาหารแปรรูป"
      :breadcrumbs="breadcrumbs"
    >
      <template #actions>
        <BaseButton @click="createLocalProduct" variant="primary" icon-left="plus">
          เพิ่มสินค้า
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
            placeholder="ชื่อสินค้า..."
          />

          <BaseSelect
            v-model="filters.category"
            label="ประเภทสินค้า"
            :options="categoryOptions"
            hide-placeholder
          />

          <BaseSelect
            v-model="filters.inStock"
            label="สถานะสินค้า"
            :options="stockOptions"
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
            พบ {{ filteredLocalProducts.length }} รายการ
          </div>
        </div>
      </div>
    </div>

    <!-- Local Products Table -->
    <div class="card bg-base-100 shadow">
      <div class="card-body p-0">
        <BaseTable
          :data="paginatedLocalProducts"
          :columns="columns"
          :loading="loading"
          striped
          @edit="editLocalProduct"
          @delete="deleteLocalProduct"
          @view="viewLocalProduct"
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
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
              </div>
            </div>
          </template>

          <template #status="{ row }">
            <div class="badge truncate max-w-[100px]" :class="row.isActive ? 'badge-success' : 'badge-error'">
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
            <div class="badge badge-outline truncate max-w-[120px]">
              {{ getCategoryLabel(row.category) }}
            </div>
          </template>

          <template #price="{ row }">
            <div class="badge badge-sm badge-success truncate max-w-[120px]">
              {{ row.pricing?.price.toLocaleString() }} {{ row.pricing?.currency }}
            </div>
          </template>

          <template #stock="{ row }">
            <div class="badge truncate max-w-[100px]" :class="row.availability?.inStock ? 'badge-info' : 'badge-warning'">
              {{ row.availability?.inStock ? 'มีสินค้า' : 'สินค้าหมด' }}
            </div>
          </template>

          <template #vendor="{ row }">
            <div class="badge badge-sm badge-ghost truncate max-w-[150px]">
              {{ row.vendor?.name }}
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

    <!-- Local Product Form Modal -->
    <dialog ref="localProductModal" class="modal">
      <div class="modal-box w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 class="font-bold text-lg mb-4">
          {{ isEditing ? 'แก้ไขสินค้าท้องถิ่น' : 'เพิ่มสินค้าท้องถิ่นใหม่' }}
        </h3>

        <CmsLocalProductForm
          :local-product="selectedLocalProduct"
          :is-editing="isEditing"
          :saving="saving"
          @save="handleSaveLocalProduct"
          @cancel="closeModal"
        />
      </div>
    </dialog>

    <!-- Delete Confirmation Modal -->
    <dialog ref="deleteModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">ยืนยันการลบ</h3>
        <p class="py-4">คุณแน่ใจหรือไม่ว่าต้องการลบสินค้า "{{ localProductToDelete?.title }}"?</p>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">ยกเลิก</button>
          </form>
          <button @click="confirmDelete" class="btn btn-error" :disabled="deleting"><span v-if="deleting" class="loading loading-spinner loading-sm"></span>{{ deleting ? 'กำลังลบ...' : 'ลบ' }}</button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import type { LocalProductContent } from '~/composables/data_models/cms'
import { useLocalProductsStore } from '~/stores/localProducts'

// Page Meta
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

// Store
const localProductsStore = useLocalProductsStore()

// Breadcrumbs
const breadcrumbs = [
  { label: 'CMS Dashboard', to: '/manage-cms' },
  { label: 'สินค้าท้องถิ่น', to: '/manage-cms/local-products', current: true }
]

// Reactive data
const currentPage = ref(1)
const itemsPerPage = 10
const selectedLocalProduct = ref<LocalProductContent | null>(null)
const isEditing = ref(false)
const localProductToDelete = ref<LocalProductContent | null>(null)
const saving = ref(false)
const deleting = ref(false)

// Modal refs
const localProductModal = ref<HTMLDialogElement>()
const deleteModal = ref<HTMLDialogElement>()

// Filters
const filters = ref({
  search: '',
  category: '',
  inStock: '',
  isActive: ''
})

// Computed from store
const localProducts = computed(() => localProductsStore.list || [])
const totalItems = computed(() => localProductsStore.pagination?.total || 0)
const loading = computed(() => localProductsStore.isLoading)

// Filter options
const categoryOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'handicraft', label: 'หัตถกรรม' },
  { value: 'food_product', label: 'อาหารแปรรูป' },
  { value: 'souvenir', label: 'ของฝาก' },
  { value: 'textile', label: 'ผ้าทอ' },
  { value: 'art', label: 'งานศิลปะ' }
]

const stockOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'true', label: 'มีสินค้า' },
  { value: 'false', label: 'สินค้าหมด' }
]

const statusOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'true', label: 'เปิดใช้งาน' },
  { value: 'false', label: 'ปิดใช้งาน' }
]

// Table columns
const columns = [
  { key: 'image', label: 'รูปภาพ', sortable: false },
  { key: 'title', label: 'ชื่อสินค้า', sortable: true },
  { key: 'category', label: 'ประเภท', sortable: true },
  { key: 'vendor', label: 'ผู้ผลิต', sortable: false },
  { key: 'price', label: 'ราคา', sortable: true },
  { key: 'stock', label: 'สต็อก', sortable: false },
  { key: 'status', label: 'สถานะ', sortable: true },
  { key: 'featured', label: 'แนะนำ', sortable: false },
  { key: 'actions', label: 'จัดการ', sortable: false }
]

// Computed properties
const filteredLocalProducts = computed(() => localProducts.value)

const paginatedLocalProducts = computed(() => localProducts.value)

// Methods
function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    handicraft: 'หัตถกรรม',
    food_product: 'อาหารแปรรูป',
    souvenir: 'ของฝาก',
    textile: 'ผ้าทอ',
    art: 'งานศิลปะ'
  }
  return labels[category] || category
}

function resetFilters() {
  filters.value = {
    search: '',
    category: '',
    inStock: '',
    isActive: ''
  }
}

function handlePageChange(page: number) {
  currentPage.value = page
  loadLocalProducts()
}

function createLocalProduct() {
  selectedLocalProduct.value = null
  isEditing.value = false
  localProductModal.value?.showModal()
}

function editLocalProduct(product: LocalProductContent) {
  selectedLocalProduct.value = { ...product }
  isEditing.value = true
  localProductModal.value?.showModal()
}

function viewLocalProduct(product: LocalProductContent) {
  // Navigate to local product detail page
  navigateTo(`/manage-cms/local-products/${product._id}`)
}

function deleteLocalProduct(product: LocalProductContent) {
  localProductToDelete.value = product
  deleteModal.value?.showModal()
}

async function confirmDelete() {
  if (localProductToDelete.value?._id) {
    deleting.value = true
    try {
      await localProductsStore.deleteLocalProduct({
        body: { _id: localProductToDelete.value._id }
      })
      useToast().success('ลบสินค้าเรียบร้อยแล้ว')
      // Reload data
      await loadLocalProducts()
      deleteModal.value?.close()
      localProductToDelete.value = null
    } catch (error: any) {
      console.error('Failed to delete local product:', error)
      useToast().error('เกิดข้อผิดพลาดในการลบข้อมูล')
    } finally {
      deleting.value = false
    }
  }
}

async function toggleFeatured(product: LocalProductContent) {
  if (!product._id) return

  try {
    await localProductsStore.updateLocalProduct({
      body: {
        _id: product._id,
        featured: !product.featured
      }
    })
    useToast().success('อัพเดทสถานะแนะนำเรียบร้อยแล้ว')
    await loadLocalProducts()
  } catch (error: any) {
    console.error('Failed to update featured status:', error)
    useToast().error('เกิดข้อผิดพลาดในการอัพเดทสถานะ')
  }
}

async function handleSaveLocalProduct(productData: LocalProductContent) {
  saving.value = true
  try {
    if (isEditing.value && selectedLocalProduct.value?._id) {
      // Update existing local product
      await localProductsStore.updateLocalProduct({
        body: {
          _id: selectedLocalProduct.value._id,
          ...productData
        }
      })
      useToast().success('อัพเดทข้อมูลสินค้าเรียบร้อยแล้ว')
    } else {
      // Create new local product
      await localProductsStore.createLocalProduct({
        body: productData
      })
      useToast().success('เพิ่มสินค้าเรียบร้อยแล้ว')
    }

    // Reload data after save
    await loadLocalProducts()
    closeModal()
  } catch (error: any) {
    console.error('Failed to save local product:', error)
    useToast().error('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  } finally {
    saving.value = false
  }
}

// Load local products from API
async function loadLocalProducts() {
  try {
    const queryParams: any = {
      page: currentPage.value,
      limit: itemsPerPage
    }

    if (filters.value.search) queryParams.search = filters.value.search
    if (filters.value.category) queryParams.category = filters.value.category
    if (filters.value.inStock !== '') queryParams.inStock = filters.value.inStock
    if (filters.value.isActive !== '') queryParams.isActive = filters.value.isActive

    await localProductsStore.fetchLocalProducts({
      query: queryParams
    })
  } catch (error: any) {
    console.error('Failed to load local products:', error)
    alert('เกิดข้อผิดพลาดในการโหลดข้อมูล')
  }
}

function closeModal() {
  localProductModal.value?.close()
  selectedLocalProduct.value = null
  isEditing.value = false
}

// Watch filters and reload
watch(() => [filters.value.category, filters.value.inStock, filters.value.isActive], () => {
  currentPage.value = 1
  loadLocalProducts()
}, { deep: true })

// Watch search with debounce
watch(() => filters.value.search, () => {
  currentPage.value = 1
  loadLocalProducts()
})

// Load local products on mount
onMounted(() => {
  loadLocalProducts()
})

// SEO
useHead({
  title: 'จัดการสินค้าท้องถิ่น - CMS',
  meta: [
    { name: 'description', content: 'จัดการข้อมูลสินค้าท้องถิ่นและหัตถกรรมในระบบ CMS' }
  ]
})
</script>