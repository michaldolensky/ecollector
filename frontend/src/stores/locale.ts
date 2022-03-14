import { appLanguages, i18n } from "boot/i18n";
import { defineStore } from "pinia";
import { date, Quasar } from "quasar";

export interface LocaleState {
  locale: string;
}

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
    async setLocale(val: string) {
      const localeModules = await import.meta.glob(
        `/node_modules/quasar/lang/(cs|en-US)*`
      );

      for (const path in localeModules) {
        if (path.includes(val)) {
          localeModules[path]().then((mod) => {
            Quasar.lang.set(mod.default);
          });
          break;
        }
      }
      this.locale = val;
      i18n.global.locale.value = val;
    },
  },
});
