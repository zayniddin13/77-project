<template>
  <div
    id="announ"
    class="rounded-xl border border-white shadow-anounce bg-white flex flex-col gap-2 font-inter leading-6 relative"
  >
    <button @click="liked" class="absolute top-3 left-3">
      <span v-if="!like" class="icon-heart"></span>
         <span v-if="like" class="icon-red-heart"></span>
    </button>
    <img
      :src="image"
      alt=""
      class="w-full h-60 max-sm:h-44 rounded-t-xl cover"
    />
    <div class="p-5">
      <div
        class="truncate text-blue-black hover:text-blue-500 whitespace-nowrap text-lg font-semibold"
      >
        {{ title }}
      </div>
      <div class="text-gray-300 text-base font-normal">{{ date }}</div>
      <div class="truncate text-gray-400 text-base font-semibold">
        {{ number }}
      </div>
      <div class="text-black text-2xl font-bold">
        {{ price }}
        <span class="text-blue-500 text-base font-medium leading-7">UZS</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue";
const like = ref(false);
function liked() {
  like.value = !like.value;
}

const props = defineProps<{
  title?: string;
  date?: string;
  phone?: number;
  price?: number;
  image?: string;
  number?: number;
}>();
</script>
