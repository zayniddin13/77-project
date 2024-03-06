<template>
  <div class="bg-white mt-8 sm:mt-16 pt-8 sm:!pt-14 pb-3 sm:pb-9 relative">
    <div class="contaniner">
      <div
        @click="closeSearchInputModel"
        class="top-0 left-0 w-full fixed h-screen bg-black/40 z-50"
        :class="openSearchModal ? 'block' : 'hidden'"
      />
      <div>
        <form>
          <MainInput
            :class="openSearchModal ? 'z-[60]' : ''"
            v-model="searchInputVal"
            @keyup.esc="closeSearchInputModel"
            @input="filterCategory(searchInputVal)"
            @click="openSearchInputModel"
            :placeholder="$t('search.placeholder')"
            type="text"
            backgronud="mainBg"
            class="flex items-center w-11/12 sm:w-8/12 mx-auto border transition-300 !py-7 md:max-w-[580px] bg-white rounded-lg absolute top-0 -translate-y-1/2 left-1/2 -translate-x-2/4 focus:border-2 focus-within:border-main-blue"
          >
            <template #prefix>
              <span class="ml-2 icon-search text-gray-400"></span>
            </template>
            <template #suffix>
              <EnterButton
                variant="primary"
                :title="t('search.text')"
                class="px-3 py-1 sm:px-7 sm:py-3"
                type="submit"
              />
            </template>
          </MainInput>
        </form>
      </div>
      <div
        :class="openSearchModal ? 'block' : 'hidden'"
        class="searchModal bg-white p-4 absolute z-50 w-8/12 mx-auto max-w-[580px] left-1/2 -translate-x-2/4 rounded-xl top-9"
      >
        <div class="search-modal-header font-medium text-sm text-greys-1">
          {{ $t("search.history") }}
        </div>
        <div v-if="filterValues.length">
          <ul v-for="(item, index) in filterValues" :key="index">
            <router-link :to="'/search-products/' + item.slug">
              <li
                @click="selectItem(item)"
                class="py-4 flex items-center justify-between"
              >
                <span class="flex items-center gap-1"
                  ><span class="icon-search text-main-blue text-sm"></span
                  ><span class="text-base font-medium text-black-1 leading-5">{{
                    item.name
                  }}</span></span
                >
                <span
                  class="icon-to-bottom text-xs -rotate-90 text-greys-2"
                ></span>
              </li>
            </router-link>
          </ul>
        </div>
        <div v-if="localInputVal && !filterValues.length">
          <ul v-for="(item, index) in localInputVal" :key="index">
            <router-link :to="'/search-products/' + item.slug">
              <li
                @click="selectItem(item.name)"
                class="py-4 flex items-center justify-between"
              >
                <span class="flex items-center gap-1"
                  ><span class="icon-star text-orange text-base"></span
                  ><span class="text-base font-medium text-black-1 leading-5">{{
                    item.name
                  }}</span></span
                >
                <span
                  class="icon-to-bottom text-xs -rotate-90 text-greys-2"
                ></span>
              </li>
            </router-link>
          </ul>
        </div>
        <div
          v-if="!filterValues.length && !localInputVal.length"
          class="flex justify-center items-center flex-col"
        >
          <img src="../../public/images/searchError.svg" alt="" />
          <h3 class="text-lg font-semibold text-black-1">
            {{ $t("noData.didntFind") }}
          </h3>
          <p class="text-sm font-normal text-greys-1 sm:mx-20 text-center">
            {{ $t("noData.didntFindAbout") }}
          </p>
        </div>
      </div>
      <div class="container">
        <div class="text-black-1 text-3xl font-normal text-center">
          {{ t("categories.title") }}
        </div>
        <div class="text-greys-1 text-base font-normal text-center">
          {{ t("categories.minTitle") }}
        </div>
        <div
          v-show="!loading"
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-10 my-9 relative"
        >
          <div v-for="item in fetchData" :key="item.id">
            <router-link
              :to="
                item.childs.length
                  ? ''
                  : `/more-product?categoty_id=+${item.id}`
              "
            >
              <Category
                :title="item.name"
                ref="target"
                :adds="item.ads_count"
                :image="item.icon || '/images/defaultImg.svg'"
              >
                <template v-if="item.childs.length" #suffix>
                  <span
                    @click="showToolTip(item)"
                    :class="item.name == tooltipName ? '' : '-rotate-90'"
                    class="icon-to-bottom text-greys-2 text-[8px] p-2 group-hover:text-blue-500 group-hover:translate-x-1.5 duration-500"
                  ></span>
                </template>
              </Category>
            </router-link>

            <ToolTip
              v-if="item.name == tooltipName"
              :categoryChilds="categoryChilds"
              :positionForX="position"
            />
          </div>
        </div>
        <div
          v-show="loading"
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-12 my-9"
        >
          <div v-for="item in fetchData" :key="item.id">
            <LoadingStills type="category" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import Category from "./Category.vue";
import MainInput from "../components/ui/Input.vue";
import EnterButton from "./ui/Button.vue";
import ToolTip from "../../src/components/ui/tooltip.vue";
import { onMounted, ref, watch } from "vue";

import {
  storeInstance,
  searchInstance,
  singletoreInstance,
} from "../../src/instances/index.js";
import LoadingStills from "../components/LoadingStills.vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();
const fetchData = ref([]);
const fetchdataWithCilds = ref([]);
const loading = ref(false);
const openSearchModal = ref(false);
const filterValues = ref([]);
const localInputVal = ref([]);
import { onClickOutside } from "@vueuse/core";
const openSearchInputModel = async () => {
  openSearchModal.value = true;
  try {
    const response = await singletoreInstance.get(
      `/my-favourite-product-by-id/`,
      {
        headers: {
          "Content-Type": "application/json",
          "Device-Id": localStorage.getItem("deviseId"),
        },
      }
    );
    localInputVal.value = response.data.results;
  } catch (error) {
    console.error("Ma’lumotlarni olishda xatolik yuz berdi:", error);
  }
  console.log(localInputVal.value);
  console.log(filterValues.value);
};
const searchInputVal = ref("");
const closeSearchInputModel = () => {
  openSearchModal.value = false;
  searchInputVal.value = "";
};

async function fetchDataFromApi() {
  console.log(locale._value);
  loading.value = true;
  try {
    loading.value = true;
    const responseWithChid = await storeInstance.get(
      `/categories-with-childs/`,
      {
        headers: {
          "Accept-Language": locale._value,
        },
      }
    );
    console.log(responseWithChid.data);
    fetchData.value = responseWithChid.data;
    console.log(fetchData.value);

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
async function filterCategory(item) {
  try {
    const result = await searchInstance.get(`/category-product/`, {
      headers: {
        "Accept-Language": locale._value,
      },
      params: {
        q: item,
      },
    });
    const highlightedText = result.data.product.map((product) => {
      const highlightedName = product.name.replace(
        new RegExp(item, "gi"),
        (match) => `<span style="background-color: red;">${match}</span>`
      );
      return { ...product, highlightedName };
    });
    filterValues.value = highlightedText;
    return;
  } catch (error) {
    console.error(error);
  }
}
async function selectItem(item) {
  openSearchModal.value = false;
  searchInputVal.value = item.name;
  try {
    const postById = await singletoreInstance.post(
      "/favourite-product-create-by-id/",
      {
        device_id: localStorage.getItem("deviseId"),
        product: item.id,
      }
    );
  } catch (error) {
    console.error("Error:", error);
  }
}
let tooltip = ref(false);
let tooltipName = ref("");
let position = ref("");
let categoryChilds = ref([]);
function showToolTip(item) {
  let categ = document.getElementById(`${item.name}`);
  const rect = categ.getBoundingClientRect();

  position.value = rect.left;
  tooltipName.value = item.name;
  tooltip.value = !tooltip.value;
  categoryChilds.value = item.childs;
  console.log(position.value);
  let categTool = document.getElementsByClassName("arrow");
  console.log(categTool);
}
const target = ref(null);
onClickOutside(target, (event) => (tooltipName.value = ""));
</script>
