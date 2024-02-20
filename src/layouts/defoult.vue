<template>
  <router-view v-slot="{ Component }">
    <Header />
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
    <Footer  />
  </router-view>
</template>

<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

import { RouterView } from "vue-router";
import NotFoundComponent from "@/pages/NotFoundComponent.vue";
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
