import languages from "quasar/lang/index.json";
import { boot } from "quasar/wrappers";
import { Locales } from "src/types/Locales";
import { createI18n } from "vue-i18n";

export const appLanguages = languages.filter((lang) =>
  Object.values(Locales).includes(lang.isoName as Locales)
);
import messages from "@intlify/vite-plugin-vue-i18n/messages";

const i18n = createI18n({
  locale: Locales.EN,
  globalInjection: true,
  messages,
  fallbackLocale: Locales.EN,
});

export default boot(({ app }) => {
  // fixme
  // locale: navigator.languages[0] || navigator.language || 'en-US',,

  app.use(i18n);
});

export { i18n };
