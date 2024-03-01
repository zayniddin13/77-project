<script setup>
import InputMask from "primevue/inputmask";
import {
  ref,
  watch,
  computed,
  reactive,
  defineAsyncComponent,
  onMounted,
} from "vue";
import { authInstance, storeInstance } from "@/instances";
import { useI18n } from "vue-i18n";
import Dropdown from "../../components/ui/Dropdown.vue";
import MapModal from "./MapModal.vue";
import EnterButton from "../ui/Button.vue";
import Input from "../ui/Input.vue";
import ApplyAdminModal from "../modal/ApplyAdminModal.vue";
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
const { t, locale } = useI18n();

const emit = defineEmits(["close:modal"]);
const typeModal = ref("login");

function showHidePassword() {
  passwordInputType.value =
    passwordInputType.value === "password" ? "text" : "password";
}
const switchTypeModal = (type) => {
  typeModal.value = type;
};

const userDetailsSignUp = reactive({
  full_name: "",
  project_name: "",
  category: "default",
  phone_number: "",
  address: {
    name: "",
    lat: 0,
    long: 0,
  },
});
const updateCategoryValue = (value) => {
  console.log(value[1]);
  userDetailsSignUp.category = value[1];
};
const loginVal = ref("");
const paswordVal = ref("");
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

const form = reactive({
  login: "",
  password: "",
});
const rules = computed(() => {
  return {
    login: { required },
    password: { required },
  };
});
const signUpForm = reactive({
  full_name: "",
  project_name: "",
  category: "",
  phone_number: "",
});
const SignUpRules = computed(() => {
  return {
    full_name: { required },
    project_name: { required },
    category: { required },
    phone_number: { required },
  };
});
const submitForm = async () => {
  v$.value.$touch();
  console.log(v$?.login?.$error);
  // Use optional chaining to avoid errors
  if (!signUpForm.value?.$invalid) {
    try {
      const response = await authInstance.post("/login/", {
        ...userDetailsLogin.value,
      });
    } catch (error) {
      form.login = "";
      form.password = "";
      console.log(form.login);
    }
  }
};
let v$ = useVuelidate(rules, form);

async function openMap() {
  sign$.value.$touch();
  console.log(sign$?.category?.$error);
  // Use optional chaining to avoid errors
  if (form.value?.$invalid) return;
  typeModal.value = "map";
}
let sign$ = useVuelidate(SignUpRules, signUpForm);
onMounted(async () => {
  await fetchCategories();
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
          class="absolute text-xl font-thin transition duration-300 rounded-full text-black/50 icon-close top-5 right-5 w-7 h-7 shrink-0 flex-center hover:text-black hover:bg-transparent active:scale-95"
        ></Button>
      </div>
      <form @submit.prevent="login" class="form">
        <div class="flex flex-col items-start gap-2 form-box">
          <label
            for="login"
            class="text-sm font-medium leading-5 text-gray-600"
            >{{ $t("modal.loginLabel") }}</label
          >
          <Input
            v-model="form.login"
            :error="v$?.login?.$error"
            type="text"
            maxlength="15"
            :placeholder="$t('modal.loginInput')"
            styles="disabled:text-gray-400 !bg-gray-200 focus-within:bg-white"
            class="w-full px-4 py-3 text-base leading-5 transition duration-300 border rounded-lg outline-none sm:text-sm text-black-1 disabled:text-gray-400 bg-gray-200 focus-within:bg-white focus-within:border-blue-400"
          />
        </div>
        <div
          class="relative flex flex-col items-start gap-2 mt-4 mb-2 form-box"
        >
          <label
            for="password"
            class="text-sm font-medium leading-5 text-gray-600"
            >{{ $t("modal.passwordLabel") }}</label
          >
          <Input
            v-model="form.password"
            :error="v$?.password?.$error"
            :type="passwordInputType"
            :placeholder="$t('modal.passwordInput')"
            styles="disabled:text-gray-400 bg-gray-200 focus-within:bg-white"
            class="w-full py-3 text-base leading-5 transition duration-300 border rounded-lg outline-none focus-within:border-blue-400 ps-4 pe-10 sm:text-sm text-black-1 disabled:text-gray-400 bg-gray-200 focus-within:bg-white"
          />
          <transition name="fade" mode="ease-out">
            <i
              @click="showHidePassword"
              :class="
                passwordInputType === 'password'
                  ? 'icon-eye-closed '
                  : 'icon-eye-opened'
              "
              class="absolute z-50 text-xl leading-6 transition duration-300 cursor-pointer hover:text-dark right-4 top-10 text-gray-400"
            ></i>
          </transition>
        </div>
        <button
          @click="switchTypeModal('applyToAdmin')"
          class="text-xs leading-130 text-blue-500 transition-300 hover:text-blue-700"
        >
          {{ $t("modal.newPassword") }}?
        </button>
        <div class="flex flex-col gap-3 mt-16 buttons">
          <EnterButton
            @click="submitForm"
            variant="bgBlueTextWhite"
            :title="$t('navbar.login')"
            type="submit"
          >
          </EnterButton>
          <div class="flex items-center gap-2">
            <hr class="w-full h-px border-none bg-secondaryGray" />
            <span class="text-xs whitespace-nowrap text-gray-1 leading-130">{{
              $t("modal.wantSeller")
            }}</span>
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
            {{ t("signupModal.title") }}
          </h1>
          <p class="text-sm font-medium text-secondary leading-130 mb-7 desc">
            {{ t("signupModal.minTitle") }}
          </p>
        </div>
        <button
          @click="emit('close:modal')"
          class="absolute transition duration-300 rounded-full text-black/50 icon-cancle top-5 right-4 w-7 h-7 shrink-0 flex-center hover:text-black active:scale-95"
        >
          <span class="icon-close text-xl font-thin"></span>
        </button>
      </div>
      <form class="form">
        <div class="flex flex-col items-start gap-2 form-box">
          <label for="fio" class="text-sm font-medium leading-5 text-gray-1">
            {{ t("signupModal.loginLabel") }}
          </label>
          <Input
            v-model.trim="userDetailsSignUp.full_name"
            :error="sign$?.full_name?.$error"
            class="w-full py-3 text-base leading-5 transition duration-300 border rounded-lg outline-none focus-within:border-blue-400 ps-4 pe-10 sm:text-sm text-black-1 disabled:text-gray-400 bg-gray-200 focus-within:bg-white"
            :placeholder="t('signupModal.loginInput')"
            type="text"
          />
        </div>
        <div class="flex flex-col gap-2 mt-4 mb-2 form-box">
          <label
            for="product-name"
            class="text-sm font-medium leading-5 text-gray-1"
            >{{ $t("signupModal.productLabel") }}</label
          >
          <Input
            v-model.trim="userDetailsSignUp.project_name"
            :error="sign$?.project_name?.$error"
            type="text"
            class="w-full py-3 text-base leading-5 transition duration-300 border rounded-lg outline-none focus-within:border-blue-400 ps-4 pe-10 sm:text-sm text-black-1 disabled:text-gray-400 bg-gray-200 focus-within:bg-white"
            :placeholder="$t('signupModal.productPlaseholder')"
          />
        </div>
        <div class="flex flex-col gap-2 mt-4 mb-2 form-box">
          <label
            for="product-category"
            class="text-sm font-medium leading-5 text-gray-1"
            >{{ $t("signupModal.categoryLabel") }}</label
          >
          <Dropdown
            @value="updateCategoryValue"
            :error="sign$?.category?.$error"
            :title="$t('signupModal.categoryPlaceholder')"
            :options="categories"
          />
        </div>
        <div class="flex flex-col gap-2 mt-4 mb-2 form-box">
          <label
            for="phone"
            class="text-sm font-medium leading-5 text-gray-1"
            >{{ $t("signupModal.numberLabel") }}</label
          >
          <div class="relative">
            <InputMask
              v-model="userDetailsSignUp.phone_number"
              :error="sign$?.phone_number?.$error"
              :class="!sign$?.phone_number?.$error ? '' : 'border-red-500 '"
              mask="+999 99 999 99 99"
              class="w-full px-4 py-3 text-base leading-5 transition duration-300 border rounded-lg focus-within:border-blue-400 outline-none ps-10 focus-within:border-blue pe-10 sm:text-sm text-dark bg-gray-2"
              placeholder="+___ (__) ___-__-__"
              type="text"
              name="phone"
              id="phone"
            >
            </InputMask>
          </div>
        </div>
        <div class="flex flex-col gap-3 mt-16 buttons">
          <EnterButton
            type="button"
            @click="openMap('map')"
            variant="bgBlueTextWhite"
            :title="$t('button.continue')"
          >
          </EnterButton>
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
    <ApplyAdminModal
      v-if="typeModal === 'applyToAdmin'"
      @close:modal="emit('close:modal')"
    />
    <MapModal
      @update:go-back="switchTypeModal('signup')"
      @success:sign-up-done="switchTypeModal('success')"
      @close:modal="emit('close:modal')"
      :user-details-sign-up="userDetailsSignUp"
      v-if="typeModal === 'map'"
    />

    <div
      v-if="typeModal === 'success'"
      class="bg-white w-full lg:max-w-sm shadow-xl relative max-h-[85vh] overflow-y-auto rounded-2xl"
    >
      <button
        @click="emit('close:modal')"
        class="text-3xl w-7 h-7 absolute text-black top-5 right-5 rounded-full shrink-0 flex-center transition-300 hover:text-red hover:bg-transparent active:scale-95"
      >
        <span
          class="icon-close text-xl font-thin group-hover:text-red transition-300"
        ></span>
      </button>
      <div class="pt-16 p-5 flex flex-col text-center">
        <img
          class="h-[120px] mb-5"
          src="../../../public/images/success.svg"
          alt="Register success illustration"
        />
        <h2 class="text-lg font-semibold leading-130">Ваша заявка принята!</h2>
        <p class="text-sm leading-140 text-gray-1 mt-2 mb-14">
          Наши сотрудники свяжутся с вами в ближайшее время
        </p>
        <EnterButton
          @click="emit('close:modal')"
          variant="bgBlueTextWhite"
          title="rahmat"
        />
      </div>
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
