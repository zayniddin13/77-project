<template>
  <div class="container">
    <div v-if="product" class="container md:hidden block py-6">
      <router-link to="/"
        ><img src="../../public/images/left.svg" alt="orqaga" />
      </router-link>
    </div>

    <BreadCrump v-bind="{ routes }" class="max-md:hidden" />
    <div v-show="!loading" class="body md:flex gap-10 block">
      <div v-if="product" class="md:w-8/12 w-full">
        <div
          :class="
            product
              ? 'min-w-400px:px-6 min-w-400px:py-5 px-2 py-2 bg-white rounded-2xl'
              : 'animate-pulse'
          "
        >
          <swiper
            :style="{
              '--swiper-navigation-color': '#fff',
              '--swiper-pagination-color': '#fff',
            }"
            :spaceBetween="10"
            :navigation="true"
            :thumbs="{ swiper: thumbsSwiper }"
            :modules="modules"
            class="mySwiper2"
          >
            <swiper-slide
              class="activeImg"
              v-for="(image, index) in product.photos"
              :key="index"
              style="width:100vw margin-right:0 "
            >
              <img
                class="rounded-2xl object-cover object-center"
                :src="image"
              />
            </swiper-slide>
          </swiper>

          <swiper
            v-if="product"
            @swiper="setThumbsSwiper"
            :spaceBetween="10"
            :slidesPerView="4"
            :freeMode="true"
            :watchSlidesProgress="true"
            :modules="modules"
            class="mySwiper"
          >
            <swiper-slide
              class="swiperSlide2"
              v-for="(img, index) in product.photos"
              :key="index"
            >
              <img class="rounded-2xl" :src="img" />
            </swiper-slide>
          </swiper>
          <h3 class="my-4 font-inter not-italic font-bold text-xl text-black">
            {{ product.name }}
          </h3>
          <div class="flex gap-4 pt-4 pb-6">
            <div class="bg-gray-300 py-1 px-2 rounded-md">
              {{ formatPublishedTime(product.updated_time) }}
            </div>
            <div
              class="bg-gray-300 py-1 px-2 rounded-md font-inter text-sm font-normal"
            >
              {{ product.address.district.name }}
            </div>
          </div>
          <div
            v-if="product"
            class="min-[400px]:flex justify-between items-center block"
          >
            <div>
              <span class="font-inter font-bold text-3xl text-black">{{
                formatMoneyDecimal(product.price)
              }}</span
              ><span class="font-inter font-mediumn text-lg text-blue-600 ml-2"
                >UZS</span
              >
            </div>
            <a v-if="product" href="tel:+998 71 200 70 07" target="_blank">
              <EnterButton
                :title="number"
                variant="bgBlueTextWhite"
                class="flex items-center justify-center"
              >
                <template #prefix>
                  <span class="icon-phone text-white"></span>
                </template>
              </EnterButton>
            </a>
          </div>
        </div>
        <div v-if="product" class="px-6 py-5 bg-white rounded-2xl my-4">
          <h3 class="font-inter font-bold text-black text-2xl">Описание</h3>
          <div class="font-ibmPlex font-normal text-base !break-words">
            {{ product.description }}
          </div>
        </div>
        <div v-if="product" class="px-6 py-5 bg-white rounded-2xl my-4">
          <h3 class="font-inter not-italic font-bold text-black text-2xl">
            Продавец
          </h3>
          <div class="sm:flex justify-between items-center block">
            <div class="flex items-center gap-3">
              <img
                v-if="product.seller.profile_photo"
                :src="product.seller.profile_photo"
                class="w-10 h-10 rounded-lg"
              />
              <div class="profile_name block">
                <h1 class="font-semibold text-black font-inter text-base">
                  {{ product.seller.full_name }}
                </h1>
                <h3
                  class="font-inter not-italic font-normal text-xs text-gray-500"
                >
                  ID: {{ product.seller.id }}
                </h3>
              </div>
            </div>
            <a
              v-if="product.seller.phone_number"
              href="tel:  {{ product.seller.phone_number }}"
              target="_blank"
              class="font-inter not-itelic text-black font-semibold text-base"
            >
              {{ number }}</a
            >
          </div>
        </div>
      </div>

      <div v-if="product" class="img_adress max-w-xs w-full pb-4">
        <div class="product_seller p-4 bg-white rounded-2xl">
          <div class="flex items-center gap-3">
            <img
              v-if="product.seller.profile_photo"
              :src="product.seller.profile_photo"
              class="w-10 h-10 rounded-lg"
            />
            <div v-if="product.seller" class="profile_name block">
              <h1 class="font-semibold text-black font-inter text-base">
                {{ product.seller.full_name }}
              </h1>
              <h3 class="font-inter font-normal text-xs text-gray-500">
                ID: {{ product.seller.id }}
              </h3>
            </div>
          </div>
          <a
            href="tel:  {{ product.seller.phone_number }}"
            target="_blank"
            v-if="product.seller.phone_number"
            class="font-inter not-itelic text-black font-semibold text-base"
          >
            {{ number }}</a
          >
          <EnterButton
            title="Все объявления"
            variant="secondary"
            class="flex items-center justify-center"
          >
          </EnterButton>
        </div>
        <div class="bg-white my-4 rounded-2xl">
          <div class="p-4">
            <h3 class="font-inter font-bold text-xl text-black">
              Местоположение
            </h3>
            <div class="h-[1px] w-full bg-gray-400 my-3"></div>
            <div class="flex gap-2.5">
              <span
                class="icon-location text-blue-500 text-3xl font-semibold"
              ></span>
              <span class="font-inter font-medium text-sm text-black">{{
                product.address.name
              }}</span>
            </div>
          </div>
        </div>
        <EnterButton
          title="Скачать в галерею"
          variant="bgBlueTextBlue"
          class="max-w-xs w-full flex items-center justify-center mb-6"
        >
          <template #suffix>
            <span class="icon-download text-xl text-blue-500 font-bold"></span>
          </template>
        </EnterButton>
      </div>
    </div>
    <div v-show="loading">
      <LoadingStills type="SingleProduct" />
    </div>
  </div>
</template>

<script setup lang="ts">
import EnterButton from "../components/ui/Button.vue";
import LoadingStills from "@/components/LoadingStills.vue";
import { storeInstance } from "../../src/instances/index.js";
import BreadCrump from "../components/ui/breadCrump.vue";
import { ref, onMounted, watch, computed } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import dayjs from "dayjs";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const breadcrumbs = ref([
  { label: "home", url: "/" },
  { label: "products", url: "/products" },
  { label: "electronics", url: "/products/electronics" },
  { label: "smartphones", url: "/products/electronics/smartphones" },
]);

// Import Swiper Vue.js components
import { Swiper, SwiperSlide } from "swiper/vue";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import "/public/style.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

const thumbsSwiper = ref(null);
const number = ref("");
let product = ref(null);
const route = useRoute();
let loading = ref(false);
let routes = ref(null);

const formatPublishedTime = (time) => {
  return dayjs(time).format("D-MMMM, YYYY, HH:mm");
};
async function dataFetch() {
  console.log(locale._value);
  console.log(`${route.params.slug}`);
  try {
    loading.value = true;
    const response = await storeInstance.get(`/ads/${route.params.slug}/`, {
      headers: {
        "Accept-Language": locale._value,
      },
    });
    // Ma'lumotlarni konsolga chop etish
    product.value = response.data;
    console.log(product.value);
    number.value = product.value.seller.phone_number.replace(
      /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
      "$1 $2 $3 $4 $5"
    );

    routes = computed(() => [
      {
        label:
          t(`${product.value.category}`) === null
            ? t(`${product.value.category.parent_category.name}`)
            : "",
        link: "/about",
      },
      {
        label: product.value.name,
        link: "",
      },
    ]);
  } catch (error) {
    console.error("Error fetching product:", error);
  } finally {
    setTimeout(() => {
      loading.value = false;
      console.log(loading.value);
    }, 500);
  }
}
console.log(product.value);

onMounted(() => {
  dataFetch();
  formatPublishedTime();
});
watch(
  locale,
  async (newValue, oldValue) => {
    if (newValue !== oldValue) {
      dataFetch();
    }
    console.log(localStorage.getItem("locale"));
  },
  { deep: true }
);

function formatMoneyDecimal(number: any, fix = 0, option = "decimal") {
  let style: "currency";
  const newStyle: string = style;
  const option2 = {
    newStyle,
    [newStyle]: option,
    maximumFractionDigits: fix,
    minimumFractionDigits: fix,
    decimal: ".",
  };
  return number
    ? new Intl.NumberFormat("ru-RU", option2).format(number)
    : "0.00";
}

// swiper

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const modules = [FreeMode, Navigation, Thumbs];

// You may modify this based on your needs
</script>
