<template>
  <div
    class="w-full absolute left-0 flex items-center shadow-drop gap-9 !z-20 flex-wrap rounded-xl border bg-white border-grey-4 p-5 mt-3"
  >
    <div
      class="arrow absolute h-4 w-4 rotate-45 z-0 top-0 -translate-y-1/2 border-l border-t border-l-grey-4 border-t-grey-4 bg-white"
      :class="position"
    ></div>
    <div v-for="(item, index) in categoryChilds" :key="index">
      <div class="flex items-center flex-wrap gap-9 p-3">
        <router-link :to="'/more-product?categoty_id=' + item.id"
          ><p
            class="font-medium leading-4 text-sm hover:text-main-blue text-black-1"
          >
            {{ item.name }}
          </p></router-link
        >
        <template v-if="categoryChildAdds">
          <span class="to-bottom -rotate-90 text-[8px] text-greys-2"></span>
        </template>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps } from "vue";
const props = defineProps({
  categoryChilds: Object,
  categoryChildAdds: Object,
  positionForX: String,
});
let position = `left-[${props.positionForX}px]`;
</script>
