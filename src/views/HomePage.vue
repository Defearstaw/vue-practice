<template>
  <div class="home-page">
    <h1>Главная страница</h1>
    <p>Добро пожаловать в наше приложение!</p>
    
    <div class="quick-actions">
      <button @click="goToProfile" class="btn">Перейти в профиль</button>
      <button @click="goToSettings" class="btn">Настройки</button>
    </div>
    
    <div class="user-list">
      <h3>Список пользователей:</h3>
      <ul>
        <li
          v-for="user in users"
          :key="user.id"
          @click="viewUser(user.id)"
          class="user-item"
        >
          {{ user.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const users = [
  { id: 1, name: 'Анна Иванова' },
  { id: 2, name: 'Петр Сидоров' },
  { id: 3, name: 'Мария Петрова' }
]

const goToProfile = () => {
  router.push('/profile')
}

const goToSettings = () => {
  router.push('/settings')
}

const viewUser = (userId) => {
  router.push(`/profile/${userId}`)
}
</script>

<style scoped>
.home-page {
  max-width: 800px;
  margin: 0 auto;
}

.quick-actions {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.user-list {
  margin-top: 30px;
}

.user-item {
  padding: 10px;
  border: 1px solid #ddd;
  margin: 5px 0;
  border-radius: 5px;
  cursor: pointer;
}

.user-item:hover {
  background-color: #f5f5f5;
}
</style>