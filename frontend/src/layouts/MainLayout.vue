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
import { computed, defineComponent, ref } from 'vue';
import MainHeader from 'components/index/MainHeader.vue';
import { useStore } from 'src/store';

export default defineComponent({
  name: 'MainLayout',

  components: { MainHeader },

  setup() {
    const leftDrawerOpen = ref(false);

    const store = useStore();
    const name = ref('User Name');

    return {
      isLoggedIn: computed(() => store.state.auth.loggedIn),
      name,

      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
