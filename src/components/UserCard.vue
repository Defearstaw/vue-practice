<template>
  <div class="user-card" :class="user.role">
    <h3>{{ user.name }}</h3>
    <p>Email: {{ user.email }}</p>
    <p>Роль: {{ user.role }}</p>
    <p>Статус: {{ isActive ? 'Активен' : 'Неактивен' }}</p>
    
    <!-- Слот для дополнительного контента -->
    <slot name="actions"></slot>
    
    <!-- Слот по умолчанию -->
    <slot>
      <p>Нет дополнительной информации</p>
    </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  user: {
    type: Object,
    required: true,
    validator: (value) => {
      return value.name && value.email
    }
  },
  isActive: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['user-clicked'])

const handleClick = () => {
  emit('user-clicked', props.user)
}
</script>

<style scoped>
.user-card {
  border: 1px solid #ddd;
  padding: 16px;
  margin: 10px;
  border-radius: 8px;
  max-width: 300px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.user-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.user-card.admin {
  border-color: #ff6b6b;
  background-color: #fff5f5;
}

.user-card.user {
  border-color: #4ecdc4;
  background-color: #f0fff4;
}
</style>