<template>
  <ClientOnly>
    <div class="social-embed-wrapper">
      <div class="social-embed-container">
        <!-- YouTube Embed -->
        <div v-if="platform === 'youtube'" class="embed-content embed-video">
          <div class="aspect-video rounded-lg overflow-hidden shadow-lg bg-black">
            <iframe
              :src="embedUrl"
              class="w-full h-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
        </div>

        <!-- TikTok Embed -->
        <div v-else-if="platform === 'tiktok'" class="embed-content embed-vertical">
          <div class="embed-vertical-inner bg-gray-50 rounded-lg shadow-lg overflow-hidden">
            <div v-if="tiktokLoading" class="skeleton h-full w-full"></div>
            <div v-else-if="tiktokEmbedHtml" v-html="tiktokEmbedHtml" :key="tiktokKey" class="tiktok-container h-full flex items-center justify-center"></div>
            <div v-else class="alert alert-error h-full flex items-center justify-center">
              <span>ไม่สามารถโหลด TikTok video ได้</span>
            </div>
          </div>
        </div>

        <!-- Facebook Embed -->
        <div v-else-if="platform === 'facebook'" class="embed-content embed-vertical">
          <div class="embed-vertical-inner bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="fb-post-wrapper">
              <div
                class="fb-post"
                :data-href="url"
                data-width="500"
                data-show-text="true"
              ></div>
            </div>
          </div>
        </div>

        <!-- Instagram Embed -->
        <div v-else-if="platform === 'instagram'" class="embed-content embed-vertical">
          <div class="embed-vertical-inner bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="instagram-wrapper">
              <blockquote
                class="instagram-media"
                :data-instgrm-permalink="url"
                data-instgrm-version="14"
              >
                <a :href="url" target="_blank" rel="noopener">View on Instagram</a>
              </blockquote>
            </div>
          </div>
        </div>

        <!-- Twitter/X Embed -->
        <div v-else-if="platform === 'twitter'" class="embed-content embed-vertical">
          <div class="embed-vertical-inner bg-white rounded-lg shadow-lg overflow-hidden">
            <div class="twitter-wrapper">
              <blockquote class="twitter-tweet" :data-theme="theme">
                <a :href="url" target="_blank" rel="noopener">View on Twitter</a>
              </blockquote>
            </div>
          </div>
        </div>

        <!-- Unsupported or Error -->
        <div v-else class="embed-content">
          <div class="alert alert-warning">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
            <span>ไม่รองรับ URL นี้ หรือ URL ไม่ถูกต้อง</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Fallback for SSR -->
    <template #fallback>
      <div class="social-embed-wrapper">
        <div class="skeleton h-96 w-full rounded-lg"></div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
interface Props {
  url: string
  theme?: 'light' | 'dark'
  autoplay?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  theme: 'light',
  autoplay: false
})

// TikTok embed state
const tiktokLoading = ref(false)
const tiktokEmbedHtml = ref('')
const tiktokKey = ref(Date.now())

// Detect platform from URL
const platform = computed(() => {
  const url = props.url.toLowerCase()

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    return 'youtube'
  } else if (url.includes('tiktok.com')) {
    return 'tiktok'
  } else if (url.includes('facebook.com') || url.includes('fb.com') || url.includes('fb.watch')) {
    return 'facebook'
  } else if (url.includes('instagram.com')) {
    return 'instagram'
  } else if (url.includes('twitter.com') || url.includes('x.com')) {
    return 'twitter'
  }

  return null
})

// Extract video ID and generate embed URL
const videoId = computed(() => {
  if (platform.value === 'youtube') {
    // Handle different YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/,
      /youtube\.com\/embed\/([^&\n?#]+)/,
      /youtube\.com\/v\/([^&\n?#]+)/
    ]

    for (const pattern of patterns) {
      const match = props.url.match(pattern)
      if (match) return match[1]
    }
  } else if (platform.value === 'tiktok') {
    // Extract TikTok video ID
    const match = props.url.match(/\/video\/(\d+)/)
    return match ? match[1] : null
  }

  return null
})

const embedUrl = computed(() => {
  if (platform.value === 'youtube' && videoId.value) {
    const params = new URLSearchParams({
      autoplay: props.autoplay ? '1' : '0',
      rel: '0',
      modestbranding: '1'
    })
    return `https://www.youtube.com/embed/${videoId.value}?${params.toString()}`
  }

  return null
})

// Store
const socialEmbedStore = useSocialEmbedStore()

// Fetch TikTok embed via oEmbed API
async function fetchTikTokEmbed() {
  if (!props.url) return

  tiktokLoading.value = true

  try {
    const response = await socialEmbedStore.fetchTikTokEmbed({
      query: { url: props.url }
    })

    // Handle different response structures
    let html = null
    if (response?.html) {
      // Direct response from oEmbed
      html = response.html
    } else if (response?.data?.html) {
      // Wrapped response
      html = response.data.html
    }

    if (html) {
      // Clear existing content first to force fresh render
      tiktokEmbedHtml.value = ''
      await nextTick()

      // Set new HTML with new key to force re-render
      tiktokKey.value = Date.now()
      tiktokEmbedHtml.value = html
      await nextTick()

      // Load TikTok script after setting HTML
      loadTikTokScript()
    } else {
      console.error('No HTML in TikTok response')
      tiktokEmbedHtml.value = ''
    }
  } catch (error) {
    console.error('Failed to fetch TikTok embed:', error)
    tiktokEmbedHtml.value = ''
  } finally {
    tiktokLoading.value = false
  }
}

// Load external scripts for social platforms
onMounted(() => {
  if (platform.value === 'tiktok') {
    fetchTikTokEmbed()
  } else if (platform.value === 'facebook') {
    loadFacebookSDK()
  } else if (platform.value === 'instagram') {
    loadInstagramScript()
  } else if (platform.value === 'twitter') {
    loadTwitterScript()
  }
})

// Handle component reactivation (when navigating back)
onActivated(() => {
  if (platform.value === 'tiktok' && tiktokEmbedHtml.value) {
    // Force complete re-render of TikTok embed
    nextTick(() => {
      loadTikTokScript()
    })
  } else if (platform.value === 'facebook') {
    loadFacebookSDK()
  } else if (platform.value === 'instagram') {
    loadInstagramScript()
  } else if (platform.value === 'twitter') {
    loadTwitterScript()
  }
})

function loadTikTokScript() {
  const container = document.querySelector('.tiktok-container')

  if (!container) return

  if (document.getElementById('tiktok-embed-script')) {
    // Script already loaded, force complete re-render
    if (window.tiktokEmbed) {
      // Completely clear the container first
      const processedEmbeds = container.querySelectorAll('.tiktok-embed')
      processedEmbeds.forEach(embed => {
        embed.remove()
      })

      // Remove all iframes that TikTok might have created
      const iframes = container.querySelectorAll('iframe')
      iframes.forEach(iframe => {
        iframe.remove()
      })

      // Reset the blockquote element
      const blockquote = container.querySelector('blockquote')
      if (blockquote) {
        // Remove all attributes and styles added by TikTok
        blockquote.style.cssText = ''
        blockquote.removeAttribute('data-tiktok-processed')

        // Remove any divs or elements TikTok added
        const tiktokAddedElements = blockquote.querySelectorAll('div, iframe, script')
        tiktokAddedElements.forEach(el => {
          if (!el.querySelector('a')) { // Don't remove the original link
            el.remove()
          }
        })
      }

      // Wait a bit then force re-render
      setTimeout(() => {
        const freshContainer = document.querySelector('.tiktok-container')
        if (window.tiktokEmbed && freshContainer) {
          try {
            // Force the library to process this container as if it's new
            window.tiktokEmbed.lib.render(freshContainer)
          } catch (e) {
            console.error('TikTok render error:', e)
          }
        }
      }, 200)
    } else {
      // Wait for TikTok script to initialize
      let retries = 0
      const checkTikTok = setInterval(() => {
        if (window.tiktokEmbed || retries > 10) {
          clearInterval(checkTikTok)
          if (window.tiktokEmbed && container) {
            window.tiktokEmbed.lib.render(container)
          }
        }
        retries++
      }, 200)
    }
    return
  }

  const script = document.createElement('script')
  script.id = 'tiktok-embed-script'
  script.src = 'https://www.tiktok.com/embed.js'
  script.async = true

  script.onload = () => {
    // Wait a bit then try to render
    setTimeout(() => {
      if (window.tiktokEmbed && container) {
        window.tiktokEmbed.lib.render(container)
      }
    }, 200)
  }

  document.body.appendChild(script)
}

function loadFacebookSDK() {
  if (document.getElementById('facebook-jssdk')) {
    // Script already loaded, try to parse
    if (window.FB) {
      setTimeout(() => {
        window.FB.XFBML.parse()
      }, 100)
    } else {
      // Wait for FB to initialize
      let retries = 0
      const checkFB = setInterval(() => {
        if (window.FB || retries > 10) {
          clearInterval(checkFB)
          if (window.FB) {
            window.FB.XFBML.parse()
          }
        }
        retries++
      }, 200)
    }
    return
  }

  // Initialize FB SDK
  window.fbAsyncInit = function() {
    FB.init({
      xfbml: true,
      version: 'v18.0'
    })
  }

  const script = document.createElement('script')
  script.id = 'facebook-jssdk'
  script.src = 'https://connect.facebook.net/th_TH/sdk.js'
  script.async = true
  script.defer = true
  script.crossOrigin = 'anonymous'
  document.body.appendChild(script)
}

function loadInstagramScript() {
  if (document.getElementById('instagram-embed-script')) {
    // Script already loaded, try to process
    if (window.instgrm) {
      setTimeout(() => {
        window.instgrm.Embeds.process()
      }, 100)
    } else {
      // Wait for Instagram to initialize
      let retries = 0
      const checkIG = setInterval(() => {
        if (window.instgrm || retries > 10) {
          clearInterval(checkIG)
          if (window.instgrm) {
            window.instgrm.Embeds.process()
          }
        }
        retries++
      }, 200)
    }
    return
  }

  const script = document.createElement('script')
  script.id = 'instagram-embed-script'
  script.src = 'https://www.instagram.com/embed.js'
  script.async = true
  document.body.appendChild(script)
}

function loadTwitterScript() {
  if (document.getElementById('twitter-embed-script')) {
    // Script already loaded, try to load widgets
    if (window.twttr) {
      setTimeout(() => {
        window.twttr.widgets.load()
      }, 100)
    } else {
      // Wait for Twitter to initialize
      let retries = 0
      const checkTwitter = setInterval(() => {
        if (window.twttr || retries > 10) {
          clearInterval(checkTwitter)
          if (window.twttr) {
            window.twttr.widgets.load()
          }
        }
        retries++
      }, 200)
    }
    return
  }

  const script = document.createElement('script')
  script.id = 'twitter-embed-script'
  script.src = 'https://platform.twitter.com/widgets.js'
  script.async = true
  script.charset = 'utf-8'
  document.body.appendChild(script)
}

// Watch for URL changes and reload embeds if needed
watch(() => props.url, () => {
  // For TikTok, re-fetch embed
  if (platform.value === 'tiktok') {
    fetchTikTokEmbed()
  }

  // For Facebook, need to parse again
  if (platform.value === 'facebook' && window.FB) {
    nextTick(() => {
      window.FB.XFBML.parse()
    })
  }

  // For Instagram
  if (platform.value === 'instagram' && window.instgrm) {
    nextTick(() => {
      window.instgrm.Embeds.process()
    })
  }

  // For Twitter
  if (platform.value === 'twitter' && window.twttr) {
    nextTick(() => {
      window.twttr.widgets.load()
    })
  }
})
</script>

<style scoped>
.social-embed-wrapper {
  /* @apply w-full max-w-2xl mx-auto; */
}

.social-embed-container {
  @apply relative w-full;
}

.embed-content {
  @apply w-full;
}

/* Video embeds (YouTube) - Horizontal format */
.embed-video {
  @apply w-full;
}

.embed-video .aspect-video {
  aspect-ratio: 16 / 9;
}

/* Vertical embeds (TikTok, Facebook, Instagram, Twitter) */
.embed-vertical {
  @apply w-full flex flex-col items-center;
}

.embed-vertical-inner {
  /* @apply w-full max-w-md mx-auto;
  min-height: 400px;
  max-height: 700px;
  display: flex;
  align-items: center;
  justify-content: center; */
}

/* TikTok specific */
.tiktok-container {
  @apply w-full;
}

.tiktok-container :deep(blockquote) {
  margin: 0 auto !important;
  max-width: 100% !important;
}

.tiktok-container :deep(.tiktok-embed) {
  margin: 0 auto !important;
}

/* Facebook specific */
.fb-post-wrapper {
  @apply w-full flex items-center justify-center p-4;
  min-height: 400px;
}

.fb-post-wrapper :deep(.fb-post) {
  margin: 0 auto !important;
}

/* Instagram specific */
.instagram-wrapper {
  @apply w-full flex items-center justify-center p-4;
  min-height: 400px;
}

.instagram-wrapper :deep(.instagram-media) {
  margin: 0 auto !important;
  max-width: 100% !important;
  min-width: 326px !important;
}

/* Twitter specific */
.twitter-wrapper {
  @apply w-full flex items-center justify-center p-4;
  min-height: 400px;
}

.twitter-wrapper :deep(.twitter-tweet) {
  margin: 0 auto !important;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .embed-vertical-inner {
    max-width: 100%;
  }

  .instagram-wrapper :deep(.instagram-media) {
    min-width: 280px !important;
  }
}

/* Loading skeleton */
.skeleton {
  @apply animate-pulse bg-gray-200;
}
</style>
