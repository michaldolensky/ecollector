import { boot } from 'quasar/wrappers';
import { Locales } from 'src/types/Locales';
import { createI18n } from 'vue-i18n';
import enUS from '../locales/enUS.json';

type MessageSchema = typeof enUS

export default boot(({ app }) => {
  // fixme
// locale: navigator.languages[0] || navigator.language || 'en-US',,
  const i18n = createI18n<[MessageSchema], Locales>({
    locale: Locales.EN,
    messages: {
      [Locales.EN]: enUS,
      // [Locales.CS]: cs,
    },
    fallbackLocale: Locales.EN,
  });
  app.use(i18n);
});
