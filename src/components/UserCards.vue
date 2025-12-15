<template>
  <div class="demo-container">
    <h2>Пример 4: Компоненты и пропсы</h2>
    
    <div class="description">
      <p>Этот пример показывает работу с компонентами, пропсами и слотами в Vue.js.</p>
    </div>
    
    <div class="users-section">
      <h3>Список пользователей</h3>
      
      <!-- Администратор с использованием слотов -->
      <div class="admin-section">
        <h4>Администратор</h4>
        <UserCard
          :user="adminUser"
          :is-active="true"
          @user-clicked="handleUserClick"
        >
          <!-- Именованный слот actions -->
          <template #actions>
            <button @click="editUser(adminUser)" class="edit-btn">Редактировать</button>
            <button @click="toggleAdminStatus" class="toggle-btn">
              {{ adminUser.isActive ? 'Деактивировать' : 'Активировать' }}
            </button>
          </template>
          
          <!-- Слот по умолчанию -->
          <p><strong>Привилегии:</strong> Полный доступ к системе</p>
          <p><strong>Последний вход:</strong> Сегодня, 14:30</p>
        </UserCard>
      </div>
      
      <!-- Обычные пользователи -->
      <div class="regular-users">
        <h4>Обычные пользователи ({{ users.length }})</h4>
        <div class="users-grid">
          <UserCard
            v-for="user in users"
            :key="user.id"
            :user="user"
            :is-active="user.isActive"
            @user-clicked="handleUserClick"
          >
            <!-- Слот по умолчанию для обычных пользователей -->
            <p><strong>Зарегистрирован:</strong> {{ formatDate(user.registered) }}</p>
            <p v-if="user.lastLogin"><strong>Последний вход:</strong> {{ user.lastLogin }}</p>
          </UserCard>
        </div>
      </div>
    </div>
    
    <!-- Статистика -->
    <div class="stats">
      <h3>Статистика</h3>
      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">Всего пользователей:</span>
          <span class="stat-value">{{ totalUsers }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Активных:</span>
          <span class="stat-value">{{ activeUsers }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Администраторов:</span>
          <span class="stat-value">{{ adminCount }}</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Обычных:</span>
          <span class="stat-value">{{ regularUsers }}</span>
        </div>
      </div>
    </div>
    
    <!-- Управление -->
    <div class="controls">
      <h3>Управление пользователями</h3>
      <div class="control-buttons">
        <button @click="addNewUser" class="add-btn">Добавить пользователя</button>
        <button @click="toggleAllActive" class="toggle-all-btn">
          {{ allActive ? 'Деактивировать всех' : 'Активировать всех' }}
        </button>
        <button @click="clearUsers" class="clear-btn">Очистить список</button>
      </div>
    </div>
    
    <!-- Информация о клике -->
    <div v-if="lastClickedUser" class="click-info">
      <h4>Последний кликнутый пользователь:</h4>
      <p><strong>Имя:</strong> {{ lastClickedUser.name }}</p>
      <p><strong>Email:</strong> {{ lastClickedUser.email }}</p>
      <p><strong>Роль:</strong> {{ lastClickedUser.role }}</p>
      <button @click="lastClickedUser = null" class="clear-info-btn">Очистить</button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import UserCard from './UserCard.vue'

// Администратор
const adminUser = ref({
  id: 1,
  name: 'Анна Иванова',
  email: 'anna@example.com',
  role: 'admin',
  isActive: true,
  registered: '2023-01-15'
})

// Список обычных пользователей
const users = ref([
  {
    id: 2,
    name: 'Петр Сидоров',
    email: 'petr@example.com',
    role: 'user',
    isActive: true,
    registered: '2023-03-20',
    lastLogin: 'Вчера, 18:45'
  },
  {
    id: 3,
    name: 'Мария Петрова',
    email: 'maria@example.com',
    role: 'user',
    isActive: false,
    registered: '2023-05-10',
    lastLogin: '2 дня назад'
  },
  {
    id: 4,
    name: 'Иван Кузнецов',
    email: 'ivan@example.com',
    role: 'user',
    isActive: true,
    registered: '2023-07-30'
  },
  {
    id: 5,
    name: 'Елена Смирнова',
    email: 'elena@example.com',
    role: 'user',
    isActive: true,
    registered: '2023-09-15',
    lastLogin: 'Сегодня, 09:20'
  }
])

// Последний кликнутый пользователь
const lastClickedUser = ref(null)

// Вычисляемые свойства
const totalUsers = computed(() => users.value.length + 1) // + администратор
const activeUsers = computed(() => {
  const activeRegular = users.value.filter(u => u.isActive).length
  return activeRegular + (adminUser.value.isActive ? 1 : 0)
})
const adminCount = computed(() => 1) // только один администратор
const regularUsers = computed(() => users.value.length)
const allActive = computed(() => {
  return adminUser.value.isActive && users.value.every(u => u.isActive)
})

// Методы
const handleUserClick = (user) => {
  console.log('Клик по пользователю:', user)
  lastClickedUser.value = user
  alert(`Вы кликнули на: ${user.name}\nEmail: ${user.email}`)
}

const editUser = (user) => {
  const newName = prompt('Введите новое имя:', user.name)
  if (newName && newName.trim()) {
    user.name = newName.trim()
    alert(`Имя пользователя изменено на: ${user.name}`)
  }
}

const toggleAdminStatus = () => {
  adminUser.value.isActive = !adminUser.value.isActive
  alert(`Статус администратора изменен: ${adminUser.value.isActive ? 'Активен' : 'Неактивен'}`)
}

const addNewUser = () => {
  const name = prompt('Введите имя нового пользователя:')
  if (!name || !name.trim()) return
  
  const email = prompt('Введите email нового пользователя:')
  if (!email || !email.includes('@')) {
    alert('Некорректный email')
    return
  }
  
  const newUser = {
    id: Date.now(),
    name: name.trim(),
    email: email.trim(),
    role: 'user',
    isActive: true,
    registered: new Date().toLocaleDateString('ru-RU')
  }
  
  users.value.push(newUser)
  alert(`Пользователь ${name} добавлен!`)
}

const toggleAllActive = () => {
  const newStatus = !allActive.value
  adminUser.value.isActive = newStatus
  users.value.forEach(user => {
    user.isActive = newStatus
  })
  alert(`Все пользователи ${newStatus ? 'активированы' : 'деактивированы'}`)
}

const clearUsers = () => {
  if (confirm('Удалить всех обычных пользователей?')) {
    users.value = []
    alert('Все пользователи удалены')
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('ru-RU')
}
</script>

<style scoped>
.demo-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.description {
  margin-bottom: 30px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.users-section {
  margin-bottom: 30px;
}

.admin-section {
  margin-bottom: 30px;
}

.users-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 15px;
}

.edit-btn, .toggle-btn, .add-btn, .toggle-all-btn, .clear-btn, .clear-info-btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  margin: 5px;
}

.edit-btn {
  background-color: #007bff;
  color: white;
}

.toggle-btn {
  background-color: #6c757d;
  color: white;
}

.add-btn {
  background-color: #28a745;
  color: white;
}

.toggle-all-btn {
  background-color: #ffc107;
  color: black;
}

.clear-btn {
  background-color: #dc3545;
  color: white;
}

.clear-info-btn {
  background-color: #6c757d;
  color: white;
  margin-top: 10px;
}

.stats {
  margin: 30px 0;
  padding: 20px;
  background-color: #e9ecef;
  border-radius: 8px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.stat-item {
  padding: 10px;
  background-color: white;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
}

.stat-label {
  font-weight: bold;
}

.stat-value {
  font-weight: bold;
  color: #007bff;
}

.controls {
  margin: 30px 0;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.control-buttons {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 15px;
}

.click-info {
  margin-top: 30px;
  padding: 20px;
  background-color: #d1ecf1;
  border: 1px solid #bee5eb;
  border-radius: 8px;
  color: #0c5460;
}
</style>