<script setup lang="ts">
import { useInputValidation } from '../composables/useInputValidation'

const { inputValue, isDirty, isValid } = useInputValidation()

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'add-task', text: string): void
}>()

const handleAdd = () => {
  isDirty.value = true
  if (isValid.value) {
    emit('add-task', inputValue.value)
    inputValue.value = ''
    isDirty.value = false
  }
}

const handleKeyPress = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleAdd()
  }
}
</script>

<template>
  <div class="to-do__create-block">
    <input
      v-model="inputValue"
      class="to-do__input"
      type="text"
      placeholder="Add a new task"
      @keyup.enter="handleKeyPress"
    />
    <button class="to-do__add-btn" @click="handleAdd" :disabled="!inputValue.trim()">
      <span class="visually-hidden">add</span>
    </button>
  </div>
</template>

<style lang="scss">
.to-do {
  &__create-block {
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;
  }

  &__input {
    min-width: 382px;
    padding-top: 12px;
    padding-bottom: 10px;
    padding-left: 16px;
    background-color: transparent;
    border: 1px solid $input-border;
    border-radius: 10px;
    color: $input-text;
  }

  &__add-btn {
    width: 40px;
    height: 40px;
    background-color: $task-active;
    background-image: url(/src/assets/Plus.svg);
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    border-radius: 10px;
  }
}
</style>
