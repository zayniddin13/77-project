<template>
  <div
    id="announ"
    class="rounded-xl border border-white shadow-anounce bg-white flex flex-col gap-2 font-inter leading-6 relative"
  >
    <button @click="productLiked(id)" class="absolute top-3 left-3">
      <span v-if="!like" class="icon-heart"></span>
      <span v-if="like" class="icon-red-heart"></span>
    </button>
    <img
      :src="image"
      alt=""
      class="w-full h-60 max-sm:h-44 max-xs:h-30 rounded-t-xl object-cover object-contain"
    />
    <div class="sm:p-5 p-2">
      <div
        class="truncate text-blue-black hover:text-blue-500 whitespace-nowrap max-sm:text-base text-lg font-semibold"
      >
        {{ title }}
      </div>
      <div class="text-gray-300 max-sm:text-sm text-base font-normal">
        {{ date }}
      </div>
      <div
        class="truncate text-gray-400 max-sm:text-sm text-base font-semibold"
      >
        {{ number }}
      </div>
      <div class="text-black text-2xl max-sm:text-base font-bold">
        {{ formatMoneyDecimal(price) }}
        <span class="text-blue-500 text-base font-medium leading-7">UZS</span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { defineProps, ref } from "vue";
import axios from "axios";

const like = ref(false);
function productLiked(id: number) {
  like.value = !like.value;
   console.log(id);
 const response = axios.post(
   "https://77-dev.uicgroup.tech/api/v1/store/favourite-product-create-by-id/",
    {
      product: id,   
    }
    
 );
  console.log(response);
  
  
}
function formatMoneyDecimal(number: any, fix = 0, option = "decimal") {
  let style: string;
  if (["USD", "RUB"].includes(option)) {
    style = "currency";
  } else if (["kilogram", "meter", "percent"].includes(option)) {
    style = "unit";
  } else {
    style = "";
  }

  const newStyle: string = style;
  const option2 = {
    newStyle, //  unit currency percent decimal
    [newStyle]: option,
    maximumFractionDigits: fix,
    minimumFractionDigits: fix,
    decimal: ".",
  };
  return number
    ? new Intl.NumberFormat("ru-RU", option2).format(number)
    : "0.00";
}

const props = defineProps<{
  title?: string;
  date?: string;
  phone?: number;
  price?: number;
  image?: string;
  number?: number;
  id: number;
}>();
</script>
