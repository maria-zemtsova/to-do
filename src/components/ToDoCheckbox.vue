<script setup>
defineProps({
  checked: { type: Boolean, default: false },
})

defineEmits(['change'])
</script>

<template>
  <label class="to-do__checkbox">
    <input
      type="checkbox"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
      class="to-do__checkbox-input"
    />
    <span class="to-do__checkbox-checkmark"></span>
  </label>
</template>
