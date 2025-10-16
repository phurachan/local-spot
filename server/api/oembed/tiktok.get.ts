export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url = query.url as string

  if (!url) {
    throw createError({
      statusCode: 400,
      message: 'URL parameter is required'
    })
  }

  try {
    // Call TikTok oEmbed API
    const response = await $fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`)

    return response
  } catch (error: any) {
    console.error('TikTok oEmbed error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to fetch TikTok embed'
    })
  }
})
