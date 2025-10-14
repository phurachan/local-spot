<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="site-header bg-white shadow-sm sticky top-0 z-40 transition-transform duration-300" :class="{ 'nav-hidden': navbarHidden }">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-2xl font-bold text-green-600">
            {{ siteName }}
          </NuxtLink>
          <nav class="flex items-center space-x-6">
            <NuxtLink to="/" class="text-gray-600 hover:text-green-600">หน้าแรก</NuxtLink>
            <NuxtLink to="/hotels" class="text-gray-600 hover:text-green-600">โรงแรม</NuxtLink>
            <NuxtLink to="/restaurants" class="text-gray-600 hover:text-green-600">ร้านอาหาร</NuxtLink>
            <NuxtLink to="/events" class="text-gray-600 hover:text-green-600">กิจกรรม</NuxtLink>
            <NuxtLink to="/travel-services" class="text-green-600 font-semibold">บริการท่องเที่ยว</NuxtLink>
            <NuxtLink to="/local-products" class="text-gray-600 hover:text-green-600">สินค้าท้องถิ่น</NuxtLink>
          </nav>
        </div>
      </div>
    </header>

    <BaseLoading v-if="loading" class="py-20" />

    <div v-else-if="service" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Breadcrumb -->
      <nav class="flex mb-6 text-sm">
        <NuxtLink to="/" class="text-gray-500 hover:text-gray-700">หน้าแรก</NuxtLink>
        <span class="mx-2 text-gray-400">/</span>
        <NuxtLink to="/travel-services" class="text-gray-500 hover:text-gray-700">บริการท่องเที่ยว</NuxtLink>
        <span class="mx-2 text-gray-400">/</span>
        <span class="text-gray-900">{{ service.title }}</span>
      </nav>

      <div class="grid lg:grid-cols-3 gap-8">
        <!-- Main Content -->
        <div class="lg:col-span-2">
          <!-- Image Gallery -->
          <div class="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
            <div class="aspect-video bg-gray-200">
              <img
                v-if="currentImage"
                :src="currentImage"
                :alt="service.title"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-cyan-500">
                <svg class="w-24 h-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
            </div>
            <div v-if="service.images && service.images.length > 1" class="grid grid-cols-4 gap-2 p-4">
              <div
                v-for="(image, index) in service.images"
                :key="index"
                @click="currentImageIndex = index"
                class="aspect-video bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition-opacity"
                :class="{ 'ring-2 ring-blue-500': index === currentImageIndex }"
              >
                <img :src="image" :alt="`${service.title} ${index + 1}`" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          <!-- Service Info -->
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex items-start justify-between mb-4">
              <h1 class="text-3xl font-bold text-gray-900">{{ service.title }}</h1>
              <span v-if="service.featured" class="badge badge-secondary">แนะนำ</span>
            </div>

            <div class="flex items-center gap-4 mb-6">
              <span class="badge badge-info badge-lg">{{ getServiceTypeLabel(service.serviceType) }}</span>
              <div v-if="service.pricing?.amount" class="text-2xl font-bold text-blue-600">
                ฿{{ service.pricing.amount.toLocaleString() }}
                <span v-if="service.pricing.unit" class="text-base text-gray-600">/{{ service.pricing.unit }}</span>
              </div>
            </div>

            <div class="prose max-w-none">
              <h2 class="text-xl font-semibold mb-3 text-gray-900">รายละเอียด</h2>
              <p class="text-gray-700 whitespace-pre-line">{{ service.description }}</p>
            </div>
          </div>

          <!-- Service Details -->
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <h2 class="text-xl font-semibold mb-4 text-gray-900">ข้อมูลบริการ</h2>

            <div class="space-y-4">
              <!-- Service Area -->
              <div v-if="service.serviceArea && service.serviceArea.length > 0">
                <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  พื้นที่ให้บริการ
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span v-for="area in service.serviceArea" :key="area" class="badge badge-outline">{{ area }}</span>
                </div>
              </div>

              <!-- Capacity -->
              <div v-if="service.capacity">
                <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  จำนวนรับ
                </h3>
                <p class="text-gray-700">
                  {{ service.capacity.min }}-{{ service.capacity.max }} คน
                </p>
              </div>

              <!-- Duration -->
              <div v-if="service.duration">
                <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  ระยะเวลา
                </h3>
                <p class="text-gray-700">{{ service.duration.value }} {{ getDurationUnitLabel(service.duration.unit) }}</p>
              </div>

              <!-- Languages -->
              <div v-if="service.languages && service.languages.length > 0">
                <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                  </svg>
                  ภาษาที่รองรับ
                </h3>
                <div class="flex flex-wrap gap-2">
                  <span v-for="lang in service.languages" :key="lang" class="badge badge-outline">{{ lang }}</span>
                </div>
              </div>

              <!-- Features -->
              <div v-if="service.features && service.features.length > 0">
                <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  จุดเด่นของบริการ
                </h3>
                <ul class="list-disc list-inside space-y-1 text-gray-700">
                  <li v-for="feature in service.features" :key="feature">{{ feature }}</li>
                </ul>
              </div>

              <!-- Included -->
              <div v-if="service.included && service.included.length > 0">
                <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                  </svg>
                  รวมในราคา
                </h3>
                <ul class="list-disc list-inside space-y-1 text-gray-700">
                  <li v-for="item in service.included" :key="item">{{ item }}</li>
                </ul>
              </div>

              <!-- Excluded -->
              <div v-if="service.excluded && service.excluded.length > 0">
                <h3 class="font-semibold text-gray-900 mb-2 flex items-center">
                  <svg class="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  ไม่รวมในราคา
                </h3>
                <ul class="list-disc list-inside space-y-1 text-gray-700">
                  <li v-for="item in service.excluded" :key="item">{{ item }}</li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Terms & Policies -->
          <div v-if="service.cancellationPolicy || service.terms" class="bg-white rounded-xl shadow-lg p-6">
            <h2 class="text-xl font-semibold mb-4">เงื่อนไขและข้อกำหนด</h2>

            <div v-if="service.cancellationPolicy" class="mb-4">
              <h3 class="font-semibold text-gray-900 mb-2">นโยบายการยกเลิก</h3>
              <p class="text-gray-700">{{ service.cancellationPolicy }}</p>
            </div>

            <div v-if="service.terms && service.terms.length > 0">
              <h3 class="font-semibold text-gray-900 mb-2">ข้อกำหนด</h3>
              <ul class="list-disc list-inside space-y-1 text-gray-700">
                <li v-for="term in service.terms" :key="term">{{ term }}</li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="lg:col-span-1">
          <!-- Contact Card -->
          <div class="bg-white rounded-xl shadow-lg p-6 sticky top-24">
            <h2 class="text-xl font-semibold mb-4 text-gray-900">ติดต่อเรา</h2>

            <div class="space-y-4">
              <!-- Phone -->
              <div v-if="service.contactInfo?.phone && service.contactInfo.phone.length > 0">
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <div class="font-semibold text-gray-900 mb-1">โทรศัพท์</div>
                    <div v-for="phone in service.contactInfo.phone" :key="phone">
                      <a :href="`tel:${phone}`" class="text-blue-600 hover:underline">{{ phone }}</a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Email -->
              <div v-if="service.contactInfo?.email">
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <div class="font-semibold text-gray-900 mb-1">อีเมล</div>
                    <div v-if="Array.isArray(service.contactInfo.email)">
                      <div v-for="email in service.contactInfo.email" :key="email">
                        <a :href="`mailto:${email}`" class="text-blue-600 hover:underline break-all">{{ email }}</a>
                      </div>
                    </div>
                    <div v-else>
                      <a :href="`mailto:${service.contactInfo.email}`" class="text-blue-600 hover:underline break-all">{{ service.contactInfo.email }}</a>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Website -->
              <div v-if="service.contactInfo?.website">
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  <div>
                    <div class="font-semibold text-gray-900 mb-1">เว็บไซต์</div>
                    <a :href="service.contactInfo.website" target="_blank" class="text-blue-600 hover:underline break-all">
                      {{ service.contactInfo.website }}
                    </a>
                  </div>
                </div>
              </div>

              <!-- Line -->
              <div v-if="service.contactInfo?.line">
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <div>
                    <div class="font-semibold text-gray-900 mb-1">LINE</div>
                    <p class="text-gray-700">{{ service.contactInfo.line }}</p>
                  </div>
                </div>
              </div>

              <!-- Location -->
              <div v-if="service.location">
                <div class="flex items-start">
                  <svg class="w-5 h-5 text-blue-600 mr-2 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <div class="font-semibold text-gray-900 mb-1">ที่อยู่</div>
                    <p class="text-gray-700">
                      {{ service.location.address }}<br>
                      {{ service.location.district }}, {{ service.location.province }}<br>
                      {{ service.location.postalCode }}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <button class="btn btn-primary w-full mt-6">
              <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              ติดต่อสอบถาม
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12 mt-12">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">Local Spot</h3>
            <p class="text-gray-400">แพลตฟอร์มท่องเที่ยวท้องถิ่น ค้นพบที่พัก ร้านอาหาร และกิจกรรมท้องถิ่น</p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">สำรวจ</h4>
            <ul class="space-y-2">
              <li><NuxtLink to="/hotels" class="text-gray-400 hover:text-white">โรงแรม</NuxtLink></li>
              <li><NuxtLink to="/restaurants" class="text-gray-400 hover:text-white">ร้านอาหาร</NuxtLink></li>
              <li><NuxtLink to="/events" class="text-gray-400 hover:text-white">กิจกรรม</NuxtLink></li>
              <li><NuxtLink to="/travel-services" class="text-gray-400 hover:text-white">บริการท่องเที่ยว</NuxtLink></li>
              <li><NuxtLink to="/local-products" class="text-gray-400 hover:text-white">สินค้าท้องถิ่น</NuxtLink></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">เกี่ยวกับเรา</h4>
            <ul class="space-y-2">
              <li><a href="#" class="text-gray-400 hover:text-white">เกี่ยวกับ</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">ติดต่อเรา</a></li>
              <li><a href="#" class="text-gray-400 hover:text-white">นโยบายความเป็นส่วนตัว</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">ติดตามเรา</h4>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M20.945 7.612c.097.306.155.627.155.958 0 9.805-7.465 21.106-21.106 21.106-4.193 0-8.093-1.227-11.37-3.33.58.07 1.17.1 1.77.1 3.473 0 6.668-1.184 9.204-3.17-3.243-.06-5.98-2.202-6.923-5.148.453.087.918.134 1.395.134.676 0 1.33-.09 1.95-.258-3.388-.68-5.94-3.676-5.94-7.267v-.092c.998.554 2.14.886 3.353.924-1.988-1.328-3.296-3.597-3.296-6.167 0-1.36.365-2.634 1.003-3.73 3.653 4.483 9.114 7.432 15.27 7.74-.127-.547-.193-1.116-.193-1.702 0-4.123 3.343-7.465 7.465-7.465 2.147 0 4.086.906 5.448 2.356 1.7-.335 3.297-.957 4.74-1.813-.558 1.743-1.742 3.204-3.283 4.127 1.51-.18 2.948-.581 4.287-1.175-.999 1.498-2.263 2.813-3.72 3.867z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Local Spot. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useTravelServicesStore } from '~/stores/travelServices'

definePageMeta({
  layout: false
})

const route = useRoute()
const travelServicesStore = useTravelServicesStore()

const loading = ref(true)
const currentImageIndex = ref(0)

// Public header with settings
const { siteName, navbarHidden } = usePublicHeader()

const service = computed(() => travelServicesStore.current)
const currentImage = computed(() => {
  if (!service.value?.images || service.value.images.length === 0) return null
  return service.value.images[currentImageIndex.value]
})

function getServiceTypeLabel(type: string) {
  const labels: Record<string, string> = {
    transportation: 'รถรับส่ง',
    tour_guide: 'ไกด์นำเที่ยว',
    car_rental: 'เช่ารถ',
    tour_package: 'แพ็คเกจทัวร์'
  }
  return labels[type] || type
}

function getDurationUnitLabel(unit: string) {
  const labels: Record<string, string> = {
    hour: 'ชั่วโมง',
    day: 'วัน',
    night: 'คืน',
    week: 'สัปดาห์'
  }
  return labels[unit] || unit
}

onMounted(async () => {
  loading.value = true
  try {
    const id = route.params.id as string
    await travelServicesStore.fetchTravelService({ body: { _id: id } })
  } catch (error) {
    console.error('Failed to load travel service:', error)
  } finally {
    loading.value = false
  }
})

// SEO
useHead({
  title: computed(() => service.value ? `${service.value.title} - Local Spot` : 'บริการท่องเที่ยว - Local Spot'),
  meta: computed(() => [
    { name: 'description', content: service.value?.description || 'บริการท่องเที่ยวท้องถิ่น' }
  ])
})
</script>

<style scoped>
.site-header.nav-hidden {
  transform: translateY(-100%);
}

.prose {
  max-width: none;
}
</style>
