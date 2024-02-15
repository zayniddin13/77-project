<template>
  <div class="container">
      <div class="container">
    <div class="flex items-center gap-1.5 md:overflow-hidden">
      <router-link
        to="/"
        class="flex-y-center gap-1 text-dark leading-130 text-sm font-medium transition-300 hover:text-blue group"
      >
        Главная</router-link
      >
      <span class="w-1 h-1 rounded-full bg-gray-400 shrink-0"></span>
      <router-link
        to=""
        class="pointer-events-none !text-gray-400 transition-300 max-w-full flex-y-center cursor-pointer min-w-max group-last:min-w-[100px] sm:group-last:min-w-[200px] breadcrumb-menu line-clamp-1 whitespace-nowrap text-dark leading-130 text-sm font-medium transition-300 hover:text-blue"
        >О сайте 77.uz</router-link
      >
    </div>
  </div>
    <div v-if="fetchDatas" class=" pt-5 pb-16 md:px-4 max-w-3xl mx-auto">
      <h1
        class="text-2xl md:text-3.5xl font-bold leading-130 text-dark max-md:px-4"
      >
 {{ fetchDatas.title }}
      </h1>
      </div>
       <div v-if="fetchDatas" class="p-4 bg-white mt-2.5 static-text">
        <div v-html="fetchDatas.content" ref="text"></div>
       </div>
   </div>
  
</template>
<script setup >
import { onMounted, ref, } from "vue";
import axios from "axios";
import { usingInstance } from "../instances";

let text = ref('')
console.dir(text)
let fetchDatas = ref(null);
let loading = ref(false);

const dataSlugFromApi = async () => {
  try {
    loading.value = true;
    const response = await usingInstance.get("pages/terms-and-conditions-for-sellers/");

    fetchDatas.value = response.data
    console.log(response.data);


    return;
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
};

onMounted(() => {
  dataSlugFromApi();
});


</script>
