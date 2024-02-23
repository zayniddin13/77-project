<template>
  <div class="relative">
    <label for="" class="text-sm font-medium leading-5 text-gray">
      {{ labelTitle }}</label
    >
    <div
      class="rounded-lg pl-3 p-2.5 cursor-pointer flex items-center justify-between border border-[#EAEDF0]"
      @click="toggleDrop"
    >
      <slot name="prefix"></slot>
      <input class="text-sm leading-5 truncate text-primary" :placeholder="title" :value="provinValue" />
    <template :class="acceptFunc ? 'text-gray-600' : 'text-gray-400'">
 <div  :class="open ? 'rotate-90' : 'rotate-0'">
        <slot name="suffix"></slot>
      </div>
    </template>
   
    </div>
    <div
      v-if="open"
      class="absolute shadow-3.6xl top-full w-full bg-white rounded-lg z-10 translate-y-3 overflow-x-hidden max-h-[318px] scroll-style options"
    >
      <div>
        <div
          v-for="(item, index) in options"
          :key="index"
          
          class="p-4 duration-300 border-b cursor-pointer transition-300 hover:bg-gray-bg border-white-4 last:border-none"
        >
          <p @click="updateProvince(item)"  class="text-base font-medium text-dark leading-130">
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref,  defineProps, onMounted } from "vue";
import { storeInstance, usingInstance } from "@/instances";
import { useI18n } from "vue-i18n";
// const { t, locale } = useI18n();
 const provinValue = ref('');


let props = defineProps({
  title: String,
  labelTitle: String,
  options: Array,
});

function updateProvince(item) {
  console.log(item);
provinValue.value=item
console.log(props.title );
  open.value = false;
}
function updateCities(params) {
  
}
const open = ref(false);
let province=ref('')
function toggleDrop() {
  province = document.querySelector("#city input");
    console.log(province.value)
  if (province.value.length) {
    open.value = !open.value;
  }
}
const accept=ref(false)
function acceptFunc() {
   if (province.value.length) {
       accept.value = !accept.value;
    return accept.value
  } 
}
onMounted(() => {
    acceptFunc()
})
</script>
