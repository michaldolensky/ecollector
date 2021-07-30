<template>
  <q-layout>
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

    <q-page-container class="bg-grey-3">
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
