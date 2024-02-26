<template>
  <button
    :class="variants[variant] || styles"
    class="px-4 py-2 flex items-center justify-center rounded-lg gap-2 font-semibold max-[400px]:px-2"
  >
    <slot name="prefix"></slot>
    <p class="hidden md:block">{{ title }}</p>
    <slot name="suffix"></slot>
  </button>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{
  title?: string;
  variant?: string;
  styles?: string;
}>();
const variants = {
  primary: "bg-black text-white active:scale-95 hover:bg-zinc-700",
  secondary:
    " bg-[#EAEDF0] text-black active:scale-95 hover:bg-gray-300 disabled:bg-gray-200 disabled:text-gray-400",
  bgBlueTextBlue:
    "bg-blue-300 text-blue-500 hover:bg-blue-400 hover:cursor-pointer active:scale-95",
  bgBlueTextWhite:
    "bg-blue-500 text-white hover:bg-blue-400 hover:cursor-pointer active:scale-95 !text-center !px-auto",
};
</script>
