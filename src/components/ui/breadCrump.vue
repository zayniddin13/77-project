<template>
  <div class="flex items-center text-sm py-5 font-bold">
    <router-link to="/" class="flex items-center"
      ><i class="icon-house-medical text-base text-white mr-1"></i>
      Home</router-link
    >
    <span v-if="routes.length > 0" class="mx-1"></span>
    <template v-for="(breadcrumbItem, index) in routes">
      <span v-if="index !== routes.length - 1">
        <router-link :to="breadcrumbItem.link">{{
          breadcrumbItem.label
        }}</router-link>
      </span>
      <span v-else class="text-gray-500 line-clamp-1">{{
        breadcrumbItem.label
      }}</span>
      <span v-if="index !== routes.length - 1" class="mx-1"></span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";


const props = defineProps<{
  title?: string;
  variant?:string;
    styles?: string;
   routes: {
    label: string;
    link: string;
  }[];
}>();
</script>