import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/HomePage.vue";
import Dashboard from "../views/DashboardPage.vue";
import TaskPage from "../views/TaskPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "Home Page",
      layout: "empty",
    },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      title: "Dashboard Page",
      layout: "main",
    },
  },
  {
    path: "/boards/:id",
    name: "task-board",
    component: TaskPage,
    meta: {
      title: "Task Page",
      layout: "main",
    },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
});

export default router;
