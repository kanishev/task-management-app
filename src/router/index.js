import Vue from "vue";
import VueRouter from "vue-router";
import Dashboard from "../views/DashboardPage.vue";
import TaskPage from "../views/TaskPage.vue";
import AuthPage from "../views/AuthPage";
import ProfilePage from "../views/ProfilePage.vue";
import store from "../store/index";

Vue.use(VueRouter);

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

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  console.log(store.state.user);
  if (
    (!store.state.user && to.name == "Dashboard") ||
    (!store.state.user && to.name == "Profile") ||
    (!store.state.user && to.name == "Task-board")
  ) {
    next({ name: "Auth" });
  } else {
    document.title = `${to.meta.title}  Page`;
    next();
  }
});

export default router;
