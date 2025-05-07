<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const checked = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>

<template>
  <label class="to-do__checkbox">
    <input class="to-do__checkbox-input" type="checkbox" v-model="checked" />
    <span class="to-do__checkbox-checkmark"></span>
  </label>
</template>

<style lang="scss">
.to-do {
  &__checkbox {
    width: 30px;
    height: 30px;
  }

  &__checkbox-input {
    display: none;
  }
  &__checkbox-checkmark {
    display: inline-block;
    width: 30px;
    height: 30px;
  }

  &__checkbox-checkmark::after {
    content: '';
    position: absolute;
    display: block;
    width: 30px;
    height: 30px;
    padding-top: 34px;
    background-color: transparent;
    background-image: url(/src/assets/Check.svg);
    background-repeat: no-repeat;
    background-position: center;
  }
}
</style>
