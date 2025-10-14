<template>
  <div class="min-h-screen">
    <!-- Loading state while fetching hero settings -->
    <div v-if="loadingHero" class="h-screen flex items-center justify-center bg-gradient-to-br from-green-500 via-teal-600 to-blue-600">
      <BaseLoading />
    </div>

    <template v-else>
      <!-- Navbar (for carousel type) -->
      <nav v-if="heroType === 'carousel'" class="site-header" :class="{ 'nav-hidden': navbarHidden }">
        <div class="relative z-20 p-6 flex justify-between items-center">
          <ClientOnly>
            <div class="text-2xl font-bold">{{ siteName }}</div>
            <template #fallback>
              <div class="text-2xl font-bold">Local Spot</div>
            </template>
          </ClientOnly>
          <ClientOnly>
            <div class="space-x-4 flex items-center">
              <a v-if="enabledFeatures.enableNews" href="#news" class="hover:text-green-200 transition-colors">ข่าวสาร</a>
              <a v-if="enabledFeatures.enableHotels" href="#hotels" class="hover:text-green-200 transition-colors">โรงแรม</a>
              <a v-if="enabledFeatures.enableRestaurants" href="#restaurants" class="hover:text-green-200 transition-colors">ร้านอาหาร</a>
              <a v-if="enabledFeatures.enableEvents" href="#events" class="hover:text-green-200 transition-colors">กิจกรรม</a>
              <a v-if="enabledFeatures.enableTravelServices" href="#travel-services" class="hover:text-green-200 transition-colors">บริการท่องเที่ยว</a>
              <a v-if="enabledFeatures.enableLocalProducts" href="#local-products" class="hover:text-green-200 transition-colors">ผลิตภัณฑ์</a>
              <a href="#contact" class="hover:text-green-200 transition-colors">ติดต่อ</a>
            </div>
            <template #fallback>
              <div class="space-x-4 flex items-center">
                <a href="#news" class="hover:text-green-200 transition-colors">ข่าวสาร</a>
                <a href="#hotels" class="hover:text-green-200 transition-colors">โรงแรม</a>
                <a href="#restaurants" class="hover:text-green-200 transition-colors">ร้านอาหาร</a>
                <a href="#events" class="hover:text-green-200 transition-colors">กิจกรรม</a>
                <a href="#travel-services" class="hover:text-green-200 transition-colors">บริการท่องเที่ยว</a>
                <a href="#local-products" class="hover:text-green-200 transition-colors">ผลิตภัณฑ์</a>
                <a href="#contact" class="hover:text-green-200 transition-colors">ติดต่อ</a>
              </div>
            </template>
          </ClientOnly>
        </div>
      </nav>

      <!-- Hero Section - Carousel Type -->
      <HeroCarousel
        v-if="heroType === 'carousel' && carouselSlides.length > 0"
        :slides="carouselSlides"
        :autoplay="carouselSettings.autoplay"
        :interval="carouselSettings.interval"
        :show-indicators="carouselSettings.showIndicators"
        :show-controls="carouselSettings.showControls"
      />

      <!-- Hero Section - Standard Type -->
      <section v-else id="hero" class="relative h-screen bg-gradient-to-br from-green-500 via-teal-600 to-blue-600 text-white overflow-hidden">
        <div class="absolute inset-0 bg-black/20"></div>
        <nav class="site-header" :class="{ 'nav-hidden': navbarHidden }">
          <div class="relative z-20 p-6 flex justify-between items-center">
            <ClientOnly>
              <div class="text-2xl font-bold">{{ siteName }}</div>
              <template #fallback>
                <div class="text-2xl font-bold">Local Spot</div>
              </template>
            </ClientOnly>
            <ClientOnly>
              <div class="space-x-4 flex items-center">
                <a v-if="enabledFeatures.enableNews" href="#news" class="hover:text-green-200 transition-colors">ข่าวสาร</a>
                <a v-if="enabledFeatures.enableHotels" href="#hotels" class="hover:text-green-200 transition-colors">โรงแรม</a>
                <a v-if="enabledFeatures.enableRestaurants" href="#restaurants" class="hover:text-green-200 transition-colors">ร้านอาหาร</a>
                <a v-if="enabledFeatures.enableEvents" href="#events" class="hover:text-green-200 transition-colors">กิจกรรม</a>
                <a v-if="enabledFeatures.enableTravelServices" href="#travel-services" class="hover:text-green-200 transition-colors">บริการท่องเที่ยว</a>
                <a v-if="enabledFeatures.enableLocalProducts" href="#local-products" class="hover:text-green-200 transition-colors">ผลิตภัณฑ์</a>
                <a href="#contact" class="hover:text-green-200 transition-colors">ติดต่อ</a>
              </div>
              <template #fallback>
                <div class="space-x-4 flex items-center">
                  <a href="#news" class="hover:text-green-200 transition-colors">ข่าวสาร</a>
                  <a href="#hotels" class="hover:text-green-200 transition-colors">โรงแรม</a>
                  <a href="#restaurants" class="hover:text-green-200 transition-colors">ร้านอาหาร</a>
                  <a href="#events" class="hover:text-green-200 transition-colors">กิจกรรม</a>
                  <a href="#travel-services" class="hover:text-green-200 transition-colors">บริการท่องเที่ยว</a>
                  <a href="#local-products" class="hover:text-green-200 transition-colors">ผลิตภัณฑ์</a>
                  <a href="#contact" class="hover:text-green-200 transition-colors">ติดต่อ</a>
                </div>
              </template>
            </ClientOnly>
          </div>
        </nav>

      <div class="relative z-10 h-full flex items-center justify-center text-center">
        <div class="max-w-4xl px-6">
          <ClientOnly>
            <h1 class="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
              {{ heroTitle || siteName }}
              <span class="text-green-300">ท้องถิ่น</span>
            </h1>
            <template #fallback>
              <h1 class="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
                Local Spot
                <span class="text-green-300">ท้องถิ่น</span>
              </h1>
            </template>
          </ClientOnly>
          <ClientOnly>
            <p class="text-xl md:text-2xl mb-8 text-green-100">
              {{ heroDescription || siteDescription || 'ท่องเที่ยว พักผ่อน ชิม ช้อป ใช้ ทุกอย่างในที่เดียว' }}
            </p>
            <template #fallback>
              <p class="text-xl md:text-2xl mb-8 text-green-100">
                ท่องเที่ยว พักผ่อน ชิม ช้อป ใช้ ทุกอย่างในที่เดียว
              </p>
            </template>
          </ClientOnly>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a :href="heroCtaLink || '#hotels'" class="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-400 transition-colors">
              {{ heroCtaText || 'เริ่มค้นหา' }}
            </a>
            <a href="#about" class="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors">
              เรียนรู้เพิ่มเติม
            </a>
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

    <!-- News Section -->
    <section id="news" class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">ข่าวสารและบทความ</h2>
          <p class="text-xl text-gray-600">อัพเดทข่าวสาร เคล็ดลับการท่องเที่ยว และเรื่องราวท้องถิ่น</p>
        </div>

        <div v-if="loadingNews" class="flex justify-center">
          <BaseLoading />
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="news in latestNews"
            :key="news._id"
            :to="`/news/${news._id}`"
            class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
          >
            <div class="h-48 bg-gray-200 overflow-hidden">
              <img
                v-if="news.images && news.images[0]"
                :src="news.images[0]"
                :alt="news.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-500">
                <BaseIcon name="newspaper" size="xl" class="text-white" />
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-xl font-semibold text-gray-900 flex-1">{{ news.title }}</h3>
                <div class="badge badge-primary badge-sm">{{ getNewsCategoryLabel(news.category) }}</div>
              </div>
              <p class="text-gray-600 mb-4 line-clamp-2">{{ news.excerpt || news.description }}</p>
              <div class="flex items-center justify-between text-sm text-gray-500">
                <div class="flex items-center">
                  <BaseIcon name="user" size="sm" class="mr-1" />
                  <span>{{ news.author?.name }}</span>
                </div>
                <div class="flex items-center">
                  <BaseIcon name="calendar" size="sm" class="mr-1" />
                  <span>{{ formatNewsDate(news.publishDate) }}</span>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/news" class="btn btn-primary btn-lg">
            ดูข่าวทั้งหมด
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Hotels Section -->
    <section id="hotels" class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">โรงแรมแนะนำ</h2>
          <p class="text-xl text-gray-600">ที่พักสะดวกสบาย บรรยากาศดี</p>
        </div>

        <div v-if="loadingHotels" class="flex justify-center">
          <BaseLoading />
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="hotel in featuredHotels"
            :key="hotel._id"
            :to="`/hotels/${hotel._id}`"
            class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
          >
            <div class="h-48 bg-gray-200 overflow-hidden">
              <img
                v-if="hotel.images && hotel.images[0]"
                :src="hotel.images[0]"
                :alt="hotel.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
                <BaseIcon name="building-office-2" size="xl" class="text-white" />
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-xl font-semibold text-gray-900 flex-1">{{ hotel.title }}</h3>
                <div class="badge badge-primary">{{ getCategoryLabel(hotel.category) }}</div>
              </div>
              <p class="text-gray-600 mb-4 line-clamp-2">{{ hotel.description }}</p>
              <div class="flex items-center text-green-600">
                <BaseIcon name="map-pin" size="sm" class="mr-1" />
                <span class="text-sm">{{ hotel.location?.district }}, {{ hotel.location?.province }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/hotels" class="btn btn-primary btn-lg">
            ดูโรงแรมทั้งหมด
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Restaurants Section -->
    <section id="restaurants" class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">ร้านอาหารแนะนำ</h2>
          <p class="text-xl text-gray-600">ร้านอาหารอร่อย บรรยากาศดี</p>
        </div>

        <div v-if="loadingRestaurants" class="flex justify-center">
          <BaseLoading />
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="restaurant in featuredRestaurants"
            :key="restaurant._id"
            :to="`/restaurants/${restaurant._id}`"
            class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
          >
            <div class="h-48 bg-gray-200 overflow-hidden">
              <img
                v-if="restaurant.images && restaurant.images[0]"
                :src="restaurant.images[0]"
                :alt="restaurant.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-r from-orange-400 to-pink-500">
                <BaseIcon name="building-storefront" size="xl" class="text-white" />
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-start justify-between mb-2">
                <h3 class="text-xl font-semibold text-gray-900 flex-1">{{ restaurant.title }}</h3>
                <div class="badge badge-secondary">{{ restaurant.priceRange || 'กลาง' }}</div>
              </div>
              <p class="text-gray-600 mb-4 line-clamp-2">{{ restaurant.description }}</p>
              <div class="flex items-center text-orange-600">
                <BaseIcon name="map-pin" size="sm" class="mr-1" />
                <span class="text-sm">{{ restaurant.location?.district }}, {{ restaurant.location?.province }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/restaurants" class="btn btn-secondary btn-lg">
            ดูร้านอาหารทั้งหมด
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Events Section -->
    <section id="events" class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">กิจกรรมและเทศกาล</h2>
          <p class="text-xl text-gray-600">กิจกรรมน่าสนใจในท้องถิ่น</p>
        </div>

        <div v-if="loadingEvents" class="flex justify-center">
          <BaseLoading />
        </div>

        <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <NuxtLink
            v-for="event in upcomingEvents"
            :key="event._id"
            :to="`/events/${event._id}`"
            class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div class="h-48 bg-gray-200 overflow-hidden relative">
              <img
                v-if="event.images && event.images[0]"
                :src="event.images[0]"
                :alt="event.title"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500">
                <BaseIcon name="calendar" size="xl" class="text-white" />
              </div>
              <div class="absolute top-4 right-4 bg-white px-3 py-1 rounded-lg shadow">
                <div class="text-xs text-gray-500">{{ formatDate(event.schedule?.startDate) }}</div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ event.title }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-2">{{ event.description }}</p>
              <div class="flex items-center text-purple-600">
                <BaseIcon name="map-pin" size="sm" class="mr-1" />
                <span class="text-sm">{{ event.location?.venue }}</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/events" class="btn btn-primary btn-lg">
            ดูกิจกรรมทั้งหมด
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Travel Services Section -->
    <section id="travel-services" class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">บริการท่องเที่ยว</h2>
          <p class="text-xl text-gray-600">บริการที่ช่วยให้การเที่ยวของคุณสะดวกสบาย</p>
        </div>

        <BaseLoading v-if="loadingTravelServices" class="py-20" />

        <div v-else-if="featuredTravelServices.length > 0" class="grid md:grid-cols-3 gap-8">
          <NuxtLink
            v-for="service in featuredTravelServices"
            :key="service._id"
            :to="`/travel-services/${service._id}`"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div class="aspect-video bg-gray-200 overflow-hidden">
              <img
                v-if="service.images && service.images[0]"
                :src="service.images[0]"
                :alt="service.title"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-400 to-pink-500">
                <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="badge badge-secondary">{{ getServiceCategoryLabel(service.category) }}</span>
                <span v-if="service.pricing?.amount" class="text-green-600 font-semibold">
                  ฿{{ service.pricing.amount.toLocaleString() }}
                </span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ service.title }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-2">{{ service.description }}</p>
              <div v-if="service.location?.serviceArea && service.location.serviceArea.length > 0" class="flex items-center text-sm text-gray-500">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {{ service.location.serviceArea[0] }}
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="text-center py-20">
          <p class="text-gray-500 text-lg">ยังไม่มีบริการท่องเที่ยว</p>
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/travel-services" class="btn btn-primary btn-lg">
            ดูบริการท่องเที่ยวทั้งหมด
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Local Products Section -->
    <section id="local-products" class="py-20 bg-gray-50">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">ผลิตภัณฑ์ท้องถิ่น</h2>
          <p class="text-xl text-gray-600">สินค้าท้องถิ่นคุณภาพจากชุมชน</p>
        </div>

        <BaseLoading v-if="loadingLocalProducts" class="py-20" />

        <div v-else-if="featuredLocalProducts.length > 0" class="grid md:grid-cols-3 gap-8">
          <NuxtLink
            v-for="product in featuredLocalProducts"
            :key="product._id"
            :to="`/local-products/${product._id}`"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div class="aspect-square bg-gray-200 overflow-hidden">
              <img
                v-if="product.images && product.images[0]"
                :src="product.images[0]"
                :alt="product.title"
                class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
              <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-amber-400 to-orange-500">
                <svg class="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            <div class="p-6">
              <div class="flex items-center justify-between mb-2">
                <span class="badge badge-accent">{{ getProductCategoryLabel(product.category) }}</span>
                <span v-if="product.pricing?.price" class="text-green-600 font-bold text-lg">
                  ฿{{ product.pricing.price.toLocaleString() }}
                </span>
              </div>
              <h3 class="text-xl font-bold text-gray-900 mb-2">{{ product.title }}</h3>
              <p class="text-gray-600 mb-4 line-clamp-2">{{ product.description }}</p>
              <div v-if="product.vendor?.name" class="flex items-center text-sm text-gray-500">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                {{ product.vendor.name }}
              </div>
            </div>
          </NuxtLink>
        </div>

        <div v-else class="text-center py-20">
          <p class="text-gray-500 text-lg">ยังไม่มีผลิตภัณฑ์ท้องถิ่น</p>
        </div>

        <div class="text-center mt-12">
          <NuxtLink to="/local-products" class="btn btn-primary btn-lg">
            ดูผลิตภัณฑ์ทั้งหมด
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Contact & Location Section -->
    <section id="contact" class="py-20 bg-white">
      <div class="max-w-6xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-gray-800 mb-4">ติดต่อเรา</h2>
          <p class="text-xl text-gray-600">เรายินดีที่จะรับฟังและช่วยเหลือคุณ</p>
        </div>

        <div class="grid md:grid-cols-2 gap-12">
          <!-- Contact Info -->
          <div>
            <h3 class="text-2xl font-bold text-gray-800 mb-6">ข้อมูลติดต่อ</h3>
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="bg-green-100 p-3 rounded-lg mr-4">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-1">ที่อยู่</h4>
                  <p class="text-gray-600">123 ถนนท้องถิ่น ตำบลชุมชน<br>อำเภอเมือง จังหวัดตัวอย่าง 50000</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="bg-green-100 p-3 rounded-lg mr-4">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-1">โทรศัพท์</h4>
                  <p class="text-gray-600">+66 (0) 12-345-6789</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="bg-green-100 p-3 rounded-lg mr-4">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-1">อีเมล</h4>
                  <p class="text-gray-600">info@localspot.com</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="bg-green-100 p-3 rounded-lg mr-4">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-800 mb-1">เวลาทำการ</h4>
                  <p class="text-gray-600">จันทร์ - ศุกร์: 9:00 - 18:00<br>เสาร์ - อาทิตย์: 10:00 - 16:00</p>
                </div>
              </div>
            </div>

            <div class="mt-8">
              <h4 class="font-semibold text-gray-800 mb-4">ติดตามเรา</h4>
              <div class="flex space-x-4">
                <a href="#" class="bg-green-100 p-3 rounded-lg text-green-600 hover:bg-green-200 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" class="bg-green-100 p-3 rounded-lg text-green-600 hover:bg-green-200 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" class="bg-green-100 p-3 rounded-lg text-green-600 hover:bg-green-200 transition-colors">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <!-- Contact Form -->
          <div>
            <h3 class="text-2xl font-bold text-gray-800 mb-6">ส่งข้อความถึงเรา</h3>
            <form class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">ชื่อ-นามสกุล</label>
                <input type="text" class="input input-bordered w-full bg-white border-gray-300" placeholder="กรุณากรอกชื่อ" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">อีเมล</label>
                <input type="email" class="input input-bordered w-full bg-white border-gray-300" placeholder="กรุณากรอกอีเมล" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">เรื่อง</label>
                <input type="text" class="input input-bordered w-full bg-white border-gray-300" placeholder="กรุณากรอกหัวข้อ" />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">ข้อความ</label>
                <textarea class="textarea textarea-bordered w-full bg-white border-gray-300" rows="4" placeholder="กรุณากรอกข้อความ"></textarea>
              </div>
              <button type="submit" class="btn btn-primary w-full">
                ส่งข้อความ
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="py-20 bg-gray-50">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <ClientOnly>
          <h2 class="text-4xl font-bold text-gray-800 mb-8">เกี่ยวกับ {{ siteName }}</h2>
          <template #fallback>
            <h2 class="text-4xl font-bold text-gray-800 mb-8">เกี่ยวกับ Local Spot</h2>
          </template>
        </ClientOnly>
        <ClientOnly>
          <p class="text-xl text-gray-600 mb-8 leading-relaxed">
            {{ siteName }} เป็นแพลตฟอร์มที่เชื่อมต่อคนในชุมชนเพื่อแบ่งปันและค้นพบสถานที่น่าสนใจในท้องถิ่น
            เราเชื่อว่าทุกชุมชนมีเสน่ห์และความพิเศษเป็นของตัวเอง ที่รอให้คนได้มาค้นพบ
          </p>
          <template #fallback>
            <p class="text-xl text-gray-600 mb-8 leading-relaxed">
              Local Spot เป็นแพลตฟอร์มที่เชื่อมต่อคนในชุมชนเพื่อแบ่งปันและค้นพบสถานที่น่าสนใจในท้องถิ่น
              เราเชื่อว่าทุกชุมชนมีเสน่ห์และความพิเศษเป็นของตัวเอง ที่รอให้คนได้มาค้นพบ
            </p>
          </template>
        </ClientOnly>
        <div class="grid md:grid-cols-3 gap-8 mt-12">
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">{{ totalHotels }}+</div>
            <p class="text-gray-600">โรงแรม</p>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">{{ totalRestaurants }}+</div>
            <p class="text-gray-600">ร้านอาหาร</p>
          </div>
          <div class="text-center">
            <div class="text-3xl font-bold text-green-600 mb-2">{{ totalEvents }}+</div>
            <p class="text-gray-600">กิจกรรม</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white">
      <div class="max-w-4xl mx-auto px-6 text-center">
        <h2 class="text-4xl font-bold mb-8">เริ่มต้นค้นพบสถานที่ใหม่ๆ วันนี้</h2>
        <ClientOnly>
          <p class="text-xl mb-8">เข้าร่วม {{ siteName }} และเป็นส่วนหนึ่งของการท่องเที่ยวท้องถิ่น</p>
          <template #fallback>
            <p class="text-xl mb-8">เข้าร่วม Local Spot และเป็นส่วนหนึ่งของการท่องเที่ยวท้องถิ่น</p>
          </template>
        </ClientOnly>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink to="/hotels" class="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors">
            เริ่มค้นหา
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="max-w-6xl mx-auto px-6">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <ClientOnly>
              <h3 class="text-xl font-bold mb-4">{{ siteName }}</h3>
              <template #fallback>
                <h3 class="text-xl font-bold mb-4">Local Spot</h3>
              </template>
            </ClientOnly>
            <ClientOnly>
              <p class="text-gray-400">{{ siteDescription || 'แพลตฟอร์มท่องเที่ยวท้องถิ่น ค้นพบที่พัก ร้านอาหาร และกิจกรรมท้องถิ่น' }}</p>
              <template #fallback>
                <p class="text-gray-400">แพลตฟอร์มท่องเที่ยวท้องถิ่น ค้นพบที่พัก ร้านอาหาร และกิจกรรมท้องถิ่น</p>
              </template>
            </ClientOnly>
          </div>
          <div>
            <h4 class="font-semibold mb-4">หมวดหมู่</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#news" class="hover:text-white transition-colors">ข่าวสาร</a></li>
              <li><a href="#hotels" class="hover:text-white transition-colors">โรงแรม</a></li>
              <li><a href="#restaurants" class="hover:text-white transition-colors">ร้านอาหาร</a></li>
              <li><a href="#events" class="hover:text-white transition-colors">กิจกรรม</a></li>
              <li><a href="#travel-services" class="hover:text-white transition-colors">บริการท่องเที่ยว</a></li>
              <li><a href="#local-products" class="hover:text-white transition-colors">ผลิตภัณฑ์ท้องถิ่น</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">เกี่ยวกับเรา</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#about" class="hover:text-white transition-colors">เกี่ยวกับเรา</a></li>
              <li><a href="#contact" class="hover:text-white transition-colors">ติดต่อเรา</a></li>
            </ul>
          </div>
          <div>
            <h4 class="font-semibold mb-4">ติดตามเรา</h4>
            <ClientOnly>
              <div class="flex space-x-4">
                <!-- Facebook -->
                <a v-if="socialMedia?.facebook" :href="socialMedia.facebook" target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <!-- Instagram -->
                <a v-if="socialMedia?.instagram" :href="socialMedia.instagram" target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors" aria-label="Instagram">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                </a>
                <!-- Line -->
                <a v-if="socialMedia?.line" :href="socialMedia.line" target="_blank" rel="noopener" class="text-gray-400 hover:text-white transition-colors" aria-label="Line">
                  <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                  </svg>
                </a>
              </div>
              <template #fallback>
                <div class="flex space-x-4">
                  <!-- Placeholder for social icons during SSR -->
                </div>
              </template>
            </ClientOnly>
          </div>
        </div>
        <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <ClientOnly>
            <p>&copy; 2025 {{ siteName }}. สงวนลิขสิทธิ์.</p>
            <template #fallback>
              <p>&copy; 2025 Local Spot. สงวนลิขสิทธิ์.</p>
            </template>
          </ClientOnly>
        </div>
      </div>
    </footer>
    </template>
  </div>
</template>

<script setup lang="ts">
import { useNewsStore } from '~/stores/news'
import { useHotelsStore } from '~/stores/hotels'
import { useRestaurantsStore } from '~/stores/restaurants'
import { useEventsStore } from '~/stores/events'
import { useTravelServicesStore } from '~/stores/travelServices'
import { useLocalProductsStore } from '~/stores/localProducts'
import HeroCarousel from '~/components/public/HeroCarousel.vue'

// Use a clean layout for the home page
definePageMeta({
  layout: false
})

// Stores
const newsStore = useNewsStore()
const hotelsStore = useHotelsStore()
const restaurantsStore = useRestaurantsStore()
const eventsStore = useEventsStore()
const travelServicesStore = useTravelServicesStore()
const localProductsStore = useLocalProductsStore()

// State
const loadingHero = ref(true)
const loadingNews = ref(true)
const loadingHotels = ref(true)
const loadingRestaurants = ref(true)
const loadingEvents = ref(true)
const loadingTravelServices = ref(true)
const loadingLocalProducts = ref(true)

// Navbar scroll state
const navbarHidden = ref(false)
let lastScrollY = 0
let ticking = false

// Public settings
const { siteName, siteDescription, primaryColor, secondaryColor, enabledFeatures, contactInfo, socialMedia } = usePublicSettings()

// Hero settings
const heroType = ref('standard')
const heroTitle = ref('')
const heroDescription = ref('')
const heroCtaText = ref('เริ่มค้นหา')
const heroCtaLink = ref('#hotels')
const carouselSlides = ref([])
const carouselSettings = ref({
  autoplay: true,
  interval: 5000,
  showIndicators: true,
  showControls: true
})

// Computed
const latestNews = computed(() => (newsStore.list || []).slice(0, 6))
const featuredHotels = computed(() => (hotelsStore.list || []).slice(0, 6))
const featuredRestaurants = computed(() => (restaurantsStore.list || []).slice(0, 6))
const upcomingEvents = computed(() => (eventsStore.list || []).slice(0, 6))
const featuredTravelServices = computed(() => (travelServicesStore.list || []).slice(0, 6))
const featuredLocalProducts = computed(() => (localProductsStore.list || []).slice(0, 6))

const totalHotels = computed(() => hotelsStore.pagination?.total || 0)
const totalRestaurants = computed(() => restaurantsStore.pagination?.total || 0)
const totalEvents = computed(() => eventsStore.pagination?.total || 0)

// Methods
function getNewsCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    announcement: 'ประกาศ',
    promotion: 'โปรโมชั่น',
    event_news: 'ข่าวกิจกรรม',
    travel_tips: 'เคล็ดลับ',
    local_story: 'เรื่องราว',
    business_update: 'อัพเดท'
  }
  return labels[category] || category
}

function formatNewsDate(date: any) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('th-TH', {
    day: 'numeric',
    month: 'short'
  })
}

function getCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    hotel: 'โรงแรม',
    resort: 'รีสอร์ท',
    hostel: 'โฮสเทล',
    guesthouse: 'เกสต์เฮาส์',
    villa: 'วิลลา'
  }
  return labels[category] || category
}

function getServiceCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    transport: 'บริการรถ',
    tour: 'ทัวร์',
    guide: 'ไกด์นำเที่ยว',
    rental: 'บริการเช่า',
    activity: 'กิจกรรม'
  }
  return labels[category] || category
}

function getProductCategoryLabel(category: string) {
  const labels: Record<string, string> = {
    handicraft: 'งานฝีมือ',
    food_product: 'ผลิตภัณฑ์อาหาร',
    souvenir: 'ของที่ระลึก',
    textile: 'ผ้า',
    art: 'งานศิลปะ'
  }
  return labels[category] || category
}

function formatDate(date: any) {
  if (!date) return ''
  return new Date(date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Load hero settings
async function loadHeroSettings() {
  loadingHero.value = true
  try {
    const response: any = await $fetch('/api/cms/settings')
    console.log(response);

    if (response?.data?.hero) {
      heroType.value = response.data.hero.type || 'standard'
      heroTitle.value = response.data.hero.title || ''
      heroDescription.value = response.data.hero.description || ''
      heroCtaText.value = response.data.hero.ctaText || 'เริ่มค้นหา'
      heroCtaLink.value = response.data.hero.ctaLink || '#hotels'

      // Load carousel settings if type is carousel
      if (response.data.hero.carousel) {
        carouselSettings.value = {
          autoplay: response.data.hero.carousel.autoplay ?? true,
          interval: response.data.hero.carousel.interval || 5000,
          showIndicators: response.data.hero.carousel.showIndicators ?? true,
          showControls: response.data.hero.carousel.showControls ?? true
        }

        // Sort slides by order
        carouselSlides.value = (response.data.hero.carousel.slides || [])
          .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
      }
    }
  } catch (error) {
    console.error('Failed to load hero settings:', error)
  } finally {
    loadingHero.value = false
  }
}

// Load data
async function loadData() {
  try {
    // Load news
    loadingNews.value = true
    await newsStore.fetchNews({
      query: {
        isActive: true,
        featured: true,
        limit: 6
      }
    })
  } catch (error) {
    console.error('Failed to load news:', error)
  } finally {
    loadingNews.value = false
  }

  try {
    // Load hotels
    loadingHotels.value = true
    await hotelsStore.fetchHotels({
      query: {
        isActive: true,
        featured: true,
        limit: 6
      }
    })
  } catch (error) {
    console.error('Failed to load hotels:', error)
  } finally {
    loadingHotels.value = false
  }

  try {
    // Load restaurants
    loadingRestaurants.value = true
    await restaurantsStore.fetchRestaurants({
      query: {
        isActive: true,
        featured: true,
        limit: 6
      }
    })
  } catch (error) {
    console.error('Failed to load restaurants:', error)
  } finally {
    loadingRestaurants.value = false
  }

  try {
    // Load events
    loadingEvents.value = true
    await eventsStore.fetchEvents({
      query: {
        isActive: true,
        limit: 6
      }
    })
  } catch (error) {
    console.error('Failed to load events:', error)
  } finally {
    loadingEvents.value = false
  }

  try {
    // Load travel services
    loadingTravelServices.value = true
    await travelServicesStore.fetchTravelServices({
      query: {
        isActive: true,
        featured: true,
        limit: 6
      }
    })
  } catch (error) {
    console.error('Failed to load travel services:', error)
  } finally {
    loadingTravelServices.value = false
  }

  try {
    // Load local products
    loadingLocalProducts.value = true
    await localProductsStore.fetchLocalProducts({
      query: {
        isActive: true,
        featured: true,
        limit: 6
      }
    })
  } catch (error) {
    console.error('Failed to load local products:', error)
  } finally {
    loadingLocalProducts.value = false
  }
}

// Handle scroll for navbar hide/show
const handleScroll = () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const currentScrollY = window.scrollY

      // ต้องเลื่อนมากกว่า 50px จากตำแหน่งเดิม
      if (Math.abs(currentScrollY - lastScrollY) < 50) {
        ticking = false
        return
      }

      // เลื่อนลงและเลื่อนเกิน 100px = ซ่อน navbar
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbarHidden.value = true
      }
      // เลื่อนขึ้น = แสดง navbar
      else if (currentScrollY < lastScrollY) {
        navbarHidden.value = false
      }

      lastScrollY = currentScrollY
      ticking = false
    })
    ticking = true
  }
}

// Smooth scrolling for navigation
onMounted(async () => {
  // Load hero settings first (client-side only to avoid hydration mismatch)
  await loadHeroSettings()

  // Then load other data
  loadData()

  // Handle scroll for navbar
  window.addEventListener('scroll', handleScroll, { passive: true })

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

// Cleanup
onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

// SEO
useHead({
  title: computed(() => `${siteName.value} - ค้นพบสถานที่ท้องถิ่น`),
  meta: [
    { name: 'description', content: 'แพลตฟอร์มท่องเที่ยวท้องถิ่น โรงแรม ร้านอาหาร กิจกรรม และสถานที่น่าสนใจ' }
  ]
})
</script>

<style scoped>
/* Sticky Navbar */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(22, 163, 74, 0.95);
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.site-header.nav-hidden {
  transform: translateY(-100%);
}

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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
