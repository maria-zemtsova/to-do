import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'
import { fetchTasks, createTask } from '../api/mockApi'

interface Task {
  id: string
  text: string
  completed: boolean
}

export const useTodoStore = defineStore('todos', () => {
  const tasks = ref<Task[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const completedTasks = computed(() => tasks.value.filter((task) => task.completed))
  const activeTasks = computed(() => tasks.value.filter((task) => !task.completed))

  const loadTasks = async () => {
    try {
      isLoading.value = true
      const apiTasks = await fetchTasks()

      tasks.value = apiTasks.map((task) => ({
        id: task.id,
        text: task.text,
        completed: task.completed,
      }))
    } catch (err) {
      error.value = 'Ошибка загрузки задач'
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  const addTask = async (text: string) => {
    try {
      isLoading.value = true
      const newTask = await createTask({ text })

      tasks.value.push({
        id: newTask.id,
        text: newTask.text,
        completed: newTask.completed,
      })
    } catch (err) {
      error.value = 'Ошибка добавления задачи'
    } finally {
      isLoading.value = false
    }
  }

  const updateTask = (updatedTask: Task) => {
    const index = tasks.value.findIndex((task) => task.id === updatedTask.id)
    if (index !== -1) tasks.value[index] = updatedTask
  }

  const removeTask = (taskId: string) => {
    tasks.value = tasks.value.filter((task) => task.id !== taskId)
  }

  return {
    tasks,
    isLoading,
    error,

    completedTasks,
    activeTasks,

    loadTasks,
    addTask,
    updateTask,
    removeTask,
  }
})
