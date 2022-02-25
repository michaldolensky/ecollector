<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();

const { siteId, itemId } = route.params;
</script>

<template>
  <q-breadcrumbs>
    <q-breadcrumbs-el
      :label="$t('catalog.navigation.tab.catalog')"
      :to="{ name: 'CatalogIndex', params: { itemId, siteId } }"
    />
    <q-breadcrumbs-el
      :label="$t('breadcrumbs.catalog.itemDetail')"
      :to="{ name: 'CatalogItemDetail', params: { itemId, siteId } }"
    />
  </q-breadcrumbs>
</template>
