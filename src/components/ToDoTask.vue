<script setup>
import { computed } from 'vue'
import ToDoCheckbox from './ToDoCheckbox.vue'

const props = defineProps({
  task: {
    type: Object,
    required: true,
    validator: (task) => {
      return 'id' in task && 'text' in task && 'completed' in task
    },
  },
})

const emit = defineEmits(['update', 'remove'])

const textClasses = computed(() => [
  'to-do__task-text',
  {
    'to-do__task-text--active': !props.task.completed,
    'to-do__task-text--completed': props.task.completed,
  },
])

const handleCheckboxChange = (completed) => {
  emit('update', { ...props.task, completed })
}

const handleRemove = () => {
  emit('remove', props.task.id)
}
</script>

<template>
  <li class="to-do__task-item" :class="{ 'to-do__task-item--completed': task.completed }">
    <div class="to-do__task-content" :class="{ 'to-do__task-content--completed': task.completed }">
      <span :class="textClasses">{{ task.text }}</span>
    </div>

    <div
      class="to-do__task-controls"
      :class="{ 'to-do__task-controls--completed': task.completed }"
    >
      <ToDoCheckbox
        :checked="task.completed"
        @change="handleCheckboxChange"
        class="to-do__task-checkbox"
        aria-label="Toggle task completion"
      />
      <button class="to-do__task-remove-btn" @click="handleRemove" aria-label="Remove task">
        <span class="visually-hidden">Remove</span>
      </button>
    </div>
  </li>
</template>
