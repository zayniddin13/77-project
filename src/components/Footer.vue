<template>
  <div>
    <div
      class="footer mt-8 pt-14 md:pt-16 pb-3 bg-cover bg-[url('/public/images/circling.svg')] bg-center relative"
    >
    <div class="absolute top-0 left-[50%] -translate-x-2/4 -translate-y-[45%]"><img src="/public/images/shadowLogo.svg" alt=""></div>
      <div class="container">
        <p
          class="footer_about text-center font-inter text-base font-normal leading-6 md:mx-44 not-italic mb-8"
        >
          77.uz marketplace - это виртуальная платформа в Узбекистане, которая
          облегчает покупки и продажи, связывая продавцов с потенциальными
          клиентами.
        </p>
        <div class="using_site block sm:flex items-center justify-center gap-5 md:gap-20">
          <router-link to="/about-us" target="_blank"
            class="aboutUs flex items-center justify-center gap-1">
          <img src="/public/images/footerLogo.svg" alt="" /><span
              >Доска объявлений</span
            >
          </router-link>
          <router-link to="/using-rules"
            target="_blank"
            class="using_rules flex items-center justify-center gap-1"
            ><img src="/public/images/footerLogo.svg" alt="" /><span
              >Условия пользования</span
            ></router-link
          >
          <a
            href="tel: +998 88 278 96 96"
            target="_blank"
            class="connecting_us flex items-center justify-center gap-1"
            ><img src="/public/images/footerLogo.svg" alt="" /><span
              >+998 88 500 50 00</span
            ></a
          >
        </div>
        <div
          class="downloading_content mt-6 mb-2 flex items-center justify-center gap-6"
        >
          <a href="http://" target="_blank"
            ><img src="/public/images/appStore.svg" alt=""
          /></a>
          <a href="http://" target="_blank"
            ><img src="/public/images/googlePlay.svg" alt=""
          /></a>
        </div>
        <p
          class="text-center text-black text-base not-italic font-normal leading-6"
        >
          Загрузите наше
          <span class="text-blue-500 font-bold">приложение</span> и пользуйтесь
          с платформой <span class="text-blue-500 font-bold">ещё удобнее</span>
        </p>
      </div>
    </div>
    <div class="bg-white py-4">
      <div class="container flex items-center justify-between">
        <div class="max-sm:block flex items-center gap-1">
          <span class="text-black font-medium">© 77.uz</span> <span class="text-black font-normal"> 2023. Все права защищены</span>
        </div>

        <div class="flex items-center justify-between">
          <img src="/public/images/uicLogo.svg" alt="" />
          <img src="/public/images/uicName.svg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup></script>
