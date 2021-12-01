<template>
  <q-layout view="hHh LpR fFf">
    <q-header
      class="bg-primary text-white"
      elevated
      height-hint="98"
    >
      <q-toolbar>
        <q-btn
          v-if="showDrawer"
          class="q-mr-sm"
          dense
          flat
          icon="menu"
          round
          @click="settings.toggleDrawer"
        />
        <q-toolbar-title shrink>
          <q-item
            clickable
            exact
            tag="a"
            to="/"
          >
            <q-item-section class="text-white">
              {{ $t('site_name') }}
            </q-item-section>
          </q-item>
        </q-toolbar-title>
        <q-space />

        <locale-toggle />
        <q-space />
        <AccountDropdown />
      </q-toolbar>

      <router-view name="subToolbar" />
    </q-header>

    <router-view name="drawer" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import LocaleToggle from 'components/index/LocaleToggle.vue';
import { useSiteSettingsStore } from 'src/stores/settings';
import AccountDropdown from 'components/index/AuthDropdown.vue';

import { computed } from 'vue';
import { useRoute } from 'vue-router';

const settings = useSiteSettingsStore();

const route = useRoute();
const showDrawer = computed(() => route.meta.showDrawer);

</script>
