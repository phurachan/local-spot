import mongoose from 'mongoose'
import {
  HotelContent,
  RestaurantContent,
  EventContent,
  TravelServiceContent,
  LocalProductContent,
  NewsContent
} from '../models/CMS'

// Hotels Data - Rayong/Ban Chang
export const hotelsData = [
  {
    title: 'โรงแรมบ้านฉางวิว',
    description: 'โรงแรมริมทะเลบ้านฉาง วิวสวย บรรยากาศดี เหมาะสำหรับพักผ่อนกับครอบครัว มีสระว่ายน้ำและร้านอาหารริมทะเล',
    category: 'hotel',
    location: {
      address: '123 หมู่ 1 ถนนสุขุมวิท',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7198, lng: 101.0545 }
    },
    contactInfo: {
      phone: ['038-123-456', '081-234-5678'],
      email: 'info@banchang-view.com',
      website: 'https://banchang-view.com',
      lineOA: '@banchangview'
    },
    amenities: ['สระว่ายน้ำ', 'ฟรี WiFi', 'ที่จอดรถ', 'ห้องอาหาร', 'ห้องออกกำลังกาย', 'บริการรูมเซอร์วิส'],
    roomTypes: [
      {
        name: 'Deluxe Room',
        description: 'ห้องพักสบายพร้อมวิวทะเล',
        maxGuests: 2,
        priceRange: { min: 1500, max: 2000 },
        images: []
      },
      {
        name: 'Family Suite',
        description: 'ห้องพักครอบครัวขนาดใหญ่',
        maxGuests: 4,
        priceRange: { min: 3000, max: 4000 },
        images: []
      }
    ],
    checkInOut: {
      checkIn: '14:00',
      checkOut: '12:00'
    },
    policies: ['ห้ามสูบบุหรี่', 'สัตว์เลี้ยงไม่อนุญาต', 'เช็คอินหลัง 22:00 น. กรุณาแจ้งล่วงหน้า'],
    nearbyAttractions: ['หาดแม่รำพึง', 'ตลาดน้ำบ้านฉาง', 'วัดบ้านฉาง'],
    images: [],
    tags: ['ริมทะเล', 'วิวสวย', 'สระว่ายน้ำ', 'เหมาะกับครอบครัว'],
    isActive: true,
    featured: true,
    order: 1
  },
  {
    title: 'รีสอร์ทสวนปาล์ม ระยอง',
    description: 'รีสอร์ทบรรยากาศเงียบสงบ ท่ามกลางสวนปาล์มริมทะเล ห้องพักสไตล์โมเดิร์นทรอปิคอล',
    category: 'resort',
    location: {
      address: '456 หมู่ 3 ต.บ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7245, lng: 101.0612 }
    },
    contactInfo: {
      phone: ['038-234-567', '089-345-6789'],
      email: 'contact@palm-resort.com',
      website: 'https://palm-resort-rayong.com'
    },
    amenities: ['สระว่ายน้ำ', 'ฟรี WiFi', 'สปา', 'ร้านอาหาร', 'จักรยาน', 'กิจกรรมริมชายหาด'],
    roomTypes: [
      {
        name: 'Garden Villa',
        description: 'วิลล่าสวนส่วนตัว',
        maxGuests: 2,
        priceRange: { min: 2500, max: 3500 },
        images: []
      }
    ],
    checkInOut: { checkIn: '14:00', checkOut: '11:00' },
    policies: ['เด็กต่ำกว่า 5 ปีพักฟรี', 'ยกเลิกฟรี 7 วันก่อนเข้าพัก'],
    nearbyAttractions: ['หาดแม่พิมพ์', 'ศูนย์อนุรักษ์เต่าทะเล'],
    images: [],
    tags: ['รีสอร์ท', 'สปา', 'เงียบสงบ', 'ธรรมชาติ'],
    isActive: true,
    featured: true,
    order: 2
  },
  {
    title: 'บ้านฉางเบย์ โฮเทล',
    description: 'โรงแรมใจกลางเมืองบ้านฉาง สะดวกสบาย ใกล้แหล่งท่องเที่ยว ห้างสรรพสินค้า และร้านอาหาร',
    category: 'hotel',
    location: {
      address: '789 ถนนสุขุมวิท ต.บ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7156, lng: 101.0489 }
    },
    contactInfo: {
      phone: ['038-345-678'],
      email: 'info@banchangbay.com'
    },
    amenities: ['ฟรี WiFi', 'ที่จอดรถ', 'ร้านอาหาร', 'ห้องประชุม'],
    roomTypes: [
      {
        name: 'Standard Room',
        description: 'ห้องมาตรฐาน สะอาดสะดวกสบาย',
        maxGuests: 2,
        priceRange: { min: 800, max: 1200 },
        images: []
      }
    ],
    checkInOut: { checkIn: '14:00', checkOut: '12:00' },
    policies: ['ห้ามสูบบุหรี่ในห้องพัก'],
    nearbyAttractions: ['ตลาดบ้านฉาง', 'พิพิธภัณฑ์ท้องถิ่น'],
    images: [],
    tags: ['ใจกลางเมือง', 'สะดวกสบาย', 'ราคาประหยัด'],
    isActive: true,
    featured: false,
    order: 3
  },
  {
    title: 'ซีไซด์ บูติก โฮเทล',
    description: 'โรงแรมบูติกริมทะเล ดีไซน์ร่วมสมัย ห้องพักน้อยเพื่อความเป็นส่วนตัว',
    category: 'hotel',
    location: {
      address: '321 หมู่ 5 บ้านหนองคันทรง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7289, lng: 101.0678 }
    },
    contactInfo: {
      phone: ['038-456-789', '092-456-7890'],
      email: 'stay@seaside-boutique.com',
      website: 'https://seaside-boutique.com'
    },
    amenities: ['สระว่ายน้ำ infinity', 'ฟรี WiFi', 'บาร์ริมทะเล', 'ห้องอาหาร', 'สปา'],
    roomTypes: [
      {
        name: 'Sea View Room',
        description: 'ห้องวิวทะเลพาโนรามา',
        maxGuests: 2,
        priceRange: { min: 3500, max: 4500 },
        images: []
      }
    ],
    checkInOut: { checkIn: '15:00', checkOut: '11:00' },
    policies: ['สำหรับผู้ใหญ่เท่านั้น', 'ยกเลิกฟรี 14 วันก่อนเข้าพัก'],
    nearbyAttractions: ['หาดส่วนตัว', 'ชุมชนประมงบ้านฉาง'],
    images: [],
    tags: ['บูติก', 'โรแมนติก', 'หรูหรา', 'วิวทะเล'],
    isActive: true,
    featured: true,
    order: 4
  },
  {
    title: 'เกสต์เฮ้าส์บ้านสวน',
    description: 'เกสต์เฮ้าส์บรรยากาศบ้านๆ ราคาประหยัด เหมาะกับนักเดินทางงบน้อย',
    category: 'guesthouse',
    location: {
      address: '147 ซอยสวนสุข ต.บ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7178, lng: 101.0523 }
    },
    contactInfo: {
      phone: ['038-567-890', '086-567-8901'],
      email: 'baansuan.gh@gmail.com'
    },
    amenities: ['ฟรี WiFi', 'ที่จอดรถ', 'ครัวส่วนกลาง', 'จักรยานให้เช่า'],
    roomTypes: [
      {
        name: 'Fan Room',
        description: 'ห้องพัดลม สะอาด',
        maxGuests: 2,
        priceRange: { min: 300, max: 500 },
        images: []
      },
      {
        name: 'AC Room',
        description: 'ห้องแอร์ สะดวกสบาย',
        maxGuests: 2,
        priceRange: { min: 600, max: 800 },
        images: []
      }
    ],
    checkInOut: { checkIn: '13:00', checkOut: '11:00' },
    policies: ['เงียบหลัง 22:00 น.', 'ไม่รับจองกลุ่ม'],
    nearbyAttractions: ['ตลาดสด', 'วัดบ้านฉาง', 'ชายหาดบ้านฉาง'],
    images: [],
    tags: ['ราคาถูก', 'บรรยากาศบ้านๆ', 'เป็นกันเอง'],
    isActive: true,
    featured: false,
    order: 5
  },
  {
    title: 'ระยอง มารีน่า รีสอร์ท',
    description: 'รีสอร์ทติดท่าเรือ วิวอ่าวสวย มีกิจกรรมทางน้ำมากมาย',
    category: 'resort',
    location: {
      address: '555 หมู่ 2 บ้านท่าเรือ',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7312, lng: 101.0701 }
    },
    contactInfo: {
      phone: ['038-678-901', '094-678-9012'],
      email: 'info@rayong-marina.com',
      website: 'https://rayong-marina.com'
    },
    amenities: ['ท่าเรือส่วนตัว', 'สระว่ายน้ำ', 'ห้องอาหารซีฟู้ด', 'บริการทัวร์ดำน้ำ', 'ฟรี WiFi'],
    roomTypes: [
      {
        name: 'Marina View Room',
        description: 'ห้องวิวท่าเรือและทะเล',
        maxGuests: 2,
        priceRange: { min: 2800, max: 3800 },
        images: []
      }
    ],
    checkInOut: { checkIn: '14:00', checkOut: '12:00' },
    policies: ['เด็กต่ำกว่า 12 ปีพักฟรี'],
    nearbyAttractions: ['เกาะเสม็ด (ต่อเรือ)', 'ตลาดปลาสด', 'ทะเลบ้านฉาง'],
    images: [],
    tags: ['ท่าเรือ', 'กิจกรรมทางน้ำ', 'ซีฟู้ด', 'ไปเกาะเสม็ด'],
    isActive: true,
    featured: true,
    order: 6
  },
  {
    title: 'วิลล่าแสนสุข บ้านฉาง',
    description: 'วิลล่าส่วนตัว พร้อมสระว่ายน้ำ เหมาะสำหรับครอบครัวหรือกลุ่มเพื่อน',
    category: 'villa',
    location: {
      address: '88 หมู่ 4 บ้านแหลมเจริญ',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7267, lng: 101.0645 }
    },
    contactInfo: {
      phone: ['038-789-012', '098-789-0123'],
      email: 'booking@saensuk-villa.com'
    },
    amenities: ['สระว่ายน้ำส่วนตัว', 'ครัวพร้อมอุปกรณ์', 'BBQ', 'ที่จอดรถ', 'ฟรี WiFi', 'Netflix'],
    roomTypes: [
      {
        name: '3 Bedroom Villa',
        description: 'วิลล่า 3 ห้องนอน พร้อมสระส่วนตัว',
        maxGuests: 8,
        priceRange: { min: 6000, max: 8000 },
        images: []
      }
    ],
    checkInOut: { checkIn: '15:00', checkOut: '11:00' },
    policies: ['เหมาะสำหรับกลุ่ม', 'มัดจำ 50%', 'ไม่อนุญาตให้จัดงานปาร์ตี้'],
    nearbyAttractions: ['ชายหาดใกล้เคียง', 'ตลาดโต้รุ่ง'],
    images: [],
    tags: ['วิลล่า', 'สระส่วนตัว', 'ครอบครัว', 'กลุ่มเพื่อน'],
    isActive: true,
    featured: false,
    order: 7
  },
  {
    title: 'โฮสเทลบ้านฉางสเตชั่น',
    description: 'โฮสเทลสไตล์โมเดิร์น ใกล้สถานีรถไฟ เหมาะกับแบ็คแพ็คเกอร์',
    category: 'hostel',
    location: {
      address: '222 ถนนสถานี ต.บ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7134, lng: 101.0467 }
    },
    contactInfo: {
      phone: ['038-890-123'],
      email: 'hello@banchangstation.com',
      lineOA: '@banchangstation'
    },
    amenities: ['ฟรี WiFi', 'ห้องน้ำรวม', 'ครัวส่วนกลาง', 'พื้นที่ส่วนกลาง', 'ตู้ล็อคเกอร์'],
    roomTypes: [
      {
        name: 'Mixed Dorm',
        description: 'ห้องนอนรวม 8 เตียง',
        maxGuests: 1,
        priceRange: { min: 250, max: 350 },
        images: []
      },
      {
        name: 'Private Room',
        description: 'ห้องส่วนตัว',
        maxGuests: 2,
        priceRange: { min: 600, max: 800 },
        images: []
      }
    ],
    checkInOut: { checkIn: '14:00', checkOut: '11:00' },
    policies: ['เช็คเอ้าท์เลท +200 บาท', 'เงียบหลัง 23:00 น.'],
    nearbyAttractions: ['สถานีรถไฟบ้านฉาง', 'ตลาดนัด', 'ร้านกาแฟย่าน'],
    images: [],
    tags: ['โฮสเทล', 'ราคาประหยัด', 'แบ็คแพ็ค', 'ใกล้สถานีรถไฟ'],
    isActive: true,
    featured: false,
    order: 8
  },
  {
    title: 'รีสอร์ทสวนมะพร้าว',
    description: 'รีสอร์ทท่ามกลางสวนมะพร้าว บรรยากาศร่มรื่น เงียบสงบ',
    category: 'resort',
    location: {
      address: '99 หมู่ 6 บ้านสวนมะพร้าว',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7223, lng: 101.0589 }
    },
    contactInfo: {
      phone: ['038-901-234', '091-012-3456'],
      email: 'contact@coconut-resort.com'
    },
    amenities: ['สระว่ายน้ำ', 'ฟรี WiFi', 'ร้านอาหารอาหารไทย', 'นวดแผนไทย', 'ปั่นจักรยานชมสวน'],
    roomTypes: [
      {
        name: 'Coconut Cottage',
        description: 'กระท่อมไม้ท่ามกลางสวนมะพร้าว',
        maxGuests: 2,
        priceRange: { min: 1800, max: 2500 },
        images: []
      }
    ],
    checkInOut: { checkIn: '14:00', checkOut: '12:00' },
    policies: ['สัตว์เลี้ยงต้องแจ้งล่วงหน้า', 'เด็กต่ำกว่า 6 ปีพักฟรี'],
    nearbyAttractions: ['สวนมะพร้าว', 'วัดในชุมชน', 'หาดใกล้เคียง'],
    images: [],
    tags: ['ธรรมชาติ', 'เงียบสงบ', 'สวนมะพร้าว', 'พักผ่อน'],
    isActive: true,
    featured: false,
    order: 9
  },
  {
    title: 'บ้านฉางบีช รีสอร์ท แอนด์ สปา',
    description: 'รีสอร์ทหรูริมหาดบ้านฉาง พร้อมสปาครบวงจร และร้านอาหารชื่อดัง',
    category: 'resort',
    location: {
      address: '777 หาดบ้านฉาง ต.บ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7334, lng: 101.0734 }
    },
    contactInfo: {
      phone: ['038-012-345', '095-123-4567'],
      email: 'reservation@banchangbeach.com',
      website: 'https://banchangbeach-resort.com'
    },
    amenities: ['สระว่ายน้ำหลายสระ', 'สปาและนวด', 'ฟิตเนส', '3 ร้านอาหาร', 'คิดส์คลับ', 'ฟรี WiFi', 'ชายหาดส่วนตัว'],
    roomTypes: [
      {
        name: 'Deluxe Beachfront',
        description: 'ห้องพักติดชายหาดพร้อมระเบียงส่วนตัว',
        maxGuests: 2,
        priceRange: { min: 4500, max: 6000 },
        images: []
      },
      {
        name: 'Pool Villa',
        description: 'วิลล่าพร้อมสระส่วนตัว',
        maxGuests: 4,
        priceRange: { min: 12000, max: 15000 },
        images: []
      }
    ],
    checkInOut: { checkIn: '15:00', checkOut: '12:00' },
    policies: ['เด็กต่ำกว่า 12 ปีพักฟรี (ไม่เพิ่มเตียง)', 'ยกเลิกฟรี 30 วันก่อนเข้าพัก'],
    nearbyAttractions: ['หาดบ้านฉาง', 'ตลาดซีฟู้ดสด', 'จุดชมพระอาทิตย์ตก'],
    images: [],
    tags: ['หรูหรา', 'สปา', 'ริมทะเล', 'ครอบครัว', 'ฮันนีมูน'],
    isActive: true,
    featured: true,
    order: 10
  }
]

// Restaurants Data - Rayong/Ban Chang
export const restaurantsData = [
  {
    title: 'ร้านอาหารทะเลสดบ้านฉาง',
    description: 'ร้านอาหารทะเลสดๆ จากท่าเรือบ้านฉาง ราคาไม่แพง อร่อยทุกเมนู บรรยากาศริมทะเล',
    category: 'restaurant',
    location: {
      address: '123/45 ถนนชายทะเล ต.บ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7198, lng: 101.0556 }
    },
    contactInfo: {
      phone: ['038-234-567', '089-234-5678'],
      lineOA: '@seafoodbanchang'
    },
    cuisine: ['อาหารทะเล', 'อาหารไทย'],
    priceRange: 'mid_range',
    operatingHours: {
      monday: { open: '10:00', close: '21:00', closed: false },
      tuesday: { open: '10:00', close: '21:00', closed: false },
      wednesday: { open: '10:00', close: '21:00', closed: false },
      thursday: { open: '10:00', close: '21:00', closed: false },
      friday: { open: '10:00', close: '22:00', closed: false },
      saturday: { open: '10:00', close: '22:00', closed: false },
      sunday: { open: '10:00', close: '22:00', closed: false }
    },
    specialties: ['ปูผัดผงกะหรี่', 'กุ้งแม่น้ำเผา', 'หอยแมลงภู่อบ', 'ปลากะพงทอดน้ำปลา'],
    dietaryOptions: ['อาหารคลีน', 'ปรับเผ็ดได้'],
    delivery: {
      available: true,
      platforms: ['LINE', 'โทรสั่ง']
    },
    images: [],
    tags: ['อาหารทะเล', 'ริมทะเล', 'ของสด', 'ราคาเป็นกันเอง'],
    isActive: true,
    featured: true,
    order: 1
  },
  {
    title: 'ครัวบ้านฉาง',
    description: 'ร้านอาหารไทยต้นตำรับ รสชาติแบบดั้งเดิม บรรยากาศบ้านๆ อบอุ่น',
    category: 'local_cuisine',
    location: {
      address: '567 ถนนสุขุมวิท ต.บ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7156, lng: 101.0489 }
    },
    contactInfo: {
      phone: ['038-345-678'],
      email: 'kruabanchang@gmail.com'
    },
    cuisine: ['อาหารไทย', 'อาหารภาคกลาง'],
    priceRange: 'budget',
    operatingHours: {
      monday: { open: '08:00', close: '20:00', closed: false },
      tuesday: { open: '08:00', close: '20:00', closed: false },
      wednesday: { open: '08:00', close: '20:00', closed: false },
      thursday: { open: '08:00', close: '20:00', closed: false },
      friday: { open: '08:00', close: '20:00', closed: false },
      saturday: { open: '08:00', close: '20:00', closed: false },
      sunday: { open: '08:00', close: '20:00', closed: false }
    },
    specialties: ['แกงเขียวหวานไก่', 'ผัดไทย', 'ต้มยำกุ้ง', 'ส้มตำไทย'],
    dietaryOptions: ['มังสวิรัติ', 'เจ', 'ไม่ใส่ผงชูรส'],
    delivery: {
      available: true,
      platforms: ['Grab Food', 'LINE MAN']
    },
    images: [],
    tags: ['อาหารไทย', 'ราคาประหยัด', 'อร่อย', 'บรรยากาศดี'],
    isActive: true,
    featured: true,
    order: 2
  },
  {
    title: 'Ban Chang Coffee & Bistro',
    description: 'คาเฟ่บิสโทรสไตล์โมเดิร์น เสิร์ฟกาแฟสดและอาหารฟิวชั่น บรรยากาศสบายๆ',
    category: 'cafe',
    location: {
      address: '234 ซอยราชดำเนิน ต.บ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7145, lng: 101.0478 }
    },
    contactInfo: {
      phone: ['089-456-7890'],
      email: 'info@banchangcoffee.com',
      website: 'https://banchangcoffee.com',
      lineOA: '@banchangcoffee'
    },
    cuisine: ['คาเฟ่', 'ฟิวชั่น', 'เบเกอรี่'],
    priceRange: 'mid_range',
    operatingHours: {
      monday: { open: '07:00', close: '19:00', closed: false },
      tuesday: { open: '07:00', close: '19:00', closed: false },
      wednesday: { open: '07:00', close: '19:00', closed: false },
      thursday: { open: '07:00', close: '19:00', closed: false },
      friday: { open: '07:00', close: '20:00', closed: false },
      saturday: { open: '07:00', close: '20:00', closed: false },
      sunday: { open: '07:00', close: '20:00', closed: false }
    },
    specialties: ['Specialty Coffee', 'All Day Breakfast', 'Homemade Cake', 'Pasta'],
    dietaryOptions: ['มังสวิรัติ', 'Vegan Option', 'Gluten Free'],
    delivery: {
      available: true,
      platforms: ['Grab Food', 'LINE MAN', 'โทรสั่ง']
    },
    images: [],
    tags: ['คาเฟ่', 'กาแฟ', 'อาหารฝรั่ง', 'ถ่ายรูปสวย'],
    isActive: true,
    featured: true,
    order: 3
  },
  {
    title: 'ก๋วยเตี๋ยวเรือป้าจันทร์',
    description: 'ก๋วยเตี๋ยวเรือรสชาติเข้มข้น ตำรับเก่าแก่กว่า 30 ปี ราคาเริ่มต้น 40 บาท',
    category: 'street_food',
    location: {
      address: 'ตลาดสดบ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7167, lng: 101.0501 }
    },
    contactInfo: {
      phone: ['086-789-0123']
    },
    cuisine: ['ก๋วยเตี๋ยว', 'อาหารไทย'],
    priceRange: 'budget',
    operatingHours: {
      monday: { open: '06:00', close: '14:00', closed: false },
      tuesday: { open: '06:00', close: '14:00', closed: false },
      wednesday: { open: '06:00', close: '14:00', closed: false },
      thursday: { open: '06:00', close: '14:00', closed: false },
      friday: { open: '06:00', close: '14:00', closed: false },
      saturday: { open: '06:00', close: '14:00', closed: false },
      sunday: { open: '06:00', close: '14:00', closed: false }
    },
    specialties: ['ก๋วยเตี๋ยวเรือหมู', 'ก๋วยเตี๋ยวเรือเนื้อ', 'ลูกชิ้นปิ้ง'],
    dietaryOptions: [],
    delivery: {
      available: false,
      platforms: []
    },
    images: [],
    tags: ['ก๋วยเตี๋ยว', 'อร่อย', 'ราคาถูก', 'ของดัง'],
    isActive: true,
    featured: false,
    order: 4
  },
  {
    title: 'ร้านข้าวหมูแดงบ้านฉาง',
    description: 'ข้าวหมูแดงและหมูกรอบสูตรเด็ด เนื้อนุ่ม หนังกรอบ ราคาไม่แพง',
    category: 'street_food',
    location: {
      address: '456/12 ถนนสุขุมวิท ต.บ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7189, lng: 101.0534 }
    },
    contactInfo: {
      phone: ['092-345-6789']
    },
    cuisine: ['อาหารไทย', 'ข้าวหน้าเนื้อ'],
    priceRange: 'budget',
    operatingHours: {
      monday: { open: '07:00', close: '16:00', closed: false },
      tuesday: { open: '07:00', close: '16:00', closed: false },
      wednesday: { open: '07:00', close: '16:00', closed: false },
      thursday: { open: '07:00', close: '16:00', closed: false },
      friday: { open: '07:00', close: '16:00', closed: false },
      saturday: { open: '07:00', close: '16:00', closed: false },
      sunday: { open: '07:00', close: '16:00', closed: true }
    },
    specialties: ['ข้าวหมูแดง', 'ข้าวหมูกรอบ', 'ข้าวหมูกรอบหมูแดง'],
    dietaryOptions: [],
    delivery: {
      available: true,
      platforms: ['โทรสั่ง']
    },
    images: [],
    tags: ['ข้าวหมูแดง', 'อร่อย', 'ราคาถูก'],
    isActive: true,
    featured: false,
    order: 5
  },
  {
    title: 'พิซซ่าบ้านฉาง',
    description: 'ร้านพิซซ่าสไตล์อิตาเลียนแท้ เตาถ่าน ใช้วัตถุดิบคุณภาพ',
    category: 'international',
    location: {
      address: '789 ถนนชายทะเล ต.บ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7212, lng: 101.0567 }
    },
    contactInfo: {
      phone: ['038-567-890', '095-678-9012'],
      email: 'order@pizzabanchang.com'
    },
    cuisine: ['อิตาเลียน', 'พิซซ่า', 'พาสต้า'],
    priceRange: 'mid_range',
    operatingHours: {
      monday: { open: '11:00', close: '22:00', closed: false },
      tuesday: { open: '11:00', close: '22:00', closed: true },
      wednesday: { open: '11:00', close: '22:00', closed: false },
      thursday: { open: '11:00', close: '22:00', closed: false },
      friday: { open: '11:00', close: '23:00', closed: false },
      saturday: { open: '11:00', close: '23:00', closed: false },
      sunday: { open: '11:00', close: '22:00', closed: false }
    },
    specialties: ['Margherita Pizza', 'Seafood Pizza', 'Carbonara Pasta', 'Tiramisu'],
    dietaryOptions: ['มังสวิรัติ'],
    delivery: {
      available: true,
      platforms: ['Grab Food', 'LINE MAN', 'Foodpanda']
    },
    images: [],
    tags: ['พิซซ่า', 'อิตาเลียน', 'อาหารฝรั่ง'],
    isActive: true,
    featured: false,
    order: 6
  },
  {
    title: 'ร้านส้มตำป้านิด',
    description: 'ส้มตำรสจัดจ้าน อาหารอีสานต้นตำรับ ราคาถูก อร่อยจริง',
    category: 'local_cuisine',
    location: {
      address: 'ตรงข้ามโรงพยาบาลบ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7178, lng: 101.0512 }
    },
    contactInfo: {
      phone: ['089-012-3456']
    },
    cuisine: ['อาหารอีสาน', 'ส้มตำ'],
    priceRange: 'budget',
    operatingHours: {
      monday: { open: '09:00', close: '20:00', closed: false },
      tuesday: { open: '09:00', close: '20:00', closed: false },
      wednesday: { open: '09:00', close: '20:00', closed: false },
      thursday: { open: '09:00', close: '20:00', closed: false },
      friday: { open: '09:00', close: '20:00', closed: false },
      saturday: { open: '09:00', close: '20:00', closed: false },
      sunday: { open: '09:00', close: '20:00', closed: false }
    },
    specialties: ['ส้มตำไทย', 'ส้มตำปู', 'ลาบหมู', 'ไก่ย่าง', 'ข้าวเหนียว'],
    dietaryOptions: ['ปรับรสชาติได้'],
    delivery: {
      available: false,
      platforms: []
    },
    images: [],
    tags: ['ส้มตำ', 'อีสาน', 'ราคาถูก', 'อร่อย'],
    isActive: true,
    featured: true,
    order: 7
  },
  {
    title: 'Sushi Bar Ban Chang',
    description: 'ร้านซูชิญี่ปุ่นแท้ วัตถุดิบนำเข้า เชฟญี่ปุ่น บรรยากาศญี่ปุ่นแท้',
    category: 'international',
    location: {
      address: '345 ถนนสุขุมวิท ต.บ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7201, lng: 101.0545 }
    },
    contactInfo: {
      phone: ['038-678-901', '098-789-0123'],
      email: 'info@sushibarbanchang.com'
    },
    cuisine: ['ญี่ปุ่น', 'ซูชิ', 'ซาซิมิ'],
    priceRange: 'fine_dining',
    operatingHours: {
      monday: { open: '11:00', close: '22:00', closed: false },
      tuesday: { open: '11:00', close: '22:00', closed: false },
      wednesday: { open: '11:00', close: '22:00', closed: false },
      thursday: { open: '11:00', close: '22:00', closed: false },
      friday: { open: '11:00', close: '23:00', closed: false },
      saturday: { open: '11:00', close: '23:00', closed: false },
      sunday: { open: '11:00', close: '22:00', closed: false }
    },
    specialties: ['Omakase Set', 'Salmon Sashimi', 'Tempura', 'Sake Selection'],
    dietaryOptions: [],
    delivery: {
      available: true,
      platforms: ['Grab Food', 'LINE MAN']
    },
    images: [],
    tags: ['ญี่ปุ่น', 'ซูชิ', 'หรูหรา', 'สด'],
    isActive: true,
    featured: false,
    order: 8
  },
  {
    title: 'ร้านขนมจีนน้ำยาป้าแดง',
    description: 'ขนมจีนน้ำยาสูตรโบราณ น้ำยาเข้มข้น ของหวานหลากหลาย',
    category: 'local_cuisine',
    location: {
      address: 'ตลาดเช้าบ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7156, lng: 101.0495 }
    },
    contactInfo: {
      phone: ['091-234-5678']
    },
    cuisine: ['อาหารไทย', 'ขนมจีน'],
    priceRange: 'budget',
    operatingHours: {
      monday: { open: '06:00', close: '13:00', closed: false },
      tuesday: { open: '06:00', close: '13:00', closed: false },
      wednesday: { open: '06:00', close: '13:00', closed: false },
      thursday: { open: '06:00', close: '13:00', closed: false },
      friday: { open: '06:00', close: '13:00', closed: false },
      saturday: { open: '06:00', close: '13:00', closed: false },
      sunday: { open: '06:00', close: '13:00', closed: false }
    },
    specialties: ['ขนมจีนน้ำยา', 'ขนมจีนน้ำพริก', 'ของหวานโบราณ'],
    dietaryOptions: ['มังสวิรัติ'],
    delivery: {
      available: false,
      platforms: []
    },
    images: [],
    tags: ['ขนมจีน', 'ราคาถูก', 'อร่อย', 'ของเช้า'],
    isActive: true,
    featured: false,
    order: 9
  },
  {
    title: 'ร้านอาหารวิวทะเลบ้านฉาง',
    description: 'ร้านอาหารริมทะเล วิวสวย อาหารทะเลสด บรรยากาศโรแมนติก เหมาะสำหรับครอบครัว',
    category: 'restaurant',
    location: {
      address: '999 หาดบ้านฉาง ต.บ้านฉาง',
      district: 'บ้านฉาง',
      province: 'ระยอง',
      coordinates: { lat: 12.7245, lng: 101.0623 }
    },
    contactInfo: {
      phone: ['038-789-012', '094-890-1234'],
      email: 'reservation@seaviewbanchang.com',
      website: 'https://seaviewbanchang.com'
    },
    cuisine: ['อาหารทะเล', 'อาหารไทย', 'อาหารนานาชาติ'],
    priceRange: 'mid_range',
    operatingHours: {
      monday: { open: '10:00', close: '23:00', closed: false },
      tuesday: { open: '10:00', close: '23:00', closed: false },
      wednesday: { open: '10:00', close: '23:00', closed: false },
      thursday: { open: '10:00', close: '23:00', closed: false },
      friday: { open: '10:00', close: '24:00', closed: false },
      saturday: { open: '10:00', close: '24:00', closed: false },
      sunday: { open: '10:00', close: '23:00', closed: false }
    },
    specialties: ['กุ้งแม่น้ำเผา', 'ปลากะพงราดพริก', 'หอยนางรมสด', 'ปูนิ่มทอดกระเทียม'],
    dietaryOptions: ['มังสวิรัติ', 'อาหารคลีน'],
    delivery: {
      available: true,
      platforms: ['โทรสั่ง']
    },
    images: [],
    tags: ['วิวทะเล', 'อาหารทะเล', 'บรรยากาศดี', 'โรแมนติก'],
    isActive: true,
    featured: true,
    order: 10
  }
]

// Export for use in seed script
export default {
  hotels: hotelsData,
  restaurants: restaurantsData
}
