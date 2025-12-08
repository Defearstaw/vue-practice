<template>
  <div class="demo-container">
    <h2>Пример 6: Vue Router</h2>
    
    <div class="router-demo">
      <!-- Навигация роутера -->
      <nav class="router-nav">
        <router-link to="/" class="nav-link">Главная</router-link>
        <router-link to="/profile" class="nav-link">Профиль</router-link>
        <router-link to="/profile/123" class="nav-link">Профиль #123</router-link>
        <router-link to="/settings" class="nav-link">Настройки</router-link>
        <router-link to="/settings/security" class="nav-link">Безопасность</router-link>
        <router-link to="/non-existent" class="nav-link">404 страница</router-link>
      </nav>
      
      <!-- Отображение текущего роута -->
      <div class="current-route">
        <h3>Текущий маршрут:</h3>
        <p>Путь: {{ $route.path }}</p>
        <p>Имя: {{ $route.name }}</p>
        <p>Параметры: {{ JSON.stringify($route.params) }}</p>
      </div>
      
      <!-- Контейнер для компонентов роутера -->
      <div class="router-view-container">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<style scoped>
.demo-container {
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
}

.router-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.nav-link {
  padding: 8px 16px;
  background-color: #6c757d;
  color: white;
  text-decoration: none;
  border-radius: 4px;
}

.nav-link:hover {
  background-color: #5a6268;
}

.nav-link.router-link-active {
  background-color: #007bff;
}

.current-route {
  padding: 15px;
  background-color: #e9ecef;
  border-radius: 8px;
  margin-bottom: 20px;
}

.router-view-container {
  padding: 20px;
  border: 2px dashed #dee2e6;
  border-radius: 8px;
  min-height: 300px;
}
</style>