<template>
  <div class="relative">
    <div class="w-full border-b border-gray-400">
      <div class="flex items-center w-full justify-between group">
        <div
          class="group flex items-center gap-2 relative select-none min-h-[20px] cursor-pointer border-b-0 py-2.5"
        >
          <span
            @click="toggleCheck"
            :class="check ? '!bg-blue-400 !border-blue-400' : '!bg-white'"
            class="duration-300 ease-in-out relative shrink-0 inline-block h-5 w-5 rounded-md border !border-gray-500 group-hover:border-blue-300 !border-white/20"
            ><span
              class="icon-checkmark text-[9px] top-1/2 left-1/2 leading-5 text-white transform -translate-x-1/2 -translate-y-1/2 transition-200 absolute z-[1]"
            ></span
          ></span>
          <p
            class="text-sm font-medium leading-130 text-black transition-300 group-hover:text-blue-400"
          >
            {{ title }}
          </p>
        </div>

        <div :class="open ? 'rotate-90' : 'rotate-0'">
          <slot name="suffix"></slot>
        </div>
      </div>
    </div>

  </div>
</template>
<script setup>
import { ref, defineProps, onMounted } from "vue";
import { storeInstance, usingInstance } from "@/instances";
import { useI18n } from "vue-i18n";
// const { t, locale } = useI18n();
const provinValue = ref("");

let props = defineProps({
  title: String,
  item: String,
  labelTitle: String,
  options: Array,
});
let check = ref(false);
function toggleCheck() {
  check.value = !check.value;
}
function updateProvince(item) {
  console.log(item);
  provinValue.value = item;
  console.log(props.title);
  open.value = false;
}
function updateCities(params) {}
const open = ref(false);
let province = ref("");
function toggleDrop() {
  province = document.querySelector("#city input");
  console.log(province.value);
  if (province.value.length) {
    open.value = !open.value;
  }
}
const accept = ref(false);
function acceptFunc() {
  if (province.value.length) {
    accept.value = !accept.value;
    return accept.value;
  }
}
onMounted(() => {
  acceptFunc();
});
</script>
