import { createRouter, createWebHistory } from "vue-router";
import AboutUs from "../pages/AboutUs.vue";
import Main from "../pages/Main.vue";
import UsingRules from "../pages/UsingRules.vue";
import Saved from "../pages/Saved.vue";
import SingleProduct from "../pages/SinglePageProduct.vue";
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
    {
      path: "/products",
    },
    {
      path: "/products/:slug",
      name: "SingleProduct",
      component: SingleProduct,
    },
  ],
});

export default router;
