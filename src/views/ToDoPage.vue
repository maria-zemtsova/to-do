<script setup>
import ToDoSection from '../components/ToDoSection.vue'
</script>

<template>
  <div class="to-do">
    <h1 class="to-do__title">Todo App</h1>
    <p class="to-do__text">Lucas Viga</p>
    <ToDoSection />
  </div>
</template>

<style lang="scss">
@use '/src/scss/variables.scss' as *;
.to-do {
  font-family: 'Inter', sans-serif;
  overflow: hidden;
  width: 100%;
  max-width: 1440px;
  height: 100%;
  min-height: 1024px;
  padding-top: 130px;
  background-color: $background-page;
  font-family: 'Inter', sans-serif;
  color: $text-color;

  &__title {
    width: 452px;
    margin-left: 108px;
    margin-bottom: 12px;
    font-size: 96px;
    font-weight: bold;
  }

  &__text {
    width: 314px;
    margin-left: 108px;
    font-size: 60px;
  }
}
</style>
