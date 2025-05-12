import { ref, computed } from 'vue'

export function useInputValidation(initialValue = '') {
  const inputValue = ref(initialValue)
  const isDirty = ref(false)
  const isValid = computed(() => {
    return inputValue.value.trim().length > 0
  })
  const errorMessage = computed(() => {
    if (!isDirty.value) return ''
  })
  return {
    inputValue,
    isDirty,
    isValid,
  }
}
