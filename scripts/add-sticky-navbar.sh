#!/bin/bash

# Script to add sticky navbar functionality to all public pages

# List of files to update
FILES=(
  "pages/hotels/index.vue"
  "pages/hotels/[id].vue"
  "pages/restaurants/index.vue"
  "pages/restaurants/[id].vue"
  "pages/events/index.vue"
  "pages/events/[id].vue"
  "pages/travel-services/index.vue"
  "pages/travel-services/[id].vue"
  "pages/local-products/index.vue"
  "pages/local-products/[id].vue"
)

for file in "${FILES[@]}"; do
  echo "Processing $file..."

  # 1. Update header tag - add classes and :class binding
  if grep -q 'class="bg-white shadow-sm sticky top-0 z-40"' "$file"; then
    sed -i '' 's/class="bg-white shadow-sm sticky top-0 z-40"/class="site-header bg-white shadow-sm sticky top-0 z-40 transition-transform duration-300" :class="{ '\''nav-hidden'\'': navbarHidden }"/g' "$file"
  fi

  # 2. Add sticky navbar composable after the first ref/const declaration in <script>
  # Find the line number of "const loading = ref" or similar
  # Then add the composable
  if ! grep -q "useStickyNavbar" "$file"; then
    # Add after 'const loading = ref(true)' or similar state declaration
    sed -i '' '/const loading = ref(true)/a\
\
// Sticky navbar\
const { navbarHidden } = useStickyNavbar()
' "$file"
  fi

  # 3. Add CSS for nav-hidden class
  if ! grep -q "site-header.nav-hidden" "$file"; then
    # Add before first style rule or at beginning of <style scoped>
    sed -i '' '/<style scoped>/a\
.site-header.nav-hidden {\
  transform: translateY(-100%);\
}\
' "$file"
  fi

  echo "✓ Completed $file"
done

echo ""
echo "All files updated successfully!"
