<template>
  <q-page>
    <q-scroll-area style="height: 80vh; width:100%">
      <div
        v-if="!loading"
        class="q-pa-md row items-start q-gutter-md"
      >
        <template
          v-for="item in result.items"
          :key="item.id"
        >
          <CatalogItem :item="item" />
        </template>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { useQuery } from '@vue/apollo-composable';
import CatalogItem from 'components/catalog/CatalogItem.vue';
import { GET_CATALOG_ITEMS } from 'src/apollo/catalog/itemQueries';
import { CatalogItemVars, ItemData } from 'src/module/useCatalog';
import { useSites } from 'src/module/useSites';
import { getParsedInt } from 'src/utils';
import { defineComponent, watch } from 'vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'CatalogItems',
  components: { CatalogItem },

  setup() {
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
    return { result: queryResult.result, loading: queryResult.loading };
  },
});
</script>
