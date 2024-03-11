<template>
  <div>
    <div
      class="footer mt-8 pt-14 md:pt-16 pb-3 bg-light bg-cover bg-[url('/public/images/circling.svg')] bg-center relative bg-[#F6F6F6]"
    >
      <router-link
        to="/"
        class="absolute top-0 left-[50%] -translate-x-2/4 -translate-y-[45%]"
        ><img src="/public/images/shadowLogo.svg" alt=""
      /></router-link>
      <div class="container">
        <p
          class="footer_about text-black-1 text-center text-base font-normal leading-6 md:mx-44 not-italic mb-8"
        >
          {{ $t("footer.whatThisApp") }}
        </p>
        <div class="flex flex-wrap items-center justify-center gap-5 md:gap-20">
          <transition mode="out-in">
            <router-link
              :to="
                '/pages/' +
                (fetchDatas && fetchDatas[1] ? fetchDatas[1].slug : '')
              "
              class="flex items-center justify-center gap-1"
            >
              <img src="/public/images/footerLogo.svg" alt="" /><span
                class="text-black-1 text-base md:text-xl font-semibold leading-6 hover:text-blue-600"
                >{{ $t("footer.aboutUs") }}</span
              >
            </router-link>
          </transition>
          <transition mode="out-in">
            <router-link
              :to="
                '/pages/' +
                (fetchDatas && fetchDatas[0] ? fetchDatas[0].slug : '')
              "
              class="flex items-center justify-center gap-1"
              ><img src="/public/images/footerLogo.svg" alt="" /><span
                class="text-black-1 text-base md:text-xl font-semibold leading-6 hover:text-main-blue"
                >{{ $t("footer.aboutUs") }}</span
              ></router-link
            >
          </transition>
          <transition mode="out-in">
            <a
              href="tel: +998 88 278 96 96"
              target="_blank"
              class="flex items-center justify-center gap-1"
              ><img src="/public/images/footerLogo.svg" alt="" /><span
                class="text-black-1 text-base md:text-xl font-semibold leading-6 hover:text-main-blue"
                >{{ number }}</span
              ></a
            >
          </transition>
        </div>
        <div class="mt-6 mb-2 flex items-center justify-center gap-6">
          <a
            href="https://apps.apple.com/uz/app/77-uz/id6476024229"
            target="_blank"
            ><img src="/public/images/appStore.svg" alt=""
          /></a>
          <a
            href="https://play.google.com/store/apps/details?id=uz.uz77.uz77app&hl=uz&gl=US&pli=1"
            target="_blank"
            ><img src="/public/images/googlePlay.svg" alt=""
          /></a>
        </div>
        <div v-html="$t('footer.advice')"></div>
      </div>
    </div>
    <div class="bg-white py-4">
      <div class="container flex items-center justify-between">
        <div class="flex items-center gap-2">
          <span class="text-black-1 font-medium text-sm">© 77.uz</span>
          <span class="text-black-1 font-normal text-sm">
            {{ thisYear }}. {{ $t("footer.prevented") }}</span
          >
        </div>
        <uicLogo />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref } from "vue";
import uicLogo from "../../src/components/ui/uicLogo.vue";
import axios from "axios";
import { usingInstance } from "../instances";
let fetchDatas = ref(null);
let loading = ref(false);
let thisYear = new Date().getFullYear();
console.log(thisYear);

const dataSlugFromApi = async () => {
  try {
    loading.value = true;
    const response = await usingInstance.get("/pages/");

    fetchDatas.value = response.data;

    return;
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
};
const number = ref("");
const dataNumberFromApi = async () => {
  try {
    loading.value = true;
    const result = await usingInstance.get("/setting/");

    number.value = result.data.phone;
    number.value = number.value.replace(
      /(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/,
      "$1 $2 $3 $4 $5"
    );
    return;
  } catch (error) {
    console.log(error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
};

onMounted(() => {
  dataSlugFromApi(), dataNumberFromApi();
});
let show = ref(false);

function mouseOver() {
  show.value = true;
  console.log(show.value);
}

function mouseOut() {
  show.value = false;
  console.log(show.value);
}
</script>
