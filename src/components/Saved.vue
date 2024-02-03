<template>
  <div class="container">
    <div class="flex items-center gap-1.5 md:overflow-hidden">
      <router-link
        to="/"
        class="flex items-center gap-1 text-dark leading-6 text-sm font-medium transition-300 hover:text-blue-600"
      >
        Главная
      </router-link>
      <div class="flex items-center gap-1.5 overflow-hidden group shrink-0">
        <i class="w-1 h-1 rounded-full bg-gray-300 shrink-0"></i
        ><a
          aria-current="page"
          href="/favourites"
          class="router-link-active router-link-exact-active pointer-events-none !text-gray-300 transition-300 flex items-center cursor-pointer whitespace-nowrap text-dark leading-130 text-sm font-medium transition-300 hover:text-blue"
          >Избранные</a
        >
      </div>
     
    </div>
     <div class="saved_body mb-14">
        <div class="saved__title block text-dark font-semibold text-3xl my-5">Избранные</div>
        <div class="saved__about flex items-center justify-center flex-col">
            <img src="/public/images/noData.svg" alt="" class="block">
            <div class="block text-2xl font-bold text-dark leading-6 mt-6 mb-3">Нет избранных объявлений</div>
            <div class="text-base font-normal leading-6 text-dark">Вы еще не добавили в избранное ни одну рекламу</div>
        </div>
      </div>
  </div>
</template>
<script setup>
import { v4 as uuidv4 } from 'uuid';
let myuuid = crypto.randomUUID();
import { ref, onMounted, computed, watch } from "vue";
const fetchDatas = ref([]);
const loading = ref(false);
const fetchDataFromApi = watch(async () => {
  loading.value = true;
  
  await fetch(`https://77-dev.uicgroup.tech/api/v1/store/my-favourite-product/`)
    .then((response) => response.json())
    .then((data) => {
      fetchDatas.value = data.results;
      console.log(fetchDatas.value);
    })
    .catch((error) => {})
    .finally(() => {
      loading.value = false;
    });
});
onMounted(() => {
    fetchDataFromApi.value;
});
</script>
