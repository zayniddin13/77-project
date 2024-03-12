<template>
  <div class="pt-3 sm:pt-14 pb-5 sm:pb-9 relative">
    <div class="container">
      <div class="katagory_title text-black-1 text-3xl font-normal text-center">
        {{ $t("products.title") }}
      </div>
      <div class="text-base text-greys-1 font-normal text-center">
        {{ $t("products.minTitle") }}
      </div>
      <div
        class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-3 xs:gap-y-4 sm:gap-y-5 gap-x-3 xs:gap-x-6 my-9"
      >
        <template v-if="fetchDatas">
          <div
            v-show="!loading"
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
              :image="item.photo || '/images/defaultImg.svg'"
              :slug="item.slug"
              :islike="item.is_liked"
            />
          </div>
        </template>

        <div v-show="loading" v-for="item in fetchDatas" :key="item.id">
          <LoadingStills type="product" v-show="loading" />
        </div>
      </div>
      <div v-show="!loading" class="w-full flex justify-center">
        <router-link to="/more-product">
          <Button
            :title="$t('button.more')"
            styles="flex group justify-center items-center gap-2 ease-in-out  bg-grey-4 border-2 font-semibold text-base border-grey-border text-black-1 !rounded-[200px] py-3 px-7 hover:bg-gray-300"
          >
            <template #suffix
              ><img
                class="group-hover:-rotate-90 transition-all duration-300"
                src="../../public/images/twoBottom.svg"
            /></template>
          </Button>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import Add from "./Add.vue";
import dayjs from "dayjs";
import { onMounted, ref, watch } from "vue";
import { get } from "@vueuse/core";
import Button from "../components/ui/Button.vue";
import { storeInstance } from "../../src/instances/index.js";
import LoadingStills from "../components/LoadingStills.vue";
import Vuelidate from "../components/vuelidate.vue";
// import fetchAdds from "../composables/fetchAdds.js";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const fetchDatas = ref([]);
const loading = ref(false);
let localId = JSON.parse(localStorage.getItem("deviseId"));

const fetchDataFromApi = async () => {
  console.log(locale._value);
  let deviceId = localStorage.getItem("deviseId");
  if (!deviceId) {
    deviceId = Math.floor(Math.random() * 10000000000000000);
    localStorage.setItem("deviseId", deviceId);
  }
  try {
    loading.value = true;
    const response = await storeInstance.get(`/list/ads/?page_size=8`, {
      headers: {
        "Device-Id": deviceId,
        "Accept-Language": locale._value,
      },
    });

    fetchDatas.value = response.data.results;
    console.log(fetchDatas.value);
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      loading.value = false;
      console.log(loading.value);
    }, 500);
  }
};
// const { data } = fetchAdds(storeInstance)
// fetchDatas.value=data

const formatPublishedTime = (time) => {
  return dayjs(time).format("D-MMMM, YYYY");
};

onMounted(() => {
  fetchDataFromApi();
  formatPublishedTime();
});
watch(
  locale,
  async (newValue, oldValue) => {
    if (newValue !== oldValue) {
      fetchDataFromApi();
    }
  },
  { deep: true }
);
</script>
