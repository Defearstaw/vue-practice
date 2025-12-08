<template>
  <div class="demo-container">
    <h2>Пример 5: Поиск и кастомный v-model</h2>
    
    <!-- Используем кастомный v-model -->
    <SearchInput
      v-model="searchQuery"
      label="Поиск по имени:"
      placeholder="Введите имя пользователя..."
      @search="performSearch"
      @reset="resetSearch"
    />
    
    <p>Текущий запрос: "{{ searchQuery }}"</p>
    
    <div v-if="searchResults.length">
      <h3>Результаты поиска:</h3>
      <ul class="results-list">
        <li v-for="user in searchResults" :key="user.id" class="result-item">
          {{ user.name }} - {{ user.email }}
        </li>
      </ul>
    </div>
    <div v-else-if="searchQuery">
      <p class="no-results">Пользователи не найдены</p>
    </div>
    <div v-else>
      <p class="hint">Начните вводить имя для поиска</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SearchInput from './SearchInput.vue'

const searchQuery = ref('')
const users = ref([
  { id: 1, name: 'Анна', email: 'anna@test.com' },
  { id: 2, name: 'Борис', email: 'boris@test.com' },
  { id: 3, name: 'Виктор', email: 'victor@test.com' },
  { id: 4, name: 'Галина', email: 'galina@test.com' },
  { id: 5, name: 'Дмитрий', email: 'dmitry@test.com' }
])

const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []
  const query = searchQuery.value.toLowerCase()
  return users.value.filter(user =>
    user.name.toLowerCase().includes(query) ||
    user.email.toLowerCase().includes(query)
  )
})

const performSearch = () => {
  console.log('Выполняем поиск:', searchQuery.value)
  alert(`Поиск выполнен: найдено ${searchResults.value.length} пользователей`)
}

const resetSearch = () => {
  searchQuery.value = ''
}
</script>

<style scoped>
.demo-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
}

.results-list {
  list-style: none;
  padding: 0;
}

.result-item {
  padding: 10px 15px;
  border: 1px solid #ddd;
  margin: 5px 0;
  border-radius: 4px;
  background-color: white;
}

.no-results {
  color: #dc3545;
  font-style: italic;
}

.hint {
  color: #6c757d;
  font-style: italic;
}
</style>