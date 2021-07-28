<template>
  <q-layout
    view="lHh Lpr lFf"
  >
    <MainHeader
      :is-logged-in="isLoggedIn"
      :name="name"
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
    const isLoggedIn = ref(false);
    const name = ref('User Name');

    return {
      isLoggedIn,
      name,

      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
