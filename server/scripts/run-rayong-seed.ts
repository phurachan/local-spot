#!/usr/bin/env node

/**
 * Script to seed Rayong/Ban Chang data into the database
 *
 * Usage:
 *   npx tsx server/scripts/run-rayong-seed.ts
 *
 * This script will:
 * 1. Connect to MongoDB
 * 2. Insert hotels, restaurants, events, travel services, local products, and news
 * 3. Display summary of inserted data
 */

import mongoose from 'mongoose'
import {
  HotelContent,
  RestaurantContent,
  EventContent,
  TravelServiceContent,
  LocalProductContent,
  NewsContent
} from '../models/CMS'

// Import data
import { hotelsData, restaurantsData } from './seed-rayong-data'
import { eventsData, travelServicesData } from './seed-rayong-data-part2'
import { localProductsData, newsData } from './seed-rayong-data-part3'

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://moonoi-test:MoonoiPassword@myapp-cluster.eng65pe.mongodb.net/local-spot?retryWrites=true&w=majority'

interface SeedResult {
  success: boolean
  count: number
  error?: string
}

interface SeedSummary {
  hotels: SeedResult
  restaurants: SeedResult
  events: SeedResult
  travelServices: SeedResult
  localProducts: SeedResult
  news: SeedResult
}

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log('✓ Connected to MongoDB')
  } catch (error) {
    console.error('✗ MongoDB connection error:', error)
    process.exit(1)
  }
}

async function seedHotels(): Promise<SeedResult> {
  try {
    console.log('\n📍 Seeding Hotels...')
    const result = await HotelContent.insertMany(hotelsData)
    console.log(`✓ Inserted ${result.length} hotels`)
    return { success: true, count: result.length }
  } catch (error: any) {
    console.error('✗ Error seeding hotels:', error.message)
    return { success: false, count: 0, error: error.message }
  }
}

async function seedRestaurants(): Promise<SeedResult> {
  try {
    console.log('\n🍽️  Seeding Restaurants...')
    const result = await RestaurantContent.insertMany(restaurantsData)
    console.log(`✓ Inserted ${result.length} restaurants`)
    return { success: true, count: result.length }
  } catch (error: any) {
    console.error('✗ Error seeding restaurants:', error.message)
    return { success: false, count: 0, error: error.message }
  }
}

async function seedEvents(): Promise<SeedResult> {
  try {
    console.log('\n🎉 Seeding Events...')
    const result = await EventContent.insertMany(eventsData)
    console.log(`✓ Inserted ${result.length} events`)
    return { success: true, count: result.length }
  } catch (error: any) {
    console.error('✗ Error seeding events:', error.message)
    return { success: false, count: 0, error: error.message }
  }
}

async function seedTravelServices(): Promise<SeedResult> {
  try {
    console.log('\n🚗 Seeding Travel Services...')
    const result = await TravelServiceContent.insertMany(travelServicesData)
    console.log(`✓ Inserted ${result.length} travel services`)
    return { success: true, count: result.length }
  } catch (error: any) {
    console.error('✗ Error seeding travel services:', error.message)
    return { success: false, count: 0, error: error.message }
  }
}

async function seedLocalProducts(): Promise<SeedResult> {
  try {
    console.log('\n🎁 Seeding Local Products...')
    const result = await LocalProductContent.insertMany(localProductsData)
    console.log(`✓ Inserted ${result.length} local products`)
    return { success: true, count: result.length }
  } catch (error: any) {
    console.error('✗ Error seeding local products:', error.message)
    return { success: false, count: 0, error: error.message }
  }
}

async function seedNews(): Promise<SeedResult> {
  try {
    console.log('\n📰 Seeding News...')
    const result = await NewsContent.insertMany(newsData)
    console.log(`✓ Inserted ${result.length} news articles`)
    return { success: true, count: result.length }
  } catch (error: any) {
    console.error('✗ Error seeding news:', error.message)
    return { success: false, count: 0, error: error.message }
  }
}

function printSummary(summary: SeedSummary) {
  console.log('\n' + '='.repeat(50))
  console.log('📊 SEED SUMMARY')
  console.log('='.repeat(50))

  const totalSuccess = Object.values(summary).filter(r => r.success).length
  const totalItems = Object.values(summary).reduce((sum, r) => sum + r.count, 0)

  console.log('\n✓ Hotels:', summary.hotels.count)
  console.log('✓ Restaurants:', summary.restaurants.count)
  console.log('✓ Events:', summary.events.count)
  console.log('✓ Travel Services:', summary.travelServices.count)
  console.log('✓ Local Products:', summary.localProducts.count)
  console.log('✓ News:', summary.news.count)

  console.log('\n' + '='.repeat(50))
  console.log(`✓ Total: ${totalItems} items inserted`)
  console.log(`✓ Success: ${totalSuccess}/6 modules`)
  console.log('='.repeat(50))

  // Print errors if any
  const errors = Object.entries(summary).filter(([_, result]) => !result.success)
  if (errors.length > 0) {
    console.log('\n⚠️  ERRORS:')
    errors.forEach(([module, result]) => {
      console.log(`  - ${module}: ${result.error}`)
    })
  }
}

async function main() {
  console.log('🌱 Starting seed process for Rayong/Ban Chang data...\n')

  // Connect to database
  await connectDB()

  // Check if data already exists
  const existingHotels = await HotelContent.countDocuments({ 'location.district': 'บ้านฉาง' })
  if (existingHotels > 0) {
    console.log(`\n⚠️  Warning: Found ${existingHotels} existing hotels in Ban Chang`)
    console.log('This script will add new data. If you want to remove old data first, please do it manually.\n')
  }

  // Seed all data
  const summary: SeedSummary = {
    hotels: await seedHotels(),
    restaurants: await seedRestaurants(),
    events: await seedEvents(),
    travelServices: await seedTravelServices(),
    localProducts: await seedLocalProducts(),
    news: await seedNews()
  }

  // Print summary
  printSummary(summary)

  // Close connection
  await mongoose.connection.close()
  console.log('\n✓ Database connection closed')
  console.log('✓ Seed process completed!\n')

  process.exit(0)
}

// Handle errors
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error)
  process.exit(1)
})

// Run main function
main().catch((error) => {
  console.error('Error in main process:', error)
  process.exit(1)
})
