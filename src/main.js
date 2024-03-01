import "./assets/main.css";
import { createI18n } from "vue-i18n";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./locales/i18n";

const app = createApp(App);

import PrimeVue from "primevue/config";

app.use(PrimeVue);
// As a plugin








app.use(router);
app.use(i18n)
app.mount("#app");
