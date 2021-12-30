<script lang="ts" setup>
import AccountDropdown from 'components/index/AuthDropdown.vue';
import { useSiteSettingsStore } from 'src/stores/settings';
import { ref } from 'vue';
import { useRoute } from 'vue-router';

const settings = useSiteSettingsStore();

const route = useRoute();
const showDrawer = ref(route.meta.showDrawer);

</script>
<template>
  <q-header
    bordered
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

      <AccountDropdown />
    </q-toolbar>
  </q-header>
</template>
