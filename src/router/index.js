import { createRouter, createWebHistory } from 'vue-router'
import AboutUs from "../components/AboutUs.vue";
import Main from "../components/Main.vue";
import UsingRules from "../components/UsingRules.vue";
import Saved from "../components/Saved.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: Main,
    },
    {
      path: "/about-us",
      name: "aboutUs",
      component: AboutUs,
    },
    {
      path: "/using-rules",
      name: "UsingRules",
      component: UsingRules,
    },
    {
      path: "/saved",
      name: "saved",
      component: Saved,
    },
  ],
});

export default router
