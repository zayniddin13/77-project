<template>
  <div class="py-3 overflow-x-hidden max-md:hidden">
    <div class="container flex items-center gap-1.5 md:overflow-hidden">
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
    <div class="body grid grid-cols-2 gap-10">
      <div class="about_img">
        <swiper v-if="product"
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
            <img :src="image" />
          </swiper-slide>
        </swiper>

        <swiper v-if="product"
          @swiper="setThumbsSwiper"
          :spaceBetween="10"
          :slidesPerView="4"
          :freeMode="true"
          :watchSlidesProgress="true"
          :modules="modules"
          class="mySwiper"
        >
          <swiper-slide v-for="(img, index) in product.photos" :key="index">
            <img :src="img" />
          </swiper-slide>
        </swiper>
      </div>
      <div v-if="product" class="img_adress">
        <div class="product_seller">
          <div>
            <img v-if="product.seller.profile_photo" :src="product.seller.profile_photo" />
            <div v-if="product.seller" class="profile_name">
              <h1>{{ product.seller.full_name }}</h1>
              <h3>{{ product.seller.id }}</h3>
            </div>
          </div>
          <h1 v-if="product.seller" class="profile_number">{{ product.seller.phone_number }}</h1>
          <EnterButton title="Все объявления" variant="secondary"> 
          </EnterButton>
        </div>
        <div class="">
        <div class="p-4">
<h3>Местоположение</h3>
<div class="h-1 w-full bg-gray-400"></div>
<div><span class="icon-location"></span> <span>{{ product.address.name }}</span></div>
        </div>
        </div>
        <EnterButton title="Скачать в галерею" variant="download"></EnterButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import EnterButton from "./Button.vue";
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";

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

onMounted(async () => {
  console.log(`${route.params.slug}`);
  try {
    const response = await axios.get(
      `https://77-dev.uicgroup.tech/api/v1/store/ads/${route.params.slug}/`
    );
    console.log(response.data); // Ma'lumotlarni konsolga chop etish
    product.value = response.data;
    console.log(product.value);
  } catch (error) {
    console.error("Error fetching product:", error);
  }
});
// swiper

const setThumbsSwiper = (swiper) => {
  thumbsSwiper.value = swiper;
};

const modules = [FreeMode, Navigation, Thumbs];

// You may modify this based on your needs
</script>
