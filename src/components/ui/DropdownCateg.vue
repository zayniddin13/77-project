<template>
  <div class="relative">
    <div class="w-full border-b border-gray-400">
      <div
        class="flex items-center w-full justify-between group"
      >
        <div
          class="group flex items-center gap-2 relative select-none min-h-[20px] cursor-pointer border-b-0 py-2.5"
        >
          <slot name="preffix"></slot>
          <p
            class="text-sm font-medium leading-130 text-black transition-300 group-hover:text-blue-400"
          >
            {{ title }}
          </p>
        </div>

        <slot name="suffix"></slot>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, onMounted } from "vue";
import { storeInstance, usingInstance } from "@/instances";
import { useI18n } from "vue-i18n";
let props = defineProps({
  title: String,
  item: String,
  labelTitle: String,
  options: Array,
});

</script>
