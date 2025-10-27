<template>
  <div class="min-h-screen bg-gray-50">
    <PublicHeaderWrapper active-page="contact" />

    <!-- Hero Section -->
    <section class="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16 sm:py-20 md:py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">ติดต่อเรา</h1>
        <p class="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto">
          เรายินดีที่จะรับฟังและช่วยเหลือคุณ ติดต่อเราผ่านช่องทางด้านล่าง
        </p>
      </div>
    </section>

    <!-- Contact Content -->
    <section class="py-12 sm:py-16 md:py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          <!-- Contact Form -->
          <div class="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">ส่งข้อความถึงเรา</h2>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Name -->
              <div>
                <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                  ชื่อ-นามสกุล <span class="text-red-500">*</span>
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="input input-bordered w-full bg-white border-gray-300 text-gray-900"
                  placeholder="กรุณากรอกชื่อของคุณ"
                />
              </div>

              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                  อีเมล <span class="text-red-500">*</span>
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="input input-bordered w-full bg-white border-gray-300 text-gray-900"
                  placeholder="example@email.com"
                />
              </div>

              <!-- Phone -->
              <div>
                <label for="phone" class="block text-sm font-medium text-gray-700 mb-2">
                  เบอร์โทรศัพท์
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="input input-bordered w-full bg-white border-gray-300 text-gray-900"
                  placeholder="0xx-xxx-xxxx"
                />
              </div>

              <!-- Subject -->
              <div>
                <label for="subject" class="block text-sm font-medium text-gray-700 mb-2">
                  หัวข้อ <span class="text-red-500">*</span>
                </label>
                <input
                  id="subject"
                  v-model="form.subject"
                  type="text"
                  required
                  class="input input-bordered w-full bg-white border-gray-300 text-gray-900"
                  placeholder="หัวข้อที่ต้องการติดต่อ"
                />
              </div>

              <!-- Message -->
              <div>
                <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                  ข้อความ <span class="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  required
                  rows="5"
                  class="textarea textarea-bordered w-full bg-white border-gray-300 text-gray-900"
                  placeholder="รายละเอียดที่ต้องการติดต่อ..."
                ></textarea>
              </div>

              <!-- Submit Button -->
              <button
                type="submit"
                :disabled="submitting"
                class="btn btn-primary w-full"
                :class="{ 'loading': submitting }"
              >
                {{ submitting ? 'กำลังส่ง...' : 'ส่งข้อความ' }}
              </button>

              <!-- Success/Error Message -->
              <div v-if="submitMessage" class="alert" :class="submitSuccess ? 'alert-success' : 'alert-error'">
                <span>{{ submitMessage }}</span>
              </div>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="space-y-8">
            <!-- Contact Details Card -->
            <div class="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">ข้อมูลติดต่อ</h2>

              <div class="space-y-6">
                <ClientOnly>
                  <!-- Address -->
                  <div v-if="contactInfo?.address" class="flex items-start space-x-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h3 class="text-sm font-semibold text-gray-900 mb-1">ที่อยู่</h3>
                      <p class="text-gray-600">{{ contactInfo.address }}</p>
                    </div>
                  </div>

                  <!-- Phone -->
                  <div v-if="contactInfo?.phone" class="flex items-start space-x-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h3 class="text-sm font-semibold text-gray-900 mb-1">โทรศัพท์</h3>
                      <a :href="`tel:${contactInfo.phone}`" class="text-gray-600 hover:text-blue-600 transition-colors">
                        {{ contactInfo.phone }}
                      </a>
                    </div>
                  </div>

                  <!-- Email -->
                  <div v-if="contactInfo?.email" class="flex items-start space-x-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h3 class="text-sm font-semibold text-gray-900 mb-1">อีเมล</h3>
                      <a :href="`mailto:${contactInfo.email}`" class="text-gray-600 hover:text-blue-600 transition-colors">
                        {{ contactInfo.email }}
                      </a>
                    </div>
                  </div>

                  <!-- Line -->
                  <div v-if="contactInfo?.line" class="flex items-start space-x-4">
                    <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                      </svg>
                    </div>
                    <div class="flex-1">
                      <h3 class="text-sm font-semibold text-gray-900 mb-1">Line ID</h3>
                      <a :href="`https://line.me/ti/p/~${contactInfo.line}`" target="_blank" rel="noopener" class="text-gray-600 hover:text-blue-600 transition-colors">
                        @{{ contactInfo.line }}
                      </a>
                    </div>
                  </div>

                  <template #fallback>
                    <div class="flex items-center justify-center py-8">
                      <div class="loading loading-spinner loading-lg"></div>
                    </div>
                  </template>
                </ClientOnly>
              </div>
            </div>

            <!-- Social Media Card -->
            <div class="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">ติดตามเรา</h2>

              <ClientOnly>
                <div class="flex flex-wrap gap-4">
                  <a
                    v-if="socialMedia?.facebook"
                    :href="socialMedia.facebook"
                    target="_blank"
                    rel="noopener"
                    class="flex items-center gap-2 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    <span class="font-medium">Facebook</span>
                  </a>

                  <a
                    v-if="socialMedia?.instagram"
                    :href="socialMedia.instagram"
                    target="_blank"
                    rel="noopener"
                    class="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg transition-colors"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                    <span class="font-medium">Instagram</span>
                  </a>

                  <a
                    v-if="socialMedia?.twitter"
                    :href="socialMedia.twitter"
                    target="_blank"
                    rel="noopener"
                    class="flex items-center gap-2 px-4 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-lg transition-colors"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                    <span class="font-medium">Twitter</span>
                  </a>

                  <a
                    v-if="socialMedia?.youtube"
                    :href="socialMedia.youtube"
                    target="_blank"
                    rel="noopener"
                    class="flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                    <span class="font-medium">YouTube</span>
                  </a>
                </div>

                <template #fallback>
                  <div class="flex items-center justify-center py-4">
                    <div class="loading loading-spinner loading-md"></div>
                  </div>
                </template>
              </ClientOnly>
            </div>

            <!-- Business Hours (Optional) -->
            <div class="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">เวลาทำการ</h2>
              <div class="space-y-3">
                <div class="flex justify-between items-center py-2 border-b">
                  <span class="text-gray-600">จันทร์ - ศุกร์</span>
                  <span class="font-medium text-gray-900">09:00 - 18:00</span>
                </div>
                <div class="flex justify-between items-center py-2 border-b">
                  <span class="text-gray-600">เสาร์ - อาทิตย์</span>
                  <span class="font-medium text-gray-900">10:00 - 17:00</span>
                </div>
                <div class="flex justify-between items-center py-2">
                  <span class="text-gray-600">วันหยุดนักขัตฤกษ์</span>
                  <span class="font-medium text-red-600">ปิดทำการ</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Map Section -->
        <ClientOnly>
          <div v-if="contactInfo?.mapUrl" class="mt-12">
            <h2 class="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">แผนที่</h2>
            <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
              <iframe
                :src="contactInfo.mapUrl"
                width="100%"
                height="450"
                style="border:0;"
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                class="w-full"
              ></iframe>
            </div>
          </div>
        </ClientOnly>
      </div>
    </section>

    <PublicFooterWrapper />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

// Get settings
const { contactInfo, socialMedia } = usePublicSettings()

// Form state
const form = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const submitting = ref(false)
const submitSuccess = ref(false)
const submitMessage = ref('')

// Handle form submission
async function handleSubmit() {
  submitting.value = true
  submitMessage.value = ''

  try {
    // Here you would send the form data to your API
    // For now, we'll simulate a successful submission
    await new Promise(resolve => setTimeout(resolve, 1000))

    submitSuccess.value = true
    submitMessage.value = 'ส่งข้อความเรียบร้อยแล้ว! เราจะติดต่อกลับโดยเร็วที่สุด'

    // Reset form
    form.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }

    // Clear message after 5 seconds
    setTimeout(() => {
      submitMessage.value = ''
    }, 5000)
  } catch (error) {
    submitSuccess.value = false
    submitMessage.value = 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง'
  } finally {
    submitting.value = false
  }
}

// SEO
const { siteName } = usePublicSettings()
useHead({
  title: computed(() => `ติดต่อเรา - ${siteName.value}`),
  meta: [
    { name: 'description', content: 'ติดต่อเราผ่านฟอร์ม โทรศัพท์ อีเมล หรือ Line ID เรายินดีที่จะรับฟังและช่วยเหลือคุณ' }
  ]
})
</script>

<style scoped>
/* Smooth transitions */
.alert {
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
