import { defineStore } from 'pinia';

export const useSiteSettingsStore = defineStore({
  id: 'settingsStore',
  state: () => ({
    drawerState: true,
  }),
  getters: {
    drawerState: (state) => state.drawerState,
  },
  actions: {
    toggleDrawer() {
      this.$patch({
        drawerState: !this.drawerState,
      });
    },
  },
});
