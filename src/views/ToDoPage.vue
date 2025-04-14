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
$background: #c8dec8;
$text-color: #0d0714;

.to-do {
  width: 100%;
  max-width: 1440px;
  height: 100%;
  min-height: 1024px;
  padding-top: 130px;
  background-color: $background;
  font-family: 'Inter', sans-serif;
  color: $text-color;

  &__title {
    width: 31.3%;
    margin-left: 7.5%;
    margin-bottom: 11px;
    font-size: 96px;
    font-weight: bold;
  }

  &__text {
    width: 31.3%;
    margin-left: 7.5%;
    font-size: 60px;
  }
}
</style>
