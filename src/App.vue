<template>
  <div id="app">
    <header class="app-header">
      <h1>Vue 3 Практика - Основы</h1>
      <p>Изучаем реактивность, директивы и компоненты</p>
    </header>

    <!-- Навигация между примерами -->
    <nav class="navigation">
      <button
        @click="currentDemo = 'reactive'"
        :class="{ active: currentDemo === 'reactive' }"
        class="nav-button"
      >
        Пример 1: Реактивность
      </button>
      <button
        @click="currentDemo = 'conditional'"
        :class="{ active: currentDemo === 'conditional' }"
        class="nav-button"
      >
        Пример 2: Списки и условия
      </button>
      <button
        @click="currentDemo = 'events'"
        :class="{ active: currentDemo === 'events' }"
        class="nav-button"
      >
        Пример 3: События
      </button>
      <button
        @click="currentDemo = 'usercards'"
        :class="{ active: currentDemo === 'usercards' }"
        class="nav-button"
      >
        Пример 4: Компоненты и пропсы
      </button>
      <button
        @click="currentDemo = 'searchexample'"
        :class="{ active: currentDemo === 'searchexample' }"
        class="nav-button"
      >
        Пример 5: Поиск и v-model
      </button>
      <button
        @click="currentDemo = 'router'"
        :class="{ active: currentDemo === 'router' }"
        class="nav-button"
      >
        Пример 6: Vue Router
      </button>
      <button
        @click="currentDemo = 'palette'"
        :class="{ active: currentDemo === 'palette' }"
        class="nav-button"
      >
        Генератор палитр
      </button>
    </nav>

    <!-- Отображаем выбранный компонент -->
    <main class="main-content">
      <!-- Компонент ReactiveDemo -->
      <ReactiveDemo v-if="currentDemo === 'reactive'" />

      <!-- Компонент ConditionalListDemo -->
      <ConditionalListDemo v-else-if="currentDemo === 'conditional'" />

      <!-- Компонент EventComputedDemo -->
      <EventComputedDemo v-else-if="currentDemo === 'events'" />

      <!-- Компонент UserCards -->
      <UserCards v-else-if="currentDemo === 'usercards'" />

      <!-- Компонент SearchExample -->
      <SearchExample v-else-if="currentDemo === 'searchexample'" />

      <!-- Компонент RouterExample -->
      <RouterExample v-else-if="currentDemo === 'router'" />

      <!-- Компонент PaletteGenerator -->
      <PaletteGenerator v-else-if="currentDemo === 'palette'" />

      <!-- Сообщение если ничего не выбрано -->
      <div v-else class="welcome-message">
        <h2>Добро пожаловать!</h2>
        <p>Выберите пример для изучения из навигации выше.</p>
      </div>
    </main>

    <footer class="app-footer">
      <p>Vue 3 + Vite • Практики 27-28</p>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ReactiveDemo from './components/ReactiveDemo.vue'
import ConditionalListDemo from './components/ConditionalListDemo.vue'
import EventComputedDemo from './components/EventComputedDemo.vue'
import UserCards from './components/UserCards.vue'
import SearchExample from './components/SearchExample.vue'
import RouterExample from './components/RouterExample.vue'
import PaletteGenerator from './components/PaletteGenerator.vue'

const currentDemo = ref('reactive')
</script>

<style>
/* Глобальные стили */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f5f5f5;
  color: #333;
  line-height: 1.6;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* Cтили шапки */
.app-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  text-align: center;
}

.app-header h1 {
  margin-bottom: 0.5rem;
  font-size: 2.5rem;
}

.app-header p {
  opacity: 0.9;
  font-size: 1.1rem;
}

/* Навигация */
.navigation {
  display: flex;
  justify-content: center;
  gap: 1rem;
  padding: 1.5rem;
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  flex-wrap: wrap;
}

.nav-button {
  padding: 0.75rem 1.5rem;
  border: 2px solid #667eea;
  background-color: transparent;
  color: #667eea;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.nav-button:hover {
  background-color: #667eea;
  color: white;
  transform: translateY(-2px);
}

.nav-button.active {
  background-color: #667eea;
  color: white;
}

/* Основное содержимое */
.main-content {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.welcome-message {
  text-align: center;
  padding: 4rem 2rem;
  color: #666;
}

.welcome-message h2 {
  margin-bottom: 1rem;
  color: #333;
}

/* Подвал */
.app-footer {
  background-color: #333;
  color: white;
  text-align: center;
  padding: 1rem;
  margin-top: auto;
}
</style>