<template>
  <q-layout
    view="lHh Lpr lFf"
  >
    <MainHeader />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainHeader from 'components/index/MainHeader.vue';

export default defineComponent({
  name: 'MainLayout',

  components: { MainHeader },

  setup() {
    return {
    };
  },
});
</script>
