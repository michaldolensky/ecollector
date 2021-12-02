import { appLanguages, i18n } from 'boot/i18n';
import { defineStore } from 'pinia';
import { Quasar } from 'quasar';

export interface LocaleState {
    locale: string;
}
type QuasarLanguageModule = typeof import('quasar/lang/en-US');

export const useLocaleStore = defineStore({
  id: 'locale',
  state: () => ({
    locale: 'en-US',

  } as LocaleState),
  getters: {
    getLocale: (state) => state.locale,
    getLangOptions: () => appLanguages.map((lang) => ({
      label: lang.nativeName, value: lang.isoName,
    })),
  },

  actions: {
    init() {
      this.setLocale(this.locale);
    },
    setLocale(val: string) {
      void import(
        /* webpackInclude: /(cs|en-US)\.js$/ */
        `quasar/lang/${val}`
      ).then((lang: QuasarLanguageModule) => {
        Quasar.lang.set(lang.default);
      });
      this.locale = val;
      i18n.global.locale = val;
    },
  },
});
