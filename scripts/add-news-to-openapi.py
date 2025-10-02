#!/usr/bin/env python3
import json

# Read the main openapi.json
with open('public/openapi.json', 'r', encoding='utf-8') as f:
    openapi = json.load(f)

# Read the news endpoints
with open('docs/news-openapi.json', 'r', encoding='utf-8') as f:
    news_spec = json.load(f)

# Add News schema to components/schemas
if 'components' not in openapi:
    openapi['components'] = {}
if 'schemas' not in openapi['components']:
    openapi['components']['schemas'] = {}

openapi['components']['schemas']['NewsContent'] = news_spec['newsSchema']['NewsContent']

# Add News endpoints to paths (insert before /cms/hotels)
new_paths = {}
news_added = False

for path, methods in openapi['paths'].items():
    # Insert news endpoints before /cms/hotels
    if path == '/cms/hotels' and not news_added:
        new_paths['/cms/news'] = news_spec['newsEndpoints']['/cms/news']
        new_paths['/cms/news/{id}'] = news_spec['newsEndpoints']['/cms/news/{id}']
        news_added = True

    new_paths[path] = methods

openapi['paths'] = new_paths

# Write back to openapi.json
with open('public/openapi.json', 'w', encoding='utf-8') as f:
    json.dump(openapi, f, ensure_ascii=False, indent=2)

print("✅ Successfully added News API to openapi.json")
print("📍 Added endpoints:")
print("   - GET /cms/news")
print("   - POST /cms/news")
print("   - GET /cms/news/{id}")
print("   - PUT /cms/news/{id}")
print("   - DELETE /cms/news/{id}")
print("📦 Added schema: NewsContent")
