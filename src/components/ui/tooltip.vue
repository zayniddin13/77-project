<template>
  <div
    :class="productCont ? 'flex' : 'hidden'"
    class="relative items-center gap-9 flex-wrap rounded-xl border border-grey-4 p-5"
  >
    <div class="arrow h-4 w-4 rotate-90 border border-grey-4"></div>
    <div v-for="(item, index) in categoryChilds" :key="index">
      <div class="flex items-center justify-between p-3">
        <p class="font-medium leading-4 text-sm">{{ item.name }}</p>
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
  productCont: Boolean,
});
</script>
