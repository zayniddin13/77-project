<template>
  <div
    class="container bg-white mt-8 sm:mt-16 pt-8 sm:!pt-14 pb-3 sm:pb-9 relative z-0"
  >
    <div
      @click="closeSearchInputModel"
      class="top-0 left-0 w-full fixed h-full bg-black/40 z-50"
      :class="openSearchModal ? 'block' : 'hidden'"
    />
    <MainInput
      :class="openSearchModal ? 'z-[60]' : ''"
      v-model="searchInputVal"
      @click="openSearchInputModel"
      :placeholder="$t('search.placeholder')"
      type="text"
      backgronud="mainBg"
      class="flex items-center w-8/12 mx-auto border transition-300 !py-7 max-w-[580px] bg-white rounded-lg absolute top-0 -translate-y-1/2 left-1/2 -translate-x-2/4 focus:border-2"
    >
      <template #prefix>
        <span class="ml-2 icon-search text-gray-400"></span>
      </template>
      <template #suffix>
        <EnterButton
          variant="primary"
          :title="t('search.text')"
          class="px-3 py-1 sm:px-7 sm:py-3"
        />
      </template>
    </MainInput>

    <div class="container">
      <div class="text-black font-inter text-3xl font-normal text-center">
        {{ t("categories.title") }}
      </div>
      <div class="font-inter text-base not-italic font-normal text-center">
        {{ t("categories.minTitle") }}
      </div>
      <div
        v-show="!loading"
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-12 my-9"
      >
        <div v-for="item in fetchData" :key="item.id">
          <Category
            :title="item.name"
            :adds="item.product_count"
            :image="item.icon"
          />
        </div>
      </div>
      <div
        v-show="loading"
        class="grid md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-12 my-9"
      >
        <div v-for="item in fetchData.length" :key="item.id">
          <LoadingStills type="category" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Category from "./Category.vue";
import MainInput from "../components/ui/Input.vue";
import EnterButton from "./ui/Button.vue";
import { onMounted, ref, watch } from "vue";

import { storeInstance } from "../../src/instances/index.js";
import LoadingStills from "../components/LoadingStills.vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const fetchData = ref([]);
const loading = ref(false);
const openSearchModal = ref(false);

const openSearchInputModel = () => {
  openSearchModal.value = true;
};
const closeSearchInputModel = () => {
  openSearchModal.value = false;
};
const searchInputVal = ref("");

async function fetchDataFromApi() {
  console.log(locale._value);
  loading.value = true;
  try {
    loading.value = true;
    const response = await storeInstance.get(`/category/`, {
      headers: {
        "Accept-Language": locale._value,
      },
    });

    fetchData.value = response.data;
    console.log(response);

    console.log(loading.value);
    return;
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      loading.value = false;
      console.log(loading.value);
    }, 500);
  }
}
onMounted(() => {
  loading.value;
  fetchDataFromApi();
});
watch(
  locale,
  async (newValue, oldValue) => {
    if (newValue !== oldValue) {
      fetchDataFromApi();
    }
    console.log(localStorage.getItem("locale"));
  },
  { deep: true }
);
watch(openSearchModal, () => {
  document.body.classList.toggle("overflow-hidden", openSearchModal.value);
});
watch(searchInputVal, () => {
  filterCategory.value = categories.value.filter((category) =>
    category.name.toLowerCase().includes(searchInputVal.value.toLowerCase())
  );
});
</script>
