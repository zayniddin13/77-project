<template>
  <div class="container product-list-page">
    <BreadCrump v-bind="{ routes }" />
    <div class="grid items-start grid-cols-12 gap-6 pt-5 pb-7 content">
      <aside
        class="col-span-4 p-4 bg-white md:rounded-xl max-md:hidden lg:col-span-3 filter-side"
      >
        <h2 class="mb-4 text-xl font-semibold leading-130 text-primary title">
          {{ $t("sitebarMoreProduct.filtr") }}
        </h2>
        <form class="flex flex-col gap-5">
          <div @click="getProvince" class="flex flex-col gap-2">
            <DropdownProvince
              @updateProvince="(e) => updateProvince(e)"
              v-model="inputVal"
              id="city"
              :labelTitle="$t('sitebarMoreProduct.province')"
              :title="$t('sitebarMoreProduct.provincePlaceHolder')"
              :options="dataOptions1"
            >
              <template #suffix>
                <span class="icon-to-bottom text-xs"></span>
              </template>
            </DropdownProvince>
          </div>
          <div @click="getCity" class="flex flex-col gap-2">
            <DropdownCity
              :title="$t('sitebarMoreProduct.cityPlaceHolder')"
              :labelTitle="$t('sitebarMoreProduct.provinOrCity')"
              :options="dataOptions2"
            >
              <template #suffix>
                <span
                  :class="provinceVal ? 'text-gray-600' : 'text-gray-400'"
                  class="icon-to-bottom text-xs"
                ></span>
              </template>
            </DropdownCity>
          </div>

          <div class="flex flex-col gap-2">
            <label for="" class="text-sm font-medium leading-5 text-gray">{{
              $t("sitebarMoreProduct.sort")
            }}</label>
            <div class="flex flex-col">
              <label
                class="transition group inline-flex items-center relative select-none min-h-[20px] cursor-pointer"
                style="min-height: 20px"
                ><input
                  type="radio"
                  class="absolute invisible w-0 h-0 opacity-0 peer"
                  name="k-radio-591"
                  value="price"
                /><span
                  class="before:w-2 before:h-2 shrink-0 duration-200 ease-in-out bg-white peer-checked:before:opacity-100 mr-2 before:opacity-0 relative border rounded-full box-border before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:transition-all before:duration-200 border-gray-400 peer-disabled:before:bg-gray-100 before:bg-blue-300 group-hover:border-blue-200 peer-checked:border-white/20 peer-checked:bg-blue-400 peer-checked:before:!bg-white"
                  style="width: 20px; height: 20px"
                ></span
                ><span
                  class="w-full py-3 text-sm font-medium border-b leading-130 md:group-hover:text-blue-400 transition-300 border-gray-400 group-last:border-b-0 text-black"
                  >{{ $t("sitebarMoreProduct.cheap") }}</span
                ></label
              ><label
                class="transition group inline-flex items-center relative select-none min-h-[20px] cursor-pointer"
                style="min-height: 20px"
                ><input
                  type="radio"
                  class="absolute invisible w-0 h-0 opacity-0 peer"
                  name="k-radio-591"
                  value="-price"
                /><span
                  class="before:w-2 before:h-2 shrink-0 duration-200 ease-in-out bg-white peer-checked:before:opacity-100 mr-2 before:opacity-0 relative border rounded-full box-border before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:transition-all before:duration-200 border-gray-400 peer-disabled:before:bg-gray-100 before:bg-blue-300 group-hover:border-blue-200 peer-checked:border-white/20 peer-checked:bg-blue-400 peer-checked:before:!bg-white"
                  style="width: 20px; height: 20px"
                ></span
                ><span
                  class="w-full py-3 text-sm font-medium border-b leading-130 md:group-hover:text-blue-400 transition-300 border-gray-400 group-last:border-b-0 text-black"
                  >{{ $t("sitebarMoreProduct.friends") }}</span
                ></label
              ><label
                class="transition group inline-flex items-center relative select-none min-h-[20px] cursor-pointer"
                style="min-height: 20px"
                ><input
                  type="radio"
                  class="absolute invisible w-0 h-0 opacity-0 peer"
                  name="k-radio-591"
                  value="published_at"
                /><span
                  class="before:w-2 before:h-2 shrink-0 duration-200 ease-in-out bg-white peer-checked:before:opacity-100 mr-2 before:opacity-0 relative border rounded-full box-border before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:rounded-full before:transition-all before:duration-200 border-gray-400 peer-disabled:before:bg-gray-100 before:bg-blue-300 group-hover:border-blue-200 peer-checked:border-white/20 peer-checked:bg-blue-400 peer-checked:before:!bg-white"
                  style="width: 20px; height: 20px"
                ></span
                ><span
                  class="w-full py-3 text-sm font-medium border-b leading-130 md:group-hover:text-blue-400 transition-300 border-gray-400 group-last:border-b-0 text-black"
                  >{{ $t("sitebarMoreProduct.news") }}</span
                ></label
              >
            </div>
          </div>

          <div class="flex flex-col gap-2">
            <label for="" class="text-sm font-medium leading-5 text-gray-400">{{
              $t("sitebarMoreProduct.subcategories")
            }}</label>
            <div>
              <div class="flex flex-col gap-4">
                <div class="flex flex-col items-center justify-between">
                  <div
                    class="group w-full flex items-center gap-2 relative select-none min-h-[20px] cursor-pointer border-b border-gray-300 py-2.5"
                  >
                    <span
                      class="duration-300 ease-in-out relative shrink-0 inline-block h-5 w-5 rounded-md border border-gray-400 group-hover:border-blue-300 !border-white/20 !bg-blue-400"
                    >
                      <span
                        class="icon-checkmark text-[9px] top-1/2 left-1/2 leading-5 text-white transform -translate-x-1/2 -translate-y-1/2 transition-200 absolute z-[1]"
                      ></span>
                    </span>
                    <div class="">
                      <span
                        class="text-sm font-medium leading-130 text-black transition-300 group-hover:text-blue-400"
                        >{{ $t("sitebarMoreProduct.allSection") }}</span
                      >
                    </div>
                  </div>
                  <div
                    class="w-full"
                    v-for="(item, index) in category"
                    :key="index"
                  >
                    <DropdownCateg
                      :title="item.name"
                      @click="openMenu(item.name)"
                    >
                      <template #suffix>
                        <span class="icon-to-bottom text-xs"></span>
                      </template>
                    </DropdownCateg>
                    <transition name="fade" mode="ease">
                      <div :key="open">
                        <template v-for="(el, index) in item.childs">
                          <div v-if="item.name === open" :key="index">
                            <DropdownCateg :title="el.name"></DropdownCateg>
                          </div>
                        </template>
                      </div>
                    </transition>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </aside>
      <main class="col-span-12 md:col-span-8 lg:col-span-9 products-list-side">
        <div>
          <div class="w-full">
            <h1
              class="mb-3 text-2xl md:text-3.5xl leading-130 font-bold text-primary gap-2 title"
            >
              {{ $t("products.product") }}
            </h1>

            <div class="flex items-center justify-between mt-10">
              <p class="text-lg font-medium text-gray-400 leading-130 count">
                {{ count }} {{ $t("products.title") }}
              </p>
              <div class="flex items-center gap-1">
                <button
                  @click="doBlock"
                  :class="block ? 'text-blue-400' : 'text-gray-400'"
                  class="text-3xl leading-7 hover:text-blue-400/90 icon-block transition-300"
                ></button>
                <button
                  @click="doGrid"
                  :class="grid ? 'text-blue-400' : 'text-gray-400'"
                  class="text-3xl leading-7 hover:text-blue-400/90 icon-grid transition-300"
                ></button>
              </div>
            </div>
          </div>

          <div
            v-if="grid"
            class="grid grid-cols-2 gap-6 pt-6 pb-8 mt-2 mb-6 sm:grid-cols-2 lg:grid-cols-3 md:mb-5 md:mt-0 products"
          >
            <div
              v-show="!loading"
              v-for="(item, index) in product"
              :key="index"
              class="cursor-pointer transition-300"
            >
              <ProductCard
                :id="item.id"
                :title="item.name"
                :date="formatPublishedTime(item.published_at)"
                number="+998 88 278 96 96"
                :price="item.price"
                :image="item.photo"
                :slug="item.slug"
                :islike="item.is_liked"
              />
            </div>
          </div>
          <div
            v-if="block"
            class="block gap-y-6 pt-6 pb-8 mt-2 mb-6 sm:grid-cols-2 lg:grid-cols-3 md:mb-5 md:mt-0 products"
          >
            <div
              v-show="!loading"
              v-for="(item, index) in product"
              :key="index"
              class="cursor-pointer transition-300"
            >
              <ProductCardBlock
                :id="item.id"
                :title="item.name"
                :date="formatPublishedTime(item.published_at)"
                number="+998 88 278 96 96"
                :price="item.price"
                :image="item.photo"
                :slug="item.slug"
                :islike="item.is_liked"
              />
            </div>
          </div>
          <div class="w-full" v-if="loading">
            <div
              class="grid grid-cols-2 gap-6 py-8 my-6 sm:grid-cols-2 lg:grid-cols-3 md:my-10 products"
            ></div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
<script setup>
import { storeInstance, usingInstance } from "@/instances";
import { onMounted, onUpdated, ref, computed, watch } from "vue";
import { defineAsyncComponent } from "vue";
import DropdownProvince from "../components/ui/DropdownProvince.vue";
import DropdownCity from "../components/ui/DropdownCity.vue";
import DropdownCateg from "../components/ui/DropdownCateg.vue";
import BreadCrump from "../components/ui/breadCrump.vue";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n();

const ProductCard = defineAsyncComponent(() => import("../components/Add.vue"));
const ProductCardBlock = defineAsyncComponent(() =>
  import("../components/AddBlock.vue")
);
const routes = computed(() => [
  {
    label: t("products.title"),
    link: "/about",
  },
]);
const val2 = ref("");
import dayjs from "dayjs";

// const like = ref(false);
const loading = ref(false);
// const products = ref([]);
const count = ref(0);
const product = ref(null);
const inputVal = ref("");
const provinceVal = ref(null);
function updateProvince(e) {
  provinceVal.value = e;
}
const page = ref(0);
let deviceId = localStorage.getItem("deviceId");
let grid = ref(true);
let block = ref(false);
function doGrid() {
  grid.value = true;
  block.value = false;
}
function doBlock() {
  grid.value = false;
  block.value = true;
}
async function loadProducts() {
  try {
    loading.value = true;
    const response = await storeInstance.get(`/list/ads/`, {
      headers: {
        "Device-id": localStorage.getItem("deviceId"),
      },
    });

    page.value++;
    product.value = response.data.results;
console.log(product.value);
    count.value += response.data.count;

    return;
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
}

const formatPublishedTime = (time) => {
  return dayjs(time).format("D-MMMM, YYYY");
};
let open = ref();
// function toggleOpen() {

// }
onMounted(async () => {
  await loadProducts();
  getCtategory();
  formatPublishedTime();
});

const provinOpen = ref(false);
const cityOpen = ref(false);
const dataOptions1 = ref([]);
const dataOptions2 = ref([]);
async function getProvince() {
  provinOpen.value = true;
  try {
    const response = await usingInstance.get(`/regions-with-districts/`, {
      headers: {
        "Accept-Language": locale._value,
        "Content-Language": locale._value,
      },
    });

    response.data.forEach((el) => {
      dataOptions1.value.push(el.name);
    });
    return;
  } catch (error) {
    console.error(error);
  }
  watch(
    locale,
    async (newValue, oldValue) => {
      if (newValue !== oldValue) {
        getProvince();
      }
    },
    { deep: true }
  );
}
async function getCity() {
  const province = document.querySelector("#city input");
  if (province.value) {
    cityOpen.value = true;
    try {
      const response = await usingInstance.get(`/regions-with-districts/`, {
        headers: {
          "Accept-Language": locale._value,
          "Content-Language": locale._value,
        },
      });

      response.data.forEach((el) => {
        if (province.value == el.name) {
          el.districts.forEach((elem) => {
            dataOptions2.value.push(elem.name);
          });
        }
      });
      return;
    } catch (error) {
      console.error(error);
    }
  }
}
watch(
  locale,
  async (newValue, oldValue) => {
    if (newValue !== oldValue) {
      getProvince();
      getCtategory();
    }
  },
  { deep: true }
);
function openMenu(menu) {
  if (menu === open.value) {
    open.value = "";
  } else open.value = menu;
}
let category = ref([]);
async function getCtategory() {
  cityOpen.value = true;
  try {
    const response = await storeInstance.get(`/categories-with-childs/`, {
      headers: {
        "Accept-Language": locale._value,
        "Content-Language": locale._value,
      },
    });
    console.log(response.data);
    category.value = response.data;
    return;
  } catch (error) {
    console.error(error);
  }
}
</script>
