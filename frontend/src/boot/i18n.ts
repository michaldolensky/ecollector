import { boot } from 'quasar/wrappers';
import { Locales } from 'src/types/Locales';
import { createI18n } from 'vue-i18n';
import languages from 'quasar/lang/index.json';
import en from '../i18n/en-US.json';
import cs from '../i18n/cs.json';

export const appLanguages = languages
  .filter((lang) => Object.values(Locales).includes(lang.isoName as Locales));

type MessageSchema = typeof en;
const i18n = createI18n<[MessageSchema], Locales>({
  locale: Locales.EN,
  messages: {
    [Locales.EN]: en,
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
