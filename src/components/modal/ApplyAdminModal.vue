<template>
  <div
      class="relative flex justify-center items-center flex-col text-center overflow-x-hidden scroll-style p-4 bg-white w-full lg:max-w-sm shadow-xl overflow-y-auto rounded-2xl max-h-[650px]"
  >
  <Button
          @click="emit('close:modal')"
          class="absolute text-xl font-thin transition duration-300 rounded-full text-black/50 icon-close top-5 right-5 w-7 h-7 shrink-0 flex-center hover:text-black hover:bg-transparent active:scale-95"
        ></Button>
    <img class="w-6/12 mx-auto" src="../../../public/images/informationCircle.svg" alt="">

   <p>{{ $t('signupModal.applyAddmin') }}</p>
<a :href="linkToNum" target="_blank">
    <Button variant="bgBlueTextWhite" :title="number" class="mt-10">
<template #prefix> <span class="icon-phone"></span> </template>
   </Button>
</a>
    </div>  
</template>
<script setup>
import { ref, onMounted } from "vue";
import Button from "../../components/ui/Button.vue";
import { usingInstance } from "../../instances/index";
const emit = defineEmits(["close:modal"]);
const number = ref('')
const linkToNum=ref('tel:' + number)
const dataNumberFromApi = async()=> {
  try {
    const result = await usingInstance.get("/setting/");
    number.value = result.data.phone
    number.value = number.value.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, "$1 $2 $3 $4 $5");
    return;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
    dataNumberFromApi()
});
</script>