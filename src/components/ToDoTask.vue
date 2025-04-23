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
        class="to-do__task-checkbox"
        aria-label="Toggle task completion"
        :checked="task.completed"
        @change="handleCheckboxChange"
      />
      <button class="to-do__task-remove-btn" @click="handleRemove" aria-label="Remove task">
        <span class="visually-hidden">Remove</span>
      </button>
    </div>
  </li>
</template>

<style lang="scss">
@use '/src/scss/variables.scss' as *;
.to-do {
  &__list {
    width: 100%;
    display: grid;
    row-gap: 16px;
    min-height: 100px;
    padding: 0;
    margin-bottom: 60px;
    list-style: none;
  }

  &__task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 5%;
    padding-right: 5%;
    min-height: 75px;
    max-height: 75px;
    background-color: $item-background;
    border-radius: 10px;
  }

  &__task-item--completed {
    color: $task-completed;
    font-size: 16px;
    text-decoration: line-through;
  }

  &__task-content {
    color: $task-active;
    font-size: 16px;
  }

  &__task-content--completed {
    color: $task-completed;
  }

  &__task--completed {
    color: $task-completed;
    font-size: 16px;
    text-decoration: line-through;
  }

  &__task-controls--completed {
    display: none;
  }

  &__task-remove-btn {
    width: 30px;
    height: 30px;
    background-color: transparent;
    background-image: url(/src/assets/Vector.svg);
    background-repeat: no-repeat;
    background-position: center;
    border: none;
  }
}
</style>
