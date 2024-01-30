<template>
  <form :class="variants[backgronud]">
    <slot name="prefix"></slot>
    <input
      :type="variants[type]"
      class="outline-0 border border-transparent w-full mx-auto my-0"
      :placeholder="variants[placeholder]"
    />
    <slot name="suffix"></slot>
  </form>
</template>
<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  placeholder?: "main" | "fio" | "product" | "login" | "password";
  type?: "number" | "text";
  title?: string;
  backgronud?: "mainBg" | "modal";
}>();
const variants = {
  primary: "bg-black text-white",
  secondary: "bg-gray-400 text-black",
  main: "Что вы ищите?",
  fio: "Введите вашу Ф.И.О.",
  product: "Введите название продукта",
  login: "Введите логин",
  password: "Введите пароль",
  mainBg: "bg-white focus-within:border-blue-500",
  modal: "bg-gray-300",
};
</script>
