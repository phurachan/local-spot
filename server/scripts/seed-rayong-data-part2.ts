// Events, Travel Services, Local Products, and News Data - Rayong/Ban Chang

// Events Data
export const eventsData = [
  {
    title: 'เทศกาลปูทะเลบ้านฉาง',
    description: 'เทศกาลงานปูประจำปี จัดขึ้นโดยองค์การบริหารส่วนตำบลบ้านฉาง มีการแสดงวัฒนธรรม การแข่งขันทำอาหารจากปู และตลาดนัดอาหารทะเล',
    category: 'festival',
    schedule: {
      startDate: new Date('2025-11-15'),
      endDate: new Date('2025-11-17'),
      times: [
        { start: '09:00', end: '22:00' }
      ]
    },
    location: {
      venue: 'สนามกีฬาเทศบาลบ้านฉาง',
      address: 'ถนนสุขุมวิท ต.บ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7167, lng: 101.0501 }
    },
    organizer: {
      name: 'เทศบาลตำบลบ้านฉาง',
      contactInfo: {
        phone: ['038-123-456'],
        email: 'info@banchangcity.go.th'
      }
    },
    ticketing: {
      required: false,
      freeEntry: true
    },
    targetAudience: ['ครอบครัว', 'นักท่องเที่ยว', 'ผู้รักอาหารทะเล'],
    activities: ['ชิมอาหารทะเล', 'ชมการแสดง', 'ซื้อของฝาก', 'ถ่ายรูป'],
    images: [],
    tags: ['เทศกาล', 'ปู', 'อาหารทะเล', 'ฟรี'],
    isActive: true,
    featured: true,
    order: 1
  },
  {
    title: 'ตลาดนัดวัดบ้านฉาง',
    description: 'ตลาดนัดวัดจัดทุกวันอาทิตย์ มีสินค้าท้องถิ่น ของหัตถกรรม อาหาร และของใช้ในครัวเรือน',
    category: 'market',
    schedule: {
      startDate: new Date('2025-11-03'),
      endDate: new Date('2026-12-31'),
      times: [
        { start: '06:00', end: '12:00' }
      ],
      recurring: {
        pattern: 'weekly',
        interval: 1
      }
    },
    location: {
      venue: 'วัดบ้านฉาง',
      address: 'ถนนบ้านฉาง-บางละมุง ต.บ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7189, lng: 101.0512 }
    },
    organizer: {
      name: 'ชุมชนวัดบ้านฉาง',
      contactInfo: {
        phone: ['089-123-4567']
      }
    },
    ticketing: {
      required: false,
      freeEntry: true
    },
    targetAudience: ['ท้องถิ่น', 'นักท่องเที่ยว'],
    activities: ['ช้อปปิ้ง', 'ชิมอาหาร', 'ซื้อของฝาก'],
    images: [],
    tags: ['ตลาดนัด', 'ของท้องถิ่น', 'ทุกอาทิตย์', 'ราคาถูก'],
    isActive: true,
    featured: true,
    order: 2
  },
  {
    title: 'งานประเพณีลอยกระทง',
    description: 'งานประเพณีลอยกระทงริมทะเลบ้านฉาง มีการประกวดกระทง การแสดงพื้นบ้าน และดนตรีสด',
    category: 'cultural',
    schedule: {
      startDate: new Date('2025-11-14'),
      endDate: new Date('2025-11-14'),
      times: [
        { start: '17:00', end: '23:00' }
      ]
    },
    location: {
      venue: 'หาดบ้านฉาง',
      address: 'ชายหาดบ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7245, lng: 101.0623 }
    },
    organizer: {
      name: 'สำนักงานวัฒนธรรมจังหวัดระยอง',
      contactInfo: {
        phone: ['038-234-567'],
        email: 'culture@rayong.go.th'
      }
    },
    ticketing: {
      required: false,
      freeEntry: true
    },
    capacity: 5000,
    targetAudience: ['ครอบครัว', 'นักท่องเที่ยว', 'ชาวพุทธ'],
    activities: ['ลอยกระทง', 'ประกวดกระทง', 'ชมการแสดง', 'ฟังดนตรี'],
    images: [],
    tags: ['ลอยกระทง', 'ประเพณี', 'วัฒนธรรม', 'ริมทะเล'],
    isActive: true,
    featured: true,
    order: 3
  },
  {
    title: 'การแข่งขันวิ่งมินิมาราธอนบ้านฉาง',
    description: 'การแข่งขันวิ่งมินิมาราธอนริมทะเล ระยะทาง 5 กม. และ 10 กม. เหมาะสำหรับนักวิ่งมือใหม่',
    category: 'sports',
    schedule: {
      startDate: new Date('2025-12-07'),
      endDate: new Date('2025-12-07'),
      times: [
        { start: '05:00', end: '09:00' }
      ]
    },
    location: {
      venue: 'หาดบ้านฉาง',
      address: 'ชายหาดบ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7245, lng: 101.0623 }
    },
    organizer: {
      name: 'ชมรมนักวิ่งระยอง',
      contactInfo: {
        phone: ['089-456-7890'],
        email: 'rayongrunner@gmail.com',
        website: 'https://rayongrunner.com'
      }
    },
    ticketing: {
      required: true,
      price: 300,
      currency: 'THB',
      bookingUrl: 'https://rayongrunner.com/register',
      freeEntry: false
    },
    capacity: 500,
    targetAudience: ['นักวิ่ง', 'ผู้รักสุขภาพ'],
    activities: ['วิ่ง', 'ออกกำลังกาย', 'รับเหรียญ'],
    images: [],
    tags: ['วิ่ง', 'มาราธอน', 'กีฬา', 'ริมทะเล'],
    isActive: true,
    featured: false,
    order: 4
  },
  {
    title: 'เวิร์คช็อปทำกระทงจากธรรมชาติ',
    description: 'เรียนรู้การทำกระทงจากใบตอง ดอกไม้ และวัสดุธรรมชาติ โดยช่างฝีมือท้องถิ่น',
    category: 'workshop',
    schedule: {
      startDate: new Date('2025-11-10'),
      endDate: new Date('2025-11-13'),
      times: [
        { start: '14:00', end: '17:00' }
      ]
    },
    location: {
      venue: 'ศูนย์วัฒนธรรมบ้านฉาง',
      address: '123 ถนนวัฒนธรรม ต.บ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7178, lng: 101.0512 }
    },
    organizer: {
      name: 'ศูนย์วัฒนธรรมบ้านฉาง',
      contactInfo: {
        phone: ['038-345-678'],
        lineOA: '@culturebanchang'
      }
    },
    ticketing: {
      required: true,
      price: 150,
      currency: 'THB',
      freeEntry: false
    },
    capacity: 30,
    targetAudience: ['ครอบครัว', 'เด็ก', 'ผู้สนใจศิลปะ'],
    activities: ['ทำกระทง', 'เรียนรู้วัฒนธรรม', 'แชร์ผลงาน'],
    images: [],
    tags: ['เวิร์คช็อป', 'ทำกระทง', 'ศิลปะ', 'วัฒนธรรม'],
    isActive: true,
    featured: false,
    order: 5
  },
  {
    title: 'เทศกาลอาหารทะเลระยอง',
    description: 'เทศกาลอาหารทะเลประจำปี รวมร้านอาหารทะเลชื่อดังมากกว่า 50 ร้าน โปรโมชั่นพิเศษและการแสดง',
    category: 'festival',
    schedule: {
      startDate: new Date('2026-01-10'),
      endDate: new Date('2026-01-12'),
      times: [
        { start: '10:00', end: '22:00' }
      ]
    },
    location: {
      venue: 'ท่าเรือบ้านฉาง',
      address: 'ท่าเรือ ต.บ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7312, lng: 101.0701 }
    },
    organizer: {
      name: 'การท่องเที่ยวจังหวัดระยอง',
      contactInfo: {
        phone: ['038-567-890'],
        email: 'tourism@rayong.go.th',
        website: 'https://rayongtourism.com'
      }
    },
    ticketing: {
      required: false,
      freeEntry: true
    },
    capacity: 10000,
    targetAudience: ['ครอบครัว', 'นักท่องเที่ยว', 'ผู้รักอาหารทะเล'],
    activities: ['ชิมอาหาร', 'ซื้อของฝาก', 'ชมการแสดง', 'ประกวดทำอาหาร'],
    images: [],
    tags: ['อาหารทะเล', 'เทศกาล', 'ระยอง', 'ฟรี'],
    isActive: true,
    featured: true,
    order: 6
  },
  {
    title: 'กิจกรรมปลูกป่าชายเลน',
    description: 'ร่วมกันปลูกป่าชายเลนเพื่ออนุรักษ์ธรรมชาติ และเรียนรู้ระบบนิเวศชายฝั่ง',
    category: 'seasonal',
    schedule: {
      startDate: new Date('2025-12-05'),
      endDate: new Date('2025-12-05'),
      times: [
        { start: '08:00', end: '12:00' }
      ]
    },
    location: {
      venue: 'ป่าชายเลนบ้านฉาง',
      address: 'บ้านปากน้ำ ต.บ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7289, lng: 101.0656 }
    },
    organizer: {
      name: 'กลุ่มอนุรักษ์ทรัพยากรธรรมชาติบ้านฉาง',
      contactInfo: {
        phone: ['092-678-9012'],
        lineOA: '@conservebanchang'
      }
    },
    ticketing: {
      required: false,
      freeEntry: true
    },
    capacity: 100,
    targetAudience: ['ครอบครัว', 'นักเรียน', 'ผู้รักษ์สิ่งแวดล้อม'],
    activities: ['ปลูกต้นไม้', 'เรียนรู้ธรรมชาติ', 'ทำความสะอาดชายหาด'],
    images: [],
    tags: ['ปลูกป่า', 'อนุรักษ์', 'ธรรมชาติ', 'CSR'],
    isActive: true,
    featured: false,
    order: 7
  },
  {
    title: 'คอนเสิร์ตริมทะเลบ้านฉาง',
    description: 'คอนเสิร์ตดนตรีริมทะเล ศิลปินดังมากมาย บรรยากาศสุดโรแมนติก',
    category: 'cultural',
    schedule: {
      startDate: new Date('2025-12-31'),
      endDate: new Date('2025-12-31'),
      times: [
        { start: '18:00', end: '24:00' }
      ]
    },
    location: {
      venue: 'หาดบ้านฉาง',
      address: 'ชายหาดบ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7245, lng: 101.0623 }
    },
    organizer: {
      name: 'บริษัท บ้านฉางอีเว้นท์ จำกัด',
      contactInfo: {
        phone: ['089-789-0123'],
        email: 'info@banchangevent.com',
        website: 'https://banchangevent.com'
      }
    },
    ticketing: {
      required: true,
      price: 500,
      currency: 'THB',
      bookingUrl: 'https://banchangevent.com/tickets',
      freeEntry: false
    },
    capacity: 3000,
    targetAudience: ['หนุ่มสาว', 'คู่รัก', 'กลุ่มเพื่อน'],
    activities: ['ฟังเพลง', 'ถ่ายรูป', 'ชมพลุ'],
    images: [],
    tags: ['คอนเสิร์ต', 'ดนตรี', 'ปีใหม่', 'ริมทะเล'],
    isActive: true,
    featured: true,
    order: 8
  },
  {
    title: 'เวิร์คช็อปถ่ายภาพทะเลและธรรมชาติ',
    description: 'เรียนรู้เทคนิคการถ่ายภาพทะเล ธรรมชาติ และ Seascape โดยช่างภาพมืออาชีพ',
    category: 'workshop',
    schedule: {
      startDate: new Date('2025-11-20'),
      endDate: new Date('2025-11-21'),
      times: [
        { start: '05:00', end: '09:00' },
        { start: '16:00', end: '19:00' }
      ]
    },
    location: {
      venue: 'หาดบ้านฉาง',
      address: 'ชายหาดบ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7245, lng: 101.0623 }
    },
    organizer: {
      name: 'ชมรมช่างภาพระยอง',
      contactInfo: {
        phone: ['094-890-1234'],
        email: 'photo@rayong.com',
        lineOA: '@photorayong'
      }
    },
    ticketing: {
      required: true,
      price: 1500,
      currency: 'THB',
      freeEntry: false
    },
    capacity: 20,
    targetAudience: ['ช่างภาพมือใหม่', 'ผู้สนใจถ่ายภาพ'],
    activities: ['ถ่ายภาพ', 'เรียนรู้เทคนิค', 'วิจารณ์ภาพ'],
    images: [],
    tags: ['ถ่ายภาพ', 'เวิร์คช็อป', 'ทะเล', 'ธรรมชาติ'],
    isActive: true,
    featured: false,
    order: 9
  },
  {
    title: 'งานวันท้องถิ่นบ้านฉาง',
    description: 'งานประจำปีเฉลิมฉลองวัฒนธรรมและประเพณีท้องถิ่นบ้านฉาง มีการแสดงพื้นบ้าน ตลาดนัด และกิจกรรมสนุกๆ',
    category: 'cultural',
    schedule: {
      startDate: new Date('2026-02-14'),
      endDate: new Date('2026-02-16'),
      times: [
        { start: '09:00', end: '21:00' }
      ]
    },
    location: {
      venue: 'สนามกีฬาเทศบาลบ้านฉาง',
      address: 'ถนนสุขุมวิท ต.บ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7167, lng: 101.0501 }
    },
    organizer: {
      name: 'เทศบาลตำบลบ้านฉาง',
      contactInfo: {
        phone: ['038-123-456'],
        email: 'info@banchangcity.go.th'
      }
    },
    ticketing: {
      required: false,
      freeEntry: true
    },
    capacity: 5000,
    targetAudience: ['ชาวบ้าน', 'นักท่องเที่ยว', 'ครอบครัว'],
    activities: ['ชมการแสดง', 'ช้อปปิ้ง', 'ชิมอาหาร', 'เล่นเกม'],
    images: [],
    tags: ['วัฒนธรรม', 'ท้องถิ่น', 'ประเพณี', 'งานบุญ'],
    isActive: true,
    featured: true,
    order: 10
  }
]

// Travel Services Data
export const travelServicesData = [
  {
    title: 'บริการรถตู้รับส่งสนามบิน',
    description: 'บริการรถตู้รับส่งจากบ้านฉางไปสนามบินสุวรรณภูมิและอู่ตะเภา พร้อมคนขับมืออาชีพ รถใหม่สะอาด',
    category: 'transport',
    serviceType: 'รถรับส่งสนามบิน',
    location: {
      serviceArea: ['บ้านฉาง', 'ระยอง', 'สนามบินสุวรรณภูมิ', 'สนามบินอู่ตะเภา'],
      meetingPoint: 'รับถึงที่พัก',
      coordinates: { lat: 12.7198, lng: 101.0545 }
    },
    contactInfo: {
      phone: ['089-123-4567', '038-234-567'],
      lineOA: '@airporttransferbanchang'
    },
    pricing: {
      type: 'per_group',
      amount: 1800,
      currency: 'THB',
      includes: ['รับส่งถึงที่พัก', 'คนขับมืออาชีพ', 'ประกันภัย'],
      excludes: ['ทางด่วน', 'ทิป']
    },
    duration: {
      min: 2,
      max: 3,
      unit: 'hours'
    },
    capacity: {
      min: 1,
      max: 9
    },
    requirements: ['จองล่วงหน้า 24 ชั่วโมง'],
    availability: ['ทุกวัน', '24 ชั่วโมง'],
    images: [],
    tags: ['รถตู้', 'สนามบิน', 'รับส่ง', 'ตลอด 24 ชม.'],
    isActive: true,
    featured: true,
    order: 1
  },
  {
    title: 'ทัวร์เกาะเสม็ด 1 วัน',
    description: 'ทัวร์เกาะเสม็ดแบบหรู ชมหาดสวย ดำน้ำชมปะการัง รวมอาหารกลางวันบนเกาะ รถรับส่งจากโรงแรม',
    category: 'tour',
    serviceType: 'ทัวร์เกาะ',
    location: {
      serviceArea: ['บ้านฉาง', 'เกาะเสม็ด'],
      meetingPoint: 'ท่าเรือบ้านฉาง',
      coordinates: { lat: 12.7312, lng: 101.0701 }
    },
    contactInfo: {
      phone: ['038-345-678', '092-456-7890'],
      email: 'info@samedtour.com',
      website: 'https://samedtour.com'
    },
    pricing: {
      type: 'per_person',
      amount: 1200,
      currency: 'THB',
      includes: ['เรือไป-กลับ', 'อาหารกลางวัน', 'อุปกรณ์ดำน้ำ', 'ประกันภัย', 'ไกด์'],
      excludes: ['รถรับส่ง (เพิ่ม 200 บาท)', 'เครื่องดื่ม']
    },
    duration: {
      min: 8,
      max: 9,
      unit: 'hours'
    },
    capacity: {
      min: 2,
      max: 30
    },
    requirements: ['จองล่วงหน้า 1 วัน', 'เด็กต่ำกว่า 3 ปีฟรี'],
    availability: ['ทุกวัน', 'ออกเดินทาง 08:00 น.'],
    images: [],
    tags: ['เกาะเสม็ด', 'ทัวร์', 'ดำน้ำ', 'ทะเล'],
    isActive: true,
    featured: true,
    order: 2
  },
  {
    title: 'เช่ารถจักรยาน',
    description: 'บริการเช่ารถจักรยานปั่นเที่ยวบ้านฉาง รถใหม่สภาพดี มีหลายแบบให้เลือก พร้อมแผนที่เส้นทางแนะนำ',
    category: 'rental',
    serviceType: 'เช่ารถจักรยาน',
    location: {
      serviceArea: ['บ้านฉาง'],
      meetingPoint: 'ร้านเช่าจักรยานบ้านฉาง ถนนสุขุมวิท',
      coordinates: { lat: 12.7178, lng: 101.0523 }
    },
    contactInfo: {
      phone: ['086-567-8901'],
      lineOA: '@bikebanchang'
    },
    pricing: {
      type: 'per_day',
      amount: 150,
      currency: 'THB',
      includes: ['จักรยาน', 'หมวกกันน็อค', 'แผนที่'],
      excludes: []
    },
    duration: {
      min: 1,
      max: 7,
      unit: 'days'
    },
    capacity: {
      min: 1,
      max: 10
    },
    requirements: ['วางมัดจำ 500 บาท', 'สำเนาบัตรประชาชน'],
    availability: ['ทุกวัน', '08:00-18:00'],
    images: [],
    tags: ['จักรยาน', 'ปั่นจักรยาน', 'เช่า', 'ท่องเที่ยว'],
    isActive: true,
    featured: false,
    order: 3
  },
  {
    title: 'ไกด์พาเที่ยวบ้านฉาง',
    description: 'บริการไกด์ท้องถิ่นพาเที่ยวบ้านฉาง พาชมวิถีชีวิต วัฒนธรรม และแหล่งท่องเที่ยวที่นักท่องเที่ยวไม่รู้จัก',
    category: 'guide',
    serviceType: 'ไกด์ท้องถิ่น',
    location: {
      serviceArea: ['บ้านฉาง', 'ระยอง'],
      meetingPoint: 'ตามที่นัดหมาย',
      coordinates: { lat: 12.7198, lng: 101.0545 }
    },
    contactInfo: {
      phone: ['094-678-9012'],
      email: 'localguidebanchang@gmail.com'
    },
    pricing: {
      type: 'per_day',
      amount: 1500,
      currency: 'THB',
      includes: ['ไกด์ท้องถิ่น', 'แผนที่เส้นทาง', 'คำแนะนำ'],
      excludes: ['ค่ารถ', 'ค่าอาหาร', 'ค่าเข้าสถานที่']
    },
    duration: {
      min: 4,
      max: 8,
      unit: 'hours'
    },
    capacity: {
      min: 1,
      max: 10
    },
    requirements: ['จองล่วงหน้า 3 วัน', 'ระบุความสนใจ'],
    availability: ['ทุกวัน (ตามนัดหมาย)'],
    images: [],
    tags: ['ไกด์', 'ทัวร์ท้องถิ่น', 'วัฒนธรรม'],
    isActive: true,
    featured: false,
    order: 4
  },
  {
    title: 'ดำน้ำดูปะการัง',
    description: 'บริการดำน้ำดูปะการังใกล้ชายฝั่งบ้านฉาง เหมาะสำหรับมือใหม่ มีครูฝึกสอน อุปกรณ์ครบ',
    category: 'activity',
    serviceType: 'ดำน้ำ Snorkeling',
    location: {
      serviceArea: ['บริเวณชายฝั่งบ้านฉาง'],
      meetingPoint: 'ท่าเรือบ้านฉาง',
      coordinates: { lat: 12.7312, lng: 101.0701 }
    },
    contactInfo: {
      phone: ['089-789-0123', '038-456-789'],
      email: 'diving@banchang.com'
    },
    pricing: {
      type: 'per_person',
      amount: 800,
      currency: 'THB',
      includes: ['เรือ', 'อุปกรณ์ดำน้ำ', 'ครูฝึกสอน', 'ประกันภัย', 'น้ำดื่ม'],
      excludes: ['กล้องถ่ายรูปใต้น้ำ (เช่า +300)']
    },
    duration: {
      min: 3,
      max: 4,
      unit: 'hours'
    },
    capacity: {
      min: 2,
      max: 15
    },
    requirements: ['อายุ 10 ปีขึ้นไป', 'สุขภาพแข็งแรง', 'ว่ายน้ำเป็น'],
    availability: ['ทุกวัน', 'รอบเช้า 08:00', 'รอบบ่าย 13:00'],
    images: [],
    tags: ['ดำน้ำ', 'ปะการัง', 'กิจกรรมทะเล'],
    isActive: true,
    featured: true,
    order: 5
  },
  {
    title: 'เช่ารถมอเตอร์ไซค์',
    description: 'บริการเช่ารถมอเตอร์ไซค์สำหรับท่องเที่ยวบ้านฉางและบริเวณใกล้เคียง รถใหม่ ประกันชั้น 1',
    category: 'rental',
    serviceType: 'เช่ารถมอเตอร์ไซค์',
    location: {
      serviceArea: ['บ้านฉาง', 'ระยอง'],
      meetingPoint: 'ร้านเช่ารถบ้านฉาง ใกล้ตลาด',
      coordinates: { lat: 12.7167, lng: 101.0501 }
    },
    contactInfo: {
      phone: ['092-890-1234'],
      lineOA: '@motorentbanchang'
    },
    pricing: {
      type: 'per_day',
      amount: 250,
      currency: 'THB',
      includes: ['รถมอเตอร์ไซค์', 'หมวกกันน็อค 2 ใบ', 'ประกันชั้น 1'],
      excludes: ['น้ำมัน']
    },
    duration: {
      min: 1,
      max: 30,
      unit: 'days'
    },
    capacity: {
      min: 1,
      max: 5
    },
    requirements: ['ใบขับขี่', 'วางมัดจำ 3000 บาท', 'สำเนาบัตรประชาชน'],
    availability: ['ทุกวัน', '08:00-20:00'],
    images: [],
    tags: ['เช่ารถ', 'มอเตอร์ไซค์', 'ท่องเที่ยว'],
    isActive: true,
    featured: true,
    order: 6
  },
  {
    title: 'ทัวร์ตกปลาทะเล',
    description: 'ออกเรือตกปลาทะเลชายฝั่งบ้านฉาง เหมาะสำหรับครอบครัว พร้อมอุปกรณ์ครบ ไกด์สอนเทคนิค',
    category: 'activity',
    serviceType: 'ตกปลา',
    location: {
      serviceArea: ['ทะเลบ้านฉาง'],
      meetingPoint: 'ท่าเรือบ้านฉาง',
      coordinates: { lat: 12.7312, lng: 101.0701 }
    },
    contactInfo: {
      phone: ['095-901-2345'],
      email: 'fishing@banchang.com'
    },
    pricing: {
      type: 'per_group',
      amount: 3500,
      currency: 'THB',
      includes: ['เรือ', 'อุปกรณ์ตกปลา', 'เหยื่อ', 'ไกด์', 'น้ำดื่ม-ขนม'],
      excludes: ['อาหาร']
    },
    duration: {
      min: 4,
      max: 6,
      unit: 'hours'
    },
    capacity: {
      min: 2,
      max: 6
    },
    requirements: ['จองล่วงหน้า 2 วัน'],
    availability: ['ทุกวัน', 'ออกเดินทาง 06:00 หรือ 14:00'],
    images: [],
    tags: ['ตกปลา', 'ทะเล', 'กิจกรรม', 'ครอบครัว'],
    isActive: true,
    featured: false,
    order: 7
  },
  {
    title: 'ทัวร์ชมพระอาทิตย์ตกทะเลบ้านฉาง',
    description: 'ทัวร์ชมพระอาทิตย์ตกทะเลแบบเรือส่วนตัว พร้อมเครื่องดื่มและอาหารว่าง บรรยากาศโรแมนติก',
    category: 'tour',
    serviceType: 'ทัวร์ชมพระอาทิตย์ตก',
    location: {
      serviceArea: ['ทะเลบ้านฉาง'],
      meetingPoint: 'ท่าเรือบ้านฉาง',
      coordinates: { lat: 12.7312, lng: 101.0701 }
    },
    contactInfo: {
      phone: ['098-012-3456'],
      lineOA: '@sunsettour'
    },
    pricing: {
      type: 'per_group',
      amount: 2500,
      currency: 'THB',
      includes: ['เรือส่วนตัว', 'เครื่องดื่ม', 'อาหารว่าง', 'ถ่ายรูป'],
      excludes: []
    },
    duration: {
      min: 2,
      max: 3,
      unit: 'hours'
    },
    capacity: {
      min: 2,
      max: 10
    },
    requirements: ['จองล่วงหน้า 1 วัน'],
    availability: ['ทุกวัน', 'ออกเดินทาง 16:30 น.'],
    images: [],
    tags: ['sunset', 'โรแมนติก', 'ทะเล', 'ชมวิว'],
    isActive: true,
    featured: true,
    order: 8
  },
  {
    title: 'เช่าเรือสปีดโบ๊ท',
    description: 'บริการเช่าเรือสปีดโบ๊ทพร้อมคนขับ สำหรับท่องเที่ยวเกาะเสม็ดหรือล่องเล็งชายฝั่ง',
    category: 'rental',
    serviceType: 'เช่าเรือ',
    location: {
      serviceArea: ['บ้านฉาง', 'เกาะเสม็ด', 'เกาะใกล้เคียง'],
      meetingPoint: 'ท่าเรือบ้านฉาง',
      coordinates: { lat: 12.7312, lng: 101.0701 }
    },
    contactInfo: {
      phone: ['091-123-4567', '038-678-901'],
      email: 'speedboat@banchang.com'
    },
    pricing: {
      type: 'per_day',
      amount: 15000,
      currency: 'THB',
      includes: ['เรือสปีดโบ๊ท', 'คนขับ', 'น้ำมัน', 'ประกันภัย'],
      excludes: ['ค่าเข้าเกาะ', 'อาหาร']
    },
    duration: {
      min: 4,
      max: 8,
      unit: 'hours'
    },
    capacity: {
      min: 1,
      max: 15
    },
    requirements: ['จองล่วงหน้า 3 วัน', 'มัดจำ 50%'],
    availability: ['ทุกวัน (ขึ้นอยู่กับสภาพอากาศ)'],
    images: [],
    tags: ['เรือ', 'สปีดโบ๊ท', 'เช่า', 'เกาะเสม็ด'],
    isActive: true,
    featured: false,
    order: 9
  },
  {
    title: 'ทัวร์ชุมชนบ้านฉาง',
    description: 'ทัวร์เรียนรู้วิถีชีวิตชุมชนบ้านฉาง ชมกระบวนการทำน้ำปลา เยี่ยมชมตลาดสด และวัดเก่าแก่',
    category: 'tour',
    serviceType: 'ทัวร์ชุมชน',
    location: {
      serviceArea: ['บ้านฉาง'],
      meetingPoint: 'ศูนย์วัฒนธรรมบ้านฉาง',
      coordinates: { lat: 12.7178, lng: 101.0512 }
    },
    contactInfo: {
      phone: ['089-234-5678'],
      email: 'communitytour@banchang.com'
    },
    pricing: {
      type: 'per_person',
      amount: 500,
      currency: 'THB',
      includes: ['ไกด์ท้องถิ่น', 'ชิมอาหารและขนม', 'ของที่ระลึก'],
      excludes: ['รถรับส่ง']
    },
    duration: {
      min: 3,
      max: 4,
      unit: 'hours'
    },
    capacity: {
      min: 4,
      max: 20
    },
    requirements: ['จองล่วงหน้า 3 วัน', 'กลุ่มขั้นต่ำ 4 คน'],
    availability: ['เสาร์-อาทิตย์', 'ออกเดินทาง 09:00 น.'],
    images: [],
    tags: ['ทัวร์ชุมชน', 'วัฒนธรรม', 'ท้องถิ่น', 'เรียนรู้'],
    isActive: true,
    featured: true,
    order: 10
  }
]

export default {
  events: eventsData,
  travelServices: travelServicesData
}
