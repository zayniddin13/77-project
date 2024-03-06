<template>
  <div>
    <a
      href="https://uic.group/"
      target="_blank"
      class="group flex items-center"
    >
      <img class="my-1" src="/public/images/uicLogo.svg" alt="" />

      <img
        class="uicName opacity-0 invisible w-0 transition-all duration-500 max-md:hidden"
        src="/public/images/uicName.svg"
        alt=""
      />
    </a>
  </div>
</template>
<style scoped>
.group:hover .uicName {
  opacity: 1;
  visibility: visible;
  width: 90px;
  margin-left: 10px;
}
</style>
