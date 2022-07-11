import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ()=> import('../views/AboutView.vue')
  },
  {
    path: '/login',
    name: 'loginView',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/registro',
    name: 'RegistroView',
    component: ()=>import('../views/RegistroView')
  },
  {
    path: '/mascotas',
    name: 'mascotasView',
    component: ()=> import('../views/MascotasView')
  },
  {
    path: '/usuarios',
    name: 'UsuariosView',
    component: ()=> import ('../views/UsuariosView')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
