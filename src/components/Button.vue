<template>
 <div  :class="variants[variant]" class="px-4 py-2 flex items-center rounded-lg gap-1" >
  <slot name="prefix"></slot>
  <button>{{ title }}</button>
  <slot name="suffix"></slot>
 </div>
</template>
<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps<{
  title?: string
  variant?: 'primary' | 'secondary'
}>()
const variants = {
  primary: 'bg-black text-white active:scale-95 hover:bg-zinc-700',
  secondary: 'bg-gray-400 text-black active:scale-95 hover:bg-gray-300 disabled:bg-gray-200 disabled:text-gray-400',
}
</script>