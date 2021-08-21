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
        @click="toggleDrawer"
      />
      <q-toolbar-title shrink>
        <q-item
          clickable
          exact
          tag="a"
          to="/"
        >
          <q-item-section class="text-white">
            E-collector
          </q-item-section>
        </q-item>
      </q-toolbar-title>
      <q-space />

      <AccountDropdown />
    </q-toolbar>
  </q-header>
</template>
<script lang="ts" setup>
import useDrawers from 'src/module/useDrawers';
import { ref } from 'vue';
import AccountDropdown from 'components/index/AuthDropdown.vue';
import { useRoute } from 'vue-router';

const { toggleDrawer } = useDrawers();
const route = useRoute();
const showDrawer = ref(route.meta.showDrawer);

</script>
