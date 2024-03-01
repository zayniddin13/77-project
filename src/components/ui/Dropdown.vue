<template>
  <div
    :class="props.disabled ? 'opacity-50 pointer-events-none' : ''"
    class="relative select-none"
  >
    <div
    :class="{ '!border-red-600': error }"
      class="rounded-lg pl-3 p-2.5 cursor-pointer flex items-center justify-between border border-[#EAEDF0]"
      @click="toggleDrop"
      v-click-outside="closeDrop"
    >
      <p>
        {{ dropdownVal }}
      </p>
      <span
        :class="open ? 'rotate-90' : 'rotate-0'"
        class="inline-block text-[9px] leading-6 transition-transform -rotate-90 icon-to-bottom transition-300 text-gray"
      />
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
          <p
            @click="updateValue(item.name, item.id)"
            class="text-base font-medium text-dark leading-130"
          >
            {{ item.name }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted } from "vue";
import { ref, defineProps, defineEmits } from "vue";

let props = defineProps({
  title: String,
  options: Array,
  disabled: Boolean,
  dropBorder: String,
  error:Boolean
});
const emit = defineEmits(["value"]);
const open = ref(false);
let dropdownVal = ref("");

function updateValue(item, index) {
  console.log(index);
  dropdownVal.value = item;
  emit("value", [item, index]);
  open.value = false;
}

function toggleDrop() {
  open.value = !open.value;
}
function closeDrop() {
  open.value = false;
}
onMounted(() => {
  dropdownVal.value = props.title;
});
</script>
<script></script>
