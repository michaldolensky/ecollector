import { defineStore } from "pinia";

export const useSiteSettingsStore = defineStore("settings", {
  state: () => ({
    drawer: true,
  }),
  getters: {
    drawerState: (state) => state.drawer,
  },
  actions: {
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
  },
});
