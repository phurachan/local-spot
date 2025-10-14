# Claude Code Project Knowledge - Local Spot

## 📋 Project Overview
**Local Spot** เป็นแพลตฟอร์ม CMS (Content Management System) สำหรับจัดการเนื้อหาธุรกิจท่องเที่ยวท้องถิ่นแบบครบวงจร พัฒนาด้วย Nuxt 4 (Full-stack Framework) + MongoDB + TypeScript

### วัตถุประสงค์หลัก
- จัดการเนื้อหาท่องเที่ยวท้องถิ่น (โรงแรม, ร้านอาหาร, กิจกรรม, ข่าวสาร)
- รองรับ Multi-language (ไทย/English)
- ระบบ Admin Panel พร้อม Role-Based Access Control
- SEO-Ready พร้อม Meta Tags และ Structured Data

---

## 🛠️ Technology Stack

### Core Technologies
| Technology | Version | Purpose |
|-----------|---------|---------|
| **Nuxt** | 4.1.0 | Full-stack Framework (Vue 3 + SSR) |
| **Node.js** | 22.17.0+ | Runtime (Required) |
| **TypeScript** | 5.9.2 | Type Safety |
| **MongoDB** | 8.18.0 (Mongoose) | Database |
| **Pinia** | 3.0.3 | State Management |

### UI & Styling
- **TailwindCSS** 3.4.17 (❌ NOT v4 - incompatible with DaisyUI)
- **DaisyUI** 5.1.12 - UI Component Library
- **@heroicons/vue** 2.2.0 - Icon System
- **@nuxtjs/tailwindcss** 6.12.4 - Nuxt Module

### Form & Editor
- **Tiptap** 3.6.2 - Rich Text Editor (News/Content)
- **@vuepic/vue-datepicker** 11.0.2 - Date Picker (Thai + Buddhist Era)
- **date-fns** 4.1.0 - Date Utilities

### Storage & Upload
- **@vercel/blob** 2.0.0 - Image Upload & Storage
- **Sharp** 0.34.4 - Image Processing

### Authentication
- **bcryptjs** 3.0.2 - Password Hashing
- **jsonwebtoken** 9.0.2 - JWT Auth

### i18n
- **@nuxtjs/i18n** 10.1.0 - Multi-language Support

---

## 📁 Project Structure

```
local-spot/
├── composables/                  # Vue Composables & Type Definitions
│   ├── component_models/         # 🎨 Component Props Interfaces
│   │   ├── base.ts              # BaseButton, BaseIcon, etc.
│   │   └── form.ts              # Form components props
│   ├── data_models/              # 📊 API Response & Data Models
│   │   ├── cms.ts               # ⭐ CMS Content Types (Main)
│   │   ├── user-management.ts   # User/Role/Permission types
│   │   └── auth.ts              # Authentication types
│   ├── store_models/             # 🏪 Pinia Store Interfaces
│   │   ├── news.ts, hotels.ts, restaurants.ts...
│   │   └── webSettings.ts
│   ├── utility_models/           # 🔧 Utility Function Types
│   │   ├── http.ts              # HTTP Client types
│   │   └── auth.ts              # Auth utility types
│   ├── utilities/                # 🛠️ Utility Functions
│   │   ├── useHttpClient.ts     # ⭐ HTTP Client (Main)
│   │   ├── useToast.ts          # Toast notifications
│   │   ├── useConfirm.ts        # Confirmation dialogs
│   │   ├── useFormatDate.ts     # Thai date formatting
│   │   ├── useFormatNumber.ts   # Thai number formatting
│   │   ├── useTheme.ts          # Theme management
│   │   └── usePermissions.ts    # Permission checking
│   ├── constants/                # 📌 Constants
│   │   ├── api.ts               # API endpoints
│   │   └── lang.ts              # Language constants
│   └── common/                   # 🔄 Common Utilities
│       └── init_app.ts          # App initialization

├── components/                   # Vue Components
│   ├── base/                    # ⭐ Reusable Base Components
│   │   ├── Button.vue           # Buttons with loading states
│   │   ├── Input.vue            # Text inputs
│   │   ├── Select.vue           # Native select dropdown
│   │   ├── Textarea.vue         # Text area
│   │   ├── Checkbox.vue         # Checkboxes
│   │   ├── Radio.vue            # Radio buttons
│   │   ├── DatePicker.vue       # Date picker (Thai + BE)
│   │   ├── Autocomplete.vue     # Search with API
│   │   ├── DataTable.vue        # Advanced tables
│   │   ├── Table.vue            # Simple tables
│   │   ├── Pagination.vue       # Pagination
│   │   ├── Modal.vue            # Modals/Dialogs
│   │   ├── Loading.vue          # Loading overlays
│   │   ├── Alert.vue            # Alerts & notifications
│   │   ├── PageHeader.vue       # Page headers
│   │   ├── Breadcrumbs.vue      # Breadcrumbs
│   │   ├── Icon.vue             # Icon system
│   │   ├── Avatar.vue           # User avatars
│   │   ├── ThemeToggle.vue      # Theme switcher
│   │   ├── ImagePicker.vue      # Image uploader
│   │   └── RichTextEditor.vue   # Tiptap editor
│   ├── cms/                     # CMS-specific Components
│   │   ├── NewsForm.vue
│   │   ├── HotelForm.vue
│   │   ├── RestaurantForm.vue
│   │   ├── TravelServiceForm.vue
│   │   ├── LocalProductForm.vue
│   │   ├── EventForm.vue
│   │   ├── ImageForm.vue
│   │   └── SEOForm.vue
│   └── user-management/         # User Management
│       ├── UsersTab.vue
│       ├── RolesTab.vue
│       └── PermissionsTab.vue

├── pages/                        # 📄 Pages (Auto-routing)
│   ├── index.vue                # Landing page
│   └── local-spot/
│       ├── index.vue            # Local Spot home
│       ├── login.vue            # Login page
│       ├── admin/               # Admin Panel
│       │   ├── index.vue        # Dashboard
│       │   ├── demo.vue         # CRUD Demo
│       │   ├── user_management.vue
│       │   ├── i18n-test.vue
│       │   └── components.vue   # Component Showcase
│       ├── manage-cms/          # ⭐ CMS Management (Main)
│       │   ├── index.vue        # CMS Dashboard
│       │   ├── settings.vue     # ⭐ Web Settings
│       │   ├── news/index.vue
│       │   ├── hotels/index.vue
│       │   ├── restaurants/index.vue
│       │   ├── travel-services/index.vue
│       │   ├── local-products/index.vue
│       │   ├── events/index.vue
│       │   ├── images/index.vue
│       │   └── seo/index.vue
│       ├── news/                # Public Pages
│       │   ├── index.vue
│       │   └── [id].vue
│       ├── hotels/
│       ├── restaurants/
│       ├── travel-services/
│       ├── local-products/
│       └── events/

├── server/                       # 🖥️ Nitro Server (Backend)
│   ├── api/
│   │   ├── auth/                # Authentication
│   │   │   ├── login.post.ts
│   │   │   ├── register.post.ts
│   │   │   ├── me.get.ts
│   │   │   └── seed.post.ts
│   │   ├── users/               # User Management
│   │   ├── roles/               # Role Management
│   │   ├── permissions/         # Permission Management
│   │   └── cms/                 # ⭐ CMS API (Main)
│   │       ├── settings/        # Web Settings
│   │       │   ├── index.get.ts
│   │       │   └── index.put.ts
│   │       ├── news/
│   │       ├── hotels/
│   │       ├── restaurants/
│   │       ├── travel-services/
│   │       ├── local-products/
│   │       ├── events/
│   │       ├── images/
│   │       └── seo/
│   └── local-spot/
│       ├── models/              # MongoDB Models
│       │   ├── CMS.ts           # ⭐ All CMS Models (Main)
│       │   ├── User.ts
│       │   ├── Role.ts
│       │   └── Permission.ts
│       └── utils/               # Server Utilities
│           ├── mongodb.ts       # DB Connection
│           ├── jwt.ts           # JWT Utils
│           ├── responseHandler.ts
│           ├── queryParser.ts
│           └── loadModels.ts

├── stores/                       # 🏪 Pinia Stores
│   ├── auth.ts                  # Authentication
│   ├── webSettings.ts           # ⭐ Web Settings Store
│   ├── news.ts
│   ├── hotels.ts
│   ├── restaurants.ts
│   ├── travelServices.ts
│   ├── localProducts.ts
│   ├── events.ts
│   ├── images.ts
│   ├── seo.ts
│   ├── users.ts
│   ├── roles.ts
│   └── permissions.ts

├── layouts/                      # Nuxt Layouts
│   ├── default.vue              # Main layout (with sidebar)
│   └── auth.vue                 # Auth layout

├── middleware/                   # Route Middleware
│   └── auth.ts                  # Authentication guard

├── locales/                      # i18n Translations
│   ├── th.json                  # Thai (default)
│   └── en.json                  # English

└── plugins/                      # Nuxt Plugins
    └── pinia.client.ts          # Pinia persistence

```

---

## 🎨 CMS Content Types (ระบบจัดการเนื้อหา)

### 📍 Main File: `composables/data_models/cms.ts`

โปรเจกต์รองรับ **8 ประเภทเนื้อหาหลัก**:

#### 1. **NewsContent** - ข่าวสาร
```typescript
{
  type: 'news'
  category: 'announcement' | 'promotion' | 'event_news' | 'travel_tips' | 'local_story' | 'business_update'
  author: { name, email, bio }
  content: string              // HTML/Markdown
  excerpt?: string             // Short summary
  coverImage?: string
  publishDate: Date
  relatedContent?: Array       // เชื่อมโยงกับเนื้อหาอื่น
  viewCount?: number
  readTime?: number
}
```

#### 2. **HotelContent** - โรงแรม/ที่พัก
```typescript
{
  type: 'hotel'
  category: 'hotel' | 'resort' | 'hostel' | 'guesthouse' | 'villa'
  location: { address, district, province, coordinates }
  contactInfo: { phone[], email, website, lineOA }
  amenities: string[]
  roomTypes: Array<{
    name, description, maxGuests,
    priceRange: { min, max },
    images: string[]
  }>
  checkInOut: { checkIn, checkOut }
  policies: string[]
  nearbyAttractions: string[]
}
```

#### 3. **RestaurantContent** - ร้านอาหาร
```typescript
{
  type: 'restaurant'
  category: 'restaurant' | 'cafe' | 'street_food' | 'local_cuisine' | 'international'
  location: { address, district, province, coordinates }
  contactInfo: { phone[], email, website, lineOA }
  cuisine: string[]
  priceRange: 'budget' | 'mid_range' | 'fine_dining'
  operatingHours: {
    [day: string]: { open, close, closed?: boolean }
  }
  specialties: string[]
  dietaryOptions: string[]
  delivery: { available, platforms[] }
}
```

#### 4. **TravelServiceContent** - บริการท่องเที่ยว
```typescript
{
  type: 'travel_service'
  category: 'transport' | 'tour' | 'guide' | 'rental' | 'activity'
  serviceType: string
  location: { serviceArea[], meetingPoint, coordinates }
  contactInfo: { phone[], email, website, lineOA }
  pricing: {
    type: 'per_person' | 'per_group' | 'per_hour' | 'per_day'
    amount: number
    currency: string
    includes: string[]
    excludes: string[]
  }
  duration: { min, max, unit: 'hours' | 'days' }
  capacity: { min, max }
  requirements: string[]
  availability: string[]
}
```

#### 5. **LocalProductContent** - ผลิตภัณฑ์ท้องถิ่น
```typescript
{
  type: 'local_product'
  category: 'handicraft' | 'food_product' | 'souvenir' | 'textile' | 'art'
  vendor: {
    name, description, location,
    contactInfo: { phone[], email, website, lineOA }
  }
  product: { materials[], sizes[], colors[], weight?, dimensions? }
  pricing: {
    price: number
    currency: string
    discounts?: Array<{ quantity, discountPercent }>
  }
  availability: { inStock, stockQuantity?, seasonality? }
  shipping: { available, areas[], cost? }
}
```

#### 6. **EventContent** - กิจกรรม/งานอีเวนต์
```typescript
{
  type: 'event'
  category: 'festival' | 'market' | 'cultural' | 'sports' | 'workshop' | 'seasonal'
  schedule: {
    startDate: Date
    endDate: Date
    times: Array<{ start, end }>
    recurring?: { pattern, interval }
  }
  location: { venue, address, district, province, coordinates }
  organizer: { name, contactInfo }
  ticketing: {
    required: boolean
    price?, currency?, bookingUrl?, freeEntry?
  }
  capacity?: number
  targetAudience: string[]
  activities: string[]
}
```

#### 7. **ImageGalleryContent** - คลังรูปภาพ
```typescript
{
  type: 'image_gallery'
  category: 'hotel' | 'restaurant' | 'travel_service' | 'local_product' | 'event' | 'general' | 'attraction'
  imageUrl: string
  thumbnailUrl?: string
  altText: string
  caption?: string
  photographer?: string
  location?: { name, coordinates }
  dimensions?: { width, height }
  fileSize?: number
  mimeType?: string
  relatedContent?: { contentType, contentId }
}
```

#### 8. **SEOMetaContent** - SEO & Meta Tags
```typescript
{
  pageUrl: string              // unique
  pageTitle: string
  metaDescription: string
  metaKeywords: string[]
  ogTitle?, ogDescription?, ogImage?, ogType?
  twitterCard?, twitterTitle?, twitterDescription?, twitterImage?
  canonicalUrl?: string
  structuredData?: Record<string, any>
  isActive: boolean
}
```

### Base Content Interface
ทุก Content Type สืบทอดจาก `BaseContent`:
```typescript
interface BaseContent {
  _id?: string
  title: string
  description: string
  images: string[]
  isActive: boolean
  featured: boolean
  order: number
  tags: string[]
  createdAt?: Date
  updatedAt?: Date
  createdBy?: string    // User ObjectId
  updatedBy?: string    // User ObjectId
}
```

### Union Type
```typescript
type CMSContent =
  | NewsContent
  | HotelContent
  | RestaurantContent
  | TravelServiceContent
  | LocalProductContent
  | EventContent
  | ImageGalleryContent
```

---

## ⚙️ Web Settings System

### Interface: `WebSettings`
```typescript
{
  // Brand & Identity
  siteName: string
  siteDescription: string
  siteTagline?: string
  logo?: string
  favicon?: string

  // Colors & Theme
  colors: {
    primary: string      // default: '#10b981'
    secondary: string    // default: '#0d9488'
    accent?: string
    neutral?: string
  }

  // Hero Section
  hero: {
    enabled: boolean
    title: string
    description: string
    image?: string
    ctaText?: string
    ctaLink?: string
  }

  // Contact Information
  contact: {
    email?: string
    phone?: string
    address?: string
    socialMedia?: {
      facebook?, instagram?, twitter?, line?, youtube?
    }
  }

  // SEO & Meta
  seo: {
    metaTitle?: string
    metaDescription?: string
    keywords?: string[]
    ogImage?: string
  }

  // Features & Modules (เปิด/ปิด)
  features: {
    enableHotels: boolean
    enableRestaurants: boolean
    enableTravelServices: boolean
    enableLocalProducts: boolean
    enableEvents: boolean
    enableNews: boolean
  }

  // Footer
  footer: {
    copyrightText?: string
    links?: Array<{ label, url }>
  }
}
```

### Files
- **Model**: `server/models/CMS.ts:563-674`
- **Store**: `stores/webSettings.ts`
- **API**:
  - `GET /api/cms/settings` - ดึงการตั้งค่า (auto-create default)
  - `PUT /api/cms/settings` - อัปเดตการตั้งค่า
- **Page**: `pages/manage-cms/settings.vue`

---

## 🔒 Authentication & Authorization

### User Model
```typescript
{
  name: string
  email: string              // unique
  password: string           // bcrypt hashed (cost 12)
  role: 'admin' | 'manager' | 'user'
  roles: ObjectId[]          // Advanced RBAC
  avatar?: string
  isActive: boolean
  emailVerified: boolean
  lastLogin?: Date

  // Methods
  comparePassword(password: string): Promise<boolean>
  createPasswordResetToken(): string
}
```

### Role Model
```typescript
{
  name: string               // unique
  description: string
  permissions: string[]      // Permission IDs
  isActive: boolean
  createdBy?: ObjectId
}
```

### Permission Model
```typescript
{
  name: string               // unique (module.action.resource)
  description: string
  module: string             // dashboard, user-management, cms, etc.
  action: string             // create, read, update, delete, manage, approve, etc.
  resource: string           // users, roles, news, hotels, etc.
  isActive: boolean
}
```

### JWT Authentication
- **Library**: `jsonwebtoken` 9.0.2
- **Token Storage**: HTTP-only cookie
- **Expiration**: 7 days (configurable)
- **Secret**: `JWT_SECRET` in `.env`

### API Endpoints
```
POST /api/auth/login       # Login with email/password
POST /api/auth/register    # Register new user
GET  /api/auth/me          # Get current user
POST /api/auth/seed        # Seed admin user
```

---

## 🧩 Base Components Library

### Component Categories (19 components)

#### **Base Components (5)**
- `BaseIcon` - HeroIcons integration (outline, solid, mini)
- `BaseButton` - Loading states, variants, modifiers
- `BaseAlert` - Toast notifications, confirmations
- `BaseAvatar` - User avatars with fallback
- `BaseThemeToggle` - Light/dark theme switcher

#### **Form Components (7)**
- `BaseInput` - Text, email, number, password
- `BaseTextarea` - Multi-line text
- `BaseDatePicker` - Thai localization + Buddhist Era
- `BaseCheckbox` - Checkbox with indeterminate
- `BaseRadio` - Radio buttons (requires `name` prop)
- `BaseSelect` - Native HTML select (simple)
- `BaseAutocomplete` - API search, dual v-model

#### **Layout Components (4)**
- `BasePageHeader` - Page titles + breadcrumbs
- `BaseModal` - Dialogs with sizes
- `BaseLoading` - Loading overlays
- `BaseBreadcrumbs` - Auto-generation from path

#### **Data Components (3)**
- `BaseTable` - Simple tables
- `BaseDataTable` - Advanced: selection, nested rows, sorting
- `BasePagination` - Pagination controls

### Component Naming Convention
- **File**: `/components/base/Button.vue`
- **Usage**: `<BaseButton />` (auto-imported with Base prefix)
- **Props Interface**: `/composables/component_models/`

---

## 🌐 API Architecture

### Standard REST Pattern
```
GET    /api/cms/{type}       # List all
POST   /api/cms/{type}       # Create
GET    /api/cms/{type}/[id]  # Get one
PUT    /api/cms/{type}/[id]  # Update
DELETE /api/cms/{type}/[id]  # Delete
```

### Response Format
```typescript
{
  success: boolean
  code: string               // API_RESPONSE_CODES
  message: string
  data: any
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  timestamp: string
}
```

### HTTP Client: `useHttpClient.ts`
```typescript
// Authenticated requests
const { get, post, put, del, upload } = useHttpClient()

// Examples
await get('/cms/news', { page: 1, limit: 10 })
await post('/cms/news', newsData)
await put(`/cms/news/${id}`, newsData)
await del(`/cms/news/${id}`)
await upload('/cms/images/upload', files)
```

**Features**:
- Auto JWT token injection
- Query string conversion
- FormData auto-detection
- Error handling with 401 redirect
- TypeScript generics `<T>`

---

## 🏪 State Management (Pinia)

### Store Pattern
```typescript
export const useNewsStore = defineStore('news', {
  state: () => ({
    items: [] as NewsContent[],
    currentItem: null as NewsContent | null,
    isLoading: false,
    error: null as string | null,
    pagination: { page: 1, limit: 10, total: 0 }
  }),

  actions: {
    async fetchItems(params) { ... },
    async fetchById(id) { ... },
    async create(data) { ... },
    async update(id, data) { ... },
    async delete(id) { ... }
  },

  persist: {
    key: 'news-store',
    storage: localStorage,
    paths: ['items', 'pagination']
  }
})
```

### Available Stores
**CMS**: webSettings, news, hotels, restaurants, travelServices, localProducts, events, images, seo
**System**: auth, users, roles, permissions, pathMapping

---

## 🌍 i18n (Multi-language)

### Configuration
```typescript
// nuxt.config.ts
i18n: {
  locales: [
    { code: 'th', name: 'ไทย', file: 'th.json' },      // default
    { code: 'en', name: 'English', file: 'en.json' }
  ],
  defaultLocale: 'th',
  strategy: 'prefix_except_default'
}
```

### Files
- `locales/th.json` - Thai translations
- `locales/en.json` - English translations

### Usage
```vue
<template>
  {{ $t('common.save') }}
  {{ $t('cms.news.title') }}
</template>

<script setup>
const { t, locale } = useI18n()
const message = t('common.delete_confirm')
</script>
```

---

## 🎯 Development Guidelines

### 1. Interface Organization
```
composables/
├── component_models/    # Component Props (ButtonProps, InputProps)
├── data_models/         # API Data Models (NewsContent, HotelContent)
├── store_models/        # Pinia Store Interfaces
└── utility_models/      # Utility Types (HttpOptions, AuthUser)
```

### 2. Component Creation Rules
1. Create in `/components/base/` using DaisyUI
2. Define props in `/composables/component_models/`
3. Use TypeScript `<script setup lang="ts">`
4. Auto-import composables and interfaces
5. Document in `/pages/admin/components.vue`

### 3. Code Standards
- ✅ **DaisyUI First** - Always use DaisyUI, not custom CSS
- ✅ **TypeScript** - Strict typing, no `any` unless necessary
- ✅ **Auto-import** - Use Nuxt auto-import
- ✅ **Consistent Naming** - Follow existing patterns
- ❌ **No Comments** - Unless explicitly requested
- ❌ **No Emojis** - In code unless user requests

### 4. Page Meta Pattern
```vue
<script setup lang="ts">
definePageMeta({
  layout: 'default',        // NOT 'admin' (doesn't exist)
  middleware: 'auth'        // Require authentication
})
</script>
```

---

## 🚨 Common Issues & Solutions

### 1. Node Version
```bash
# Error: Nuxt 4 requires Node 22+
nvm install 22.17.0
nvm use 22.17.0
```

### 2. TailwindCSS Version
- ❌ **v4.x** - Incompatible with DaisyUI, @nuxtjs/tailwindcss
- ✅ **v3.4.17** - Stable, fully compatible
- **Issue**: Semantic colors don't work in @apply with v4

### 3. Pinia Persistence
```typescript
// plugins/pinia.client.ts
import { createPersistedState } from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.$pinia.use(createPersistedState({
    storage: localStorage
  }))
})
```
⚠️ `@pinia-plugin-persistedstate/nuxt` is deprecated

### 4. Layout Issues
- All pages use `layout: 'default'` (NOT `layout: 'admin'`)
- Only layouts: `default.vue`, `auth.vue`

### 5. SSR Window Issues
```typescript
// ❌ Bad
const width = window.innerWidth

// ✅ Good
const width = typeof window !== 'undefined' ? window.innerWidth : 0
```

### 6. BaseRadio Required Props
```vue
<!-- ✅ Good - with name prop -->
<BaseRadio v-model="selected" name="demo" value="option1" />

<!-- ❌ Bad - missing name prop -->
<BaseRadio v-model="selected" value="option1" />
```

---

## 📝 Recent Development History

### CMS System (Latest - October 2025)
- ✅ Added Web Settings system with API
- ✅ Created 8 content types with full CRUD
- ✅ Image upload with Vercel Blob
- ✅ Rich text editor for news
- ✅ SEO meta management
- ✅ Related content linking
- ✅ CMS Dashboard with stats

### User Management
- ✅ Complete RBAC system
- ✅ JWT authentication
- ✅ Password hashing (bcrypt)
- ✅ Role & permission management
- ✅ Thai localization

### Base Components
- ✅ 19 reusable components
- ✅ Thai date formatting + Buddhist Era
- ✅ Theme system (light/dark)
- ✅ Loading states & error handling
- ✅ Full DaisyUI integration

---

## 🔧 Environment Variables

```env
# MongoDB
MONGO_URI=mongodb+srv://...

# JWT
JWT_SECRET=<256-bit-secret>
JWT_EXPIRES_IN=7d

# API
NUXT_PUBLIC_API_BASE=http://localhost:3000/api

# Vercel Blob (Image Upload)
BLOB_READ_WRITE_TOKEN=...
```

---

## 📦 Key Dependencies

```json
{
  "dependencies": {
    "nuxt": "^4.1.0",
    "vue": "^3.5.20",
    "mongoose": "^8.18.0",
    "@nuxtjs/i18n": "^10.1.0",
    "@pinia/nuxt": "^0.11.2",
    "@tiptap/vue-3": "^3.6.2",
    "@vercel/blob": "^2.0.0",
    "bcryptjs": "^3.0.2",
    "jsonwebtoken": "^9.0.2",
    "tailwindcss": "^3.4.17"
  },
  "devDependencies": {
    "@nuxtjs/tailwindcss": "^6.12.4",
    "daisyui": "^5.1.12",
    "typescript": "^5.9.2"
  }
}
```

---

## 🎓 Commands

```bash
# Development
nvm use 22 && npm run dev            # Start dev server (port 3000)
PORT=3001 npm run dev                # Alternative port

# Build
npm run build                        # Production build
npm run preview                      # Preview build

# Clean
npm run clean                        # Clear cache
npm run fresh-install                # Full reinstall
```

---

## 📊 Project Status: Production Ready ✅

### Completed Features
- ✅ Full CMS with 8 content types
- ✅ User management with RBAC
- ✅ Authentication & authorization
- ✅ Image upload & management
- ✅ SEO & meta tags
- ✅ Multi-language (TH/EN)
- ✅ Rich text editor
- ✅ Theme system
- ✅ 19 base components
- ✅ MongoDB integration
- ✅ RESTful API
- ✅ Thai localization + Buddhist Era

### Architecture Highlights
- **Type-Safe**: Full TypeScript coverage
- **Scalable**: Modular architecture
- **Reusable**: Component library
- **SEO-Ready**: Meta tags + structured data
- **User-Friendly**: Thai language + Buddhist Era
- **Secure**: JWT + bcrypt + RBAC

---

## 📚 Key Files Reference

### Core Configuration
- `nuxt.config.ts` - Nuxt configuration
- `tailwind.config.js` - TailwindCSS + DaisyUI
- `tsconfig.json` - TypeScript config
- `.env` - Environment variables

### Main Data Models
- `composables/data_models/cms.ts` - All CMS types ⭐
- `server/models/CMS.ts` - MongoDB models ⭐

### Main Utilities
- `composables/utilities/useHttpClient.ts` - HTTP client ⭐
- `composables/utilities/useToast.ts` - Notifications
- `composables/utilities/useFormatDate.ts` - Thai dates

### Documentation
- `DEVELOPER.md` - Development guide
- `API_SETUP.md` - API documentation
- `I18N_ERROR_HANDLING.md` - i18n guide
- `CLAUDE_KNOWLEDGE.md` - This file ⭐

---

## 💡 Best Practices

### 1. Always Use DaisyUI
```vue
<!-- ✅ Good -->
<button class="btn btn-primary">Click</button>

<!-- ❌ Avoid -->
<button style="background: blue;">Click</button>
```

### 2. TypeScript Interfaces
```typescript
// ✅ Good - Centralized
import type { ButtonProps } from '~/composables/component_models/base'

// ❌ Avoid - Duplicate in component
interface ButtonProps { ... }
```

### 3. HTTP Requests
```typescript
// ✅ Good - useHttpClient
const { get } = useHttpClient()
await get('/api/users')

// ❌ Avoid - Raw $fetch without wrapper
await $fetch('/api/users')
```

### 4. Error Handling
```typescript
// ✅ Good
try {
  await api.create(data)
  useToast().success('สำเร็จ')
} catch (error) {
  useToast().error(error.message || 'เกิดข้อผิดพลาด')
}
```

---

## 🔍 Quick Reference

### Add New Content Type
1. Define interface in `composables/data_models/cms.ts`
2. Create schema in `server/models/CMS.ts`
3. Add to `CMSContent` union type
4. Create API endpoints in `server/api/cms/`
5. Create Pinia store in `stores/`
6. Create Form component in `components/cms/`
7. Create management page in `pages/manage-cms/`
8. Add to CMS dashboard menu

### Add New Base Component
1. Create in `components/base/`
2. Define props in `composables/component_models/`
3. Follow DaisyUI patterns
4. Add to showcase page
5. Document usage

### Add New API Endpoint
1. Create in `server/api/`
2. Use response handler
3. Add authentication if needed
4. Update store to use endpoint

---

## 🧠 Knowledge Base Management

### CRITICAL: Knowledge File Location
When user says **"บันทึกไว้เป็น knowledge"** or similar:
- ✅ **MUST use**: `/CLAUDE_KNOWLEDGE.md` (this file)
- ❌ **DO NOT create**: `KNOWLEDGE.md` or other files
- ✅ **Always append/edit** the existing file
- This file is Claude's persistent memory

### Documentation Standards
1. **User Preferences** - Document explicit requirements
2. **Technical Decisions** - Record why approaches were chosen/rejected
3. **Component Patterns** - Document reusable patterns
4. **Bug Fixes** - Record issues and solutions
5. **Development Rules** - Capture workflow standards

---

**Last Updated**: October 2025
**Project Version**: 1.0.0
**Status**: Production Ready ✅
