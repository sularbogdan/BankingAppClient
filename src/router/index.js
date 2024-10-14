import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import SignUpView from '../views/SignUpView.vue';
import TransferView from "../views/TransferView.vue";

const routes = [
  {
    path: '/',
    redirect: '/login', 
  },
   
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUpView,
  },
  { 
    path: '/transfer',
    name: 'Transfer',
    component: TransferView,

  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
