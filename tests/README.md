# E2E Testing Guide

## การติดตั้ง Playwright Browsers

ก่อนรัน test ครั้งแรก ต้องติดตั้ง browsers สำหรับ Playwright:

```bash
npx playwright install
```

## วิธีการรัน Tests

### 1. รัน test แบบ headless (ไม่เปิดหน้าจอ browser)
```bash
npm run test:e2e
```

### 2. รัน test แบบ headed (เปิดหน้าจอ browser ให้ดู)
```bash
npm run test:e2e:headed
```

### 3. รัน test ด้วย UI Mode (แนะนำสำหรับการ debug)
```bash
npm run test:e2e:ui
```

### 4. รัน test แบบ debug (step by step)
```bash
npm run test:e2e:debug
```

### 5. รัน test เฉพาะไฟล์
```bash
npx playwright test hotel.spec.ts
```

## การดู Test Report

หลังจากรัน test เสร็จ สามารถดู HTML report ได้ด้วย:

```bash
npx playwright show-report
```

## โครงสร้าง Tests

```
tests/
├── e2e/
│   └── hotel.spec.ts       # E2E tests สำหรับจัดการโรงแรม
├── screenshots/            # Screenshots ที่ถ่ายระหว่างการ test
└── README.md              # ไฟล์นี้
```

## Tests ที่มีอยู่

### Hotel Management Tests (`hotel.spec.ts`)

1. **should add a new hotel successfully**
   - ทดสอบการเพิ่มโรงแรมใหม่
   - กรอกข้อมูลครบทุก field
   - ตรวจสอบว่าบันทึกสำเร็จ

2. **should validate required fields**
   - ทดสอบการ validate ฟิลด์ที่จำเป็น
   - ลองกด submit โดยไม่กรอกข้อมูล
   - ตรวจสอบว่ามี error messages

3. **should have all 77 provinces in dropdown**
   - ทดสอบว่า dropdown จังหวัดมีครบ 77 จังหวัด
   - ตรวจสอบว่ามีจังหวัดที่สำคัญๆ อยู่

## หมายเหตุสำคัญ

1. **ข้อมูล Login**: ต้องแก้ไข email และ password ใน test file ให้ตรงกับระบบของคุณ
   ```typescript
   await page.fill('input[type="email"]', 'your-email@example.com')
   await page.fill('input[type="password"]', 'your-password')
   ```

2. **Selectors**: หาก HTML structure เปลี่ยน อาจต้องปรับ selectors ในไฟล์ test

3. **Screenshots**: Screenshots จะถูกบันทึกใน `tests/screenshots/` เพื่อให้เห็นภาพขณะทำ test

4. **Development Server**: Playwright จะ start dev server อัตโนมัติเมื่อรัน test

## การแก้ไข Tests

หากต้องการแก้ไข test สามารถแก้ไขไฟล์:
- `tests/e2e/hotel.spec.ts`

หากต้องการเปลี่ยน configuration:
- `playwright.config.ts`

## Troubleshooting

### Test ไม่ผ่านเพราะหา element ไม่เจอ
- ลอง run ด้วย `npm run test:e2e:headed` เพื่อดูว่าเกิดอะไรขึ้น
- ตรวจสอบ selectors ว่าถูกต้อง

### Test ล่าช้าหรือ timeout
- เพิ่ม timeout ในไฟล์ `playwright.config.ts`
- ใช้ `await page.waitForLoadState('networkidle')` เพื่อรอให้หน้าโหลดเสร็จ

### ต้องการถ่าย screenshot เพิ่มเติม
```typescript
await page.screenshot({ path: 'tests/screenshots/my-screenshot.png', fullPage: true })
```
