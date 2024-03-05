<template>
  <div class="flex items-center text-sm py-5 font-bold gap-1">
    <router-link to="/" class="ml-0"
      ><i class="icon-house-medical text-base text-black-1 mr-1"></i>
      {{ $t("breadcrump.mainPage") }}</router-link
    >

    <template v-for="(item, index) in routes">
      <i class="w-1 h-1 rounded-full text-greys-2 shrink-0"></i>
      <span v-if="index !== routes.length - 1">
        <router-link :to="item.link">{{ item.label }}</router-link>
      </span>
      <span v-else class="text-grey-3 line-clamp-1">{{ item.label }}</span>
    </template>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const props = defineProps<{
  title?: string;
  variant?: string;
  styles?: string;
  routes: {
    label: string;
    link: string;
  }[];
}>();
</script>
