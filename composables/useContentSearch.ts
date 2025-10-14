export const useContentSearch = () => {
  const searchHotels = async (query: string = '') => {
    try {
      const response = await $fetch('/api/cms/hotels', {
        method: 'GET',
        query: {
          search: query,
          limit: 20,
          isActive: true
        }
      })
      return response.data || []
    } catch (error) {
      console.error('Error fetching hotels:', error)
      return []
    }
  }

  const searchRestaurants = async (query: string = '') => {
    try {
      const response = await $fetch('/api/cms/restaurants', {
        method: 'GET',
        query: {
          search: query,
          limit: 20,
          isActive: true
        }
      })
      return response.data || []
    } catch (error) {
      console.error('Error fetching restaurants:', error)
      return []
    }
  }

  const searchTravelServices = async (query: string = '') => {
    try {
      const response = await $fetch('/api/cms/travel-services', {
        method: 'GET',
        query: {
          search: query,
          limit: 20,
          isActive: true
        }
      })
      return response.data || []
    } catch (error) {
      console.error('Error fetching travel services:', error)
      return []
    }
  }

  const searchLocalProducts = async (query: string = '') => {
    try {
      const response = await $fetch('/api/cms/local-products', {
        method: 'GET',
        query: {
          search: query,
          limit: 20,
          isActive: true
        }
      })
      return response.data || []
    } catch (error) {
      console.error('Error fetching local products:', error)
      return []
    }
  }

  const searchEvents = async (query: string = '') => {
    try {
      const response = await $fetch('/api/cms/events', {
        method: 'GET',
        query: {
          search: query,
          limit: 20,
          isActive: true
        }
      })
      return response.data || []
    } catch (error) {
      console.error('Error fetching events:', error)
      return []
    }
  }

  const searchContentByType = async (type: string, query: string = '') => {
    switch (type) {
      case 'hotel':
        return await searchHotels(query)
      case 'restaurant':
        return await searchRestaurants(query)
      case 'travel_service':
        return await searchTravelServices(query)
      case 'local_product':
        return await searchLocalProducts(query)
      case 'event':
        return await searchEvents(query)
      default:
        return []
    }
  }

  return {
    searchHotels,
    searchRestaurants,
    searchTravelServices,
    searchLocalProducts,
    searchEvents,
    searchContentByType
  }
}
