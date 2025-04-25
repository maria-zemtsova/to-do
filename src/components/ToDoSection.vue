<script setup>
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import ToDoCreate from './ToDoCreate.vue'
import ToDoTask from './ToDoTask.vue'

const newTask = ref('')
const tasks = ref([])

const addTask = () => {
  if (newTask.value.trim()) {
    tasks.value.push({
      id: uuidv4(),
      text: newTask.value.trim(),
      completed: false,
    })
    newTask.value = ''
  }
}

const updateTask = (updatedTask) => {
  const index = tasks.value.findIndex((t) => t.id === updatedTask.id)
  if (index !== -1) {
    tasks.value[index] = updatedTask
  }
}

const removeTask = (id) => {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}

const activeTasks = computed(() => tasks.value.filter((task) => !task.completed))
const completedTasks = computed(() => tasks.value.filter((task) => task.completed))
</script>

<template>
  <section class="to-do__section">
    <div class="to-do__wrapper">
      <ToDoCreate v-model="newTask" @add-task="addTask" />

      <h2 class="to-do__subtitle">Tasks to do - {{ activeTasks.length }}</h2>
      <ul class="to-do__list" v-if="activeTasks.length > 0">
        <ToDoTask
          v-for="task in activeTasks"
          :key="task.id"
          :task="task"
          @update="updateTask"
          @remove="removeTask"
        />
      </ul>

      <h2 class="to-do__subtitle">Done - {{ completedTasks.length }}</h2>
      <ul class="to-do__list" v-if="completedTasks.length > 0">
        <ToDoTask
          v-for="task in completedTasks"
          :key="task.id"
          :task="task"
          @update="updateTask"
          @remove="removeTask"
        />
      </ul>
    </div>
  </section>
</template>

<style lang="scss">
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

  &__section {
    max-width: 984px;
    min-height: 796px;
    background-color: $background-section;
    border-radius: 80px;
    position: relative;
    left: 506px;
  }

  &__wrapper {
    width: 984px;
    max-width: 432px;
    margin: 0 auto;
    padding-top: 74px;
    padding-bottom: 74px;
  }

  &__subtitle {
    color: $subtitle;
    font-size: 16px;
    margin-bottom: 18px;
  }
}
</style>
