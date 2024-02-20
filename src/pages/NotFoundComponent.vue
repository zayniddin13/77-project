<template>
  <div class="h-screen flex flex-col">
    <Header />
    <div class="container relative h-full px-auto">
      <div class="relative z-50 flex flex-col items-center justify-center">
        <img class="pt-20" src="../../public/images/notFound.svg" alt="" />
        <h1
          class="text-black-1 font-inter text-2xl font-not-italic font-bold leading-6 mt-14 mb-3"
        >
          Страница, которую вы ищете, не найдена
        </h1>
        <p
          class="text-Main-Dark font-normal taxt-base leading-6 font-not-italic mb-10"
        >
          Нам жаль, но, похоже, мы потеряли эту страницу, но мы не хотим терять
          вас.
        </p>
        <router-link to="/">
          <Button variant="bgBlueTextWhite" title="Вернуться на главную" />
        </router-link>
      </div>
      <img
        class="absolute z-30 bottom-0 w-10/12 left-1/2 -translate-x-1/2"
        src="../../public/images/circling.svg"
        alt=""
      />
    </div>
  </div>
</template>
<script setup>
import Header from "@/components/Header.vue";
import Button from "@/components/ui/Button.vue";
</script>
