<template>
  <transition name="fade" mode="out-in">
    <div
      class="rounded-xl group border border-white duration-500 hover:shadow-anounce bg-white flex flex-col gap-2 leading-6 relative"
    >
      <button @click="productLiked(id)" class="absolute top-3 left-3">
        <span :class="like ? 'icon-red-heart' : 'icon-heart'"></span>
      </button>
      <img
        :src="image"
        alt="good pruduct"
        class="w-full h-60 max-sm:h-44 max-xs:h-30 rounded-t-xl object-cover"
      />
      <router-link :to="'/products/' + slug">
        <div class="sm:p-5 p-2">
          <div
            class="truncate text-black-1 group-hover:text-main-blue whitespace-nowrap max-sm:text-base text-lg font-semibold"
          >
            {{ title }}
          </div>
          <div class="text-greys-1 max-sm:text-sm text-base font-normal">
            {{ date }}
          </div>
          <div
            class="truncate text-greys-1 max-sm:text-sm text-base font-semibold"
          >
            {{ number }}
          </div>
          <div class="text-black-1 text-2xl max-sm:text-base font-bold">
            {{ formatMoneyDecimal(price) }}
            <span class="text-main-blue text-base font-medium leading-7"
              >UZS</span
            >
          </div>
        </div>
      </router-link>
    </div>
  </transition>
</template>
<script setup lang="ts">
import { defineProps, onBeforeMount, ref } from "vue";
import axios from "axios";
import { identity } from "@vueuse/core";
const props = defineProps<{
  title?: string;
  date?: string;
  phone?: number;
  price?: number;
  image?: string;
  number?: number;
  id: number;
  slug: string;
  islike: boolean;
}>();
let like = ref(false);

onBeforeMount(() => {
  console.log(props.islike);
  like.value = props.islike;
});

async function productLiked(id: number) {
  let localId = JSON.parse(localStorage.getItem("deviseId"));

  let headers = {
    headers: {
      "Device-Id": localId,
    },
  };

  try {
    if (!like.value) {
      await axios.post(
        "https://77-dev.uicgroup.tech/api/v1/store/favourite-product-create-by-id/",
        {
          device_id: localId,
          product: props.id,
        },
        headers
      );
      like.value = true;
    } else {
      await axios.delete(
        `https://77-dev.uicgroup.tech/api/v1/store/favourite-product-by-id/${id}/delete/`,
        headers
      );
      like.value = false;
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

function formatMoneyDecimal(number: any, fix = 0, option = "decimal") {
  let style: "currency";

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
</script>
