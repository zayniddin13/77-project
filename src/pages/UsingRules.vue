<template>
  <div class="container">
    <BreadCrump v-bind="{ routes }" />
    <div v-if="product" class="pt-5 pb-4 md:px-2 max-w-3xl">
      <h1
        class="text-2xl md:text-3.5xl font-bold leading-130 text-black-1 max-md:px-4"
      >
        {{ product.title }}
      </h1>
    </div>
    <div v-if="product" class="p-4 bg-white mt-2.5 static-text mb-20">
      <div class="aboutUs" v-html="product.content" ref="text"></div>
    </div>
  </div>
</template>
<script setup>
import BreadCrump from "../components/ui/breadCrump.vue";
import { onMounted, ref, computed } from "vue";
import axios from "axios";
import { usingInstance } from "../instances";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
import { useI18n } from "vue-i18n";
const router = useRouter();
const { t, locale } = useI18n();
let routes;
const product = ref(null);
let about = ref(null);
async function dataFetch() {
  console.log(`${route.params.slug}`);
  try {
    const response = await usingInstance.get(`/pages/${route.params.slug}/`);
    console.log(response.data); // Ma'lumotlarni konsolga chop etish
    product.value = response.data;
    routes = computed(() => [
      {
        label: product.value.title,
        link: "/about",
      },
    ]);
    console.log(product._value.content);
  } catch (error) {
    console.error("Error fetching product:", error);
    router.push({ name: "NotFoundComponent" });
  }
}
onMounted(() => {
  dataFetch();
});
</script>
