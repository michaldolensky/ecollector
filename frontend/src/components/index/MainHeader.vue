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
<script lang="ts">
import useDrawers from 'src/module/useDrawers';
import { defineComponent, ref } from 'vue';

import AccountDropdown from 'components/index/AuthDropdown.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'MainHeader',
  components: { AccountDropdown },
  setup() {
    const { drawerState, toggleDrawer } = useDrawers();
    const route = useRoute();
    const showDrawer = ref(route.meta.showDrawer);

    return {
      toggleDrawer, drawerState, showDrawer,
    };
  },
});
</script>
