<template>
  <div class="demo-container">
    <h2>Пример 4: Компоненты и пропсы</h2>
    
    <h3>Список пользователей</h3>
    
    <!-- Передаем данные через пропсы -->
    <UserCard
      :user="adminUser"
      :is-active="true"
      @user-clicked="handleUserClick"
    >
      <!-- Именованный слот -->
      <template #actions>
        <button @click="editUser(adminUser)" class="edit-btn">Редактировать</button>
      </template>
      
      <!-- Слот по умолчанию -->
      <p>Администратор системы</p>
    </UserCard>
    
    <UserCard
      v-for="user in users"
      :key="user.id"
      :user="user"
      @user-clicked="handleUserClick"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import UserCard from './UserCard.vue'

const adminUser = ref({
  id: 1,
  name: 'Анна Иванова',
  email: 'anna@example.com',
  role: 'admin'
})

const users = ref([
  {
    id: 2,
    name: 'Петр Сидоров',
    email: 'petr@example.com',
    role: 'user'
  },
  {
    id: 3,
    name: 'Мария Петрова',
    email: 'maria@example.com',
    role: 'user'
  },
  {
    id: 4,
    name: 'Иван Кузнецов',
    email: 'ivan@example.com',
    role: 'user'
  }
])

const handleUserClick = (user) => {
  console.log('Клик по пользователю:', user)
  alert(`Вы кликнули на: ${user.name}`)
}

const editUser = (user) => {
  console.log('Редактирование:', user)
  alert(`Редактирование пользователя: ${user.name}`)
}
</script>

<style scoped>
.demo-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.edit-btn {
  padding: 5px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}
</style>