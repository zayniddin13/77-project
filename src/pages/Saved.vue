<template>
  <div class="container">
    <BreadCrump v-bind="{ routes }" />
    <div v-if="fetchDatas.length">
      <div
        v-show="!loading"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3 xs:gap-y-4 sm:gap-y-5 gap-x-3 xs:gap-x-6 sm:gap-x-12 my-9 mb-11"
      >
        <div
          v-for="(item, index) in fetchDatas"
          :key="index"
          class="cursor-pointer transition-300"
        >
          <Product
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
      <div
        v-show="loading"
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3 xs:gap-y-4 sm:gap-y-5 gap-x-3 xs:gap-x-6 sm:gap-x-12 my-9"
      >
        <LoadingStills type="product" />
        <LoadingStills type="product" />
        <LoadingStills type="product" />
      </div>
    </div>
    <div v-if="!fetchDatas.length && !loading" class="saved_body mb-14">
      <div class="saved__title block text-dark font-semibold text-3xl my-5">
        {{ $t("navbar.star") }}
      </div>
      <div class="saved__about flex items-center justify-center flex-col">
        <img src="/public/images/noData.svg" alt="" class="block" />
        <div class="block text-2xl font-bold text-dark leading-6 mt-6 mb-3">
          {{ $t("noData.noAddsTitle") }}
        </div>
        <div class="text-base font-normal leading-6 text-dark">
          {{ $t("noData.noAddsTitleAbout") }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Product from "../components/Add.vue";
import LoadingStills from "../components/LoadingStills.vue";
import dayjs from "dayjs";
import { storeInstance } from "../../src/instances/index.js";
import { ref, onMounted, computed, watch } from "vue";
import BreadCrump from "../components/ui/breadCrump.vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const routes = computed(() => [
  {
    label: t("about"),
    link: "/about",
  },
]);
const fetchDatas = ref([]);
const loading = ref(false);
const deviceID = JSON.parse(localStorage.getItem("deviseId"));

const fetchDataFromApi = async (id) => {
  loading.value = true;
  try {
    const response = await storeInstance.get(`/my-favourite-product-by-id/`, {
      headers: {
        "Content-Type": "application/json",
        "Device-Id": id,
      },
    });
    console.log(response.data.results);
    fetchDatas.value = response.data.results;
  } catch (error) {
    console.error("Ma’lumotlarni olishda xatolik yuz berdi:", error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 500);
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
