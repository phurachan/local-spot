<template>
  <form @submit.prevent="handleSubmit">
    <!-- Basic Information -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ข้อมูลพื้นฐาน</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="formData.title"
            label="ชื่อบริการ"
            placeholder="ชื่อบริการท่องเที่ยว"
            :required="true"
            :error="errors.title"
          />

          <BaseSelect
            v-model="formData.category"
            label="ประเภทบริการ"
            :required="true"
            :error="errors.category"
            :options="[
              { label: 'เลือกประเภท', value: '' },
              { label: 'ขนส่ง', value: 'transport' },
              { label: 'ทัวร์', value: 'tour' },
              { label: 'ไกด์นำเที่ยว', value: 'guide' },
              { label: 'เช่าอุปกรณ์', value: 'rental' },
              { label: 'กิจกรรม', value: 'activity' }
            ]"
          />
        </div>

        <BaseInput
          v-model="formData.serviceType"
          label="ประเภทบริการเฉพาะ"
          placeholder="เช่น รถตู้ส่วนตัว, ทัวร์ 1 วัน, ไกด์ภาษาอังกฤษ"
          :required="true"
          :error="errors.serviceType"
        />

        <BaseTextarea
          v-model="formData.description"
          label="คำอธิบาย"
          placeholder="คำอธิบายบริการ"
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

    <!-- Service Location & Area -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">พื้นที่ให้บริการ</h4>

        <BaseInput
          v-model="serviceAreaInput"
          label="พื้นที่ให้บริการ"
          placeholder="พื้นที่ให้บริการ (คั่นด้วยเครื่องหมาย ,)"
          hint="สามารถใส่หลายพื้นที่ คั่นด้วยเครื่องหมาย ,"
          @blur="updateServiceAreas"
        />

        <BaseInput
          v-model="formData.location.meetingPoint"
          label="จุดนัดพบ"
          placeholder="ที่อยู่จุดนัดพบ"
        />

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
            label="LINE Official Account"
            placeholder="@lineoa"
          />
        </div>
      </div>
    </div>

    <!-- Pricing -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ราคาและค่าบริการ</h4>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseSelect
            v-model="formData.pricing.type"
            label="ประเภทการคิดราคา"
            :required="true"
            :options="[
              { label: 'เลือกประเภท', value: '' },
              { label: 'ต่อคน', value: 'per_person' },
              { label: 'ต่อกลุ่ม', value: 'per_group' },
              { label: 'ต่อชั่วโมง', value: 'per_hour' },
              { label: 'ต่อวัน', value: 'per_day' }
            ]"
          />

          <BaseInput
            v-model.number="formData.pricing.amount"
            type="number"
            label="ราคา"
            placeholder="0"
            :required="true"
            :min="0"
          />

          <BaseInput
            v-model="formData.pricing.currency"
            label="สกุลเงิน"
            placeholder="THB"
            :required="true"
          />
        </div>

        <BaseInput
          v-model="pricingIncludesInput"
          label="รวมอะไรบ้าง"
          placeholder="รายการที่รวมในราคา (คั่นด้วยเครื่องหมาย ,)"
          hint="สามารถใส่หลายรายการ คั่นด้วยเครื่องหมาย ,"
          @blur="updatePricingIncludes"
        />

        <BaseInput
          v-model="pricingExcludesInput"
          label="ไม่รวมอะไรบ้าง"
          placeholder="รายการที่ไม่รวมในราคา (คั่นด้วยเครื่องหมาย ,)"
          hint="สามารถใส่หลายรายการ คั่นด้วยเครื่องหมาย ,"
          @blur="updatePricingExcludes"
        />
      </div>
    </div>

    <!-- Duration & Capacity -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ระยะเวลาและจำนวนผู้เข้าร่วม</h4>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseInput
            v-model.number="formData.duration.min"
            type="number"
            label="ระยะเวลาต่ำสุด"
            placeholder="0"
            :min="0"
          />

          <BaseInput
            v-model.number="formData.duration.max"
            type="number"
            label="ระยะเวลาสูงสุด"
            placeholder="0"
            :min="0"
          />

          <BaseSelect
            v-model="formData.duration.unit"
            label="หน่วยเวลา"
            :options="[
              { label: 'ชั่วโมง', value: 'hours' },
              { label: 'วัน', value: 'days' }
            ]"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model.number="formData.capacity.min"
            type="number"
            label="จำนวนผู้เข้าร่วมต่ำสุด"
            placeholder="0"
            :min="0"
          />

          <BaseInput
            v-model.number="formData.capacity.max"
            type="number"
            label="จำนวนผู้เข้าร่วมสูงสุด"
            placeholder="0"
            :min="0"
          />
        </div>
      </div>
    </div>

    <!-- Requirements & Availability -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ข้อกำหนดและช่วงเวลาให้บริการ</h4>

        <BaseInput
          v-model="requirementsInput"
          label="ข้อกำหนด"
          placeholder="ข้อกำหนดหรือเงื่อนไขการใช้บริการ (คั่นด้วยเครื่องหมาย ,)"
          hint="สามารถใส่หลายข้อ คั่นด้วยเครื่องหมาย ,"
          @blur="updateRequirements"
        />

        <BaseInput
          v-model="availabilityInput"
          label="ช่วงเวลาให้บริการ"
          placeholder="เช่น ทุกวัน, สัปดาห์ละ 3 วัน (คั่นด้วยเครื่องหมาย ,)"
          hint="สามารถใส่หลายช่วง คั่นด้วยเครื่องหมาย ,"
          @blur="updateAvailability"
        />
      </div>
    </div>

    <!-- Images & Tags -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">รูปภาพและแท็ก</h4>

        <BaseImagePicker
          v-model="formData.images"
          category="travel_service"
          :multiple="true"
          :max-images="10"
        />

        <BaseInput
          v-model="tagsInput"
          label="แท็ก"
          placeholder="แท็ก (คั่นด้วยเครื่องหมาย ,)"
          hint="สามารถใส่หลายแท็ก คั่นด้วยเครื่องหมาย ,"
          @blur="updateTags"
        />
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-2">
      <BaseButton @click="$emit('cancel')" variant="ghost">
        ยกเลิก
      </BaseButton>
      <BaseButton type="submit" variant="primary" :loading="isSubmitting">
        บันทึก
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { TravelServiceContent } from '~/composables/data_models/cms'

interface Props {
  travelService?: TravelServiceContent | null
  isEditing?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  travelService: null,
  isEditing: false
})

const emit = defineEmits<{
  save: [data: TravelServiceContent]
  cancel: []
}>()

// Form data
const formData = ref<TravelServiceContent>({
  type: 'travel_service',
  title: '',
  description: '',
  images: [],
  isActive: true,
  featured: false,
  order: 0,
  tags: [],
  category: 'transport',
  serviceType: '',
  location: {
    serviceArea: [],
    meetingPoint: '',
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
  pricing: {
    type: 'per_person',
    amount: 0,
    currency: 'THB',
    includes: [],
    excludes: []
  },
  duration: {
    min: 0,
    max: 0,
    unit: 'hours'
  },
  capacity: {
    min: 1,
    max: 10
  },
  requirements: [],
  availability: []
})

// Helper inputs for arrays
const phoneInput = ref('')
const serviceAreaInput = ref('')
const pricingIncludesInput = ref('')
const pricingExcludesInput = ref('')
const requirementsInput = ref('')
const availabilityInput = ref('')
const tagsInput = ref('')

// Form state
const isSubmitting = ref(false)
const errors = ref<Record<string, string>>({})

// Reset form to initial state
function resetForm() {
  // Reset errors
  errors.value = {}

  formData.value = {
    type: 'travel_service',
    title: '',
    description: '',
    images: [],
    isActive: true,
    featured: false,
    order: 0,
    tags: [],
    category: 'transport',
    serviceType: '',
    location: {
      serviceArea: [],
      meetingPoint: '',
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
    pricing: {
      type: 'per_person',
      amount: 0,
      currency: 'THB',
      includes: [],
      excludes: []
    },
    duration: {
      min: 0,
      max: 0,
      unit: 'hours'
    },
    capacity: {
      min: 1,
      max: 10
    },
    requirements: [],
    availability: []
  }
  phoneInput.value = ''
  serviceAreaInput.value = ''
  pricingIncludesInput.value = ''
  pricingExcludesInput.value = ''
  requirementsInput.value = ''
  availabilityInput.value = ''
  tagsInput.value = ''
}

// Watch for travel service changes and initialize form
watch(
  () => props.travelService,
  (newTravelService) => {
    // Reset errors first
    errors.value = {}

    if (newTravelService && props.isEditing) {
      formData.value = { ...newTravelService }
      phoneInput.value = newTravelService.contactInfo?.phone?.join(', ') || ''
      serviceAreaInput.value = newTravelService.location?.serviceArea?.join(', ') || ''
      pricingIncludesInput.value = newTravelService.pricing?.includes?.join(', ') || ''
      pricingExcludesInput.value = newTravelService.pricing?.excludes?.join(', ') || ''
      requirementsInput.value = newTravelService.requirements?.join(', ') || ''
      availabilityInput.value = newTravelService.availability?.join(', ') || ''
      tagsInput.value = newTravelService.tags?.join(', ') || ''
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

// Update array fields
function updatePhones() {
  formData.value.contactInfo.phone = phoneInput.value
    .split(',')
    .map(p => p.trim())
    .filter(p => p)
}

function updateServiceAreas() {
  formData.value.location.serviceArea = serviceAreaInput.value
    .split(',')
    .map(a => a.trim())
    .filter(a => a)
}

function updatePricingIncludes() {
  formData.value.pricing.includes = pricingIncludesInput.value
    .split(',')
    .map(i => i.trim())
    .filter(i => i)
}

function updatePricingExcludes() {
  formData.value.pricing.excludes = pricingExcludesInput.value
    .split(',')
    .map(e => e.trim())
    .filter(e => e)
}

function updateRequirements() {
  formData.value.requirements = requirementsInput.value
    .split(',')
    .map(r => r.trim())
    .filter(r => r)
}

function updateAvailability() {
  formData.value.availability = availabilityInput.value
    .split(',')
    .map(a => a.trim())
    .filter(a => a)
}

function updateTags() {
  formData.value.tags = tagsInput.value
    .split(',')
    .map(t => t.trim())
    .filter(t => t)
}

// Validate form
function validateForm(): boolean {
  errors.value = {}

  if (!formData.value.title.trim()) {
    errors.value.title = 'กรุณากรอกชื่อบริการ'
  }

  if (!formData.value.category) {
    errors.value.category = 'กรุณาเลือกประเภทบริการ'
  }

  if (!formData.value.serviceType.trim()) {
    errors.value.serviceType = 'กรุณากรอกประเภทบริการเฉพาะ'
  }

  if (!formData.value.description.trim()) {
    errors.value.description = 'กรุณากรอกคำอธิบาย'
  }

  return Object.keys(errors.value).length === 0
}

// Handle submit
async function handleSubmit() {
  // Update all array fields before validation
  updatePhones()
  updateServiceAreas()
  updatePricingIncludes()
  updatePricingExcludes()
  updateRequirements()
  updateAvailability()
  updateTags()

  if (!validateForm()) {
    useToast().error('กรุณากรอกข้อมูลให้ครบถ้วน')
    return
  }

  isSubmitting.value = true

  try {
    emit('save', formData.value)
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}
</script>