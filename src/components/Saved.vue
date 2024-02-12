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
    <div
      v-if="fetchDatas.length"
      class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3 xs:gap-y-4 sm:gap-y-5 gap-x-3 xs:gap-x-6 sm:gap-x-12 my-9"
    >
      <div
        v-for="(item, index) in fetchDatas"
        :key="index"
        class="cursor-pointer transition-300"
      >
        <Announce
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
    <div v-if="!fetchDatas.length" class="saved_body mb-14">
      <div class="saved__title block text-dark font-semibold text-3xl my-5">
        Избранные
      </div>
      <div class="saved__about flex items-center justify-center flex-col">
        <img src="/public/images/noData.svg" alt="" class="block" />
        <div class="block text-2xl font-bold text-dark leading-6 mt-6 mb-3">
          Нет избранных объявлений
        </div>
        <div class="text-base font-normal leading-6 text-dark">
          Вы еще не добавили в избранное ни одну рекламу
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Announce from "./Add.vue";
import dayjs from "dayjs";
import { ref, onMounted, computed, watch } from "vue";
const fetchDatas = ref([]);
const loading = ref(false);
const deviceID = JSON.parse(localStorage.getItem("deviseId"));

const fetchDataFromApi = async (id) => {
  loading.value = true;

  try {
    const response = await fetch(
      `https://77-dev.uicgroup.tech/api/v1/store/my-favourite-product-by-id/`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          "Device-Id": id,
        },
      }
    );
    if (!response.ok) {
      console.error(`HTTP xato: ${response.status}`);
      throw new Error("Serverdan noto'g'ri javob");
    }

    const data = await response.json();
    fetchDatas.value = data.results;
    console.log(fetchDatas.value);
  } catch (error) {
    console.error("Ma’lumotlarni olishda xatolik yuz berdi:", error);
  } finally {
    loading.value = false;
  }
};
const formatPublishedTime = (time) => {
  return dayjs(time).format("D-MMMM, YYYY");
};
onMounted(() => {
  if (deviceID) {
    fetchDataFromApi(deviceID);
  } else {
    console.error("Devise ID topilmadi");
  }
  formatPublishedTime();
});
watch(
  () => deviceID,
  (newDeviceID, oldDeviceID) => {
    if (newDeviceID) {
      fetchDataFromApi(newDeviceID);
    }
  }
);
</script>
