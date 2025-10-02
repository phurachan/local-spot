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

        <BaseTextarea
          v-model="formData.content"
          label="เนื้อหาข่าวเต็ม"
          placeholder="เนื้อหาข่าวแบบเต็ม (รองรับ HTML)"
          :required="true"
          :error="errors.content"
          :rows="10"
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
          <BaseInput
            v-model="formData.location.province"
            label="จังหวัด"
            placeholder="จังหวัด"
          />

          <BaseInput
            v-model="formData.location.district"
            label="อำเภอ/เขต"
            placeholder="อำเภอ/เขต"
          />
        </div>
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
  isActive: true,
  featured: false,
  order: 0,
  readTime: 5
})

// Helper inputs
const tagsInput = ref('')

// Errors
const errors = ref<Record<string, string>>({})

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
