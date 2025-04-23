<script setup>
defineProps({
  modelValue: { type: Boolean, default: false },
})

const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <label class="to-do__checkbox">
    <input
      class="to-do__checkbox-input"
      type="checkbox"
      :checked="modelValue"
      @change="emit('update:modelValue', $event.target.checked)"
    />
    <span class="to-do__checkbox-checkmark"></span>
  </label>
</template>

<style lang="scss">
@use '/src/scss/variables.scss' as *;
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
