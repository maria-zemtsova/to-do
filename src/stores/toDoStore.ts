import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

interface Task {
  id: string
  text: string
  completed: boolean
}

export const useTodoStore = defineStore('todos', () => {
  const tasks = ref<Task[]>([])

  const completedTasks = computed(() => tasks.value.filter((task) => task.completed))
  const activeTasks = computed(() => tasks.value.filter((task) => !task.completed))

  const addTask = (text: string) => {
    tasks.value.push({
      id: uuidv4(),
      text,
      completed: false,
    })
  }

  const updateTask = (updatedTask: Task) => {
    const index = tasks.value.findIndex((task) => task.id === updatedTask.id)
    if (index !== -1) tasks.value[index] = updatedTask
  }

  const removeTask = (taskId: string) => {
    tasks.value = tasks.value.filter((task) => task.id !== taskId)
  }

  return { tasks, completedTasks, activeTasks, addTask, updateTask, removeTask }
})
