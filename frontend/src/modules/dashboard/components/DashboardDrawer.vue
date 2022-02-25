<script lang="ts" setup>
import DashboardDrawerItemsComponent from "src/modules/dashboard/components/DashboardDrawerItemsComponent.vue";

import { useSiteSettingsStore } from "src/stores/settings";

const settings = useSiteSettingsStore();
</script>

<template>
  <q-drawer
    :mini="settings.drawerState"
    :width="200"
    behavior="desktop"
    bordered
    elevated
    show-if-above
    side="left"
  >
    <DashboardDrawerItemsComponent />
  </q-drawer>
</template>
