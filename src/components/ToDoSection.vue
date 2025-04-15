<script setup>
import { ref, computed } from 'vue'

const newTask = ref('')
const tasks = ref([])

// ⚠️ Для ID лучше использовать uuid вместо Date.now(). При быстром добавлении задач может кинуть ошибку
const addTask = () => {
  if (newTask.value.trim()) {
    tasks.value.push({
      id: Date.now(),
      text: newTask.value.trim(),
      completed: false,
    })
    newTask.value = ''
  }
}

const removeTask = (id) => {
  tasks.value = tasks.value.filter((task) => task.id !== id)
}

// ⚠️ Если не реализовано — не пушим. На работе тоже, иначе очень быстро засорим код
const moveTaskToCompleted = (task) => {}

const activeTasks = computed(() => tasks.value.filter((task) => !task.completed))

const completedTasks = computed(() => tasks.value.filter((task) => task.completed))
</script>

<template>
  <section class="to-do__section">
    <div class="to-do__wrapper">
      <!-- ⚠️ input-wrapper - название не соответствует содержанию. Лучше назвать блок "to-do__create-block" или как-то так -->
      <!-- ⚠️ Плюс названо не по БЭМ -->
      <!-- ⚠️ Лучше вынести в отдельный компонент -->
      <div class="input-wrapper">
        <input class="to-do__input" placeholder="Add a new task" type="text" v-model="newTask" />
        <button class="to-do__add-btn" @click="addTask">
          <span class="visually-hidden">add</span>
        </button>
      </div>

      <h2 class="to-do__subtitle">Tasks to do - {{ tasks.length }}</h2>
      <ul class="to-do__list">
        <!-- ⚠️ Лучше переименовать класс для консистентности .to-do__task  -->
        <!-- ⚠️ Вынести в отдельный компонент  -->
        <li class="to-do__item" v-for="task in activeTasks" :key="task.id">
          <span class="to-do__task--active">{{ task.text }}</span>
          <!-- ⚠️ не по БЭМ -->
          <!-- ⚠️ button-wrapper → to-do__controls/to-do__buttons -->
          <div class="button-wrapper">
            <!-- ⚠️ Вынести в отдельный компонент  -->
            <label class="custom-checkbox">
              <input
                type="checkbox"
                v-model="task.completed"
                @change="moveTaskToCompleted(task)"
                hidden
              />
              <span class="checkmark"></span>
            </label>
            <button class="remove-button" @click="removeTask(task.id)">
              <span class="visually-hidden">remove</span>
            </button>
          </div>
        </li>
      </ul>

      <h2 class="to-do__subtitle">Done - {{ completedTasks.length }}</h2>
      <ul class="to-do__list" v-if="completedTasks.length > 0">
        <!-- ⚠️ Вынести в отдельный компонент. Лучше переиспользуй компонент, который создашь выше для обычной тудушки  -->
        <li class="to-do__item" v-for="task in completedTasks" :key="task.id">
          <span class="to-do__task--completed">{{ task.text }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style lang="scss">
// ⚠️ переменные не храним в компонентах (за редкими исключениями). Выносим в отдельный файл assets/variablse.scss
$background: #0d0714;
$subtitle: #ffffff;
$input-text: #777777;
$input-border: #3e1671;
$task-active: #9e78cf;
$task-completed: #78cfb0;
$item-background: #15101c;

.to-do {
  font-family: 'Inter', sans-serif;
  overflow: hidden;

  &__section {
    max-width: 983px;
    max-height: 796px;
    min-height: 200px;
    background-color: $background;
    border-radius: 80px;
    position: relative;
    left: 35%;
  }

  &__wrapper {
    width: 44%;
    max-width: 432px;
    margin: 0 auto;
    padding-top: 74px;
    padding-bottom: 74px;
  }

  &__input {
    min-width: 381px;
    widows: 100%; // ⚠️ Опечатка? widows → width
    height: 40px;  // ⚠️ Фиксированная высота для инпутов это плохо - лучше использовать padding
    padding-left: 15px;
    background-color: transparent;
    border: solid 1px $input-border; // ⚠️Стандартный порядок → border: 1px solid color
    border-radius: 10px;
    color: $input-text;
  }

  &__add-btn {
    width: 40px;
    height: 40px;
    background-color: $task-active;
    background-image: url(../assets/Plus.svg);
    background-repeat: no-repeat;
    background-position: center;
    border: none;
    border-radius: 10px;
  }

  &__subtitle {
    color: $subtitle;
    font-size: 16px;
    margin-bottom: 17px;
  }

  &__list {
    width: 100%;
    min-height: 100px;
    padding: 0;
    list-style: none;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px; // ⚠️ Лучше использовать gap в родительском grid
    padding-left: 5%;
    padding-right: 5%;
    min-height: 75px;
    background-color: $item-background;
    border-radius: 10px;
  }

  &__task--active {
    color: $task-active;
    font-size: 16px;
  }

  &__task--completed {
    color: $task-completed;
    font-size: 16px;
    text-decoration: line-through;
  }
}

.custom-checkbox {
  width: 30px;
  height: 30px;
}

.input-wrapper {
  display: flex;
  justify-content: space-between;
  margin-bottom: 59px;
}

.button-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
}

.remove-button {
  width: 30px;
  height: 30px;
  background-color: transparent;
  background-image: url(../assets/Vector.svg);
  background-repeat: no-repeat;
  background-position: center;
  border: none;
}

.checkmark {
  display: inline-block;
  width: 30px;
  height: 30px;
}

.checkmark::after {
  content: '';
  position: absolute;
  display: block;
  width: 30px;
  height: 30px;
  background-color: transparent;
  background-image: url(../assets/Check.svg);
  background-repeat: no-repeat;
  background-position: center;
}

// ⚠️ Вынести в глобальные стили
.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  white-space: nowrap;
  clip-path: inset(100%);
  clip: rect(0 0 0 0);
  overflow: hidden;
}
</style>
