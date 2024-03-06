<template>
  <div
    class="flex items-center rounded-xl shadow-little border border-gray-300 px-3 py-3 group hover:border-blue-500 hover:cursor-pointer transition-300"
  >
    <div
      :id="title"
      class="p-4 ml-0 -translate-x-1/2 my-auto mr-6 bg-white border border-gray-300 shadow-some rounded-md group-hover:border-blue-500"
    >
      <img
        name="prefix"
        class="category-icon relative w-8 h-6"
        :src="image"
        alt=""
      />
    </div>
    <div class="flex w-full justify-between items-center">
      <div class="product_about">
        <div class="title truncate text-black text-base font-semibold">
          {{ title }}
        </div>
        <div
          v-if="adds"
          class="adds truncate text-gray-400 text-sm font-base leading-tight"
        >
          {{ adds + " " + "объявлений" }}
        </div>
      </div>
      <slot name="suffix"></slot>
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
  filter: invert(54%) sepia(52%) saturate(4419%) hue-rotate(194deg)
    brightness(98%) contrast(95%);
}
</style>
