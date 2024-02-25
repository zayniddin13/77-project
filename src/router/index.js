import { createRouter, createWebHistory } from "vue-router";
import Main from "../pages/Main.vue";
import SiteDirection from "../pages/UsingRules.vue";
import Saved from "../pages/Saved.vue";
import SingleProduct from "../pages/SinglePageProduct.vue";
import NotFoundComponent from "../pages/NotFoundComponent.vue";
import MoreAddSection from "../pages/MoreAddSection.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        layout: "default",
      },
      component: Main,
    },
    {
      path: "/saved",
      name: "saved",
      meta: {
        layout: "empty",
      },
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
    {
      path: "/pages/:slug",
      name: "siteDirection",
      component: SiteDirection,
    },
    {
      path: "/more-product",
      name: "MoreAddSection",
      meta: {
        layout: "default",
      },
      component: MoreAddSection,
    },

    {
      path: "/:path(.*)",
      name: "NotFoundComponent",
      meta: {
        layout: "empty",
      },
      component: NotFoundComponent,
    },
  ],
});

export default router;
