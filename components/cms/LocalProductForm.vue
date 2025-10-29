<template>
  <form @submit.prevent="handleSubmit">
    <!-- Basic Information -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ข้อมูลพื้นฐาน</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="formData.title"
            label="ชื่อสินค้า"
            placeholder="ชื่อสินค้าท้องถิ่น"
            :required="true"
            :error="errors.title"
          />

          <BaseSelect
            v-model="formData.category"
            label="ประเภทสินค้า"
            :required="true"
            :error="errors.category"
            :options="[
              { label: 'เลือกประเภท', value: '' },
              { label: 'หัตถกรรม', value: 'handicraft' },
              { label: 'อาหารแปรรูป', value: 'food_product' },
              { label: 'ของฝาก', value: 'souvenir' },
              { label: 'ผ้าทอ', value: 'textile' },
              { label: 'งานศิลปะ', value: 'art' }
            ]"
          />
        </div>

        <BaseTextarea
          v-model="formData.description"
          label="คำอธิบาย"
          placeholder="คำอธิบายสินค้า"
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

    <!-- Vendor Information -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ข้อมูลผู้ผลิต/ผู้จำหน่าย</h4>

        <BaseInput
          v-model="formData.vendor.name"
          label="ชื่อผู้ผลิต"
          placeholder="ชื่อผู้ผลิต/ผู้จำหน่าย"
          :required="true"
        />

        <BaseTextarea
          v-model="formData.vendor.description"
          label="คำอธิบายผู้ผลิต"
          placeholder="ประวัติหรือข้อมูลผู้ผลิต"
          :rows="3"
        />

        <BaseInput
          v-model="formData.vendor.location"
          label="ที่ตั้งผู้ผลิต"
          placeholder="ที่ตั้งหรือพื้นที่ผู้ผลิต"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="vendorPhoneInput"
            label="เบอร์โทรศัพท์"
            placeholder="เบอร์โทรศัพท์ (คั่นด้วยเครื่องหมาย ,)"
            hint="สามารถใส่หลายเบอร์ คั่นด้วยเครื่องหมาย ,"
            @blur="updateVendorPhones"
          />

          <BaseInput
            v-model="formData.vendor.contactInfo.email"
            type="email"
            label="อีเมล"
            placeholder="อีเมล"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="formData.vendor.contactInfo.website"
            type="url"
            label="เว็บไซต์"
            placeholder="https://example.com"
          />

          <BaseInput
            v-model="formData.vendor.contactInfo.lineOA"
            label="LINE Official Account"
            placeholder="@lineoa"
          />
        </div>
      </div>
    </div>

    <!-- Product Details -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">รายละเอียดสินค้า</h4>

        <BaseInput
          v-model="materialsInput"
          label="วัสดุที่ใช้"
          placeholder="วัสดุที่ใช้ในการผลิต (คั่นด้วยเครื่องหมาย ,)"
          hint="สามารถใส่หลายวัสดุ คั่นด้วยเครื่องหมาย ,"
          @blur="updateMaterials"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model="sizesInput"
            label="ขนาดที่มีจำหน่าย"
            placeholder="ขนาด (คั่นด้วยเครื่องหมาย ,)"
            hint="เช่น S, M, L หรือ 10x15, 20x30"
            @blur="updateSizes"
          />

          <BaseInput
            v-model="colorsInput"
            label="สีที่มีจำหน่าย"
            placeholder="สี (คั่นด้วยเครื่องหมาย ,)"
            hint="เช่น แดง, น้ำเงิน, เขียว"
            @blur="updateColors"
          />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model.number="formData.product.weight"
            type="number"
            label="น้ำหนัก (กรัม)"
            placeholder="น้ำหนักสินค้า"
            step="0.01"
          />

          <BaseInput
            v-model="formData.product.dimensions"
            label="ขนาดโดยประมาณ"
            placeholder="เช่น 10x15x5 ซม."
          />
        </div>
      </div>
    </div>

    <!-- Pricing -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">ราคา</h4>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BaseInput
            v-model.number="formData.pricing.price"
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

        <div class="form-control">
          <label class="label">
            <span class="label-text">ส่วนลดซื้อจำนวนมาก (Optional)</span>
          </label>
          <div class="space-y-2">
            <div
              v-for="(discount, index) in formData.pricing.discounts"
              :key="index"
              class="grid grid-cols-3 gap-2"
            >
              <BaseInput
                v-model.number="discount.quantity"
                type="number"
                placeholder="จำนวน"
                :min="1"
              />
              <BaseInput
                v-model.number="discount.discountPercent"
                type="number"
                placeholder="ส่วนลด %"
                :min="0"
                :max="100"
              />
              <BaseButton
                @click="removeDiscount(index)"
                variant="error"
                size="sm"
              >
                ลบ
              </BaseButton>
            </div>
            <BaseButton @click="addDiscount" variant="ghost" size="sm">
              + เพิ่มส่วนลด
            </BaseButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Availability & Stock -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">สต็อกและความพร้อมจำหน่าย</h4>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <BaseCheckbox
            v-model="formData.availability.inStock"
            label="มีสินค้าในสต็อก"
            variant="info"
          />

          <BaseInput
            v-model.number="formData.availability.stockQuantity"
            type="number"
            label="จำนวนในสต็อก"
            placeholder="0"
            :min="0"
          />

          <BaseInput
            v-model="formData.availability.seasonality"
            label="ฤดูกาล"
            placeholder="เช่น ตลอดทั้งปี, ช่วงหน้าร้อน"
          />
        </div>
      </div>
    </div>

    <!-- Shipping -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">การจัดส่ง</h4>

        <BaseCheckbox
          v-model="formData.shipping.available"
          label="มีบริการจัดส่ง"
          variant="primary"
        />

        <BaseInput
          v-model="shippingAreasInput"
          label="พื้นที่จัดส่ง"
          placeholder="พื้นที่ที่สามารถจัดส่งได้ (คั่นด้วยเครื่องหมาย ,)"
          hint="เช่น กรุงเทพฯ, ปริมณฑล, ทั่วประเทศ"
          @blur="updateShippingAreas"
        />

        <BaseInput
          v-model.number="formData.shipping.cost"
          type="number"
          label="ค่าจัดส่ง"
          placeholder="0"
          :min="0"
        />
      </div>
    </div>

    <!-- Images & Tags -->
    <div class="card bg-base-200 mb-6">
      <div class="card-body">
        <h4 class="card-title text-lg mb-4">รูปภาพและแท็ก</h4>

        <BaseImagePicker
          v-model="formData.images"
          category="local_product"
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
import type { LocalProductContent } from '~/composables/data_models/cms'

interface Props {
  localProduct?: LocalProductContent | null
  isEditing?: boolean
  saving?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  localProduct: null,
  isEditing: false,
  saving: false
})

const emit = defineEmits<{
  save: [data: LocalProductContent]
  cancel: []
}>()

// Form data
const formData = ref<LocalProductContent>({
  type: 'local_product',
  title: '',
  description: '',
  images: [],
  isActive: true,
  featured: false,
  order: 0,
  tags: [],
  category: 'handicraft',
  vendor: {
    name: '',
    description: '',
    location: '',
    contactInfo: {
      phone: [],
      email: '',
      website: '',
      lineOA: ''
    }
  },
  product: {
    materials: [],
    sizes: [],
    colors: [],
    weight: 0,
    dimensions: ''
  },
  pricing: {
    price: 0,
    currency: 'THB',
    discounts: []
  },
  availability: {
    inStock: true,
    stockQuantity: 0,
    seasonality: ''
  },
  shipping: {
    available: false,
    areas: [],
    cost: 0
  }
})

// Helper inputs for arrays
const vendorPhoneInput = ref('')
const materialsInput = ref('')
const sizesInput = ref('')
const colorsInput = ref('')
const shippingAreasInput = ref('')
const tagsInput = ref('')

// Form state
const errors = ref<Record<string, string>>({})

// Reset form to initial state
function resetForm() {
  // Reset errors
  errors.value = {}

  formData.value = {
    type: 'local_product',
    title: '',
    description: '',
    images: [],
    isActive: true,
    featured: false,
    order: 0,
    tags: [],
    category: 'handicraft',
    vendor: {
      name: '',
      description: '',
      location: '',
      contactInfo: {
        phone: [],
        email: '',
        website: '',
        lineOA: ''
      }
    },
    product: {
      materials: [],
      sizes: [],
      colors: [],
      weight: 0,
      dimensions: ''
    },
    pricing: {
      price: 0,
      currency: 'THB',
      discounts: []
    },
    availability: {
      inStock: true,
      stockQuantity: 0,
      seasonality: ''
    },
    shipping: {
      available: false,
      areas: [],
      cost: 0
    }
  }
  vendorPhoneInput.value = ''
  materialsInput.value = ''
  sizesInput.value = ''
  colorsInput.value = ''
  shippingAreasInput.value = ''
  tagsInput.value = ''
}

// Watch for local product changes and initialize form
watch(
  () => props.localProduct,
  (newLocalProduct) => {
    // Reset errors first
    errors.value = {}

    if (newLocalProduct && props.isEditing) {
      formData.value = { ...newLocalProduct }
      vendorPhoneInput.value = newLocalProduct.vendor?.contactInfo?.phone?.join(', ') || ''
      materialsInput.value = newLocalProduct.product?.materials?.join(', ') || ''
      sizesInput.value = newLocalProduct.product?.sizes?.join(', ') || ''
      colorsInput.value = newLocalProduct.product?.colors?.join(', ') || ''
      shippingAreasInput.value = newLocalProduct.shipping?.areas?.join(', ') || ''
      tagsInput.value = newLocalProduct.tags?.join(', ') || ''
    } else {
      resetForm()
    }
  },
  { immediate: true }
)

// Update array fields
function updateVendorPhones() {
  formData.value.vendor.contactInfo.phone = vendorPhoneInput.value
    .split(',')
    .map(p => p.trim())
    .filter(p => p)
}

function updateMaterials() {
  formData.value.product.materials = materialsInput.value
    .split(',')
    .map(m => m.trim())
    .filter(m => m)
}

function updateSizes() {
  formData.value.product.sizes = sizesInput.value
    .split(',')
    .map(s => s.trim())
    .filter(s => s)
}

function updateColors() {
  formData.value.product.colors = colorsInput.value
    .split(',')
    .map(c => c.trim())
    .filter(c => c)
}

function updateShippingAreas() {
  formData.value.shipping.areas = shippingAreasInput.value
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

// Discount management
function addDiscount() {
  if (!formData.value.pricing.discounts) {
    formData.value.pricing.discounts = []
  }
  formData.value.pricing.discounts.push({ quantity: 1, discountPercent: 0 })
}

function removeDiscount(index: number) {
  formData.value.pricing.discounts?.splice(index, 1)
}

// Validate form
function validateForm(): boolean {
  errors.value = {}

  if (!formData.value.title.trim()) {
    errors.value.title = 'กรุณากรอกชื่อสินค้า'
  }

  if (!formData.value.category) {
    errors.value.category = 'กรุณาเลือกประเภทสินค้า'
  }

  if (!formData.value.description.trim()) {
    errors.value.description = 'กรุณากรอกคำอธิบาย'
  }

  return Object.keys(errors.value).length === 0
}

// Handle submit
function handleSubmit() {
  // Update all array fields before validation
  updateVendorPhones()
  updateMaterials()
  updateSizes()
  updateColors()
  updateShippingAreas()
  updateTags()

  if (!validateForm()) {
    useToast().error('กรุณากรอกข้อมูลให้ครบถ้วน')
    return
  }

  emit('save', formData.value)
}
</script>