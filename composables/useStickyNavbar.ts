export function useStickyNavbar() {
  const navbarHidden = ref(false)
  let lastScrollY = 0
  let ticking = false

  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY

        // ต้องเลื่อนมากกว่า 50px จากตำแหน่งเดิม
        if (Math.abs(currentScrollY - lastScrollY) < 50) {
          ticking = false
          return
        }

        // เลื่อนลงและเลื่อนเกิน 100px = ซ่อน navbar
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          navbarHidden.value = true
        }
        // เลื่อนขึ้น = แสดง navbar
        else if (currentScrollY < lastScrollY) {
          navbarHidden.value = false
        }

        lastScrollY = currentScrollY
        ticking = false
      })
      ticking = true
    }
  }

  onMounted(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', handleScroll)
  })

  return {
    navbarHidden
  }
}
