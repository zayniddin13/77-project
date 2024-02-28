<script setup>
import { ref, watch } from "vue";
import { authInstance, storeInstance } from "@/instances";
import { defineAsyncComponent } from "vue";
import { onMounted } from "vue";
import { useI18n } from "vue-i18n";
import Dropdown from "../../components/ui/Dropdown.vue";
import MapModal from "./MapModal.vue"
import EnterButton from "../ui/Button.vue";
const { t, locale } = useI18n();


const emit = defineEmits(["close:modal"]);
const typeModal = ref("login");

const switchTypeModal = (type) => {
  typeModal.value = type;
};

const userDetailsSignUp = ref({
  full_name: "",
  project_name: "",
  category: 0,
  phone_number: "",
  address: {
    name: "",
    lat: 0,
    long: 0,
  },
});

const formattedPhoneNumber = ref("");

const formatPhoneNumber = (value) => {
  const x = value
    .replace(/\D/g, "")
    .match(/(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
  formattedPhoneNumber.value =
    (x[1] ? "(" + x[1] : "") +
    (x[2] ? ") " + x[2] : "") +
    (x[3] ? " " + x[3] : "") +
    (x[4] ? " " + x[4] : "");
};

const userDetailsLogin = ref({ phone_number: "", password: "" });

const categories = ref([]);
const passwordInputType = ref("password");

async function fetchCategories() {
  try {
    const response = await storeInstance.get("/category/", {
      headers: {
        "Accept-Language": locale.value,
      },
    });

    if (!response) throw new Error("Internet bilan aloqa mavjud emas");
    if (response.status !== 200) throw new Error(response.statusText);

    categories.value = response.data;
  } catch (error) {
    console.log(error);
  }
}
const 
async function login() {
  try {
    if (
      !userDetailsLogin.value.phone_number ||
      userDetailsLogin.value.phone_number.length <= 3
    ) {
      alert("Login kamida 3 ta belgidan iborat bo'lishi kerak");
      return;
    }

    if (
      !userDetailsLogin.value.password ||
      userDetailsLogin.value.password.length < 8
    ) {
      alert("Parol kamida 8 ta belgidan iborat bo'lishi kerak");
      return;
    }

    const response = await authInstance.post("/login/", {
      ...userDetailsLogin.value,
    });

    if (!response) {
      throw new Error("Internet bilan aloqa mavjud emas");
    }

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    console.log(response);
    alert("Akkauntga kirildi!");
  } catch (error) {
    alert(error.message);
  }
}
function showHidePassword() {
  passwordInputType.value =
    passwordInputType.value === "password" ? "text" : "password";
}
async function openMap() {
  try {
    if (
      !userDetailsSignUp.value.phone_number ||
      userDetailsSignUp.value.phone_number.length <= 3
    ) {
      alert("Telefon raqam kamida 3 ta belgidan iborat bo'lishi kerak");
      return;
    }

    if (
      !userDetailsSignUp.value.full_name ||
      userDetailsSignUp.value.full_name.length < 4
    ) {
      alert("Ism familiya kamida 4 ta belgidan iborat bo'lishi kerak");
      return;
    }

    if (
      !userDetailsSignUp.value.project_name ||
      userDetailsSignUp.value.project_name.length < 4
    ) {
      alert("Tovar nomi kamida 4 ta belgidan iborat bo'lishi kerak");
      return;
    }

    if (
      !userDetailsSignUp.value.category ||
      userDetailsSignUp.value.category <= 0
    ) {
      alert("Kamida bitta kategoriya tanlash lozim");
      return;
    }

    typeModal.value = "map";
  } catch (error) {
    alert(error);
  }
}

onMounted(async () => {
  await fetchCategories();
});
watch(userDetailsSignUp.phone_number, (newValue) => {
  formatPhoneNumber(newValue);
});
</script>

<template>
  <div
    @click.self="emit('close:modal')"
    class="fixed inset-0 flex items-center justify-center w-full h-screen bg-black/50 z-[100] top-0 left-0 transition-all duration-300 p-3 login-modal-component"
  >
    <div
      v-if="typeModal === 'login'"
      class="overflow-x-hidden scroll-style p-5 bg-white w-full lg:max-w-sm shadow-xl relative max-h-[85vh] overflow-y-auto rounded-2xl modal-box-user"
    >
      <div class="flex items-center justify-between titles">
        <div class="left">
          <h1 class="mb-2 text-2xl font-bold leading-130 text-dark title">
            {{ $t("modal.title") }}
          </h1>
          <p class="text-sm font-medium text-secondary leading-130 mb-7 desc">
            {{ $t("modal.minTitle") }}
          </p>
        </div>
        <Button
          @click="emit('close:modal')"
          class="absolute text-xl font-thin transition duration-300 rounded-full text-black/50 icon-close top-5 right-4 w-7 h-7 shrink-0 flex-center hover:text-black hover:bg-transparent active:scale-95"
        ></Button>
      </div>
      <form @submit.prevent="login" class="form">
        <div class="flex flex-col items-start gap-2 form-box">
          <label
            for="login"
            class="text-sm font-medium leading-5 text-gray-600"
            >{{ $t("modal.loginLabel") }}</label
          >
          <input
            v-model="userDetailsLogin.phone_number"
            type="text"
            name="login"
            id="login"
            maxlength="15"
            :placeholder="$t('modal.loginInput')"
            class="w-full px-4 py-3 text-base leading-5 transition duration-300 border rounded-lg outline-none sm:text-sm text-black-1 disabled:text-gray-400 bg-gray-200 focus-within:bg-white focus-within:border-blue-400"
          />
        </div>
        <div
          class="relative flex flex-col items-start gap-2 mt-4 mb-2 form-box"
        >
          <label
            for="password"
            class="text-sm font-medium leading-5 text-gray-600 "
            >{{ $t("modal.passwordLabel") }}</label
          >
          <input
            v-model="userDetailsLogin.password"
            :type="passwordInputType"
            name="password"
            id="password"
            :placeholder="$t('modal.passwordInput')"
            class="w-full py-3 text-base leading-5 transition duration-300 border rounded-lg outline-none focus-within:border-blue-400 ps-4 pe-10 sm:text-sm text-black-1 disabled:text-gray-400 bg-gray-200 focus-within:bg-white"
          />
        <transition name="fade" mode="ease-out">
            <i
            @click="showHidePassword"
            :class="
              passwordInputType === 'password' ? 'icon-eye-closed ' : 'icon-eye-opened'
            "
            class="absolute z-50 text-xl leading-6 transition duration-300 cursor-pointer hover:text-dark right-4 top-10 text-gray-400"
          ></i>
        </transition>
        </div>
        <button
          class="text-xs leading-130 text-blue hover:text-blue/95 transition-300"
        >
          {{ $t("modal.newPassword") }}?
        </button>
        <div class="flex flex-col gap-3 mt-16 buttons">
          <EnterButton
            variant="bgBlueTextWhite"
          :title="$t('navbar.login')"
            type="submit"
          >
        
          </EnterButton>
          <div class="flex items-center gap-2">
            <hr class="w-full h-px border-none bg-secondaryGray" />
            <span class="text-xs whitespace-nowrap text-gray-1 leading-130"
              >{{ $t("modal.wantSeller") }}</span
            >
            <hr class="w-full h-px border-none bg-secondaryGray" />
          </div>
          <button
            class="border border-blue text-blue hover:bg-blue/10 px-6 md:px-7 py-2.5 md:py-3 text-sm md:text-base font-semibold leading-130 rounded-lg relative transition-300 active:scale-95 disabled:text-gray-2 w-full switcher"
            @click="switchTypeModal('signup')"
            type="button"
          >
            {{ $t("button.apply") }}
          </button>
        </div>
      </form>
    </div>
    <div
      v-if="typeModal === 'signup'"
      class="relative overflow-x-hidden scroll-style p-5 bg-white w-full lg:max-w-sm shadow-xl max-h-[85vh] overflow-y-auto rounded-2xl modal-box-seller"
    >
      <div class="flex titles">
        <div class="left">
          <h1 class="mb-2 text-2xl font-bold leading-130 text-dark title">
            {{ t("modal.signupModal.title") }}
          </h1>
          <p class="text-sm font-medium text-secondary leading-130 mb-7 desc">
            {{ t("modal.loginModal.minTitle") }}
          </p>
        </div>
        <button
          @click="emit('close:modal')"
          class="absolute text-3xl font-semibold transition duration-300 rounded-full text-black/80 icon-cancle top-5 right-4 w-7 h-7 shrink-0 flex-center hover:text-black active:scale-95"
        ></button>
      </div>
      <form class="form">
        <div class="flex flex-col items-start gap-2 form-box">
          <label for="fio" class="text-sm font-medium leading-5 text-gray-1">
            {{ t("modal.signupModal.loginLabel") }}
          </label>
          <input
            v-model.trim="userDetailsSignUp.full_name"
            class="w-full px-4 py-3 text-base leading-5 transition duration-300 border rounded-lg outline-none sm:text-sm text-dark disabled:text-gray bg-gray-2 focus-within:border-blue"
            :placeholder="t('modal.signupModal.loginInput')"
            type="text"
            name="fio"
            id="fio"
          />
        </div>
        <div class="flex flex-col gap-2 mt-4 mb-2 form-box">
          <label
            for="product-name"
            class="text-sm font-medium leading-5 text-gray-1"
            >Название продукта</label
          >
          <input
            v-model.trim="userDetailsSignUp.project_name"
            type="text"
            class="w-full px-4 py-3 text-base leading-5 transition duration-300 border rounded-lg outline-none focus-within:border-blue ps-4 pe-10 sm:text-sm text-dark bg-gray-2"
            placeholder="Введите название продукта"
            name="product-name"
            id="product-name"
          />
        </div>
        <div class="flex flex-col gap-2 mt-4 mb-2 form-box">
          <label
            for="product-category"
            class="text-sm font-medium leading-5 text-gray-1"
            >Категория</label
          >
          <select
            v-model.trim="userDetailsSignUp.category"
            class="flex justify-between w-full px-4 py-3 pl-3 border rounded-lg outline-none cursor-pointer bg-gray-2"
            name="product-category"
            id="product-category"
          >
            <option
              v-for="category in categories"
              :key="category.id"
              class="w-full px-4 py-2 overflow-x-hidden border rounded outline-none scroll-style"
              :value="category.id"
            >
              {{ t(category.name) }}
            </option>
          </select>
          <!-- <Dropdown
          
          title="Выберите категорию"
            :options="categories.map((item) => item)"
          /> -->
          <!-- <div class="relative" id="category">
            <div
              v-model.trim="userDetailsSignUp.category"
              name="product-category"
              id="product-category"
              class="bg-gray-1 rounded-lg pl-3 p-2.5 cursor-pointer flex justify-between border"
            >
              <div class="text-sm leading-5 truncate text-dark">
                Выберите категорию
              </div>
              <span
                class="icon-chevron transition-300 inline-block text-gray text-2xl leading-6 !rotate-90"
              ></span>
            </div>
            <div
              class="absolute top-full w-full bg-white rounded-lg z-10 translate-y-3 overflow-x-hidden max-h-[318px] scroll-style options"
            >
              <div
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
                class="p-4 border-b cursor-pointer transition-300 hover:bg-gray-bg border-white-4 last:border-none"
              >
                <p class="text-base font-medium text-dark leading-130">
                  {{ category.name }}
                </p>
              </div>
            </div>
          </div> -->
        </div>
        <div class="flex flex-col gap-2 mt-4 mb-2 form-box">
          <label for="phone" class="text-sm font-medium leading-5 text-gray-1"
            >Телефон номер</label
          >
          <div class="relative">
            <span
              class="absolute left-2 inline-block mr-1 text-lg font-normal leading-5 top-[13px] text-dark md:text-sm"
            >
              +998
            </span>
            <input
              v-model="userDetailsSignUp.phone_number"
              @input="formatPhoneNumber"
              class="w-full px-4 py-3 text-base leading-5 transition duration-300 border rounded-lg outline-none ps-10 focus-within:border-blue pe-10 sm:text-sm text-dark bg-gray-2"
              placeholder="(__) ___-__-__"
              type="text"
              name="phone"
              id="phone"
            />
          </div>
        </div>
        <div class="flex flex-col gap-3 mt-16 buttons">
          <button
            type="button"
            @click="openMap"
            class="bg-blue text-white hover:bg-blue-1 px-6 md:px-7 py-2.5 md:py-3 text-sm md:text-base font-semibold leading-130 rounded-lg transition-300 active:scale-95 disabled:text-gray-2 w-full"
          >
            Продолжить
          </button>
          <div class="flex items-center gap-2">
            <hr class="w-full h-px border-none bg-secondaryGray" />
            <span class="text-xs whitespace-nowrap text-gray-1 leading-130"
              >Хотите стать продавцом?</span
            >
            <hr class="w-full h-px border-none bg-secondaryGray" />
          </div>
          <button
            @click="switchTypeModal('login')"
            class="border border-blue text-blue hover:bg-blue/10 px-6 md:px-7 py-2.5 md:py-3 text-sm md:text-base font-semibold leading-130 rounded-lg relative transition-300 active:scale-95 disabled:text-gray-2 w-full switcher"
            type="button"
          >
            Войти
          </button>
        </div>
      </form>
    </div>
    <MapModal
      @update:go-back="switchTypeModal('signup')"
      @success:sign-up-done="switchTypeModal('success')"
      @close:modal="emit('close:modal')"
      :user-details-sign-up="userDetailsSignUp"
      v-if="typeModal === 'map'"
    />
    <div
      v-if="typeModal === 'success'"
      class="p-4 text-center bg-white rounded success"
    >
      <h1 class="text-xl font-bold title">Sizning so'rovingiz jo'natildi</h1>
      <button
        class="px-4 py-2 mt-4 font-bold text-white rounded button bg-blue"
        @click="emit('close:modal')"
      >
        OK!
      </button>
    </div>
  </div>
</template>

<style scoped>
.fade-custom-enter-active,
.fade-custom-leave-active {
  transition: opacity 0.5s ease;
}
.fade-custom-enter-from,
.fade-custom-leave-to {
  opacity: 0;
}
</style>
