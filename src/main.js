import "./assets/main.css";
import { createI18n } from "vue-i18n";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import i18n from "./locales/i18n";


const app = createApp(App);



app.use(router);
app.use(i18n)
app.mount("#app");
