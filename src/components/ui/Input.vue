<template>
  <div :class="variants[backgronud]" class="xs:px-3 px-1">
    <slot name="prefix"></slot>
    <input
      :type="variants[type]"
      class="outline-0 border border-transparent w-full mx-auto my-0"
      :placeholder="placeholder"
    />
    <slot name="suffix"></slot>
  </div>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  placeholder?: string;
  type?: "number" | "text";
  title?: string;
  backgronud?: "mainBg" | "modal";
}>();
const variants = {
  primary: "bg-black text-white",
  secondary: "bg-gray-400 text-black",
};
</script>
