<template>
  <div class="container">
    <div
      class="py-5 flex items-center gap-1.5 md:overflow-hidden overflow-x-hidden max-md:hidden"
    >
      <a
        href="/"
        class="flex-y-center gap-1 text-dark leading-130 text-sm font-medium transition-300 hover:text-blue-400 group"
        >Asosiy sahifa</a
      >
      <div class="flex items-center gap-1.5 overflow-hidden group shrink-0">
        <i class="w-1 h-1 rounded-full bg-gray-3 shrink-0"></i
        ><a
          href="/product/?category_ids=120"
          class="transition-300 max-w-full flex-y-center cursor-pointer min-w-max group-last:min-w-[100px] sm:group-last:min-w-[200px] breadcrumb-menu line-clamp-1 whitespace-nowrap text-black leading-130 text-sm font-medium transition-300 hover:text-blue-400"
          >Erkaklar kiyimi</a
        >
      </div>
      <div class="flex items-center gap-1.5 overflow-hidden group shrink-0">
        <i class="w-1 h-1 rounded-full bg-gray-3 shrink-0"></i
        ><a
          href="/product/?category_ids=137"
          class="transition-300 max-w-full flex-y-center cursor-pointer min-w-max group-last:min-w-[100px] sm:group-last:min-w-[200px] breadcrumb-menu line-clamp-1 whitespace-nowrap text-blue leading-130 text-sm font-medium transition-300 hover:text-blue-400"
          >Ustki kiyimlar</a
        >
      </div>
      <div class="flex items-center gap-1.5 overflow-hidden group shrink-0">
        <i class="w-1 h-1 rounded-full bg-gray-400 shrink-0"></i
        ><a
          aria-current="page"
          href="/product/vetrovka-dlia-muzhchin-dozhdevik-kurtka"
          class="router-link-active router-link-exact-active pointer-events-none !text-gray-300 transition-300 max-w-full flex-y-center cursor-pointer min-w-max group-last:min-w-[100px] sm:group-last:min-w-[200px] breadcrumb-menu line-clamp-1 whitespace-nowrap leading-130 text-sm font-medium transition-300 hover:text-blue-400"
          >Vetrovka, kurtka, kuz - bahor ...</a
        >
      </div>
    </div>
    <div class="body md:flex gap-10 block">
      <div class="md:w-8/12 w-full">
        <div v-if="product" :class="product ? 'px-6 py-5 bg-white rounded-2xl' : 'animate-pulse'">
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
              style="width:100vw margin-right:0"
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
            class="mySwiper mySwiper2"
          >
            <swiper-slide class="swiperSlide2" v-for="(img, index) in product.photos" :key="index">
              <img class="rounded-2xl" :src="img" />
            </swiper-slide>
          </swiper>
          <h3 class="my-4 font-inter font-bold text-xl text-black">
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
          <div class="flex justify-between items-center">
            <div>
              <span class="font-inter font-bold text-3xl text-black">{{
                formatMoneyDecimal(product.price)
              }}</span
              ><span class="font-inter font-mediumn text-lg text-blue-600 ml-2"
                >UZS</span
              >
            </div>
            <a href="tel:+998 71 200 70 07" target="_blank">
              <EnterButton
                title="+998 71 200 70 07"
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
          <div class="font-ibmPlex font-normal text-base">
            {{ product.description }}
          </div>
        </div>
        <div v-if="product" class="px-6 py-5 bg-white rounded-2xl my-4">
          <h3 class="font-inter font-bold text-black text-2xl">Продавец</h3>
          <div class="flex justify-between items-center">
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
                <h3 class="font-inter font-normal text-xs text-gray-500">
                  ID: {{ product.seller.id }}
                </h3>
              </div>
            </div>
            <a
              href="tel: +998 71 200 70 07"
              target="_blank"
              class="font-inter text-black font-semibold text-base"
              >+998 71 200 70 07</a
            >
          </div>
        </div>
      </div>

      <div v-if="product" class="img_adress max-w-xs w-full">
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
          <h1
            v-if="product.seller"
            class="profile_number font-inter font-semibold text-base mt-3 mb-5"
          >
            {{ product.seller.phone_number }}
          </h1>
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
          class="max-w-xs w-full flex items-center justify-center"
        >
          <template #suffix>
            <span class="icon-download text-xl text-blue-500 font-bold"></span>
          </template>
        </EnterButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import EnterButton from "../components/ui/Button.vue";
import { storeInstance } from "../../src/instances/index.js";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import dayjs from "dayjs";

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

const product = ref(null);
const route = useRoute();
const formatPublishedTime = (time) => {
  return dayjs(time).format("D-MMMM, YYYY, HH:mm");
};
async function dataFetch() {
  console.log(`${route.params.slug}`);
  try {
    const response = await storeInstance.get(
      `/ads/${route.params.slug}/`
    );
    console.log(response.data); // Ma'lumotlarni konsolga chop etish
    product.value = response.data;
    console.log(product.value);
  } catch (error) {
    console.error("Error fetching product:", error);
  }
}
onMounted(() => {
  dataFetch(), formatPublishedTime();
});

function formatMoneyDecimal(number: any, fix = 0, option = "decimal") {
  let style: "currency";
  // if (["USD", "RUB"].includes(option)) {
  //   style = "currency";
  // } else {
  //   style = "";
  // }

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
