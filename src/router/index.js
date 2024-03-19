import { createRouter as _createRouter, createWebHistory } from 'vue-router'
import AuthPage from "../views/AuthPage.vue";
import ProfilePage from "../views/ProfilePage.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: () => import('../views/DashboardPage.vue'),
    meta: {
      title: "Dashboard Page",
      layout: "main",
    },
  },
  {
    path: "/boards/:id",
    name: "Task-board",
    component: () => import('../views/TaskPage.vue'),
    meta: {
      title: "Task Page",
      layout: "main",
    },
  },
  {
    path: "/auth",
    name: "Auth",
    component: () => import('../views/AuthPage.vue'),
    meta: {
      title: "Auth Page",
      layout: "empty",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import('../views/ProfilePage.vue'),
    meta: {
      title: "Profile Page",
      layout: "main",
    },
  },
];

export function createRouter(){
  return _createRouter({
    history: createWebHistory(),
    base: import.meta.env.BASE_URL,
    routes
  })
}

