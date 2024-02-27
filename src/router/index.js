import { createRouter as _createRouter, createWebHistory } from 'vue-router'
import Dashboard from "../views/DashboardPage.vue";
import TaskPage from "../views/TaskPage.vue";
import AuthPage from "../views/AuthPage.vue";
import ProfilePage from "../views/ProfilePage.vue";

const routes = [
  {
    path: "/",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard Page",
      layout: "main",
    },
  },
  {
    path: "/boards/:id",
    name: "Task-board",
    component: TaskPage,
    meta: {
      title: "Task Page",
      layout: "main",
    },
  },
  {
    path: "/auth",
    name: "Auth",
    component: AuthPage,
    meta: {
      title: "Auth Page",
      layout: "empty",
    },
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfilePage,
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

