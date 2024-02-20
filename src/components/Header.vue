<template>
  <header
    class="navbar sticky flex items-center border-b border-grey-4 py-5 max-[400px]:py-3 bg-white/90 z-30 top-0 left-0 backdrop-blur-[6px]"
  >
    <!-- Logo in the middle -->
    <router-link to="/"
      class="logo absolute cursor-pointer left-1/2 top-0 -translate-x-1/2 bg-white border border-grey-4 border-top-0 rounded-b-[20px] p-3  md:px-4 md:py-[14px] max-[400px]:px-2 max-[400px]:py-[10px] shadow-[0_12px_36px_0px_#0E11161A]"
    >
      <img
        src="/public/images/logo.svg"
        alt="logo"
      class="max-md:h-12 max-md:w-[80px]"
      />
    </router-link>

    <!-- Main menu -->
    <div class="container flex justify-between items-center">
      <div class="navbar_left flex items-center gap-6 relative z-0">
        <div
          @click="toggleSHowing"
          ref="target"
          class="cursor-pointer flex items-center"
        >
          <img :src="t('language.flag')" width="24px" height="24px" alt="lang" />
          <h2 class="mx-2 text-sm text-black font-medium max-sm:hidden">{{ t('language.lang') }}</h2>
          <h2 class="mx-2 text-lg text-black font-medium sm:hidden">{{ t('language.shortLang') }}</h2>
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
              <li
                v-for="(item, index) in langs"
                :key="index"
                @click="selected(index), changeLocale(item.shortTitle)"
                class="flex items-center gap-2 cursor-pointer px-4"
              >
                <img :src="item.image" alt="ruscha" />
                <span
                  class="leading-6 py-2 relative text-black hover:text-blue-600 transition-300 max-sm:hidden"
                  >{{ item.title }}</span
                >
                <span
                  class="leading-6 py-2 relative text-black hover:text-blue-600 transition-300 sm:hidden"
                  >{{ item.shortTitle }}</span
                >
              </li>
            </ul>
          </div>
        </transition>
        <a
          href="tel:+998882789696"
          target="_blank"
          class="group flex items-center gap-1 max-lg:hidden"
        >
          <span
            class="icon-phone text-xl leading-5 text-gray-500 group-hover:text-blue-300 transition-colors"
          ></span>
          <span
            class="font-medium text-sm text-black hover:text-blue-300 transition-colors"
            >+998 88 278 96 96</span
          >
        </a>
      </div>
      <div class="navbar_right flex items-center gap-3">
        <router-link
          to="/saved"
          class="navbar__seved flex items-center gap-2 text-black hover:text-blue-400 transition-all delay-200 max-sm:p-1.5 max-sm:gap-0 max-sm:bg-gray-200 max-sm:rounded-lg hover:cursor-pointer transition:300"
        >
          <span
            class="icon-heart text-2xl max-sm:text-xl leading-5 !text-blue-600 max-sm:text-center"
          ></span>
          <span class="max-md:hidden test-sm font-semibold text-black">{{t("navbar.star")}}</span>
        </router-link>
        <span class="w-px h-8 bg-gray-300 max-sm:hidden"></span>
        <EnterButton title="Войти" styles="max-sm: hidden" variant="secondary">
          <template #suffix>
            <span class="icon-logenter text-2xl max-[400px]:text-base"></span>
          </template>
        </EnterButton>
      </div>
    </div>
  </header>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import EnterButton from "../components/ui/Button.vue";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";


const toggleLanguages = ref(false);
const toggleLoginModal = ref(false);


const currentLocale = ref(localStorage.getItem("locale"));

const changeLocale = (l) => {
  localStorage.setItem("locale", l);
  currentLocale.value = l;
  locale.value = l;

};






const { t, locale } = useI18n();

const show = ref(false);
const target = ref(null);
const flag = ref("/public/images/rusFlag.svg");
const lang = ref("Русский");
const shortLung = ref("ru");
const langs = [
  {
    image: "/public/images/rusFlag.svg",
    title: "Русский",
    shortTitle: "ru",
    id: 1,
  },
  {
    image: "/public/images/uzbek.svg",
    title: "O’zbekcha",
    shortTitle: "uz",
    id: 2,
  },
];
onClickOutside(target, (event) => (show.value = false));
function toggleSHowing() {
  show.value = !show.value;
}
function selected(idx) {
  flag.value = langs[idx].image;
  lang.value = langs[idx].title;
  shortLung.value = langs[idx].shortTitle;
}

</script>
