<template>
  <div class="relative h-screen overflow-hidden">
    <!-- Slides -->
    <TransitionGroup name="slide">
      <div
        v-for="(slide, index) in slides"
        v-show="index === currentSlide"
        :key="index"
        class="absolute inset-0"
      >
        <!-- Background Image -->
        <div class="absolute inset-0">
          <img
            v-if="slide.image"
            :src="slide.image"
            :alt="slide.title"
            class="w-full h-full object-cover"
          />
          <div v-else class="w-full h-full bg-gradient-to-br from-green-500 via-teal-600 to-blue-600"></div>
        </div>

        <!-- Overlay -->
        <div class="absolute inset-0 bg-black/40"></div>

        <!-- Content -->
        <div class="relative z-10 h-full flex items-center justify-center text-center text-white">
          <div class="max-w-4xl px-6">
            <h1 v-if="slide.title" class="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              {{ slide.title }}
            </h1>
            <p v-if="slide.description" class="text-xl md:text-2xl mb-8 text-green-100">
              {{ slide.description }}
            </p>
            <div v-if="slide.ctaText && slide.ctaLink" class="flex justify-center">
              <a
                :href="slide.ctaLink"
                class="bg-green-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-400 transition-colors"
              >
                {{ slide.ctaText }}
              </a>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>

    <!-- Controls -->
    <div v-if="showControls && slides.length > 1" class="absolute inset-x-0 top-1/2 -translate-y-1/2 z-20 flex justify-between px-6">
      <button
        @click="prevSlide"
        class="bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        aria-label="Previous slide"
      >
        <BaseIcon name="chevron-left" size="lg" />
      </button>
      <button
        @click="nextSlide"
        class="bg-white/30 hover:bg-white/50 backdrop-blur-sm text-white p-3 rounded-full transition-all"
        aria-label="Next slide"
      >
        <BaseIcon name="chevron-right" size="lg" />
      </button>
    </div>

    <!-- Indicators -->
    <div v-if="showIndicators && slides.length > 1" class="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
      <button
        v-for="(slide, index) in slides"
        :key="index"
        @click="goToSlide(index)"
        :class="[
          'h-2 rounded-full transition-all',
          index === currentSlide ? 'w-8 bg-white' : 'w-2 bg-white/50 hover:bg-white/75'
        ]"
        :aria-label="`Go to slide ${index + 1}`"
      ></button>
    </div>
  </div>
</template>

<script setup lang="ts">
interface HeroSlide {
  image: string
  title: string
  description: string
  ctaText: string
  ctaLink: string
}

const props = defineProps<{
  slides: HeroSlide[]
  autoplay?: boolean
  interval?: number
  showIndicators?: boolean
  showControls?: boolean
}>()

// Current slide
const currentSlide = ref(0)

// Timer ref
let timer: ReturnType<typeof setInterval> | null = null

// Methods
function nextSlide() {
  currentSlide.value = (currentSlide.value + 1) % props.slides.length
  resetTimer()
}

function prevSlide() {
  currentSlide.value = (currentSlide.value - 1 + props.slides.length) % props.slides.length
  resetTimer()
}

function goToSlide(index: number) {
  currentSlide.value = index
  resetTimer()
}

function startTimer() {
  if (props.autoplay && props.slides.length > 1) {
    timer = setInterval(() => {
      nextSlide()
    }, props.interval || 5000)
  }
}

function stopTimer() {
  if (timer) {
    clearInterval(timer)
    timer = null
  }
}

function resetTimer() {
  stopTimer()
  startTimer()
}

// Lifecycle
onMounted(() => {
  startTimer()
})

onBeforeUnmount(() => {
  stopTimer()
})

// Watch autoplay changes
watch(() => props.autoplay, (newValue) => {
  if (newValue) {
    startTimer()
  } else {
    stopTimer()
  }
})
</script>

<style scoped>
/* Slide transitions */
.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s ease;
}

.slide-enter-from {
  opacity: 0;
}

.slide-leave-to {
  opacity: 0;
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
</style>
