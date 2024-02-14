<template>
  <div class="mt-4 sm:mt-16 pt-3 sm:pt-14 pb-2 sm:pb-9 relative">
    <div class="container">
      <div
        class="katagory_title text-black font-inter text-3xl font-normal text-center"
      >
        Объявления
      </div>
      <div class="font-inter text-base not-italic font-normal text-center">
        Вы можете найти все категории, которые вам нужны от покупателя
      </div>
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3 xs:gap-y-4 sm:gap-y-5 gap-x-3 xs:gap-x-6 sm:gap-x-12 my-9"
      >
        <div
          v-for="(item, index) in fetchDatas"
          :key="index"
          class="cursor-pointer transition-300"
        >
          <Add
            :id="item.id"
            :title="item.name"
            :date="formatPublishedTime(item.published_at)"
            number="+998 88 278 96 96"
            :price="item.price"
            :image="item.photo"
            :slug="item.slug"
            :islike="item.is_liked"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Add from "./Add.vue";
import dayjs from "dayjs";
import { onMounted, ref } from "vue";
import { get } from "@vueuse/core";
import { storeInstance } from "../../src/instances/index.js";
const fetchDatas = ref([]);
const loading = ref(false);

//  let localId = JSON.parse(localStorage.getItem("deviseId"));

const fetchDataFromApi = async () => {
  loading.value = true;

  let deviseId = localStorage.getItem("deviseId");

  if (deviseId) {
    try {
      loading.value = true;
      const response = await storeInstance.get(`/list/ads/`, {
        headers: {
          "Device-Id": localStorage.getItem("deviseId"),
        },
      });

      fetchDatas.value = response.data.results;
      console.log(response.data.results);
      console.log(fetchDatas.value);

      return;
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  } else {
    deviseId = Math.floor(Math.random() * 10000000000000000);
    localStorage.setItem("deviseId", JSON.stringify(deviseId));
    // localId = JSON.parse(localStorage.getItem("deviseId"));
      try {
      loading.value = true;
      const response = await storeInstance.get(`/list/ads/`, {
        headers: {
          "Device-Id": localStorage.getItem("deviseId"),
        },
      });

      fetchDatas.value = response.results;
      console.log(response);
      console.log(fetchDatas.value);

      return;
    } catch (error) {
      console.log(error);
    } finally {
      loading.value = false;
    }
  }
};

const formatPublishedTime = (time) => {
  return dayjs(time).format("D-MMMM, YYYY");
};

onMounted(() => {
  fetchDataFromApi();
  formatPublishedTime();
});
</script>
