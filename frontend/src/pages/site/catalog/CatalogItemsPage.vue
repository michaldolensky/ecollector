<template>
  <q-page>
    <q-scroll-area style="height: 80vh; width:100%">
      <div
        v-if="!queryResult.loading"
        class="q-pa-md row items-start q-gutter-md"
      >
        <template
          v-for="item in queryResult.result.items"
          :key="item.id"
        >
          <CatalogItem :item="item" />
        </template>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable';
import { GET_CATALOG_ITEMS } from 'src/apollo/catalog/itemQueries';
import { CatalogItemVars, ItemData } from 'src/composables/useCatalog';
import { useSites } from 'src/composables/useSites';
import { getParsedInt } from 'src/utils';
import { watch } from 'vue';
import { useRoute } from 'vue-router';
import CatalogItem from 'src/components/catalog/CatalogItem.vue';

const { currentSiteId } = useSites();
const route = useRoute();
const queryResult = useQuery<ItemData, CatalogItemVars>(GET_CATALOG_ITEMS, {
  siteId: currentSiteId.value,
  categoryId: getParsedInt(route.params.categoryId),
});
watch(
  () => route.params.categoryId,
  () => {
    queryResult.variables.value = {
      siteId: currentSiteId.value,
      categoryId: getParsedInt(route.params.categoryId),
    };
  },
);

</script>
