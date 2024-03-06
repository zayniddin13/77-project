<template>
  <div class="container product-list-page">
    <BreadCrump v-bind="{ routes }" />
    <div
      v-if="show"
      class="fixed flex items-center justify-center w-full min-h-screen bg-black/50 z-40 top-0 left-0 transition-all duration-300 p-3 !overflow-hidden"
    ></div>
    <div class="grid items-start grid-cols-12 gap-6 pt-5 pb-7 content">
      <div
        :class="show ? '' : 'max-md:hidden'"
        class="rounded-2xl max-sm:scroll-style left-[12%] overflow-y-auto overflow-x-hidden max-md:max-h-[85vh] col-span-4 p-4 bg-white md:rounded-xl lg:col-span-3 max-md:absolute max-md:w-9/12 max-md:z-50 max-md:mx-auto -top-4"
      >
        <div class="flex justify-between items-center">
          <h2 class="mb-4 text-xl font-semibold leading-130 text-primary title">
            {{ $t("sitebarMoreProduct.filtr") }}
          </h2>
          <button @click="showSiteBar">
            <span
              class="md:hidden icon-close text-xl font-normal text-gray-400"
            ></span>
          </button>
        </div>
        <form class="flex flex-col gap-5" @submit="filterData">
          <div class="flex flex-col gap-2">
            <label for="" class="text-sm font-medium leading-5 text-gray">{{
              $t("sitebarMoreProduct.province")
            }}</label>
            <Dropdown
              @value="updateRegionValue"
              :title="$t('sitebarMoreProduct.provincePlaceHolder')"
              :options="regions"
            />
          </div>
          <!-- <div @click="getCity" class="flex flex-col gap-2"> -->
          <div class="flex flex-col gap-2">
            <label for="" class="text-sm font-medium leading-5 text-gray">{{
              $t("sitebarMoreProduct.provinOrCity")
            }}</label>
            <Dropdown
              @value="updateDistrictValue"
              :disabled="!regionValue"
              :title="$t('sitebarMoreProduct.cityPlaceHolder')"
              :options="districts"
            />
          </div>
          <!-- </div> -->

          <div class="flex flex-col gap-2">
            <label for="" class="text-sm font-medium leading-5 text-gray">{{
              $t("sitebarMoreProduct.sort")
            }}</label>
            <div
              v-for="(item, index) in sorts"
              :key="index"
              class="flex flex-col"
            >
              <label
                class="transition group inline-flex items-center relative select-none min-h-[20px] cursor-pointer"
                style="min-height: 20px"
                ><input
                  @click="sortData(item.price)"
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
                  >{{ $t(item.name) }}</span
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
                <div class="block">
                  <div
                    class="group w-full flex items-center gap-2 relative select-none min-h-[20px] cursor-pointer border-b border-gray-300 py-2.5"
                  >
                    <span
                      @click="allCheck"
                      :class="
                        allAccordionCheck
                          ? '!bg-blue-400 border-blue-400'
                          : '!border-gray-300'
                      "
                      class="duration-300 ease-in-out relative shrink-0 inline-block h-5 w-5 rounded-md border group-hover:border-blue-300"
                    >
                      <span
                        :class="allAccordionCheck ? 'icon-checkmark' : ''"
                        class="text-[9px] top-1/2 left-1/2 leading-5 text-white transform -translate-x-1/2 -translate-y-1/2 transition-200 absolute z-[1]"
                      ></span>
                    </span>
                    <div class="">
                      <span
                        class="text-sm font-medium leading-130 text-black transition-300 group-hover:text-blue-400"
                        >{{ $t("sitebarMoreProduct.allSection") }}</span
                      >
                    </div>
                  </div>
                  <Accordion
                    v-for="(category, key) in categories"
                    :key="key"
                    :title="category.name"
                    :options="category.children"
                    :element="category"
                    :allChecked="allAccordionCheck"
                  />
                </div>
              </div>
            </div>
          </div>

          <Button
            :title="$t('button.filterButton')"
            variant="bgBlueTextWhite"
            styles="!flex !justify-center"
          />
        </form>
      </div>

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
              <div class="flex items-center gap-2">
                <button
                  @click="showSiteBar"
                  :class="show ? 'text-blue-400' : 'text-gray-400'"
                  class="md:hidden block text-2xl leading-7 hover:text-blue-400/90 icon-burger transition-300"
                ></button>
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
            v-if="grid && product"
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
                :image="item.photo || '../../public/images/defaultImg.svg'"
                :slug="item.slug"
                :islike="item.is_liked"
              />
            </div>
          </div>
          <div
            v-if="block && product"
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
                :image="item.photo || '../../public/images/defaultImg.svg'"
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
          <div v-if="!product?.length && !loading" class="saved_body mb-14">
            <div class="saved__about flex items-center justify-center flex-col">
              <img src="../../public/images/noData.svg" alt="" class="block" />
              <div
                class="block text-2xl font-bold text-dark leading-6 mt-6 mb-3"
              >
                {{ $t("noData.noAddsTitle") }}
              </div>
              <div class="text-base font-normal leading-6 text-dark">
                {{ $t("noData.noAddsTitleAbout") }}
              </div>
            </div>
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
import Dropdown from "../../src/components/ui/Dropdown.vue";
import Accordion from "../../src/components/ui/Accordion.vue";
import BreadCrump from "../components/ui/breadCrump.vue";
import Button from "../components/ui/Button.vue";
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
const route = useRoute();
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
import dayjs from "dayjs";
const sorted = ref("");
const region = ref(null);
const district = ref(null);
const categories = ref([]);
const categoriesWithId = ref([]);
const loading = ref(false);
// const products = ref([]);
const count = ref(0);
const product = ref(null);
let show = ref(false);
function showSiteBar() {
  show.value = !show.value;
  document.body.classList.toggle("overflow-hidden");
}
// const like = ref(false);

const provinceVal = ref(null);
const sorts = [
  { name: "sitebarMoreProduct.cheap", price: "-price" },
  { name: "sitebarMoreProduct.friends", price: "price" },
  { name: "sitebarMoreProduct.news", price: "published_at" },
];
function sortData(item) {
  sorted.value = item;
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
const formatPublishedTime = (time) => {
  return dayjs(time).format("D-MMMM, YYYY");
};
onMounted(async () => {
  await getCategoryWithChildren();
  await filterData();
  formatPublishedTime();
  await getData();
});

// dropdownlar

const data = ref([]);
const regions = ref([]);
const districts = ref([]);

const regionValue = ref(null);
const districtValue = ref(null);
const sortValue = ref(null);
const subCategoryValue = ref(null);
const allAccordionCheck = ref(false);

function allCheck() {
  allAccordionCheck.value = !allAccordionCheck.value;
  categories.value.map((el) => {
    el.checked = !el.checked;
    if (el.children.length) {
      el.children.map((item) => {
        item.checked = !item.checked;
      });
    }
  });
}

const updateRegionValue = (value) => {
  region.value = value[1];
  for (let i = 0; i < data.value.length; i++) {
    if (data.value[i].name == value[0]) {
      data.value[i].districts.map((item) => {
        districts.value.push(item);
      });

      break;
    }
  }
  regionValue.value = data;
};
async function getCategoryWithChildren() {
  try {
    const response = await storeInstance.get(`/categories-with-childs/`, {
      headers: {
        "Accept-Language": locale._value,
      },
    });
    categories.value = response.data.map((el) => {
      el.checked = false;
      let children = el.childs.map((item) => {
        return {
          name: item.name,
          id: item.id,
          checked: false,
        };
      });
      return {
        name: el.name,
        id: el.id,
        children,
        checked: false,
      };
    });
  } catch (error) {
    console.error(error);
  }
}
const updateDistrictValue = (value) => {
  district.value = value[1];
  districtValue.value = value;
};
async function getData() {
  try {
    const response = await usingInstance.get(`/regions-with-districts/`, {
      headers: {
        "Accept-Language": locale._value,
      },
    });

    data.value = response.data;
  } catch (error) {
    console.error(error);
  }
}
watch(data, () => {
  if (data && Array.isArray(data.value)) {
    data.value.map((item) => {
      regions.value.push(item);
    });
  }
});
const regex = /^[a-zA-Z0-9]+$/;
async function filterData(a) {
  let routId = route.query.categoty_id.split(" ").join("");
  if (a) {
    a.preventDefault();
  } else if (routId) {
    categories.value.forEach((el) => {
      console.log(el.id);
      if (routId == el.id) {
        el.checked = true;
      }
      el.children.forEach((item) => {
        if (routId == item.id) {
          item.checked = true;
        }
      });
    });
  }
  console.log(categories.value);
  product.value = null;
  categoriesWithId.value = [];
  categories.value.forEach((el) => {
    if (el.checked) {
      categoriesWithId.value.push(el.id);
    }
    el.children.forEach((item) => {
      if (item.checked) {
        categoriesWithId.value.push(item.id);
      }
    });
  });

  show.value = false;
  document.body.classList.remove("overflow-hidden");

  try {
    loading.value = true;
    const response = await storeInstance.get(`/list/ads/`, {
      headers: {
        "Device-Id": localStorage.getItem("deviseId"),
      },
      params: {
        district_id: district.value,
        region_id: region.value,
        ordering: sorted.value,
        category_ids: `${categoriesWithId.value}`,
      },
    });

    page.value++;
    product.value = response.data.results;
    count.value += product?.value?.count || 0;
    return;
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
}
</script>
