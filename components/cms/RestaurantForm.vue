<template>
  <form @submit.prevent="handleSubmit">
    <!-- Basic Information -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ข้อมูลพื้นฐาน</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="formData.title"
            label="ชื่อร้าน"
            placeholder="ชื่อร้านอาหาร"
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
              { label: 'ร้านอาหาร', value: 'restaurant' },
              { label: 'ร้านกาแฟ', value: 'cafe' },
              { label: 'อาหารริมทาง', value: 'street_food' },
              { label: 'อาหารท้องถิ่น', value: 'local_cuisine' },
              { label: 'อาหารนานาชาติ', value: 'international' }
            ]"
          />
        </div>

        <BaseTextarea
          v-model="formData.description"
          label="คำอธิบาย"
          placeholder="คำอธิบายร้านอาหาร"
          :required="true"
          :error="errors.description"
          :rows="4"
        />

        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
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

          <BaseSelect
            v-model="formData.priceRange"
            label="ระดับราคา"
            :options="[
              { label: 'เลือกระดับราคา', value: '' },
              { label: 'ประหยัด', value: 'budget' },
              { label: 'กลาง', value: 'mid_range' },
              { label: 'สูง', value: 'fine_dining' }
            ]"
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
          placeholder="ที่อยู่ร้านอาหาร"
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

    <!-- Operating Hours -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">เวลาทำการ</h4>

        <div class="space-y-3">
          <div v-for="day in days" :key="day.key" class="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div class="font-medium">{{ day.label }}</div>

            <BaseCheckbox
              v-model="formData.operatingHours[day.key]!.closed"
              :label="formData.operatingHours[day.key]?.closed ? 'ปิด' : 'เปิด'"
              variant="error"
              size="sm"
            />

            <BaseDatePicker
              v-model="formData.operatingHours[day.key]!.open"
              type="time"
              size="sm"
              :disabled="formData.operatingHours[day.key]?.closed"
            />

            <BaseDatePicker
              v-model="formData.operatingHours[day.key]!.close"
              type="time"
              size="sm"
              :disabled="formData.operatingHours[day.key]?.closed"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Cuisine & Specialties -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ประเภทอาหารและเมนูพิเศษ</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="cuisineInput"
            label="ประเภทอาหาร"
            placeholder="ไทย, เหนือ, จีน (คั่นด้วยเครื่องหมาย ,)"
            hint="คั่นด้วยเครื่องหมาย ,"
            @blur="updateCuisine"
          />

          <BaseInput
            v-model="specialtiesInput"
            label="เมนูพิเศษ"
            placeholder="ข้าวซอยไก่, ลาบหมู (คั่นด้วยเครื่องหมาย ,)"
            hint="คั่นด้วยเครื่องหมาย ,"
            @blur="updateSpecialties"
          />
        </div>

        <BaseInput
          v-model="dietaryOptionsInput"
          label="ตัวเลือกอาหาร"
          placeholder="เวแกน, ไม่มีหมู, ไม่มีไข่ (คั่นด้วยเครื่องหมาย ,)"
          hint="เช่น เวแกน, ไม่มีหมู, ไม่มีไข่ คั่นด้วยเครื่องหมาย ,"
          @blur="updateDietaryOptions"
        />

        <!-- Display tags -->
        <div v-if="formData.cuisine?.length > 0" class="mt-3">
          <div class="text-sm font-medium mb-2">ประเภทอาหาร:</div>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="(cuisine, index) in formData.cuisine"
              :key="index"
              class="badge badge-primary gap-2"
            >
              {{ cuisine }}
              <button
                type="button"
                @click="removeCuisine(index)"
                class="btn btn-circle btn-ghost btn-xs"
              >
                ✕
              </button>
            </div>
          </div>
        </div>

        <div v-if="formData.specialties?.length > 0" class="mt-3">
          <div class="text-sm font-medium mb-2">เมนูพิเศษ:</div>
          <div class="flex flex-wrap gap-2">
            <div
              v-for="(specialty, index) in formData.specialties"
              :key="index"
              class="badge badge-secondary gap-2"
            >
              {{ specialty }}
              <button
                type="button"
                @click="removeSpecialty(index)"
                class="btn btn-circle btn-ghost btn-xs"
              >
                ✕
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Delivery -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">บริการจัดส่ง</h4>

        <BaseCheckbox
          v-model="formData.delivery.available"
          :label="formData.delivery.available ? 'มีบริการจัดส่ง' : 'ไม่มีบริการจัดส่ง'"
          variant="accent"
        />

        <BaseInput
          v-if="formData.delivery.available"
          v-model="deliveryPlatformsInput"
          label="แพลตฟอร์มจัดส่ง"
          placeholder="Grab Food, Food Panda, Line Man (คั่นด้วยเครื่องหมาย ,)"
          hint="คั่นด้วยเครื่องหมาย ,"
          @blur="updateDeliveryPlatforms"
        />
      </div>
    </div>

    <!-- Images -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">รูปภาพ</h4>

        <BaseImagePicker
          v-model="formData.images"
          category="restaurant"
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
          placeholder="ร้านอาหาร, อาหารเหนือ, ข้าวซอย (คั่นด้วยเครื่องหมาย ,)"
          hint="คั่นด้วยเครื่องหมาย ,"
          @blur="updateTags"
        />

        <div v-if="formData.tags.length > 0" class="flex flex-wrap gap-2 mt-2">
          <div
            v-for="(tag, index) in formData.tags"
            :key="index"
            class="badge badge-info gap-2"
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
        {{ isEditing ? 'บันทึกการแก้ไข' : 'สร้างร้านอาหาร' }}
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { RestaurantContent } from '~/composables/data_models/cms'
import { THAILAND_PROVINCES } from '~/composables/constants/provinces'

interface Props {
  restaurant?: RestaurantContent | null
  isEditing?: boolean
  saving?: boolean
}

interface Emits {
  (e: 'save', restaurant: RestaurantContent): void
  (e: 'cancel'): void
}

const props = withDefaults(defineProps<Props>(), {
  restaurant: null,
  isEditing: false,
  saving: false
})

const emit = defineEmits<Emits>()

// Days of week
const days = [
  { key: 'monday', label: 'จันทร์' },
  { key: 'tuesday', label: 'อังคาร' },
  { key: 'wednesday', label: 'พุธ' },
  { key: 'thursday', label: 'พฤหัสบดี' },
  { key: 'friday', label: 'ศุกร์' },
  { key: 'saturday', label: 'เสาร์' },
  { key: 'sunday', label: 'อาทิตย์' }
]

// Form data
const formData = ref<RestaurantContent>({
  type: 'restaurant',
  title: '',
  description: '',
  category: 'restaurant',
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
  cuisine: [],
  priceRange: 'budget',
  operatingHours: {
    monday: { open: '09:00', close: '22:00', closed: false },
    tuesday: { open: '09:00', close: '22:00', closed: false },
    wednesday: { open: '09:00', close: '22:00', closed: false },
    thursday: { open: '09:00', close: '22:00', closed: false },
    friday: { open: '09:00', close: '22:00', closed: false },
    saturday: { open: '09:00', close: '22:00', closed: false },
    sunday: { open: '09:00', close: '22:00', closed: false }
  },
  specialties: [],
  dietaryOptions: [],
  delivery: {
    available: false,
    platforms: []
  }
})

// Input helpers
const phoneInput = ref('')
const cuisineInput = ref('')
const specialtiesInput = ref('')
const dietaryOptionsInput = ref('')
const deliveryPlatformsInput = ref('')
const tagsInput = ref('')

// Form state
const errors = ref<Record<string, string>>({})

// Initialize form data
watch(() => props.restaurant, (restaurant) => {
  // Reset errors first
  errors.value = {}

  if (restaurant) {
    formData.value = { ...restaurant }
    phoneInput.value = restaurant.contactInfo?.phone?.join(', ') || ''
    cuisineInput.value = restaurant.cuisine?.join(', ') || ''
    specialtiesInput.value = restaurant.specialties?.join(', ') || ''
    dietaryOptionsInput.value = restaurant.dietaryOptions?.join(', ') || ''
    deliveryPlatformsInput.value = restaurant.delivery?.platforms?.join(', ') || ''
    tagsInput.value = restaurant.tags?.join(', ') || ''
  } else {
    resetForm()
  }
}, { immediate: true })

function resetForm() {
  // Reset errors
  errors.value = {}

  formData.value = {
    type: 'restaurant',
    title: '',
    description: '',
    category: 'restaurant',
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
    cuisine: [],
    priceRange: 'budget',
    operatingHours: {
      monday: { open: '09:00', close: '22:00', closed: false },
      tuesday: { open: '09:00', close: '22:00', closed: false },
      wednesday: { open: '09:00', close: '22:00', closed: false },
      thursday: { open: '09:00', close: '22:00', closed: false },
      friday: { open: '09:00', close: '22:00', closed: false },
      saturday: { open: '09:00', close: '22:00', closed: false },
      sunday: { open: '09:00', close: '22:00', closed: false }
    },
    specialties: [],
    dietaryOptions: [],
    delivery: {
      available: false,
      platforms: []
    }
  }
  phoneInput.value = ''
  cuisineInput.value = ''
  specialtiesInput.value = ''
  dietaryOptionsInput.value = ''
  deliveryPlatformsInput.value = ''
  tagsInput.value = ''
}

function updatePhones() {
  formData.value.contactInfo.phone = phoneInput.value
    .split(',')
    .map(phone => phone.trim())
    .filter(phone => phone.length > 0)
}

function updateCuisine() {
  formData.value.cuisine = cuisineInput.value
    .split(',')
    .map(cuisine => cuisine.trim())
    .filter(cuisine => cuisine.length > 0)
}

function updateSpecialties() {
  formData.value.specialties = specialtiesInput.value
    .split(',')
    .map(specialty => specialty.trim())
    .filter(specialty => specialty.length > 0)
}

function updateDietaryOptions() {
  formData.value.dietaryOptions = dietaryOptionsInput.value
    .split(',')
    .map(option => option.trim())
    .filter(option => option.length > 0)
}

function updateDeliveryPlatforms() {
  formData.value.delivery.platforms = deliveryPlatformsInput.value
    .split(',')
    .map(platform => platform.trim())
    .filter(platform => platform.length > 0)
}

function updateTags() {
  formData.value.tags = tagsInput.value
    .split(',')
    .map(tag => tag.trim())
    .filter(tag => tag.length > 0)
}

function removeCuisine(index: number) {
  formData.value.cuisine?.splice(index, 1)
  cuisineInput.value = formData.value.cuisine?.join(', ') || ''
}

function removeSpecialty(index: number) {
  formData.value.specialties?.splice(index, 1)
  specialtiesInput.value = formData.value.specialties?.join(', ') || ''
}

function removeTag(index: number) {
  formData.value.tags.splice(index, 1)
  tagsInput.value = formData.value.tags.join(', ')
}

function validateForm(): boolean {
  errors.value = {}

  if (!formData.value.title?.trim()) {
    errors.value.title = 'กรุณาระบุชื่อร้าน'
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

  // Update inputs before saving
  updatePhones()
  updateCuisine()
  updateSpecialties()
  updateDietaryOptions()
  updateDeliveryPlatforms()
  updateTags()

  // Emit save event
  emit('save', { ...formData.value })
}

function handleCancel() {
  emit('cancel')
}
</script>