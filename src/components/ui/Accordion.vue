<template>
  <div class="select-none">
    <div class="flex items-center w-full gap-2 group border-b border-gray-300">
      <div
        @click="checkToggle"
        class="group flex items-center justify-start flex-grow cursor-pointer text-left gap-2 relative select-none min-h-[20px] py-2.5"
      >
        <span
          :class="
            checked === 'all-checked' || element.checked
              ? '!bg-blue-400 !border-blue-400'
              : checked === 'some-checked'
              ? '!bg-blue-400 !border-blue-400'
              : ''
          "
          class="duration-300 ease-in-out relative shrink-0 inline-block h-5 w-5 rounded-md border !border-gray-300 group-hover:border-blue-300"
          ><span
            :class="
              checked === 'all-checked' || element.checked
                ? 'icon-checkmark'
                : checked === 'some-checked'
                ? 'icon-minus'
                : ''
            "
            class="text-[9px] top-1/2 left-1/2 leading-5 text-white transform -translate-x-1/2 -translate-y-1/2 transition-200 absolute z-[1]"
          ></span
        ></span>
        <p
          class="text-sm font-medium leading-130 text-black transition-300 group-hover:text-blue-300"
        >
          {{ props.title }}
        </p>
      </div>
      <div class="flex items-center justify-end flex-grow cursor-pointer">
        <div
          @click="toggleAccordion"
          v-if="accordionOptions.length > 0"
          :class="open ? 'rotate-90' : 'rotate-0'"
          class="text-[9px] font-bold leading-5 transition-transform -rotate-90 icon-to-bottom transition-300 text-gray-500"
        ></div>
      </div>
    </div>
    <div class="pl-4">
      <div
        :key="key"
        v-for="(option, key) in accordionOptions"
        @click="toggleCheckOption(option)"
        :class="open ? 'block' : 'hidden'"
        class="group w-full flex items-center gap-2 relative select-none min-h-[20px] cursor-pointer border-b border-gray-4 last:!border-b-0 last:!mb-0 py-2.5 last:pb-0"
      >
        <span
          :class="option.checked ? '!bg-blue-400 !border-blue-400' : ''"
          class="duration-300 ease-in-out relative shrink-0 inline-block h-5 w-5 rounded-md border !border-gray-400 group-hover:border-blue"
        >
          <span
            :class="option.checked ? 'icon-checkmark' : ''"
            class="text-[9px] top-1/2 left-1/2 leading-5 text-white transform -translate-x-1/2 -translate-y-1/2 transition-200 absolute z-[1]"
          ></span>
        </span>
        <span class=""
          ><span
            class="text-sm font-medium leading-130 text-dark transition-300 group-hover:text-blue"
            >{{ option.name }}</span
          ></span
        >
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { watch } from "vue";
import { ref } from "vue";

const props = defineProps({
  title: String,
  options: Array,
  element: Array,
  allChecked: Boolean,
});

const open = ref(false);
const checked = ref("none");
const accordionOptions = ref([]);
const element = ref([]);
const toggleAccordion = () => {
  open.value = !open.value;
};

const checkToggle = () => {
  element.value.checked = !element.value.checked;
  accordionOptions.value = accordionOptions.value.map((item) => ({
    ...item,
    checked: checked.value === "all-checked" ? false : true,
  }));
};

const toggleCheckOption = (option) => {
  let filterChecks = [];
  option.checked = !option.checked;
  filterChecks.value = accordionOptions.value.filter((el) => el.checked);
  if (filterChecks.value.length == accordionOptions.value.length) {
    element.value.checked = true;
  } else {
    element.value.checked = false;
  }
};

onMounted(() => {
  accordionOptions.value = props.options;
  element.value = props.element;
});

watch(
  accordionOptions,
  () => {
    let checkCheckedOptions = accordionOptions.value.filter(
      (option) => option.checked
    );

    checked.value =
      checkCheckedOptions.length === props.options.length &&
      checkCheckedOptions.length !== 0
        ? "all-checked"
        : checkCheckedOptions.length > 0
        ? "some-checked"
        : "none";
  },
  { deep: true }
);
</script>
