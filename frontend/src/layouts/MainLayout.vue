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

<script lang="ts" setup>
import MainHeader from 'components/index/MainHeader.vue';
</script>
