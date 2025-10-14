<template>
  <div class="space-y-6">
    <!-- Page Header -->
    <BasePageHeader title="Admin Dashboard" code="DASH-001" description="ยินดีต้อนรับสู่ระบบจัดการเนื้อหา"
      :breadcrumbs="breadcrumbItems" />
  </div>

  <div class="w-100 h-96 bg-gray-200 flex items-center justify-center rounded-lg">
    <h2 class="text-2xl font-semibold text-gray-700">ยินดีต้อนรับสู่ระบบจัดการเนื้อหา</h2>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

// Breadcrumb configuration
const breadcrumbItems = [
  {
    label: 'Admin',
    to: '/admin',
    icon: 'home'
  },
  {
    label: 'Welcome',
  }
]
</script>