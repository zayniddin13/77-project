<script setup>
import { useRoute } from "vue-router";
import Defoult from "./layouts/defoult.vue";
import empty from "./layouts/empty.vue";

const layouts = {
  empty: empty,
  default: Defoult,
};

const route = useRoute();
</script>
<template>
  <div>
    <component :is="layouts[route.meta.layout]">
      <router-view></router-view>
    </component>
  </div>
</template>
