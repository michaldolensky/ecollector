<template>
  <q-layout
    view="lHh Lpr lFf"
  >
    <MainHeader
      :toggle-left-drawer="toggleLeftDrawer"
    />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MainHeader from 'components/index/MainHeader.vue';

export default defineComponent({
  name: 'MainLayout',

  components: { MainHeader },

  setup() {
    const leftDrawerOpen = ref(false);

    return {

      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
