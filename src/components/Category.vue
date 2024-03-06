<template>
  <div
    :class="active ? ' border-main-blue' : ' border-gray-300'"
    class="flex items-center rounded-xl shadow-little border px-3 py-3 group hover:border-blue-500 hover:cursor-pointer transition-300"
  >
    <div
      :id="title"
      :class="
        active
          ? 'bg-main-blue border border-main-blue'
          : 'bg-white border border-gray-300'
      "
      class="img-card p-4 ml-0 -translate-x-1/2 my-auto mr-6 shadow-some rounded-md group-hover:border-blue-500"
    >
      <img
        name="prefix"
        :class="active ? 'active' : 'category-icon'"
        class="relative w-8 h-6"
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
  active?: boolean;
}>();
</script>
<style scoped>
.category-icon {
  filter: invert(54%) sepia(52%) saturate(4419%) hue-rotate(194deg)
    brightness(98%) contrast(95%);
}
.active {
  filter: invert(98%) sepia(3%) saturate(985%) hue-rotate(236deg)
    brightness(120%) contrast(100%);
}
</style>
