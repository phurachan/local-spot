<template>
  <div class="min-h-screen">
    <!-- Hero Section -->
    <section id="hero" class="relative h-screen bg-gradient-to-br from-green-500 via-teal-600 to-blue-600 text-white overflow-hidden">
      <div class="absolute inset-0 bg-black/20"></div>
      <nav class="relative z-20 p-6 flex justify-between items-center">
        <div class="text-2xl font-bold">Local Spot</div>
        <div class="space-x-6">
          <a href="#features" class="hover:text-green-200 transition-colors">ฟีเจอร์</a>
          <a href="#spots" class="hover:text-green-200 transition-colors">สถานที่</a>
          <a href="#about" class="hover:text-green-200 transition-colors">เกี่ยวกับ</a>
          <a href="/local-spot/login" class="bg-white text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors">เข้าสู่ระบบ</a>
        </div>
      </nav>

      <div class="relative z-10 h-full flex items-center justify-center text-center">
        <div class="max-w-4xl px-6">
          <h1 class="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
            ค้นพบสถานที่
            <span class="text-green-300">ท้องถิ่น</span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-green-100">
            แพลตฟอร์มสำหรับค้นหาและแบ่งปันสถานที่น่าสนใจในท้องถิ่นของคุณ
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button class="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-400 transition-colors">
              เริ่มค้นหา
            </button>
            <button class="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              เรียนรู้เพิ่มเติม
            </button>
          </div>
        </div>
      </div>

      <!-- Scroll indicator -->
      <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">ฟีเจอร์เด่น</h2>
          <p class="text-xl text-gray-600">เครื่องมือครบครันสำหรับการค้นหาสถานที่</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4">ค้นหาตำแหน่ง</h3>
            <p class="text-gray-600">ค้นหาสถานที่ใกล้เคียงด้วย GPS และแผนที่แบบเรียลไทม์</p>
          </div>

          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4">รีวิวและให้คะแนน</h3>
            <p class="text-gray-600">อ่านรีวิวจากผู้ใช้จริงและแบ่งปันประสบการณ์ของคุณ</p>
          </div>

          <div class="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div class="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"></path>
              </svg>
            </div>
            <h3 class="text-xl font-semibold mb-4">ชุมชนท้องถิ่น</h3>
            <p class="text-gray-600">เชื่อมต่อกับคนในชุมชนและแบ่งปันสถานที่ซ่อนเร้น</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Popular Spots Section -->
    <section id="spots" class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">สถานที่ยอดนิยม</h2>
          <p class="text-xl text-gray-600">สถานที่ที่คนท้องถิ่นแนะนำ</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="spot in popularSpots" :key="spot.id" class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div class="h-48 bg-gradient-to-r from-green-400 to-blue-500"></div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <h3 class="text-xl font-semibold">{{ spot.name }}</h3>
                <div class="flex items-center text-yellow-500">
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                  <span class="ml-1">{{ spot.rating }}</span>
                </div>
              </div>
              <p class="text-gray-600 mb-4">{{ spot.description }}</p>
              <div class="flex items-center text-green-600">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                </svg>
                <span class="text-sm">{{ spot.location }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 bg-gray-50">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold text-gray-800 mb-8">เกี่ยวกับ Local Spot</h2>
        <p class="text-xl text-gray-600 mb-8 leading-relaxed">
          Local Spot เป็นแพลตฟอร์มที่เชื่อมต่อคนในชุมชนเพื่อแบ่งปันและค้นพบสถานที่น่าสนใจในท้องถิ่น
          เราเชื่อว่าทุกชุมชนมีเสน่ห์และความพิเศษเป็นของตัวเอง ที่รอให้คนได้มาค้นพบ
        </p>
        <div class="grid md:grid-cols-3 gap-8 mt-12">
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">1000+</div>
            <p class="text-gray-600">สถานที่</p>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">500+</div>
            <p class="text-gray-600">สมาชิก</p>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">50+</div>
            <p class="text-gray-600">จังหวัด</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-8">เริ่มต้นค้นพบสถานที่ใหม่ๆ วันนี้</h2>
        <p class="text-xl mb-8">เข้าร่วมชุมชน Local Spot และเป็นส่วนหนึ่งของการแบ่งปันสถานที่ดีๆ</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/local-spot/login" class="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors">
            สมัครสมาชิก
          </a>
          <button class="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
            ดาวน์โหลดแอป
          </button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <h3 class="text-xl font-bold mb-4">Local Spot</h3>
            <p class="text-gray-400">แพลตฟอร์มสำหรับค้นหาและแบ่งปันสถานที่ท้องถิ่น</p>
          </div>
          <div>
            <h4 class="font-semibold mb-4">ลิงก์เร็ว</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">หน้าแรก</a></li>
              <li><a href="#" class="hover:text-white transition-colors">สถานที่</a></li>
              <li><a href="#" class="hover:text-white transition-colors">เกี่ยวกับเรา</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">สนับสนุน</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">ติดต่อเรา</a></li>
              <li><a href="#" class="hover:text-white transition-colors">คำถามที่พบบ่อย</a></li>
              <li><a href="#" class="hover:text-white transition-colors">นโยบายความเป็นส่วนตัว</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">ติดตามเรา</h4>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                </svg>
              </a>
              <a href="#" class="text-gray-400 hover:text-white transition-colors">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Local Spot. สงวนลิขสิทธิ์.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
// Use a clean layout for the home page (not the admin panel layout)
definePageMeta({
  layout: false
})
// Sample data
const popularSpots = ref([
  {
    id: 1,
    name: "ร้านกาแฟริมน้ำ",
    description: "ร้านกาแฟเล็กๆ ริมแม่น้ำเจ้าพระยา บรรยากาศสบายๆ",
    rating: 4.8,
    location: "กรุงเทพมหานคร"
  },
  {
    id: 2,
    name: "ตลาดโบราณวัดใหม่",
    description: "ตลาดเก่าแก่ขายของโบราณและอาหารท้องถิ่น",
    rating: 4.6,
    location: "เชียงใหม่"
  },
  {
    id: 3,
    name: "ชายหาดลับเกาะเล็ก",
    description: "ชายหาดเงียบสงบ เหมาะสำหรับพักผ่อน",
    rating: 4.9,
    location: "ภูเก็ต"
  }
])

// Smooth scrolling for navigation
onMounted(() => {
  // Add smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        })
      }
    })
  })
})

// SEO
useHead({
  title: 'Local Spot - ค้นพบสถานที่ท้องถิ่น',
  meta: [
    { name: 'description', content: 'แพลตฟอร์มสำหรับค้นหาและแบ่งปันสถานที่น่าสนใจในท้องถิ่นของคุณ' }
  ]
})
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 1s ease-out;
}
</style>