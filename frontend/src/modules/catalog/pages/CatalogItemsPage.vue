<script lang="ts" setup>
import { useResult } from "@vue/apollo-composable";
import { useGetCatalogItemsQuery } from "src/modules/catalog/graphql/categoryCatalog.operations";

import CatalogItem from "src/modules/catalog/components/CatalogItem.vue";

interface Props {
  siteId: number;
  categoryId?: number;
}
const props = defineProps<Props>();

const { data, fetching } = useGetCatalogItemsQuery({
  variables: {
    siteId: props.siteId,
    filter: {
      categoryId: props.categoryId,
    },
  },
});

const items = useResult(data, []);
</script>

<template>
  <q-page>
    <q-scroll-area style="height: 80vh; width: 100%">
      <div v-if="!fetching" class="q-pa-md row items-start q-gutter-md items">
        <template v-for="item in items" :key="item.id">
          <CatalogItem :item="item" />
        </template>
      </div>
    </q-scroll-area>
  </q-page>
</template>
<style>
.items {
  width: 100%;
  display: flex;
  align-items: stretch;
}
</style>
