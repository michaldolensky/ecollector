<template>
  <q-layout
    containerv
    iew="hHh Lpr lff"
  >
    <q-header
      class="bg-primary text-white"
      elevated
    >
      <q-toolbar>
        <q-btn
          dense

          flat
          icon="menu"
          round
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-drawer
      :mini="miniState"
      :width="200"
      behavior="desktop"
      bordered
      elevated
      show-if-above
      side="left"
    >
      <DashboardDrawerItemsComponent />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import DashboardDrawerItemsComponent from '../components/dashboard/DashboardDrawerItemsComponent.vue';

export default defineComponent({
  name: 'DashBoardLayout',
  components: { DashboardDrawerItemsComponent },
  setup() {
    const miniState = ref(false);

    return {
      miniState,
      toggleLeftDrawer() {
        miniState.value = !miniState.value;
      },
    };
  },
});
</script>
