<template>
    <div>
        <p>hello worldd</p>
      <CInput
            v-model="form.name"
            :error="v$?.name.$error"
            :placeholder="$t('modal.passwordInput')"
            styles="disabled:text-gray-400 bg-gray-200 focus-within:bg-white"
            class="w-full py-3 text-base leading-5 transition duration-300 border rounded-lg outline-none focus-within:border-blue-400 ps-4 pe-10 sm:text-sm text-black-1 disabled:text-gray-400 bg-gray-200 focus-within:bg-white"
          />
          <button @click="submitForm">click</button>
    </div>
</template>
<script setup lang="ts">
import CInput from '../components/ui/Input.vue'
import { useVuelidate } from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import {ref,reactive, computed} from 'vue'
const form = reactive({
  name: "",
});
const rules = computed(() => {
  return {
    name: { required },

  };
});


const submitForm = async () => {
    v$.value.$touch()
    if (form.value.$invalid) return
}
let v$ = useVuelidate(rules, form);
</script>