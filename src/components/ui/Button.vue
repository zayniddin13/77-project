<template>
  <button
    :class="variants[variant] || styles"
    class="px-4 py-2 flex items-center justify-center rounded-lg gap-2 font-semibold max-[400px]:px-2"
  >
    <slot name="prefix"></slot>
    <p :class="resHidden">{{ title }}</p>
    <slot name="suffix"></slot>
  </button>
</template>
<script setup lang="ts">
import { defineProps } from "vue";
const props = defineProps<{
  title?: string;
  variant?: string;
  styles?: string;
  resHidden: String;
  type: String;
}>();
const variants = {
  primary: "bg-black-1 text-white active:scale-95 hover:bg-zinc-700",
  secondary:
    " bg-grey-4 font-semibold text-black-1 active:scale-95 hover:bg-gray-300 disabled:bg-gray-200 disabled:text-gray-400",
  bgBlueTextBlue:
    "bg-blue-1 text-main-blue hover:bg-blue-300 hover:cursor-pointer active:scale-95",
  bgBlueTextWhite:
    "bg-blue-1 text-white hover:bg-blue-300 hover:cursor-pointer active:scale-95 !text-center !px-auto",
};
</script>
