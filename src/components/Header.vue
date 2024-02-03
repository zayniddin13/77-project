<template>
  <div class="navbar py-8 border-b bg-white/90 z-30 sticky top-0 left-0 backdrop-blur-[6px]">
    <div class="container flex justify-between items-center">
      <div class="navbar_left flex items-center gap-6 relative z-0">
        <div
          @click="toggleSHowing"
          ref="target"
          class="navbar__lang flex items-center"
        >
          <img :src="flag" alt="lang" />
          <h2 class="mx-2 text-lg max-sm:hidden">{{ lang }}</h2>
          <h2 class="mx-2 text-lg sm:hidden">{{  shortLung  }}</h2>
          <span
            class="icon-to-bottom text-xs"
            :class="show ? 'rotate-180 text-blue-500' : 'rotate-0'"
          ></span>
        </div>
        <transition name="fade" mode="in-out">
          <div
            v-show="show"
            class="lang_modal absolute left-0 translate-y-full translate-x-3 rounde-lg overflow-hidden z-30 -bottom-1 shadow-grey bg-white"
          >
            <ul>
              <li  v-for="(item, index) in langs" :key="index" @click="selected(index)" class="flex items-center gap-2 cursor-pointer px-4">
                <img :src="item.image" alt="ruscha" />
                <span
                  class="leading-6 py-2 relative hover:text-blue-600 transition-300 max-sm:hidden"
                  >{{ item.title }}</span
                >
                <span
                  class="leading-6 py-2 relative hover:text-blue-600 transition-300 sm:hidden"
                  >{{ item.shortTitle }}</span
                >
              </li>
            </ul>
          </div>
        </transition>
        <a
          href="tel: +998882789696"
          target="_blank"
          class="group flex items-center gap-1 max-lg:hidden"
        >
          <span
            class="icon-phone text-xl leading-5 text-gray-500 group-hover:text-blue-300 transition-all delay-200"
          ></span>
          <span
            class="leading-130px font-medium text-xm text-dark hover:text-blue-300 transition-all delay-200"
            >+998 88 278 96 96</span
          >
        </a>
      </div>
      <div
        class="logo absolute left-[50%] -top-8 -translate-x-1/2  bg-white border border-top-0 border-gray-400 rounded-b-[20px] px-2 sm:px-4 py-1 sm:py-[14px] shadow-grey"
      >
        <img src="/public/images/logo.svg" alt="logo" class="max-md:h-12 max-md:w-14" />
      </div>
      <div class="navbar_right flex items-center gap-3">
        <router-link to="/saved"
          class="navbar__seved flex items-center gap-2 text-black hover:text-blue-400 transition-all delay-200 max-sm:p-1.5 max-sm:gap-0 max-sm:bg-gray-300 max-sm:rounded-lg hover:cursor-pointer transition:300"
        >
          <span
            class="icon-heart text-xl leading-5  text-blue-600 max-sm:text-center" 
          ></span>
          <span class="max-md:hidden test-sm font-semibold leading-5"
            >Избранные</span
          >
          
        </router-link>
        <span class="w-px h-8 bg-gray-300 max-sm:hidden"></span>
        <EnterButton title="Войти" showing="max-sm:hidden" variant="secondary">
          <template #suffix>
            <span class="icon-logenter"></span>
          </template>
        </EnterButton>
      </div>
    </div>
  </div>
</template>
<script setup>
import EnterButton from "./Button.vue";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
const show = ref(false);
const target = ref(null);
const flag = ref("/public/images/rusFlag.svg")
const lang = ref("Русский")
const shortLung = ref("ru")
const langs = [
  { image: "/public/images/rusFlag.svg", title: "Русский", shortTitle:"ru", id:1 },
  { image: "/public/images/uzbek.svg", title: "O’zbekcha", shortTitle:"uz", id:2},
];
onClickOutside(target, (event) => (show.value = false));
function toggleSHowing() {
  show.value = !show.value;
}
function selected(idx) {
  flag.value=langs[idx].image
  lang.value = langs[idx].title
  shortLung.value=langs[idx].shortTitle
}
</script>
