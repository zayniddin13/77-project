<script setup>
defineProps({
  type: String,
});
</script>

<template>
  <div>
    <div
      v-if="type === 'category'"
      class="skeleton-loading space-x-4 flex items-center justify-between w-full h-[90%] border rounded-2xl border-gray-100 p-8"
    >
      <div class="icon-part h-full w-[16%] flex items-center justify-center">
        <div class="bg-gray-100 w-full h-full animate-pulse"></div>
      </div>
      <div class="text-part h-full w-full">
        <div class="h-4 mb-2 w-[50%] bg-gray-100 animate-pulse"></div>
        <div class="h-2 mb-2 w-full bg-gray-100 animate-pulse"></div>
      </div>
    </div>
    <div v-if="type === 'product'">
      <div
        class="relative flex flex-col w-full overflow-hidden bg-white border-2 border-white product-card rounded-xl transition-300"
      >
        <div
          class="w-full h-64 max-sm:h-44 max-xs:h-30 rounded-t-xl bg-gray-100 animate-pulse"
        ></div>
        <div>
          <div class="p-5">
            <div class="rounded-md animate-pulse p-2 mb-4 bg-gray-100 w-[20%]"></div>
            <div class="rounded-md animate-pulse p-4 bg-gray-100"></div>
            <div class="mt-5 mb-2 animate-pulse p-2 bg-gray-100"></div>
            <div class="mt-5 mb-2 animate-pulse p-2 bg-gray-100"></div>
            <div
              class="font-normal text-xs text-[#8E9297] md:text-sm text-gray-1 leading-130"
            ></div>
            <div class="text-[#8E9297] text-base font-semibold mt-2 mb-4"></div>
            <div class="flex items-center gap-2">
              <div
                class="text-base font-bold text-black md:text-2xl leading-130"
              ></div>
              <div
                class="text-xs font-medium leading-5 uppercase text-blue md:leading-6 md:text-base"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>