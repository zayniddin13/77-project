import { createI18n } from "vue-i18n";

import messages from "./translate.json";

const i18n = createI18n({
  locale: localStorage.getItem("locale")
    ? localStorage.getItem("locale")
    : "uz", // set locale
  fallbackLocale: "ru", // set fallback locale
  messages, // set locale messages
  legacy: false,
});

export default i18n;
