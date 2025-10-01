<template>
  <div class="p-6">
    <BasePageHeader
      title="CMS Dashboard"
      code="CMS-001"
      description="จัดการเนื้อหาสำหรับ Local Travel Business Network"
      :breadcrumbs="breadcrumbs"
    />

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
      <div class="stat bg-base-100 shadow">
        <div class="stat-figure text-primary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
          </svg>
        </div>
        <div class="stat-title">โรงแรม</div>
        <div class="stat-value text-primary">{{ stats.hotels }}</div>
        <div class="stat-desc">สถานที่พัก</div>
      </div>

      <div class="stat bg-base-100 shadow">
        <div class="stat-figure text-secondary">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
          </svg>
        </div>
        <div class="stat-title">ร้านอาหาร</div>
        <div class="stat-value text-secondary">{{ stats.restaurants }}</div>
        <div class="stat-desc">ร้านอาหาร</div>
      </div>

      <div class="stat bg-base-100 shadow">
        <div class="stat-figure text-accent">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z"></path>
          </svg>
        </div>
        <div class="stat-title">บริการท่องเที่ยว</div>
        <div class="stat-value text-accent">{{ stats.travelServices }}</div>
        <div class="stat-desc">บริการ</div>
      </div>

      <div class="stat bg-base-100 shadow">
        <div class="stat-figure text-warning">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
          </svg>
        </div>
        <div class="stat-title">ผลิตภัณฑ์ท้องถิ่น</div>
        <div class="stat-value text-warning">{{ stats.localProducts }}</div>
        <div class="stat-desc">สินค้า</div>
      </div>

      <div class="stat bg-base-100 shadow">
        <div class="stat-figure text-info">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="inline-block w-8 h-8 stroke-current">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
          </svg>
        </div>
        <div class="stat-title">กิจกรรม</div>
        <div class="stat-value text-info">{{ stats.events }}</div>
        <div class="stat-desc">งานกิจกรรม</div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mb-8">
      <h3 class="text-lg font-semibold mb-4">การจัดการเนื้อหา</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <nuxt-link to="/local-spot/manage-cms/hotels" class="card bg-base-100 shadow hover:shadow-lg transition-shadow">
          <div class="card-body items-center text-center p-6">
            <div class="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 stroke-primary">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
              </svg>
            </div>
            <h4 class="font-semibold">โรงแรม</h4>
            <p class="text-sm text-base-content/70">จัดการข้อมูลสถานที่พัก</p>
          </div>
        </nuxt-link>

        <nuxt-link to="/local-spot/manage-cms/restaurants" class="card bg-base-100 shadow hover:shadow-lg transition-shadow">
          <div class="card-body items-center text-center p-6">
            <div class="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 stroke-secondary">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"></path>
              </svg>
            </div>
            <h4 class="font-semibold">ร้านอาหาร</h4>
            <p class="text-sm text-base-content/70">จัดการข้อมูลร้านอาหาร</p>
          </div>
        </nuxt-link>

        <nuxt-link to="/local-spot/manage-cms/travel-services" class="card bg-base-100 shadow hover:shadow-lg transition-shadow">
          <div class="card-body items-center text-center p-6">
            <div class="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 stroke-accent">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"></path>
              </svg>
            </div>
            <h4 class="font-semibold">บริการท่องเที่ยว</h4>
            <p class="text-sm text-base-content/70">จัดการบริการต่างๆ</p>
          </div>
        </nuxt-link>

        <nuxt-link to="/local-spot/manage-cms/local-products" class="card bg-base-100 shadow hover:shadow-lg transition-shadow">
          <div class="card-body items-center text-center p-6">
            <div class="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 stroke-warning">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
              </svg>
            </div>
            <h4 class="font-semibold">ผลิตภัณฑ์ท้องถิ่น</h4>
            <p class="text-sm text-base-content/70">จัดการสินค้าท้องถิ่น</p>
          </div>
        </nuxt-link>

        <nuxt-link to="/local-spot/manage-cms/events" class="card bg-base-100 shadow hover:shadow-lg transition-shadow">
          <div class="card-body items-center text-center p-6">
            <div class="w-12 h-12 bg-info/10 rounded-lg flex items-center justify-center mb-3">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="w-6 h-6 stroke-info">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
            </div>
            <h4 class="font-semibold">กิจกรรม</h4>
            <p class="text-sm text-base-content/70">จัดการงานและกิจกรรม</p>
          </div>
        </nuxt-link>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="card bg-base-100 shadow">
      <div class="card-body">
        <h3 class="card-title mb-4">กิจกรรมล่าสุด</h3>
        <div class="space-y-3">
          <div v-for="activity in recentActivities" :key="activity.id" class="flex items-center justify-between p-3 bg-base-200 rounded-lg">
            <div class="flex items-center space-x-3">
              <div class="w-2 h-2 rounded-full" :class="getActivityColor(activity.type)"></div>
              <div>
                <p class="font-medium">{{ activity.title }}</p>
                <p class="text-sm text-base-content/70">{{ activity.description }}</p>
              </div>
            </div>
            <div class="text-sm text-base-content/70">
              {{ formatDate(activity.timestamp) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Page Meta
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

// Breadcrumbs
const breadcrumbs = [
  { label: 'CMS Dashboard', to: '/local-spot/manage-cms', current: true }
]

// Mock stats data - จะเปลี่ยนเป็น API call ในภายหลัง
const stats = ref({
  hotels: 12,
  restaurants: 28,
  travelServices: 15,
  localProducts: 45,
  events: 8
})

// Mock recent activities - จะเปลี่ยนเป็น API call ในภายหลัง
const recentActivities = ref([
  {
    id: 1,
    type: 'create',
    title: 'เพิ่มโรงแรมใหม่',
    description: 'บ้านไทยรีสอร์ท - เชียงใหม่',
    timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
  },
  {
    id: 2,
    type: 'update',
    title: 'อัปเดตร้านอาหาร',
    description: 'ร้านข้าวซอยแม่ดำ - เปลี่ยนเวลาทำการ',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
  },
  {
    id: 3,
    type: 'delete',
    title: 'ลบกิจกรรม',
    description: 'งานเทศกาลดอกไม้ - ยกเลิกงาน',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6) // 6 hours ago
  }
])

// Helper functions
function getActivityColor(type: string) {
  switch (type) {
    case 'create':
      return 'bg-success'
    case 'update':
      return 'bg-warning'
    case 'delete':
      return 'bg-error'
    default:
      return 'bg-info'
  }
}

function formatDate(date: Date) {
  const now = new Date()
  const diff = now.getTime() - date.getTime()

  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 60) {
    return `${minutes} นาทีที่แล้ว`
  } else if (hours < 24) {
    return `${hours} ชั่วโมงที่แล้ว`
  } else {
    return `${days} วันที่แล้ว`
  }
}

// SEO
useHead({
  title: 'CMS Dashboard - Local Spot',
  meta: [
    { name: 'description', content: 'จัดการเนื้อหาสำหรับ Local Travel Business Network' }
  ]
})
</script>