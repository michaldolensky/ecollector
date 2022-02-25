import { appLanguages, i18n } from "boot/i18n";
import { defineStore } from "pinia";
import { date, Quasar } from "quasar";

export interface LocaleState {
  locale: string;
}
type QuasarLanguageModule = typeof import("quasar/lang/en-US");

export const useLocaleStore = defineStore("locale", {
  state: () =>
    ({
      locale: "en-US",
    } as LocaleState),
  getters: {
    getLocale: (state) => state.locale,
    getLangOptions: () =>
      appLanguages.map((lang) => ({
        label: lang.nativeName,
        value: lang.isoName,
      })),
  },

  actions: {
    init() {
      this.setLocale(this.locale);
    },
    getFormatedDate(dateString: string) {
      return date
        .extractDate(dateString, "YYYY-MM-DD")
        .toLocaleDateString(this.locale);
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
