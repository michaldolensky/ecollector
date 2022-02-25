import languages from "quasar/lang/index.json";
import { boot } from "quasar/wrappers";
import { Locales } from "src/types/Locales";
import { createI18n } from "vue-i18n";
import cs from "../i18n/cs-CZ.json";
import enUS from "../i18n/en-US.json";

export const appLanguages = languages.filter((lang) =>
  Object.values(Locales).includes(lang.isoName as Locales)
);

type MessageSchema = typeof enUS;
const i18n = createI18n<[MessageSchema], Locales>({
  locale: Locales.EN,
  messages: {
    [Locales.EN]: enUS,
    [Locales.CS]: cs,
  },
  fallbackLocale: Locales.EN,
});

export default boot(({ app }) => {
  // fixme
  // locale: navigator.languages[0] || navigator.language || 'en-US',,

  app.use(i18n);
});

export { i18n };
