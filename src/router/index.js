import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import UserProfile from '../views/UserProfile.vue'
import UserSettings from '../views/UserSettings.vue'
import NotFound from '../views/NotFound.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/profile',
    name: 'Profile',
    component: UserProfile
  },
  {
    path: '/profile/:id',
    name: 'UserDetail',
    component: UserProfile,
    props: true
  },
  {
    path: '/settings',
    name: 'Settings',
    component: UserSettings,
    redirect: '/settings/general'
  },
  {
    path: '/settings/:tab',
    name: 'SettingsTab',
    component: UserSettings,
    props: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router