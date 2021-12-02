<template>
  <q-select
    v-model="locale"
    :options="localeStore.getLangOptions"
    color="secondary"
    emit-value
    map-options
    options-dense
    style="min-width: 150px"
  />
</template>

<script lang="ts" setup>
import { useLocaleStore } from 'src/stores/locale';
import { computed } from 'vue';

const localeStore = useLocaleStore();

const locale = computed({
  get() {
    return localeStore.getLocale;
  },
  set(value: string) {
    localeStore.setLocale(value);
  },
});
</script>
