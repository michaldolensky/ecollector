import { boot } from 'quasar/wrappers';
import { Locales } from 'src/types/Locales';
import { createI18n } from 'vue-i18n';
import enUS from '../locales/enUS.json';

type MessageSchema = typeof enUS

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

export default boot(({ app }) => {
  // Set i18n instance on app
  app.use(i18n);
});

export function useI18n() {
  // https://github.com/intlify/vue-i18n-next/issues/324
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const {
    t, te, tm, rt, d, n, ...globalApi
  } = i18n.global;

  return {
    t: t.bind(i18n),
    te: te.bind(i18n),
    tm: tm.bind(i18n),
    rt: rt.bind(i18n),
    d: d.bind(i18n),
    n: n.bind(i18n),
    ...globalApi,
  };
}

export { i18n };
