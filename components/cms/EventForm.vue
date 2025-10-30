<template>
  <form @submit.prevent="handleSubmit">
    <!-- Basic Information -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ข้อมูลพื้นฐาน</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="formData.title"
            label="ชื่อกิจกรรม"
            placeholder="ชื่อกิจกรรมหรืองานอีเวนต์"
            :required="true"
            :error="errors.title"
          />

          <BaseSelect
            v-model="formData.category"
            label="ประเภทกิจกรรม"
            :required="true"
            :error="errors.category"
            :options="[
              { label: 'เลือกประเภท', value: '' },
              { label: 'เทศกาล', value: 'festival' },
              { label: 'ตลาดนัด', value: 'market' },
              { label: 'วัฒนธรรม', value: 'cultural' },
              { label: 'กีฬา', value: 'sports' },
              { label: 'เวิร์กช็อป', value: 'workshop' },
              { label: 'ตามฤดูกาล', value: 'seasonal' }
            ]"
          />
        </div>

        <BaseTextarea
          v-model="formData.description"
          label="คำอธิบาย"
          placeholder="คำอธิบายกิจกรรม"
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

    <!-- Schedule -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">กำหนดการจัดงาน</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseDatePicker
            v-model="formData.schedule.startDate"
            label="วันที่เริ่ม"
            :required="true"
          />

          <BaseDatePicker
            v-model="formData.schedule.endDate"
            label="วันที่สิ้นสุด"
            :required="true"
          />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">ช่วงเวลาจัดงาน</span>
          </label>
          <div class="space-y-2">
            <div
              v-for="(time, index) in formData.schedule.times"
              :key="index"
              class="grid grid-cols-3 gap-2"
            >
              <BaseDatePicker
                v-model="time.start"
                type="time"
                placeholder="เวลาเริ่ม"
              />
              <BaseDatePicker
                v-model="time.end"
                type="time"
                placeholder="เวลาสิ้นสุด"
              />
              <BaseButton
                @click="removeTime(index)"
                variant="error"
                size="sm"
              >
                ลบ
              </BaseButton>
            </div>
            <BaseButton @click="addTime" variant="ghost" size="sm">
              + เพิ่มช่วงเวลา
            </BaseButton>
          </div>
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">กิจกรรมซ้ำ (Optional)</span>
          </label>
          <div class="grid grid-cols-2 gap-4">
            <BaseSelect
              v-model="formData.schedule.recurring!.pattern"
              label="รูปแบบการซ้ำ"
              :options="[
                { label: 'ไม่ซ้ำ', value: '' },
                { label: 'รายวัน', value: 'daily' },
                { label: 'รายสัปดาห์', value: 'weekly' },
                { label: 'รายเดือน', value: 'monthly' },
                { label: 'รายปี', value: 'yearly' }
              ]"
            />

            <BaseInput
              v-model.number="formData.schedule.recurring!.interval"
              type="number"
              label="ช่วงเว้น"
              placeholder="เช่น ทุก 2 สัปดาห์"
              :min="1"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Location -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">สถานที่จัดงาน</h4>

        <BaseInput
          v-model="formData.location.venue"
          label="สถานที่จัด"
          placeholder="ชื่อสถานที่จัดงาน"
          :required="true"
        />

        <BaseInput
          v-model="formData.location.address"
          label="ที่อยู่"
          placeholder="ที่อยู่สถานที่จัดงาน"
          :required="true"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="formData.location.district"
            label="อำเภอ/เขต"
            placeholder="อำเภอ/เขต"
            :required="true"
          />

          <BaseSelect
            v-model="formData.location.province"
            label="จังหวัด"
            :required="true"
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

    <!-- Organizer -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ผู้จัดงาน</h4>

        <BaseInput
          v-model="formData.organizer.name"
          label="ชื่อผู้จัด"
          placeholder="ชื่อหน่วยงานหรือผู้จัดงาน"
          :required="true"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="organizerPhoneInput"
            label="เบอร์โทรศัพท์"
            placeholder="เบอร์โทรศัพท์ (คั่นด้วยเครื่องหมาย ,)"
            hint="สามารถใส่หลายเบอร์ คั่นด้วยเครื่องหมาย ,"
            @blur="updateOrganizerPhones"
          />

          <BaseInput
            v-model="formData.organizer.contactInfo.email"
            type="email"
            label="อีเมล"
            placeholder="อีเมล"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="formData.organizer.contactInfo.website"
            type="url"
            label="เว็บไซต์"
            placeholder="https://example.com"
          />

          <BaseInput
            v-model="formData.organizer.contactInfo.lineOA"
            label="LINE Official Account"
            placeholder="@lineoa"
          />
        </div>
      </div>
    </div>

    <!-- Ticketing -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ค่าเข้างาน/บัตร</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseCheckbox
            v-model="formData.ticketing.required"
            label="ต้องมีบัตร"
            variant="warning"
          />

          <BaseCheckbox
            v-model="formData.ticketing.freeEntry"
            label="เข้าฟรี"
            variant="success"
          />
        </div>

        <div v-if="!formData.ticketing.freeEntry" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model.number="formData.ticketing.price"
            type="number"
            label="ราคาบัตร"
            placeholder="0"
            :min="0"
          />

          <BaseInput
            v-model="formData.ticketing.currency"
            label="สกุลเงิน"
            placeholder="THB"
          />
        </div>

        <BaseInput
          v-model="formData.ticketing.bookingUrl"
          type="url"
          label="ลิงก์จองบัตร"
          placeholder="https://booking.example.com"
        />
      </div>
    </div>

    <!-- Additional Info -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ข้อมูลเพิ่มเติม</h4>

        <BaseInput
          v-model.number="formData.capacity"
          type="number"
          label="จำนวนผู้เข้าร่วมสูงสุด"
          placeholder="จำนวนคนที่รองรับได้"
          :min="0"
        />

        <BaseInput
          v-model="targetAudienceInput"
          label="กลุ่มเป้าหมาย"
          placeholder="กลุ่มเป้าหมายผู้เข้าร่วม (คั่นด้วยเครื่องหมาย ,)"
          hint="เช่น ครอบครัว, เด็ก, ผู้สูงอายุ"
          @blur="updateTargetAudience"
        />

        <BaseInput
          v-model="activitiesInput"
          label="กิจกรรมภายในงาน"
          placeholder="กิจกรรมต่างๆ ในงาน (คั่นด้วยเครื่องหมาย ,)"
          hint="เช่น คอนเสิร์ต, ตลาดนัด, การแสดง"
          @blur="updateActivities"
        />
      </div>
    </div>

    <!-- Images & Tags -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">รูปภาพและแท็ก</h4>

        <BaseImagePicker
          v-model="formData.images"
          category="event"
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
      <BaseButton type="submit" variant="primary" :loading="saving">
        บันทึก
      </BaseButton>
    </div>
  </form>
</template>

<script setup lang="ts">
import type { EventContent } from '~/composables/data_models/cms'
import { THAILAND_PROVINCES } from '~/composables/constants/provinces'

interface Props {
  event?: EventContent | null
  isEditing?: boolean
  saving?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  event: null,
  isEditing: false,
  saving: false
})

const emit = defineEmits<{
  save: [data: EventContent]
  cancel: []
}>()

// Form data
const formData = ref<EventContent>({
  type: 'event',
  title: '',
  description: '',
  images: [],
  isActive: true,
  featured: false,
  order: 0,
  tags: [],
  category: 'festival',
  schedule: {
    startDate: new Date(),
    endDate: new Date(),
    times: [],
    recurring: {
      pattern: 'daily',
      interval: 1
    }
  },
  location: {
    venue: '',
    address: '',
    district: '',
    province: '',
    coordinates: {
      lat: 0,
      lng: 0
    }
  },
  organizer: {
    name: '',
    contactInfo: {
      phone: [],
      email: '',
      website: '',
      lineOA: ''
    }
  },
  ticketing: {
    required: false,
    price: 0,
    currency: 'THB',
    bookingUrl: '',
    freeEntry: true
  },
  capacity: 0,
  targetAudience: [],
  activities: []
})

// Helper inputs for arrays
const organizerPhoneInput = ref('')
const targetAudienceInput = ref('')
const activitiesInput = ref('')
const tagsInput = ref('')

// Form state
const errors = ref<Record<string, string>>({})

// Reset form to initial state
function resetForm() {
  // Reset errors
  errors.value = {}

  formData.value = {
    type: 'event',
    title: '',
    description: '',
    images: [],
    isActive: true,
    featured: false,
    order: 0,
    tags: [],
    category: 'festival',
    schedule: {
      startDate: new Date(),
      endDate: new Date(),
      times: [],
      recurring: {
        pattern: 'daily',
        interval: 1
      }
    },
    location: {
      venue: '',
      address: '',
      district: '',
      province: '',
      coordinates: {
        lat: 0,
        lng: 0
      }
    },
    organizer: {
      name: '',
      contactInfo: {
        phone: [],
        email: '',
        website: '',
        lineOA: ''
      }
    },
    ticketing: {
      required: false,
      price: 0,
      currency: 'THB',
      bookingUrl: '',
      freeEntry: true
    },
    capacity: 0,
    targetAudience: [],
    activities: []
  }
  organizerPhoneInput.value = ''
  targetAudienceInput.value = ''
  activitiesInput.value = ''
  tagsInput.value = ''
}

// Watch for event changes and initialize form
watch(
  () => props.event,
  (newEvent) => {
    // Reset errors first
    errors.value = {}

    if (newEvent) {
      // Edit mode - populate form
      formData.value = { ...newEvent }
      organizerPhoneInput.value = newEvent.organizer?.contactInfo?.phone?.join(', ') || ''
      targetAudienceInput.value = newEvent.targetAudience?.join(', ') || ''
      activitiesInput.value = newEvent.activities?.join(', ') || ''
      tagsInput.value = newEvent.tags?.join(', ') || ''
    } else {
      // Create mode - reset to defaults
      resetForm()
    }
  },
  { immediate: true }
)

// Update array fields
function updateOrganizerPhones() {
  formData.value.organizer.contactInfo.phone = organizerPhoneInput.value
    .split(',')
    .map(p => p.trim())
    .filter(p => p)
}

function updateTargetAudience() {
  formData.value.targetAudience = targetAudienceInput.value
    .split(',')
    .map(t => t.trim())
    .filter(t => t)
}

function updateActivities() {
  formData.value.activities = activitiesInput.value
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

// Time management
function addTime() {
  formData.value.schedule.times.push({ start: '', end: '' })
}

function removeTime(index: number) {
  formData.value.schedule.times.splice(index, 1)
}

// Validate form
function validateForm(): boolean {
  errors.value = {}

  if (!formData.value.title.trim()) {
    errors.value.title = 'กรุณากรอกชื่อกิจกรรม'
  }

  if (!formData.value.category) {
    errors.value.category = 'กรุณาเลือกประเภทกิจกรรม'
  }

  if (!formData.value.description.trim()) {
    errors.value.description = 'กรุณากรอกคำอธิบาย'
  }

  return Object.keys(errors.value).length === 0
}

// Handle submit
async function handleSubmit() {
  // Update all array fields before validation
  updateOrganizerPhones()
  updateTargetAudience()
  updateActivities()
  updateTags()

  if (!validateForm()) {
    useToast().error('กรุณากรอกข้อมูลให้ครบถ้วน')
    return
  }

  emit('save', formData.value)
}
</script>