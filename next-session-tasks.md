# 📝 Next Session Tasks - Image Upload System

## 🎯 Priority: เพิ่มระบบอัปโหลดรูปภาพใน CMS

### ปัญหาปัจจุบัน
- ตอนนี้ทุก Form (Hotels, Restaurants, etc.) ใช้การ paste URL รูปภาพแบบ manual
- ไม่สะดวกสำหรับ Admin ต้อง upload รูปที่อื่นก่อน (Imgur, Cloudinary)
- ยังไม่มีระบบจัดการรูปภาพที่เป็นระบบ

### วัตถุประสงค์
เพิ่มระบบ Upload + Image Picker เพื่อให้ Admin:
1. อัปโหลดรูปได้โดยตรงผ่าน Image Gallery
2. เลือกรูปจาก Gallery มาใช้ใน Hotels, Restaurants, etc.
3. จัดการรูปภาพแบบรวมศูนย์

---

## 📋 Tasks ที่ต้องทำ

### **Task 1: สร้าง Upload API** ⭐ สำคัญที่สุด

#### 1.1 สร้าง Upload Endpoint
**ไฟล์:** `/server/api/local-spot/cms/images/upload.post.ts`

```typescript
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import sharp from 'sharp' // ต้อง npm install sharp

export default defineEventHandler(async (event) => {
  try {
    const form = await readMultipartFormData(event)

    if (!form || form.length === 0) {
      throw createError({ statusCode: 400, message: 'No file uploaded' })
    }

    const file = form.find(item => item.name === 'file')
    if (!file || !file.data) {
      throw createError({ statusCode: 400, message: 'Invalid file' })
    }

    // สร้างโฟลเดอร์ uploads ถ้ายังไม่มี
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'images')
    await mkdir(uploadDir, { recursive: true })

    // สร้างชื่อไฟล์ unique
    const timestamp = Date.now()
    const originalName = file.filename || 'image.jpg'
    const ext = originalName.split('.').pop()
    const filename = `${timestamp}-${Math.random().toString(36).substring(7)}.${ext}`

    // Save original image
    const filepath = join(uploadDir, filename)
    await writeFile(filepath, file.data)

    // Create thumbnail using sharp
    const thumbnailFilename = `thumb-${filename}`
    const thumbnailPath = join(uploadDir, thumbnailFilename)

    await sharp(file.data)
      .resize(400, 400, {
        fit: 'cover',
        position: 'center'
      })
      .toFile(thumbnailPath)

    // Get image metadata
    const metadata = await sharp(file.data).metadata()

    // Create image record in database
    const imageData = {
      title: form.find(item => item.name === 'title')?.data?.toString() || originalName,
      description: form.find(item => item.name === 'description')?.data?.toString() || '',
      category: form.find(item => item.name === 'category')?.data?.toString() || 'general',
      altText: form.find(item => item.name === 'altText')?.data?.toString() || originalName,
      caption: form.find(item => item.name === 'caption')?.data?.toString(),
      imageUrl: `/uploads/images/${filename}`,
      thumbnailUrl: `/uploads/images/${thumbnailFilename}`,
      dimensions: {
        width: metadata.width,
        height: metadata.height
      },
      fileSize: file.data.length,
      mimeType: file.type,
      isActive: true,
      featured: false,
      order: 0,
      tags: [],
      type: 'image_gallery'
    }

    const newImage = new ImageGalleryContent(imageData)
    await newImage.save()

    return createSuccessResponse(newImage.toObject(), {
      responseType: API_RESPONSE_CODES.CREATED
    })

  } catch (error: any) {
    console.error('Upload error:', error)
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})
```

#### 1.2 Install Dependencies
```bash
npm install sharp
```

#### 1.3 เพิ่ม .gitignore
```
# ใน .gitignore
/public/uploads/
```

---

### **Task 2: สร้าง Image Picker Component**

#### 2.1 BaseImagePicker Component
**ไฟล์:** `/components/base/ImagePicker.vue`

```vue
<template>
  <div>
    <!-- Selected Images Preview -->
    <div v-if="selectedImages.length > 0" class="mb-4">
      <label class="label">
        <span class="label-text">รูปภาพที่เลือก</span>
      </label>
      <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        <div
          v-for="(image, index) in selectedImages"
          :key="image"
          class="relative group"
        >
          <img
            :src="image"
            class="w-full aspect-square object-cover rounded-lg"
          />
          <button
            @click="removeImage(index)"
            class="btn btn-xs btn-circle btn-error absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            ✕
          </button>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-2">
      <BaseButton
        @click="openModal"
        variant="outline"
        icon-left="photo"
      >
        เลือกจาก Gallery
      </BaseButton>

      <BaseButton
        @click="openUploadModal"
        variant="primary"
        icon-left="arrow-up-tray"
      >
        อัปโหลดใหม่
      </BaseButton>
    </div>

    <!-- Image Gallery Modal -->
    <dialog ref="galleryModal" class="modal">
      <div class="modal-box max-w-6xl">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 class="font-bold text-lg mb-4">เลือกรูปภาพจาก Gallery</h3>

        <!-- Filters -->
        <div class="mb-4">
          <BaseSelect
            v-model="filterCategory"
            label="หมวดหมู่"
            :options="categoryOptions"
            @change="loadGalleryImages"
          />
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex justify-center p-8">
          <BaseLoading />
        </div>

        <!-- Images Grid -->
        <div v-else class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2 max-h-96 overflow-y-auto">
          <div
            v-for="image in galleryImages"
            :key="image._id"
            @click="toggleSelectImage(image.imageUrl)"
            class="cursor-pointer relative group"
            :class="{ 'ring-4 ring-primary': isSelected(image.imageUrl) }"
          >
            <img
              :src="image.thumbnailUrl || image.imageUrl"
              :alt="image.altText"
              class="w-full aspect-square object-cover rounded-lg"
            />
            <div
              v-if="isSelected(image.imageUrl)"
              class="absolute inset-0 bg-primary/20 rounded-lg flex items-center justify-center"
            >
              <BaseIcon name="check-circle" size="lg" class="text-primary" />
            </div>
          </div>
        </div>

        <div class="modal-action">
          <form method="dialog">
            <BaseButton variant="ghost">ยกเลิก</BaseButton>
          </form>
          <BaseButton @click="confirmSelection" variant="primary">
            เลือก ({{ tempSelected.length }})
          </BaseButton>
        </div>
      </div>
    </dialog>

    <!-- Upload Modal -->
    <dialog ref="uploadModal" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 class="font-bold text-lg mb-4">อัปโหลดรูปภาพใหม่</h3>

        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">เลือกไฟล์</span>
          </label>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            multiple
            @change="handleFileSelect"
            class="file-input file-input-bordered"
          />
        </div>

        <BaseSelect
          v-model="uploadCategory"
          label="หมวดหมู่"
          :options="categoryOptions"
          :required="true"
        />

        <BaseInput
          v-model="uploadAltText"
          label="Alt Text"
          placeholder="คำอธิบายรูปภาพ"
          :required="true"
        />

        <div class="modal-action">
          <form method="dialog">
            <BaseButton variant="ghost">ยกเลิก</BaseButton>
          </form>
          <BaseButton
            @click="handleUpload"
            variant="primary"
            :loading="uploading"
            :disabled="!selectedFiles.length"
          >
            อัปโหลด
          </BaseButton>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { useImagesStore } from '~/stores/images'

interface Props {
  modelValue: string[]
  category?: string
  multiple?: boolean
  maxImages?: number
}

const props = withDefaults(defineProps<Props>(), {
  category: 'general',
  multiple: true,
  maxImages: 10
})

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

// Stores
const imagesStore = useImagesStore()

// State
const selectedImages = ref<string[]>([...props.modelValue])
const tempSelected = ref<string[]>([])
const galleryImages = ref<any[]>([])
const loading = ref(false)
const filterCategory = ref(props.category)
const selectedFiles = ref<File[]>([])
const uploading = ref(false)
const uploadCategory = ref(props.category)
const uploadAltText = ref('')

// Modal refs
const galleryModal = ref<HTMLDialogElement>()
const uploadModal = ref<HTMLDialogElement>()
const fileInput = ref<HTMLInputElement>()

// Options
const categoryOptions = [
  { value: '', label: 'ทั้งหมด' },
  { value: 'hotel', label: 'โรงแรม' },
  { value: 'restaurant', label: 'ร้านอาหาร' },
  { value: 'travel_service', label: 'บริการท่องเที่ยว' },
  { value: 'local_product', label: 'สินค้าท้องถิ่น' },
  { value: 'event', label: 'กิจกรรม' },
  { value: 'attraction', label: 'สถานที่ท่องเที่ยว' },
  { value: 'general', label: 'ทั่วไป' }
]

// Methods
function openModal() {
  tempSelected.value = [...selectedImages.value]
  loadGalleryImages()
  galleryModal.value?.showModal()
}

function openUploadModal() {
  selectedFiles.value = []
  uploadCategory.value = props.category
  uploadAltText.value = ''
  uploadModal.value?.showModal()
}

async function loadGalleryImages() {
  loading.value = true
  try {
    await imagesStore.fetchImages({
      query: {
        category: filterCategory.value || undefined,
        limit: 100
      }
    })
    galleryImages.value = imagesStore.list || []
  } catch (error) {
    console.error('Failed to load gallery images:', error)
  } finally {
    loading.value = false
  }
}

function isSelected(imageUrl: string): boolean {
  return tempSelected.value.includes(imageUrl)
}

function toggleSelectImage(imageUrl: string) {
  if (!props.multiple) {
    tempSelected.value = [imageUrl]
    return
  }

  const index = tempSelected.value.indexOf(imageUrl)
  if (index > -1) {
    tempSelected.value.splice(index, 1)
  } else {
    if (tempSelected.value.length < props.maxImages) {
      tempSelected.value.push(imageUrl)
    } else {
      useToast().warning(`เลือกได้สูงสุด ${props.maxImages} รูป`)
    }
  }
}

function confirmSelection() {
  selectedImages.value = [...tempSelected.value]
  emit('update:modelValue', selectedImages.value)
  galleryModal.value?.close()
}

function removeImage(index: number) {
  selectedImages.value.splice(index, 1)
  emit('update:modelValue', selectedImages.value)
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    selectedFiles.value = Array.from(target.files)
  }
}

async function handleUpload() {
  if (!selectedFiles.value.length) return

  uploading.value = true

  try {
    const uploadedUrls: string[] = []

    for (const file of selectedFiles.value) {
      const response = await imagesStore.uploadImage({
        body: {
          file,
          category: uploadCategory.value,
          altText: uploadAltText.value || file.name
        }
      })

      if (response?.data?.imageUrl) {
        uploadedUrls.push(response.data.imageUrl)
      }
    }

    // Add uploaded images to selected
    selectedImages.value = [...selectedImages.value, ...uploadedUrls]
    emit('update:modelValue', selectedImages.value)

    useToast().success(`อัปโหลด ${uploadedUrls.length} รูปเรียบร้อยแล้ว`)
    uploadModal.value?.close()

  } catch (error) {
    console.error('Upload failed:', error)
    useToast().error('เกิดข้อผิดพลาดในการอัปโหลด')
  } finally {
    uploading.value = false
  }
}

// Watch props changes
watch(() => props.modelValue, (newValue) => {
  selectedImages.value = [...newValue]
})
</script>
```

---

### **Task 3: เพิ่ม ImagePicker ในทุก Form**

#### 3.1 แก้ไข HotelForm.vue
**ไฟล์:** `/components/cms/HotelForm.vue`

แทนที่:
```vue
<BaseInput
  v-model="imagesInput"
  label="URL รูปภาพ"
  placeholder="URL รูปภาพ (คั่นด้วยเครื่องหมาย ,)"
  @blur="updateImages"
/>
```

ด้วย:
```vue
<BaseImagePicker
  v-model="formData.images"
  category="hotel"
  :multiple="true"
  :max-images="10"
/>
```

และลบ:
- `imagesInput` ref
- `updateImages()` function

#### 3.2 แก้ไข RestaurantForm.vue
แทนที่เหมือนกัน แต่ `category="restaurant"`

#### 3.3 แก้ไข TravelServiceForm.vue
แทนที่เหมือนกัน แต่ `category="travel_service"`

#### 3.4 แก้ไข LocalProductForm.vue
แทนที่เหมือนกัน แต่ `category="local_product"`

#### 3.5 แก้ไข EventForm.vue
แทนที่เหมือนกัน แต่ `category="event"`

---

### **Task 4: ปรับปรุง Image Gallery Upload**

#### 4.1 ปรับ ImageGalleryContent Store
**ไฟล์:** `/stores/images.ts`

แก้ไข `uploadImage` action ให้ส่ง FormData ถูกต้อง:

```typescript
async uploadImage(requestData: BaseRequestData<ImageUploadRequest>) {
  try {
    this.$patch(loadingState(requestData))

    const httpClient = useHttpClient()

    // Create FormData for file upload
    const formData = new FormData()
    formData.append('file', requestData.body!.file)
    if (requestData.body!.category) formData.append('category', requestData.body!.category)
    if (requestData.body!.altText) formData.append('altText', requestData.body!.altText)
    if (requestData.body!.caption) formData.append('caption', requestData.body!.caption)

    const response = await httpClient.post(
      API_ENDPOINTS.CMS.IMAGES.UPLOAD,
      formData
    )

    this.$patch(successState(response))
    return response
  } catch (error: any) {
    this.$patch(errorState({ ...(error || {}) }))
    throw new BaseResponseError(error?.data || error)
  } finally {
    this.isLoading = false
  }
}
```

---

### **Task 5: อัพเดท CLAUDE_KNOWLEDGE.md**

เพิ่มข้อมูลเกี่ยวกับระบบ Image Upload:

```markdown
### Image Upload & Management System

#### Features:
1. **Direct File Upload** - อัปโหลดรูปผ่าน Image Gallery
2. **Image Picker Component** - เลือกรูปจาก Gallery ใน Form
3. **Thumbnail Generation** - สร้าง thumbnail อัตโนมัติด้วย Sharp
4. **Image Metadata** - เก็บข้อมูล dimensions, file size, mime type
5. **Category Management** - จัดหมวดหมู่รูปภาพ

#### Storage:
- **Location**: `/public/uploads/images/`
- **Original**: `{timestamp}-{random}.{ext}`
- **Thumbnail**: `thumb-{timestamp}-{random}.{ext}`
- **Max Size**: 5MB (configurable)

#### BaseImagePicker Props:
- `modelValue: string[]` - Array of image URLs
- `category?: string` - Filter images by category
- `multiple?: boolean` - Allow multiple selection (default: true)
- `maxImages?: number` - Maximum images (default: 10)

#### Usage Example:
\`\`\`vue
<BaseImagePicker
  v-model="formData.images"
  category="hotel"
  :multiple="true"
  :max-images="10"
/>
\`\`\`
```

---

## 📦 Dependencies ที่ต้อง Install

```bash
npm install sharp
```

---

## 🎯 Expected Results

เมื่อทำเสร็จจะได้:

1. ✅ Admin อัปโหลดรูปได้โดยตรงใน Image Gallery
2. ✅ ทุก Form (Hotels, Restaurants, etc.) มี Image Picker
3. ✅ เลือกรูปจาก Gallery หรืออัปโหลดใหม่ได้ทันที
4. ✅ รูปถูกเก็บใน `/public/uploads/images/`
5. ✅ มี thumbnail สำหรับ preview
6. ✅ เก็บ metadata ครบถ้วน

---

## 🔍 Testing Checklist

- [ ] อัปโหลดรูปใน Image Gallery สำเร็จ
- [ ] Thumbnail ถูกสร้างอัตโนมัติ
- [ ] เปิด Image Picker ใน HotelForm ได้
- [ ] เลือกรูปจาก Gallery ได้
- [ ] อัปโหลดรูปใหม่จาก Form ได้
- [ ] เลือกได้หลายรูป (multiple mode)
- [ ] เลือกได้รูปเดียว (single mode)
- [ ] ลบรูปที่เลือกไว้ได้
- [ ] Filter by category ทำงาน
- [ ] รูปแสดงถูกต้องหลัง save form

---

## 💾 Backup & Safety

1. เพิ่ม `/public/uploads/` ใน `.gitignore`
2. ตั้งค่า max file size ใน API (5MB)
3. Validate file type (เฉพาะ image/*)
4. สร้าง backup script สำหรับ `/public/uploads/`

---

## 📚 Additional Notes

### Cloud Storage (Optional - Future Enhancement)
ถ้าต้องการใช้ Cloud Storage แทน local:
- AWS S3
- Cloudinary
- Google Cloud Storage
- DigitalOcean Spaces

แค่แก้ใน `upload.post.ts` ให้ upload ไป cloud แทน local file system

---

## 🚀 Estimated Time
- Task 1: Upload API - 1-2 hours
- Task 2: ImagePicker Component - 2-3 hours
- Task 3: Update Forms - 1 hour
- Task 4: Testing & Bug fixes - 1 hour

**Total**: 5-7 hours

---

**Created**: 2025-09-30
**Status**: Pending
**Priority**: High ⭐