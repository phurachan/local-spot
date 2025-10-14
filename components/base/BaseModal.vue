<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="modelValue" class="modal modal-open" @click.self="handleClose">
        <div :class="modalClasses" @click.stop>
          <!-- Header -->
          <div v-if="title || $slots.header" class="flex items-center justify-between mb-4">
            <slot name="header">
              <h3 class="text-lg font-bold">{{ title }}</h3>
            </slot>
            <button
              v-if="showClose"
              @click="handleClose"
              class="btn btn-sm btn-circle btn-ghost"
              aria-label="Close"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <!-- Body -->
          <div class="modal-body">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div v-if="$slots.footer" class="modal-action">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
interface Props {
  modelValue: boolean
  title?: string
  size?: 'small' | 'medium' | 'large' | 'full'
  showClose?: boolean
  closeOnClickOutside?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  showClose: true,
  closeOnClickOutside: true
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const modalClasses = computed(() => {
  const sizeClasses = {
    small: 'modal-box w-11/12 max-w-md',
    medium: 'modal-box w-11/12 max-w-2xl',
    large: 'modal-box w-11/12 max-w-5xl',
    full: 'modal-box w-11/12 max-w-7xl'
  }
  return sizeClasses[props.size]
})

function handleClose() {
  if (props.closeOnClickOutside) {
    emit('update:modelValue', false)
  }
}

// Prevent body scroll when modal is open
watch(() => props.modelValue, (isOpen) => {
  if (isOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

// Cleanup on unmount
onUnmounted(() => {
  document.body.style.overflow = ''
})
</script>

<style scoped>
.modal-open {
  display: flex !important;
  align-items: center;
  justify-content: center;
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-box,
.modal-leave-active .modal-box {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-box,
.modal-leave-to .modal-box {
  transform: scale(0.9);
}
</style>
