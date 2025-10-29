<template>
  <form @submit.prevent="handleSubmit">
    <!-- Basic Information -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ข้อมูลข่าว</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="formData.title"
            label="หัวข้อข่าว"
            placeholder="หัวข้อข่าว"
            :required="true"
            :error="errors.title"
          />

          <BaseSelect
            v-model="formData.category"
            label="หมวดหมู่"
            :required="true"
            :error="errors.category"
            :options="[
              { label: 'เลือกหมวดหมู่', value: '' },
              { label: 'ประกาศ', value: 'announcement' },
              { label: 'โปรโมชั่น', value: 'promotion' },
              { label: 'ข่าวกิจกรรม', value: 'event_news' },
              { label: 'เคล็ดลับการท่องเที่ยว', value: 'travel_tips' },
              { label: 'เรื่องราวท้องถิ่น', value: 'local_story' },
              { label: 'อัพเดทธุรกิจ', value: 'business_update' }
            ]"
          />
        </div>

        <BaseTextarea
          v-model="formData.description"
          label="คำอธิบายสั้น"
          placeholder="คำอธิบายสั้นๆ สำหรับแสดงในหน้ารายการ"
          :required="true"
          :error="errors.description"
          :rows="2"
        />

        <BaseTextarea
          v-model="formData.excerpt"
          label="สรุปเนื้อหา"
          placeholder="สรุปเนื้อหาข่าวสำหรับแสดงในการ์ด"
          :rows="3"
        />

        <BaseRichTextEditor
          v-model="formData.content"
          label="เนื้อหาข่าวเต็ม"
          placeholder="เขียนเนื้อหาข่าว..."
          :required="true"
          :error="errors.content"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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

          <BaseInput
            v-model.number="formData.order"
            type="number"
            label="ลำดับการแสดง"
            :min="0"
          />
        </div>
      </div>
    </div>

    <!-- Author Information -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ข้อมูลผู้เขียน</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="formData.author.name"
            label="ชื่อผู้เขียน"
            placeholder="ชื่อผู้เขียน"
            :required="true"
            :error="errors['author.name']"
          />

          <BaseInput
            v-model="formData.author.email"
            type="email"
            label="อีเมลผู้เขียน"
            placeholder="อีเมลผู้เขียน"
          />
        </div>

        <BaseTextarea
          v-model="formData.author.bio"
          label="ข้อมูลผู้เขียน"
          placeholder="ข้อมูลเกี่ยวกับผู้เขียน"
          :rows="2"
        />
      </div>
    </div>

    <!-- Media & Details -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">สื่อและรายละเอียด</h4>

        <BaseImagePicker
          v-model="formData.images"
          category="news"
          :multiple="true"
          :max-images="5"
          label="รูปภาพข่าว"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseDatePicker
            v-model="formData.publishDate"
            label="วันที่เผยแพร่"
            :required="true"
          />

          <BaseInput
            v-model.number="formData.readTime"
            type="number"
            label="เวลาอ่าน (นาที)"
            :min="1"
            placeholder="เช่น 5"
          />

          <BaseInput
            v-model="formData.source"
            label="แหล่งที่มา"
            placeholder="แหล่งที่มา (ถ้ามี)"
          />
        </div>

        <BaseInput
          v-model="tagsInput"
          label="แท็ก"
          placeholder="แท็ก (คั่นด้วยเครื่องหมาย ,)"
          @blur="updateTags"
        />
      </div>
    </div>

    <!-- Location (Optional) -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ที่ตั้ง (ไม่บังคับ)</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseSelect
            v-model="formData.location.province"
            label="จังหวัด"
            :options="THAILAND_PROVINCES"
          />

          <BaseInput
            v-model="formData.location.district"
            label="อำเภอ/เขต"
            placeholder="อำเภอ/เขต"
          />
        </div>
      </div>
    </div>

    <!-- Related Content -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ข้อมูลที่เกี่ยวข้อง</h4>

        <div v-for="(item, index) in formData.relatedContent" :key="index" class="mb-4 p-4 bg-base-100 rounded-lg">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
            <BaseSelect
              v-model="item.contentType"
              label="ประเภท"
              :options="[
                { label: 'เลือกประเภท', value: '' },
                { label: 'โรงแรม', value: 'hotel' },
                { label: 'ร้านอาหาร', value: 'restaurant' },
                { label: 'บริการท่องเที่ยว', value: 'travel_service' },
                { label: 'ผลิตภัณฑ์ท้องถิ่น', value: 'local_product' },
                { label: 'กิจกรรม', value: 'event' }
              ]"
              @update:model-value="onContentTypeChange(index)"
            />

            <div class="md:col-span-2">
              <label class="label">
                <span class="label-text">เลือกรายการ</span>
              </label>
              <div class="relative">
                <input
                  type="text"
                  v-model="contentSearchQueries[index]"
                  @input="searchContent(index)"
                  @focus="showContentDropdown[index] = true"
                  placeholder="พิมพ์เพื่อค้นหา..."
                  class="input input-bordered w-full"
                />
                <div
                  v-if="showContentDropdown[index] && contentSearchResults[index]?.length > 0"
                  class="absolute z-50 w-full mt-1 bg-base-100 border border-base-300 rounded-lg shadow-lg max-h-60 overflow-auto"
                >
                  <div
                    v-for="content in contentSearchResults[index]"
                    :key="content._id"
                    @click="selectContent(index, content)"
                    class="p-3 hover:bg-base-200 cursor-pointer border-b border-base-300 last:border-b-0"
                  >
                    <div class="font-medium">{{ content.title }}</div>
                    <div class="text-sm text-gray-500">{{ content.description?.substring(0, 60) }}...</div>
                  </div>
                </div>
              </div>
              <div v-if="item.contentId" class="text-xs text-gray-500 mt-1">
                ID: {{ item.contentId }}
              </div>
            </div>
          </div>

          <div class="flex justify-end">
            <BaseButton
              @click="removeRelatedContent(index)"
              variant="error"
              size="sm"
              type="button"
            >
              ลบ
            </BaseButton>
          </div>
        </div>

        <BaseButton
          @click="addRelatedContent"
          variant="ghost"
          size="sm"
          type="button"
        >
          + เพิ่มข้อมูลที่เกี่ยวข้อง
        </BaseButton>
      </div>
    </div>

    <!-- Actions -->
    <div class="flex justify-end gap-4">
      <BaseButton
        @click="$emit('cancel')"
        variant="ghost"
        type="button"
      >
        ยกเลิก
      </BaseButton>
      <BaseButton
        type="submit"
        variant="primary"
        :loading="loading"
      >
        {{ isEditing ? 'บันทึกการแก้ไข' : 'สร้างข่าว' }}
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { NewsContent } from '~/composables/data_models/cms'
import { THAILAND_PROVINCES } from '~/composables/constants/provinces'

interface Props {
  news?: NewsContent | null
  isEditing?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  news: null,
  isEditing: false,
  loading: false
})

const emit = defineEmits<{
  save: [data: Partial<NewsContent>]
  cancel: []
}>()

// Form data
const formData = ref<Partial<NewsContent>>({
  title: '',
  description: '',
  content: '',
  excerpt: '',
  category: '' as any,
  author: {
    name: '',
    email: '',
    bio: ''
  },
  coverImage: '',
  publishDate: new Date(),
  source: '',
  location: {
    province: '',
    district: ''
  },
  tags: [],
  images: [],
  relatedContent: [],
  isActive: true,
  featured: false,
  order: 0,
  readTime: 5
})

// Helper inputs
const tagsInput = ref('')

// Errors
const errors = ref<Record<string, string>>({})

// Related content autocomplete
const contentSearchQueries = ref<Record<number, string>>({})
const contentSearchResults = ref<Record<number, any[]>>({})
const showContentDropdown = ref<Record<number, boolean>>({})
const { searchContentByType } = useContentSearch()
let searchTimeout: any = null

// Initialize form with existing news data
if (props.news) {
  formData.value = {
    ...formData.value,
    ...props.news,
    author: {
      ...formData.value.author,
      ...props.news.author
    },
    location: {
      ...formData.value.location,
      ...props.news.location
    }
  }
  tagsInput.value = props.news.tags?.join(', ') || ''

  // Initialize search queries for related content
  if (props.news.relatedContent) {
    props.news.relatedContent.forEach((item, index) => {
      contentSearchQueries.value[index] = item.title || ''
    })
  }
}

// Methods
function updateTags() {
  if (tagsInput.value) {
    formData.value.tags = tagsInput.value
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0)
  } else {
    formData.value.tags = []
  }
}

function validateForm(): boolean {
  errors.value = {}

  if (!formData.value.title) {
    errors.value.title = 'กรุณากรอกหัวข้อข่าว'
  }

  if (!formData.value.description) {
    errors.value.description = 'กรุณากรอกคำอธิบาย'
  }

  if (!formData.value.content) {
    errors.value.content = 'กรุณากรอกเนื้อหาข่าว'
  }

  if (!formData.value.category) {
    errors.value.category = 'กรุณาเลือกหมวดหมู่'
  }

  if (!formData.value.author?.name) {
    errors.value['author.name'] = 'กรุณากรอกชื่อผู้เขียน'
  }

  return Object.keys(errors.value).length === 0
}

// Related content functions
function addRelatedContent() {
  if (!formData.value.relatedContent) {
    formData.value.relatedContent = []
  }
  formData.value.relatedContent.push({
    contentType: '' as any,
    contentId: '',
    title: ''
  })
}

function removeRelatedContent(index: number) {
  formData.value.relatedContent?.splice(index, 1)
  delete contentSearchQueries.value[index]
  delete contentSearchResults.value[index]
  delete showContentDropdown.value[index]
}

function onContentTypeChange(index: number) {
  const item = formData.value.relatedContent?.[index]
  if (item) {
    // Reset selection when type changes
    item.contentId = ''
    item.title = ''
    contentSearchQueries.value[index] = ''
    contentSearchResults.value[index] = []
  }
}

async function searchContent(index: number) {
  const item = formData.value.relatedContent?.[index]
  if (!item?.contentType) return

  const query = contentSearchQueries.value[index] || ''

  // Clear previous timeout
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }

  // Debounce search
  searchTimeout = setTimeout(async () => {
    try {
      const results = await searchContentByType(item.contentType, query)
      contentSearchResults.value[index] = results
      showContentDropdown.value[index] = true
    } catch (error) {
      console.error('Search error:', error)
      contentSearchResults.value[index] = []
    }
  }, 300)
}

function selectContent(index: number, content: any) {
  const item = formData.value.relatedContent?.[index]
  if (item) {
    item.contentId = content._id
    item.title = content.title
    contentSearchQueries.value[index] = content.title
    showContentDropdown.value[index] = false
  }
}

// Close dropdown when clicking outside
if (typeof window !== 'undefined') {
  window.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) {
      Object.keys(showContentDropdown.value).forEach(key => {
        showContentDropdown.value[parseInt(key)] = false
      })
    }
  })
}

function handleSubmit() {
  // Update tags before submit
  updateTags()

  if (!validateForm()) {
    useToast().error('กรุณากรอกข้อมูลให้ครบถ้วน')
    return
  }

  // Clean up empty location
  if (!formData.value.location?.province && !formData.value.location?.district) {
    formData.value.location = undefined
  }

  // Clean up empty related content
  if (formData.value.relatedContent) {
    formData.value.relatedContent = formData.value.relatedContent.filter(
      item => item.contentType && item.contentId
    )
  }

  emit('save', formData.value)
}

// Watch for props changes
watch(() => props.news, (newNews) => {
  if (newNews) {
    formData.value = {
      ...formData.value,
      ...newNews,
      author: {
        ...formData.value.author,
        ...newNews.author
      },
      location: {
        ...formData.value.location,
        ...newNews.location
      }
    }
    tagsInput.value = newNews.tags?.join(', ') || ''
  }
})
</script>
