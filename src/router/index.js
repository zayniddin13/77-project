import { createRouter, createWebHistory } from "vue-router";
import Main from "../pages/Main.vue";
import SiteDirection from "../pages/UsingRules.vue";
import Saved from "../pages/Saved.vue";
import SingleProduct from "../pages/SinglePageProduct.vue";
import NotFoundComponent from "../pages/NotFoundComponent.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Layout",
      component: () => import("@/layouts/defoult.vue"),
      children: [
        {
          path: "/",
          name: "home",
          component: Main,
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
        {
          path: "/pages/:slug",
          name: "siteDirection",
          component: SiteDirection,
        },
      ],
    },

    {
      path: "/:path(.*)",
      name: "NotFoundComponent",
      // meta: {
      //   layout: "",
      // },
      component: NotFoundComponent,
    },
  ],
});

export default router;
