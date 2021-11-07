<template>
  <q-page>
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

    <router-view
      class="bg-grey-3 col items-start q-gutter-md"
      padding
    />
  </q-page>
</template>

<script lang="ts" setup>
import { useSiteSettingsStore } from 'src/stores/settings';
import DashboardDrawerItemsComponent from 'components/dashboard/DashboardDrawerItemsComponent.vue';

const settings = useSiteSettingsStore();
</script>
