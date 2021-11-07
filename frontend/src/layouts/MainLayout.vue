<template>
  <q-layout
    view="hHh LpR fFf"
  >
    <main-header />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import MainHeader from 'components/index/MainHeader.vue';
</script>
