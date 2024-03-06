import { createRouter, createWebHistory } from "vue-router";
import Main from "../pages/Main.vue";
import SiteDirection from "../pages/UsingRules.vue";
import Saved from "../pages/Saved.vue";
import SingleProduct from "../pages/SinglePageProduct.vue";
import NotFoundComponent from "../pages/NotFoundComponent.vue";
import MoreAddSection from "../pages/MoreAddSection.vue";
import searchSingleProduct from "../pages/searchSingleProduct.vue";
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
        layout: "default",
      },
      component: Saved,
    },
    {
      path: "/search-products/:slug",
      name: "searchSingleProduct",
      meta: {
        layout: "default",
      },
      component: searchSingleProduct,
    },
    {
      path: "/products/:slug",
      name: "SingleProduct",
      meta: {
        layout: "default",
      },
      component: SingleProduct,
    },
    {
      path: "/pages/:slug",
      name: "siteDirection",
      meta: {
        layout: "default",
      },
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
      path: "/more-product-categoty_id/:id",
      name: "MoreAddSectionCateg",
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
