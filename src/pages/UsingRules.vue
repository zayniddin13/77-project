<template>
  <div class="container">
      <!-- <div class="container">
    <div class="flex items-center gap-1.5 md:overflow-hidden">
      <router-link
        to="/"
        class="flex-y-center gap-1 text-dark leading-130 text-sm font-medium transition-300 hover:text-blue group"
      >
        Главная</router-link
      >
      <span class="w-1 h-1 rounded-full bg-gray-400 shrink-0"></span>
      <router-link
        to=""
        class="pointer-events-none !text-gray-400 transition-300 max-w-full flex-y-center cursor-pointer min-w-max group-last:min-w-[100px] sm:group-last:min-w-[200px] breadcrumb-menu line-clamp-1 whitespace-nowrap text-dark leading-130 text-sm font-medium transition-300 hover:text-blue"
        >О сайте 77.uz</router-link
      >
    </div>
  </div> -->
     <BreadCrump v-bind="{ routes }" />
    <div v-if="product" class=" pt-5 pb-4 md:px-2 max-w-3xl ">
      <h1
        class="text-2xl md:text-3.5xl font-bold leading-130 text-dark max-md:px-4"
      >
 {{ product.title }}
      </h1>
      </div>
       <div v-if="product" class="p-4 bg-white mt-2.5 static-text mb-20">
        <div class="aboutUs" v-html="product.content" ref="text"></div>
       </div>
   </div>
  
</template>
<script setup >
import BreadCrump from "../components/ui/breadCrump.vue";
import { onMounted, ref, computed} from "vue";
import axios from "axios";
import { usingInstance } from "../instances";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
import { useI18n } from "vue-i18n";
const router = useRouter()
const { t, locale } = useI18n();
let routes
const product = ref(null)
let about=ref(null)
async function dataFetch() {
  console.log(`${route.params.slug}`);
  try {
    const response = await usingInstance.get(
      `/pages/${route.params.slug}/`
    );
    console.log(response.data); // Ma'lumotlarni konsolga chop etish
    product.value = response.data;
     routes = computed(() => [
  {
    label: product.value.title,
    link: "/about",
  },])
    console.log(product._value.content);
  } catch (error) {
    console.error("Error fetching product:", error);
    router.push({name:'NotFoundComponent'})
  }
 
}
onMounted(() => {
  dataFetch()
});





</script>
