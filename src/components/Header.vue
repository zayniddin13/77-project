<template>
  <header
    class="navbar sticky flex items-center border-b border-grey-4 py-5 bg-white/90 z-30 top-0 left-0 backdrop-blur-[6px]"
  >
    <!-- Logo in the middle -->
    <router-link
      to="/"
      class="logo absolute cursor-pointer left-1/2 top-0 -translate-x-1/2 bg-white border border-grey-4 border-top-0 rounded-b-[20px] p-3 md:px-4 md:py-[14px] max-[400px]:px-3 max-[400px]:py-[15px] shadow-[0_12px_36px_0px_#0E11161A]"
    >
      <img
        src="/images/logo.svg"
        alt="logo"
        class="max-md:h-16 max-md:w-[90px]"
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
          <img
            :src="t('language.flag')"
            width="24px"
            height="24px"
            alt="lang"
          />
          <h2 class="mx-2 text-sm text-black font-medium max-sm:hidden">
            {{ t("language.lang") }}
          </h2>
          <h2 class="mx-2 text-lg text-black font-medium sm:hidden">
            {{ t("language.shortLang") }}
          </h2>
          <span
            class="icon-to-bottom text-xs text-Blacks"
            :class="show ? 'rotate-180 text-blue-500' : 'rotate-0'"
          ></span>
        </div>
        <transition name="fade" mode="out-in">
          <div
            :class="show ? 'opacity-100' : 'opacity-0'"
            class="lang_modal absolute left-0 translate-y-full translate-x-3 rounde-lg overflow-hidden z-40 -bottom-1 shadow-grey bg-white pr-3.5 duration-500"
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
                  class="leading-6 py-2 relative text-black hover:text-main-blue transition-300 max-sm:hidden"
                  >{{ item.title }}</span
                >
                <span
                  class="leading-6 py-2 relative text-black hover:text-main-blue transition-300 sm:hidden"
                  >{{ item.shortTitle }}</span
                >
              </li>
            </ul>
          </div>
        </transition>
        <a
          href="tel:+998882789696"
          target="_parent"
          class="group flex items-center gap-1 max-lg:hidden"
        >
          <span
            class="icon-phone text-xl leading-5 text-greys-2 group-hover:text-main-blue transition-colors duration-300"
          ></span>
          <span
            class="font-medium text-sm text-black-1 hover:text-main-blue transition-colors"
            >+998 88 278 96 96</span
          >
        </a>
      </div>
      <div class="navbar_right flex items-center gap-3">
        <router-link
          to="/saved"
          class="group navbar__seved flex items-center gap-2 text-black-1 hover:!text-main-blue transition-all delay-200 max-sm:p-1.5 max-sm:gap-0 max-sm:bg-gray-200 max-sm:rounded-lg hover:cursor-pointer duration-300"
        >
          <span
            class="group icon-blue-heart text-xl max-sm:text-xl leading-5 max-sm:text-center"
          ></span>
          <transition mode="ease"
            ><span
              class="group-hover:text-main-blue max-md:hidden test-sm font-semibold text-black"
              >{{ t("navbar.star") }}</span
            ></transition
          >
        </router-link>
        <span class="w-px h-8 bg-gray-300 max-sm:hidden"></span>
        <EnterButton
          @click="openLoginModal"
          title="Войти"
          resHidden="hidden md:block font-semibold"
          variant="secondary"
        >
          <template #suffix>
            <span
              class="icon-logenter text-2xl max-[400px]:text-base text-black-1 font-semibold"
            ></span>
          </template>
        </EnterButton>
        <transition name="fades" mode="out-in">
          <LoginModal @close:modal="closeLoginModal" v-if="toggleLoginModal" />
        </transition>
      </div>
    </div>
  </header>
</template>
<script setup>
import { useI18n } from "vue-i18n";
import EnterButton from "../components/ui/Button.vue";
import { ref } from "vue";
import { onClickOutside } from "@vueuse/core";
import LoginModal from "../components/modal/LoginModal.vue";
import MapModal from "../components/modal/LoginModal.vue";
import ApplyModal from "../components/modal/LoginModal.vue";
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
const flag = ref("/images/rusFlag.svg");
const lang = ref("Русский");
const shortLung = ref("ru");
const langs = [
  {
    image: "/images/rusFlag.svg",
    title: "Русский",
    shortTitle: "ru",
    id: 1,
  },
  {
    image: "/images/uzbek.svg",
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

// modalka

const openLoginModal = () => {
  toggleLoginModal.value = true;
  document.body.classList.add("overflow-hidden");
};

const closeLoginModal = () => {
  toggleLoginModal.value = false;
  document.body.classList.remove("overflow-hidden");
};
</script>
