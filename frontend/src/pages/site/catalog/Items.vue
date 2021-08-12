<template>
  <q-page>
    <q-scroll-area style="height: 80vh; width:100%">
      <div
        v-if="!loading"
        class="q-pa-md row items-start q-gutter-md"
      >
        <q-card
          v-for="item in result.items"
          :key="item.id"
          class="my-card"
        >
          <q-img
            :src=" config.SERVER_URL+item.images[0].path"
            fit="scale-down"
            loading="lazy"
            style="max-height: 250px"
          >
            <q-badge
              color="purple"
              rounded
            >
              <q-icon
                color="white"
                name="swap_horiz"
              >
                <q-tooltip>
                  Tooltip
                </q-tooltip>
              </q-icon>

              3
            </q-badge>
          </q-img>
          <q-card-section />
          <q-card-section>
            <div class="text-h6">
              {{ item.name }}
            </div>
            <div class="text-subtitle2">
              {{ item.shortDesc }}
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ item.height }}
          </q-card-section>
        </q-card>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { GET_CATALOG_ITEMS } from 'src/apollo/catalog/itemQueries';
import { CatalogItemVars, ItemData } from 'src/module/useCatalogue';
import { defineComponent, watch } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { useSites } from 'src/module/useSites';
import { useRoute } from 'vue-router';

import { config } from 'src/config';

export default defineComponent({
  // name: 'PageName'

  setup() {
    const { currentSiteId, getSiteIdFromString } = useSites();
    const route = useRoute();

    const { result, loading, variables } = useQuery<ItemData, CatalogItemVars>(GET_CATALOG_ITEMS, {
      siteId: currentSiteId.value,
      categoryId: getSiteIdFromString(<string>route.params.categoryId),
    });
    watch(
      () => route.params.categoryId,
      () => {
        variables.value = {
          siteId: currentSiteId.value,
          categoryId: getSiteIdFromString(<string>route.params.categoryId),
        };
      },
    );

    return { result, loading, config };
  },

});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
