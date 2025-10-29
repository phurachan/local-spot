import { test, expect } from '@playwright/test'

test.describe('Hotel Management', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to login page
    await page.goto('/login')

    // Login (adjust selectors based on your login form)
    await page.fill('input[type="email"]', 'admin@local.com')
    await page.fill('input[type="password"]', 'admin123')
    await page.click('button[type="submit"]')

    // Wait for navigation to complete (redirects to /manage-cms after login)
    await page.waitForURL('**/manage-cms**', { timeout: 10000 })
  })

  test('should add a new hotel successfully', async ({ page }) => {
    // Navigate to hotels management page
    await page.goto('/manage-cms/hotels')
    await page.waitForLoadState('networkidle')

    // Click "เพิ่มโรงแรม" button
    await page.click('button:has-text("เพิ่มโรงแรม")')

    // Wait for modal/form to appear - wait for the hotel name input instead
    await page.waitForSelector('input[placeholder="ชื่อโรงแรม"]', { timeout: 5000 })

    // Fill Basic Information
    await page.fill('input[placeholder="ชื่อโรงแรม"]', 'โรงแรมทดสอบ E2E')

    // Select category (โรงแรม = hotel) - find all selects and use the right one
    const allSelects = page.locator('select')
    await allSelects.nth(0).selectOption('hotel')

    // Fill description
    await page.fill('textarea[placeholder="คำอธิบายโรงแรม"]', 'นี่คือโรงแรมทดสอบสำหรับ E2E testing')

    // Fill Location Information
    await page.fill('input[placeholder="ที่อยู่โรงแรม"]', '123 ถนนทดสอบ')
    await page.fill('input[placeholder="อำเภอ/เขต"]', 'เมือง')

    // Select province (เชียงใหม่) - second select element
    await allSelects.nth(1).selectOption('เชียงใหม่')

    // Fill coordinates
    await page.fill('input[placeholder*="18.8845"]', '18.7883')
    await page.fill('input[placeholder*="98.9934"]', '98.9853')

    // Take screenshot before submit
    await page.screenshot({ path: 'tests/screenshots/hotel-form-filled.png', fullPage: true })

    // Submit form
    await page.click('button[type="submit"]:has-text("สร้างโรงแรม")')

    // Wait for modal to close or navigation
    await page.waitForTimeout(3000)

    // Go back to hotels list
    await page.goto('/manage-cms/hotels')
    await page.waitForLoadState('networkidle')

    // Wait a bit more for data to load
    await page.waitForTimeout(2000)

    // Try to search for the hotel using the search box
    const searchInput = page.locator('input[placeholder*="ค้นหา"], input[placeholder*="ชื่อโรงแรม"]')
    if (await searchInput.count() > 0) {
      await searchInput.first().fill('โรงแรมทดสอบ E2E')
      await page.waitForTimeout(1000)
    }

    // Take screenshot to see the table
    await page.screenshot({ path: 'tests/screenshots/hotel-list-after-create.png', fullPage: true })

    // Search for the newly created hotel - more flexible search
    const hotelLocator = page.getByText('โรงแรมทดสอบ E2E')
    const hotelCount = await hotelLocator.count()

    // Take screenshot of final state
    await page.screenshot({ path: 'tests/screenshots/hotel-added-success.png', fullPage: true })

    // Assert that hotel exists
    expect(hotelCount).toBeGreaterThan(0)
  })

  test('should validate required fields', async ({ page }) => {
    // Navigate to hotels management page
    await page.goto('/manage-cms/hotels')
    await page.waitForLoadState('networkidle')

    // Click "เพิ่มโรงแรม" button
    await page.click('button:has-text("เพิ่มโรงแรม")')

    // Wait for form to appear
    await page.waitForSelector('input[placeholder="ชื่อโรงแรม"]', { timeout: 5000 })

    // Try to submit empty form
    await page.click('button[type="submit"]:has-text("สร้างโรงแรม")')

    // Wait for validation errors
    await page.waitForTimeout(1000)

    // Check for error messages (adjust based on your error display)
    const hasErrors = await page.locator('text=/กรุณา/').count()
    expect(hasErrors).toBeGreaterThan(0)

    // Take screenshot of validation errors
    await page.screenshot({ path: 'tests/screenshots/hotel-validation-errors.png', fullPage: true })
  })

  test('should have all 77 provinces in dropdown', async ({ page }) => {
    // Navigate to hotels management page
    await page.goto('/manage-cms/hotels')
    await page.waitForLoadState('networkidle')

    // Click "เพิ่มโรงแรม" button
    await page.click('button:has-text("เพิ่มโรงแรม")')

    // Wait for form to appear
    await page.waitForSelector('input[placeholder="ชื่อโรงแรม"]', { timeout: 5000 })

    // Get province select options - use nth(1) to get the second select (province)
    const allSelects = page.locator('select')
    const provinceSelect = allSelects.nth(1)
    const options = await provinceSelect.locator('option').count()

    // Should have 78 options (1 placeholder + 77 provinces)
    expect(options).toBe(78)

    // Verify some specific provinces exist
    const provinces = ['กรุงเทพมหานคร', 'เชียงใหม่', 'ภูเก็ต', 'ขอนแก่น', 'สงขลา', 'นครราชสีมา', 'อุบลราชธานี']

    for (const province of provinces) {
      const hasProvince = await provinceSelect.locator(`option:has-text("${province}")`).count()
      expect(hasProvince).toBe(1)
    }

    // Take screenshot
    await page.screenshot({ path: 'tests/screenshots/hotel-provinces-dropdown.png', fullPage: true })
  })
})
