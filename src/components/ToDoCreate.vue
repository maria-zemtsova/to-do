<script setup>
import { computed } from 'vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'add-task'])

const inputValue = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

const handleAdd = () => {
  if (inputValue.value.trim()) {
    emit('add-task')
  }
}

const handleKeyPress = (e) => {
  if (e.key === 'Enter') {
    handleAdd()
  }
}
</script>

<template>
  <div class="to-do__create-block">
    <input
      v-model="inputValue"
      @keyup.enter="handleKeyPress"
      class="to-do__input"
      placeholder="Add a new task"
      type="text"
    />
    <button class="to-do__add-btn" @click="handleAdd" :disabled="!inputValue.trim()">
      <span class="visually-hidden">add</span>
    </button>
  </div>
</template>
