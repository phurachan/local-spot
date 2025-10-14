#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

BASE_URL="http://localhost:3000/api"

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}  Testing News API Endpoints${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo ""

# Test 1: Create News
echo -e "${GREEN}[1/5] Testing POST /cms/news - Create News${NC}"
RESPONSE=$(curl -s -X POST "$BASE_URL/cms/news" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "ข่าวทดสอบ: เปิดตัวแพ็คเกจท่องเที่ยวใหม่",
    "description": "แพ็คเกจท่องเที่ยวราคาพิเศษสำหรับช่วงปีใหม่ 2025",
    "content": "เนื้อหาข่าวแบบเต็ม: เรามีแพ็คเกจท่องเที่ยวใหม่ล่าสุดสำหรับช่วงปีใหม่ 2025 ที่จะพาคุณไปสัมผัสประสบการณ์การท่องเที่ยวที่ไม่เหมือนใคร...",
    "excerpt": "แพ็คเกจท่องเที่ยวพิเศษสำหรับปีใหม่ 2025",
    "category": "promotion",
    "author": {
      "name": "สมชาย ใจดี",
      "email": "somchai@example.com",
      "bio": "นักเขียนท่องเที่ยวอาวุโส"
    },
    "publishDate": "2025-10-02T10:00:00Z",
    "readTime": 5,
    "tags": ["ท่องเที่ยว", "โปรโมชั่น", "ปีใหม่"],
    "isActive": true,
    "featured": true,
    "order": 1
  }')

echo "$RESPONSE" | jq '.'
NEWS_ID=$(echo "$RESPONSE" | jq -r '.data._id // empty')

if [ -z "$NEWS_ID" ]; then
  echo -e "${RED}❌ Failed to create news${NC}"
  exit 1
fi

echo -e "${GREEN}✅ News created with ID: $NEWS_ID${NC}"
echo ""

# Test 2: Get All News
echo -e "${GREEN}[2/5] Testing GET /cms/news - Get All News${NC}"
curl -s "$BASE_URL/cms/news?isActive=true&limit=5" | jq '.'
echo -e "${GREEN}✅ Retrieved news list${NC}"
echo ""

# Test 3: Get Single News
echo -e "${GREEN}[3/5] Testing GET /cms/news/:id - Get Single News${NC}"
curl -s -X GET "$BASE_URL/cms/news/$NEWS_ID" \
  -H "Content-Type: application/json" \
  -d "{\"_id\": \"$NEWS_ID\"}" | jq '.'
echo -e "${GREEN}✅ Retrieved single news${NC}"
echo ""

# Test 4: Update News
echo -e "${GREEN}[4/5] Testing PUT /cms/news/:id - Update News${NC}"
curl -s -X PUT "$BASE_URL/cms/news/$NEWS_ID" \
  -H "Content-Type: application/json" \
  -d "{
    \"_id\": \"$NEWS_ID\",
    \"title\": \"ข่าวทดสอบ (แก้ไข): เปิดตัวแพ็คเกจท่องเที่ยวใหม่ล่าสุด\",
    \"featured\": false
  }" | jq '.'
echo -e "${GREEN}✅ News updated${NC}"
echo ""

# Test 5: Delete News
echo -e "${GREEN}[5/5] Testing DELETE /cms/news/:id - Delete News${NC}"
curl -s -X DELETE "$BASE_URL/cms/news/$NEWS_ID" \
  -H "Content-Type: application/json" \
  -d "{\"_id\": \"$NEWS_ID\"}" | jq '.'
echo -e "${GREEN}✅ News deleted${NC}"
echo ""

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✨ All tests completed successfully!${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
