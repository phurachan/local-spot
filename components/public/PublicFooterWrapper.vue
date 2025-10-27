<template>
  <ClientOnly>
    <PublicFooter />
    <template #fallback>
      <footer class="bg-gray-800 text-white py-8 sm:py-10 md:py-12">
        <div class="max-w-6xl mx-auto px-4 sm:px-6">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div>
              <h3 class="text-xl font-bold mb-4">Local Spot</h3>
              <p class="text-gray-400">แพลตฟอร์มท่องเที่ยวท้องถิ่น ค้นพบที่พัก ร้านอาหาร และกิจกรรมท้องถิ่น</p>
            </div>
            <div>
              <h4 class="font-semibold mb-4">สำรวจ</h4>
              <ul class="space-y-2">
                <li><NuxtLink to="/" class="text-gray-400 hover:text-white transition-colors">หน้าแรก</NuxtLink></li>
                <li><NuxtLink to="/news" class="text-gray-400 hover:text-white transition-colors">ข่าวสาร</NuxtLink></li>
                <li><NuxtLink to="/hotels" class="text-gray-400 hover:text-white transition-colors">โรงแรม</NuxtLink></li>
                <li><NuxtLink to="/restaurants" class="text-gray-400 hover:text-white transition-colors">ร้านอาหาร</NuxtLink></li>
                <li><NuxtLink to="/events" class="text-gray-400 hover:text-white transition-colors">กิจกรรม</NuxtLink></li>
                <li><NuxtLink to="/travel-services" class="text-gray-400 hover:text-white transition-colors">บริการท่องเที่ยว</NuxtLink></li>
                <li><NuxtLink to="/local-products" class="text-gray-400 hover:text-white transition-colors">สินค้าท้องถิ่น</NuxtLink></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-4">เกี่ยวกับเรา</h4>
              <ul class="space-y-2">
                <li><a href="/#about" class="text-gray-400 hover:text-white transition-colors">เกี่ยวกับ</a></li>
                <li><a href="/#contact" class="text-gray-400 hover:text-white transition-colors">ติดต่อเรา</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-4">ติดตามเรา</h4>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              </div>
            </div>
          </div>
          <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Local Spot. สงวนลิขสิทธิ์.</p>
          </div>
        </div>
      </footer>
    </template>
  </ClientOnly>
</template>
