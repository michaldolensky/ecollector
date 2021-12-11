<template>
  <q-page>
    <q-scroll-area style="height: 80vh; width:100%">
      <div
        v-if="!loading"
        class="q-pa-md row items-start q-gutter-md items"
      >
        <template
          v-for="item in items"
          :key="item.id"
        >
          <CatalogItem :item="item" />
        </template>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts" setup>

import { useResult } from '@vue/apollo-composable';
import { useGetCatalogItemsQuery } from 'src/apollo/composition-functions';

import CatalogItem from 'src/components/catalog/CatalogItem.vue';

interface Props {
  siteId: number
  categoryId?: number
}
const props = defineProps<Props>();

const { result, loading } = useGetCatalogItemsQuery(() => ({
  siteId: props.siteId,
  filter: {
    categoryId: props.categoryId,
  },
}));

const items = useResult(result, []);

</script>
<style>
.items{
  width: 100%;
  display: flex;
  align-items: stretch;
}
</style>
