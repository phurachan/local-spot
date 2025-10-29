<template>
  <form @submit.prevent="handleSubmit">
    <!-- Basic Information -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ข้อมูลพื้นฐาน</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="formData.title"
            label="ชื่อโรงแรม"
            placeholder="ชื่อโรงแรม"
            :required="true"
            :error="errors.title"
          />

          <BaseSelect
            v-model="formData.category"
            label="ประเภท"
            :required="true"
            :error="errors.category"
            :options="[
              { label: 'เลือกประเภท', value: '' },
              { label: 'โรงแรม', value: 'hotel' },
              { label: 'รีสอร์ท', value: 'resort' },
              { label: 'โฮสเทล', value: 'hostel' },
              { label: 'เกสต์เฮาส์', value: 'guesthouse' },
              { label: 'วิลลา', value: 'villa' }
            ]"
          />
        </div>

        <BaseTextarea
          v-model="formData.description"
          label="คำอธิบาย"
          placeholder="คำอธิบายโรงแรม"
          :required="true"
          :error="errors.description"
          :rows="4"
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

    <!-- Location Information -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ข้อมูลที่ตั้ง</h4>

        <BaseInput
          v-model="formData.location.address"
          label="ที่อยู่"
          placeholder="ที่อยู่โรงแรม"
          :required="true"
          :error="errors['location.address']"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="formData.location.district"
            label="อำเภอ/เขต"
            placeholder="อำเภอ/เขต"
            :required="true"
            :error="errors['location.district']"
          />

          <BaseSelect
            v-model="formData.location.province"
            label="จังหวัด"
            :required="true"
            :error="errors['location.province']"
            :options="THAILAND_PROVINCES"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model.number="formData.location.coordinates!.lat"
            type="number"
            label="ละติจูด"
            placeholder="เช่น 18.8845"
            step="any"
          />

          <BaseInput
            v-model.number="formData.location.coordinates!.lng"
            type="number"
            label="ลองจิจูด"
            placeholder="เช่น 98.9934"
            step="any"
          />
        </div>
      </div>
    </div>

    <!-- Contact Information -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ข้อมูลติดต่อ</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="phoneInput"
            label="เบอร์โทรศัพท์"
            placeholder="เบอร์โทรศัพท์ (คั่นด้วยเครื่องหมาย ,)"
            hint="สามารถใส่หลายเบอร์ คั่นด้วยเครื่องหมาย ,"
            @blur="updatePhones"
          />

          <BaseInput
            v-model="formData.contactInfo.email"
            type="email"
            label="อีเมล"
            placeholder="อีเมล"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="formData.contactInfo.website"
            type="url"
            label="เว็บไซต์"
            placeholder="https://example.com"
          />

          <BaseInput
            v-model="formData.contactInfo.lineOA"
            label="LINE OA"
            placeholder="@lineoa"
          />
        </div>
      </div>
    </div>

    <!-- Check-in/Check-out -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">เวลาเช็คอิน/เช็คเอาท์</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseDatePicker
            v-model="formData.checkInOut.checkIn"
            type="time"
            label="เวลาเช็คอิน"
          />

          <BaseDatePicker
            v-model="formData.checkInOut.checkOut"
            type="time"
            label="เวลาเช็คเอาท์"
          />
        </div>
      </div>
    </div>

    <!-- Amenities -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">สิ่งอำนวยความสะดวก</h4>

        <BaseInput
          v-model="amenitiesInput"
          label="สิ่งอำนวยความสะดวก"
          placeholder="WiFi ฟรี, สระว่ายน้ำ, ฟิตเนส (คั่นด้วยเครื่องหมาย ,)"
          hint="คั่นด้วยเครื่องหมาย ,"
          @blur="updateAmenities"
        />

        <div v-if="formData.amenities.length > 0" class="flex flex-wrap gap-2 mt-2">
          <div
            v-for="(amenity, index) in formData.amenities"
            :key="index"
            class="badge badge-primary gap-2"
          >
            {{ amenity }}
            <button
              type="button"
              @click="removeAmenity(index)"
              class="btn btn-circle btn-ghost btn-xs"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Images -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">รูปภาพ</h4>

        <BaseImagePicker
          v-model="formData.images"
          category="hotel"
          :multiple="true"
          :max-images="10"
        />
      </div>
    </div>

    <!-- Tags -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">แท็ก</h4>

        <BaseInput
          v-model="tagsInput"
          label="แท็ก"
          placeholder="โรงแรม, รีสอร์ท, ธรรมชาติ (คั่นด้วยเครื่องหมาย ,)"
          hint="คั่นด้วยเครื่องหมาย ,"
          @blur="updateTags"
        />

        <div v-if="formData.tags.length > 0" class="flex flex-wrap gap-2 mt-2">
          <div
            v-for="(tag, index) in formData.tags"
            :key="index"
            class="badge badge-secondary gap-2"
          >
            {{ tag }}
            <button
              type="button"
              @click="removeTag(index)"
              class="btn btn-circle btn-ghost btn-xs"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Form Actions -->
    <div class="flex justify-end space-x-4">
      <BaseButton @click="handleCancel" variant="ghost">
        ยกเลิก
      </BaseButton>
      <BaseButton type="submit" variant="primary" :loading="saving">
        {{ isEditing ? 'บันทึกการแก้ไข' : 'สร้างโรงแรม' }}
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { HotelContent } from '~/composables/data_models/cms'
import { THAILAND_PROVINCES } from '~/composables/constants/provinces'

interface Props {
  hotel?: HotelContent | null
  isEditing?: boolean
}

interface Emits {
  (e: 'save', hotel: HotelContent): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  hotel: null,
  isEditing: false
})

const emit = defineEmits<Emits>()

// Form data
const formData = ref<HotelContent>({
  type: 'hotel',
  title: '',
  description: '',
  category: 'hotel',
  images: [],
  isActive: true,
  featured: false,
  order: 0,
  tags: [],
  location: {
    address: '',
    district: '',
    province: '',
    coordinates: {
      lat: 0,
      lng: 0
    }
  },
  contactInfo: {
    phone: [],
    email: '',
    website: '',
    lineOA: ''
  },
  amenities: [],
  roomTypes: [],
  checkInOut: {
    checkIn: '14:00',
    checkOut: '12:00'
  },
  policies: [],
  nearbyAttractions: []
})

// Input helpers
const phoneInput = ref('')
const amenitiesInput = ref('')
const tagsInput = ref('')

// Form state
const saving = ref(false)
const errors = ref<Record<string, string>>({})

// Initialize form data
watch(() => props.hotel, (hotel) => {
  // Reset errors first
  errors.value = {}

  if (hotel) {
    formData.value = { ...hotel }
    phoneInput.value = hotel.contactInfo?.phone?.join(', ') || ''
    amenitiesInput.value = hotel.amenities?.join(', ') || ''
    tagsInput.value = hotel.tags?.join(', ') || ''
  } else {
    resetForm()
  }
}, { immediate: true })

function resetForm() {
  // Reset errors
  errors.value = {}

  formData.value = {
    type: 'hotel',
    title: '',
    description: '',
    category: 'hotel',
    images: [],
    isActive: true,
    featured: false,
    order: 0,
    tags: [],
    location: {
      address: '',
      district: '',
      province: '',
      coordinates: {
        lat: 0,
        lng: 0
      }
    },
    contactInfo: {
      phone: [],
      email: '',
      website: '',
      lineOA: ''
    },
    amenities: [],
    roomTypes: [],
    checkInOut: {
      checkIn: '14:00',
      checkOut: '12:00'
    },
    policies: [],
    nearbyAttractions: []
  }
  phoneInput.value = ''
  amenitiesInput.value = ''
  tagsInput.value = ''
}

function updatePhones() {
  formData.value.contactInfo.phone = phoneInput.value
    .split(',')
    .map(phone => phone.trim())
    .filter(phone => phone.length > 0)
}

function updateAmenities() {
  formData.value.amenities = amenitiesInput.value
    .split(',')
    .map(amenity => amenity.trim())
    .filter(amenity => amenity.length > 0)
}

function updateTags() {
  formData.value.tags = tagsInput.value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
}

function removeAmenity(index: number) {
  formData.value.amenities.splice(index, 1)
  amenitiesInput.value = formData.value.amenities.join(', ')
}

function removeTag(index: number) {
  formData.value.tags.splice(index, 1)
  tagsInput.value = formData.value.tags.join(', ')
}

function validateForm(): boolean {
  errors.value = {}

  if (!formData.value.title?.trim()) {
    errors.value.title = 'กรุณาระบุชื่อโรงแรม'
  }

  if (!formData.value.description?.trim()) {
    errors.value.description = 'กรุณาระบุคำอธิบาย'
  }

  if (!formData.value.category) {
    errors.value.category = 'กรุณาเลือกประเภท'
  }

  if (!formData.value.location?.address?.trim()) {
    errors.value['location.address'] = 'กรุณาระบุที่อยู่'
  }

  if (!formData.value.location?.district?.trim()) {
    errors.value['location.district'] = 'กรุณาระบุอำเภอ/เขต'
  }

  if (!formData.value.location?.province?.trim()) {
    errors.value['location.province'] = 'กรุณาเลือกจังหวัด'
  }

  return Object.keys(errors.value).length === 0
}

async function handleSubmit() {
  if (!validateForm()) {
    return
  }

  saving.value = true

  try {
    // Update inputs before saving
    updatePhones()
    updateAmenities()
    updateTags()

    // Emit save event
    emit('save', { ...formData.value })
  } catch (error) {
    console.error('Error saving hotel:', error)
  } finally {
    saving.value = false
  }
}

function handleCancel() {
  emit('cancel')
}
</script>