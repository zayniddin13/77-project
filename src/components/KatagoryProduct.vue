<template>
  <div
    class="flex items-center rounded-xl shadow-little border border-gray-300 relative pr-3 py-3"
  >
    <img
      name="prefix"
      class="category-icon  relative ml-0 -translate-x-1/2 my-auto mr-6 w-10 h-10 bg-white"
      :src="image"
      alt=""
    />
    <div class="flex w-full justify-between items-center">
<div class="product_about">
      <div
        class="title truncate text-black font-inter text-base no-italic font-semibold"
      >
        {{ title}}
      </div>
      <div
        class="adds truncate text-gray-400 font-inter text-sm font-base leading-tight"
      >
        {{ adds + " " + "объявлений"}}
      </div>
    </div>
    <span class="icon-to-bottom text-xs"></span>
    </div>
    
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  title?: string;
  adds?: number;
  image?: string;
}>();
</script>
<style scoped>
.category-icon {
  filter: invert(0) sepia(0%) saturate(4419%) hue-rotate(200deg)
    brightness(100%) contrast(100%);
}
 /* filter: invert(54%) sepia(52%) saturate(4419%) hue-rotate(194deg)
    brightness(98%) contrast(95%); */
</style>
