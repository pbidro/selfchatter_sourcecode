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
    component: () => import('../views/ChatView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

/*
import { getAuth } from "firebase/auth";

router.beforeEach((to, from, next) => {
  const { currentUser } = getAuth()
  const { meta: { authRequired } } = to
  if (currentUser && authRequired) {
    console.log(`${currentUser} y ${authRequired} redirigir a next`)
    next()
  } else if (!currentUser && authRequired) {
    console.log(`${currentUser} y ${authRequired} redirigir a register`)
    next("/register")
  }
  else if (currentUser && !authRequired) {
    console.log(`${currentUser} y ${authRequired} redirigir a home`)
    next("/")
  }
  else {
    console.log(`${currentUser} y ${authRequired} redirigir a nextpage`)
    next()
  }
})
*/

export default router
