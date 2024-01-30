<template>
  <div class="katagory bg-white mt-16 pt-14 pb-9 relative z-4">
      <MainForm
      
        placeholder="main"
        type="text"
        backgronud="mainBg"
        class="flex items-center w-8/12 mx-auto border transition-300  p-2 max-w-[580px] bg-white  rounded-lg absolute z-20 top-0 -translate-y-1/2 left-1/2 -translate-x-2/4 focus:border-2 "
      >
      <template #prefix class="mx-3">
      <span class="icon-search text-gray-400"></span>
        </template>
        <template #suffix>
          <EnterButton variant="primary" title="Поиск" class="px-7 py-3" />
        </template>
      </MainForm>


    <div class="container">
      <div
        class="katagory_title text-black font-inter text-3xl font-normal text-center"
      >
        Категории
      </div>
      <div class="font-inter text-base not-italic font-normal text-center">
        Вы можете найти все категории, которые вам нужны от покупателя
      </div>
      <div
        class="katagory_about grid md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-12 my-9"
      >
        <div v-for="item in fetchData" :key="item.id">
          <Katagory :title="item.name" :adds="item.product_count" :image="item.icon" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Katagory from "./KatagoryProduct.vue";
import MainForm from "./Form.vue";
import EnterButton from "./Button.vue";
import { computed, onMounted, ref } from "vue";
const fetchData = ref(null);
const loading = ref(false);
const fetchDataFromApi = computed(async () => {
  loading.value = true;

  await fetch("https://admin.77.uz/api/v1/store/category/")
    .then((response) => response.json())
    .then((data) => {
  
      fetchData.value = data;
      console.log( fetchData.value);
    })
    .catch((error) => {

    })
     .finally(()=>{
      loading.value = false
    }) 
});
onMounted(() => {
  fetchDataFromApi.value;
})
</script>
