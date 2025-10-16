<template>
  <section class="py-12 md:py-16 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Header -->
      <div class="text-center mb-12">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {{ title || 'ติดตามเราผ่านโซเชียลมีเดีย' }}
        </h2>
        <p class="text-lg text-gray-600 max-w-2xl mx-auto">
          {{ description || 'ดูคอนเทนต์ล่าสุดและติดตามข่าวสารจากเราผ่านโซเชียลมีเดีย' }}
        </p>
      </div>

      <!-- Social Embeds Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(embed, index) in embeds"
          :key="index"
          class="social-embed-item"
        >
          <BaseSocialEmbed :url="embed.url" :autoplay="false" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface SocialEmbed {
  url: string
  platform?: string
}

interface Props {
  title?: string
  description?: string
  embeds: SocialEmbed[]
}

defineProps<Props>()
</script>

<style scoped>
.social-embed-item {
  @apply bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow;
}

@media (max-width: 768px) {
  .social-embed-item {
    @apply p-4;
  }
}
</style>
