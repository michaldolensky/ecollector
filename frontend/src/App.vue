<template>
  <router-view />
</template>
<script lang="ts" setup>
import { useSiteSettingsStore } from 'src/stores/settings';
import { watch } from 'vue';

const settings = useSiteSettingsStore();

settings.$state = JSON.parse(localStorage.getItem('settings') ?? '{}') as {drawer:boolean};

watch(() => settings.$state, (state) => {
  localStorage.setItem('settings', JSON.stringify(state));
}, { deep: true });
</script>
