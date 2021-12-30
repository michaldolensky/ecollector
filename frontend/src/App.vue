<script lang="ts" setup>
import { LocaleState, useLocaleStore } from 'src/stores/locale';
import { useSiteSettingsStore } from 'src/stores/settings';
import { watch } from 'vue';

const settings = useSiteSettingsStore();

settings.$state = JSON.parse(localStorage.getItem('settings') ?? '{}') as { drawer: boolean };

watch(() => settings.$state, (state) => {
  localStorage.setItem('settings', JSON.stringify(state));
}, { deep: true });

const locale = useLocaleStore();

locale.$state = JSON.parse(localStorage.getItem('locale') ?? '{}') as LocaleState;

watch(() => locale.$state, (state) => {
  localStorage.setItem('locale', JSON.stringify(state));
}, { deep: true });
locale.init();
</script>
<template>
  <router-view />
</template>
