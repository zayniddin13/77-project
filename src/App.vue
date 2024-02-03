<template>
<div>
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import EnterButton from "./components/Button.vue";
import Katagories from "./components/Katagory.vue";
import Katagory from "./components/KatagoryProduct.vue";
import MainForm from "./components/Form.vue";
import AnounsSection from "./components/AnounsSection.vue";
import Announce from "./components/Anounsment.vue";
import Footer from "./components/Footer.vue";
import AboutUs from "./components/AboutUs.vue"
import Main from "./components/Main.vue";
import UsingRules from "./components/UsingRules.vue";
import Saved from "./components/Saved.vue";
</script>
