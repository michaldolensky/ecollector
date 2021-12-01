<template>
  <q-btn-toggle
    v-model="$i18n.locale"
    :options="LOCALES"
    color="gray"
    toggle-color="white"
    toggle-text-color="black"
  />
</template>

<script lang="ts" setup>
import { LOCALES } from 'src/types/Locales';

</script>
