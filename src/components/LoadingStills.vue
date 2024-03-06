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
            <div
              class="rounded-md animate-pulse p-2 mb-4 bg-gray-100 w-[20%]"
            ></div>
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
    <div v-if="type === 'SingleProduct'">
      <div role="status" class="animate-pulse md:flex gap-4">
        <div class="w-full h-full rounded">
          <svg
            class="w-250 h-250 max-sm:w-full max-sm:h-[300px] text-gray-200 dark:text-gray-600"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path
              d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
            />
          </svg>
          <div class="flex gap-2">
            <svg
              class="w-40 h-40 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path
                d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
              />
            </svg>
            <svg
              class="w-40 h-40 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path
                d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
              />
            </svg>
            <svg
              class="w-40 h-40 text-gray-200 dark:text-gray-600"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 18"
            >
              <path
                d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
              />
            </svg>
          </div>
          <div
            class="p-4 bg-gray-200 rounded-lg dark:bg-gray-700 max-w-[440px] mb-2.5"
          >
            <div
              class="h-5 bg-white rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"
            ></div>
            <div
              class="h-5 bg-white rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"
            ></div>
            <div
              class="h-5 bg-white rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"
            ></div>
            <div
              class="h-5 bg-white rounded-full dark:bg-gray-700 max-w-[440px] mb-2.5"
            ></div>
          </div>
        </div>
        <div class="w-full">
          <div
            class="skeleton-loading space-x-4 flex items-center justify-between w-full h-22 border rounded-2xl border-gray-100 p-8 my-3"
          >
            <div
              class="icon-part h-full w-[16%] flex items-center justify-center"
            >
              <svg
                class="w-20 h-20 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path
                  d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
                />
              </svg>
            </div>
            <div class="text-part h-full w-full">
              <div class="h-4 mb-2 w-[50%] bg-gray-100 animate-pulse"></div>
              <div class="h-2 mb-2 w-full bg-gray-100 animate-pulse"></div>
            </div>
          </div>
          <div
            class="skeleton-loading space-x-4 flex items-center justify-between w-full h-22 border rounded-2xl border-gray-100 p-8 my-3"
          >
            <div
              class="icon-part h-full w-[16%] flex items-center justify-center"
            >
              <svg
                class="w-20 h-20 text-gray-200 dark:text-gray-600"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 18"
              >
                <path
                  d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z"
                />
              </svg>
            </div>
            <div class="text-part h-full w-full">
              <div class="h-4 mb-2 w-[50%] bg-gray-100 animate-pulse"></div>
              <div class="h-2 mb-2 w-full bg-gray-100 animate-pulse"></div>
            </div>
          </div>
        </div>
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>
