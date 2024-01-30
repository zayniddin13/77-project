<template>
  <div class="mt-16 pt-14 pb-9 relative">
    <div class="container">
      <div
        class="katagory_title text-black font-inter text-3xl font-normal text-center"
      >
        Объявления
      </div>
      <div class="font-inter text-base not-italic font-normal text-center">
        Вы можете найти все категории, которые вам нужны от покупателя
      </div>
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-5 gap-x-12 my-9">
        <div v-for="(item, index) in fetchDatas" :key="index" class="cursor-pointer transition-300">
          <Announce
         
            :title="item.name"
            :date="formatPublishedTime(item.published_at) "
            number="+998 88 278 96 96"
            :price="item.price"
            :image="item.photo"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Announce from "./Anounsment.vue";
import dayjs from 'dayjs'
import { computed, onMounted, ref } from "vue";
const fetchDatas = ref([]);
const loading = ref(false);
const fetchDataFromApi = computed(async () => {
  loading.value = true;


  await fetch("https://admin.77.uz/api/v1/store/list/ads/")
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
const formatPublishedTime = (time) => {

   return    dayjs(time).format('D-MMMM, YYYY')
    };
onMounted(() => {
    fetchDataFromApi.value;
  formatPublishedTime()
});

</script>
