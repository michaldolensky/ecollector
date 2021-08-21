<template>
  <q-layout view="hhh LpR fFf">
    <q-drawer
      v-model="settings.drawerState"
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

<script lang="ts" setup>
import { useSiteSettingsStore } from 'src/stores/settings';
import { ref } from 'vue';
import DashboardDrawerItemsComponent from '../components/dashboard/DashboardDrawerItemsComponent.vue';

const settings = useSiteSettingsStore();

const miniState = ref(false);
</script>
