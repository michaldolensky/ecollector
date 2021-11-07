import { defineStore } from 'pinia';

export const useSiteSettingsStore = defineStore({
  id: 'settingsStore',
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
