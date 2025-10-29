<template>
  <div class="p-6">
    <BasePageHeader
      title="จัดการข่าว"
      code="NEWS-001"
      description="จัดการข้อมูลข่าวสาร บทความ และโปรโมชั่น"
      :breadcrumbs="breadcrumbs"
    >
      <template #actions>
        <BaseButton @click="createNews" variant="primary" icon-left="plus">
          เพิ่มข่าว
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
            placeholder="ชื่อข่าว..."
          />

          <BaseSelect
            v-model="filters.category"
            label="หมวดหมู่"
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
            พบ {{ filteredNews.length }} รายการ
          </div>
        </div>
      </div>
    </div>

    <!-- News Table -->
    <div class="card bg-base-100 shadow">
      <div class="card-body p-0">
        <BaseTable
          :data="paginatedNews"
          :columns="columns"
          :loading="loading"
          striped
          @edit="editNews"
          @delete="deleteNews"
          @view="viewNews"
        >
          <template #coverImage="{ row }">
            <div class="avatar">
              <div class="w-16 h-12 rounded">
                <img
                  v-if="row.images && row.images[0]"
                  :src="row.images[0]"
                  :alt="row.title"
                  class="object-cover"
                />
                <div v-else class="bg-gradient-to-br from-purple-400 to-pink-500 w-full h-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
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

          <template #publishDate="{ row }">
            <div class="text-sm">
              {{ formatDate(row.publishDate) }}
            </div>
          </template>

          <template #author="{ row }">
            <div class="text-sm">
              <div class="font-medium">{{ row.author?.name }}</div>
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

    <!-- News Form Modal -->
    <dialog ref="newsModal" class="modal">
      <div class="modal-box w-11/12 max-w-4xl max-h-[90vh] overflow-y-auto">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 class="font-bold text-lg mb-4">
          {{ isEditing ? 'แก้ไขข่าว' : 'เพิ่มข่าวใหม่' }}
        </h3>

        <CmsNewsForm
          :news="selectedNews"
          :is-editing="isEditing"
          :saving="saving"
          @save="handleSaveNews"
          @cancel="closeModal"
        />
      </div>
    </dialog>

    <!-- Delete Confirmation Modal -->
    <dialog ref="deleteModal" class="modal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">ยืนยันการลบ</h3>
        <p class="py-4">คุณแน่ใจหรือไม่ว่าต้องการลบข่าว "{{ newsToDelete?.title }}"?</p>
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
import type { NewsContent } from '~/composables/data_models/cms'
import { useNewsStore } from '~/stores/news'
import { THAILAND_PROVINCES } from '~/composables/constants/provinces'

// Page Meta
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

// Store
const newsStore = useNewsStore()

// Breadcrumbs
const breadcrumbs = [
  { label: 'CMS Dashboard', to: '/manage-cms' },
  { label: 'ข่าว', to: '/manage-cms/news', current: true }
]

// Reactive data
const currentPage = ref(1)
const itemsPerPage = 10
const selectedNews = ref<NewsContent | null>(null)
const isEditing = ref(false)
const newsToDelete = ref<NewsContent | null>(null)
const saving = ref(false)
const deleting = ref(false)

// Modal refs
const newsModal = ref<HTMLDialogElement>()
const deleteModal = ref<HTMLDialogElement>()

// Filters
const filters = ref({
  search: '',
  category: '',
  province: '',
  isActive: ''
})

// Computed from store
const newsList = computed(() => newsStore.list || [])
const totalItems = computed(() => newsStore.pagination?.total || 0)
const loading = computed(() => newsStore.isLoading)

// Filter options
const categoryOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'announcement', label: 'ประกาศ' },
  { value: 'promotion', label: 'โปรโมชั่น' },
  { value: 'event_news', label: 'ข่าวกิจกรรม' },
  { value: 'travel_tips', label: 'เคล็ดลับการท่องเที่ยว' },
  { value: 'local_story', label: 'เรื่องราวท้องถิ่น' },
  { value: 'business_update', label: 'อัพเดทธุรกิจ' }
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
  { key: 'coverImage', label: 'รูปปก', sortable: false },
  { key: 'title', label: 'หัวข้อข่าว', sortable: true },
  { key: 'category', label: 'หมวดหมู่', sortable: true },
  { key: 'author', label: 'ผู้เขียน', sortable: false },
  { key: 'publishDate', label: 'วันที่เผยแพร่', sortable: true },
  { key: 'status', label: 'สถานะ', sortable: true },
  { key: 'featured', label: 'แนะนำ', sortable: false },
  { key: 'actions', label: 'จัดการ', sortable: false }
]

// Computed properties
const filteredNews = computed(() => newsList.value)

const totalPages = computed(() => newsStore.pagination?.totalPages || 1)

const paginatedNews = computed(() => newsList.value)

// Methods
function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    announcement: 'ประกาศ',
    promotion: 'โปรโมชั่น',
    event_news: 'ข่าวกิจกรรม',
    travel_tips: 'เคล็ดลับการท่องเที่ยว',
    local_story: 'เรื่องราวท้องถิ่น',
    business_update: 'อัพเดทธุรกิจ'
  }
  return labels[category] || category
}

function formatDate(date: any) {
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
  loadNews()
}

function createNews() {
  selectedNews.value = null
  isEditing.value = false
  newsModal.value?.showModal()
}

function editNews(news: NewsContent) {
  selectedNews.value = { ...news }
  isEditing.value = true
  newsModal.value?.showModal()
}

function viewNews(news: NewsContent) {
  navigateTo(`/manage-cms/news/${news._id}`)
}

function deleteNews(news: NewsContent) {
  newsToDelete.value = news
  deleteModal.value?.showModal()
}

async function confirmDelete() {
  deleting.value = true
  if (newsToDelete.value?._id) {
    try {
      await newsStore.deleteNews({
        body: { _id: newsToDelete.value._id }
      })
      useToast().success('ลบข่าวเรียบร้อยแล้ว')
      await loadNews()
      deleteModal.value?.close()
      newsToDelete.value = null
    } catch (error: any) {
      console.error('Failed to delete news:', error)
      useToast().error('เกิดข้อผิดพลาดในการลบข้อมูล')
    } finally {
      deleting.value = false
    }
  }
}

async function toggleFeatured(news: NewsContent) {
  if (!news._id) return

  try {
    await newsStore.updateNews({
      body: {
        _id: news._id,
        featured: !news.featured
      }
    })
    useToast().success('อัพเดทสถานะแนะนำเรียบร้อยแล้ว')
    await loadNews()
  } catch (error: any) {
    console.error('Failed to update featured status:', error)
    useToast().error('เกิดข้อผิดพลาดในการอัพเดทสถานะ')
  }
}

async function handleSaveNews(newsData: Partial<NewsContent>) {
  saving.value = true
  try {
    if (isEditing.value && selectedNews.value?._id) {
      // Update existing news
      await newsStore.updateNews({
        body: {
          _id: selectedNews.value._id,
          ...newsData
        }
      })
      useToast().success('อัพเดทข้อมูลข่าวเรียบร้อยแล้ว')
    } else {
      // Create new news
      await newsStore.createNews({
        body: newsData
      })
      useToast().success('เพิ่มข่าวเรียบร้อยแล้ว')
    }

    // Reload data after save
    await loadNews()
    closeModal()
  } catch (error: any) {
    console.error('Failed to save news:', error)
    useToast().error('เกิดข้อผิดพลาดในการบันทึกข้อมูล')
  } finally {
    saving.value = false
  }
}

// Load news from API
async function loadNews() {
  try {
    const queryParams: any = {
      page: currentPage.value,
      limit: itemsPerPage
    }

    if (filters.value.search) queryParams.search = filters.value.search
    if (filters.value.category) queryParams.category = filters.value.category
    if (filters.value.province) queryParams['location.province'] = filters.value.province
    if (filters.value.isActive !== '') queryParams.isActive = filters.value.isActive

    await newsStore.fetchNews({
      query: queryParams
    })
  } catch (error: any) {
    console.error('Failed to load news:', error)
    alert('เกิดข้อผิดพลาดในการโหลดข้อมูล')
  }
}

function closeModal() {
  newsModal.value?.close()
  selectedNews.value = null
  isEditing.value = false
}

// Watch filters and reload
watch(() => [filters.value.category, filters.value.province, filters.value.isActive], () => {
  currentPage.value = 1
  loadNews()
}, { deep: true })

// Watch search with debounce
watch(() => filters.value.search, () => {
  currentPage.value = 1
  loadNews()
})

// Load news on mount
onMounted(() => {
  loadNews()
})

// SEO
useHead({
  title: 'จัดการข่าว - CMS',
  meta: [
    { name: 'description', content: 'จัดการข้อมูลข่าวสารและบทความในระบบ CMS' }
  ]
})
</script>
