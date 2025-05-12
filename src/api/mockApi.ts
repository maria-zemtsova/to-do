import { v4 as uuidv4 } from 'uuid'
interface ApiTask {
  id: string
  text: string
  completed: boolean
}

const mockTasks: ApiTask[] = [
  { id: '1', text: 'Задача 1', completed: false },
  { id: '2', text: 'Задача 2', completed: true },
]

export const fetchTasks = async (): Promise<ApiTask[]> => {
  return mockTasks
}

export const createTask = async (taskData: { text: string }): Promise<ApiTask> => {
  const newTask = {
    id: uuidv4(),
    text: taskData.text,
    completed: false,
  }
  mockTasks.push(newTask)
  return newTask
}
