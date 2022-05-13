import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
    meta: { authRequired: true }
  },

  {
    path: '/register',
    name: 'RegistrarView',
    component: () => import('../views/RegistrarView.vue')
  },

  {
    path: '/login',
    name: 'LoginView',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import('../views/ChatView.vue'),
    meta: { authRequired: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
import { getAuth } from "firebase/auth";

router.beforeEach((to, from, next) => {
console.log('pase por el before each')
  const { currentUser } = getAuth()
  const { meta: { authRequired } } = to
  if (currentUser && authRequired) {
    console.log(currentUser)
    console.log(`cu: ${currentUser} y ar: ${authRequired} redirigir a next`)
    next()
  } else if (!currentUser && authRequired) {
    console.log(currentUser)
    console.log(`cu: ${currentUser} y ar: ${authRequired} redirigir a register`)
    next("/login")
  }
  else {
    console.log(currentUser)
    console.log(`cu: ${currentUser} y ar:${authRequired} redirigir a nextpage`)
    next()
  }
})

export default router
