<template>
  <q-drawer
    v-model="settings.drawerState"
    :width="300"
    bordered
    elevated
    show-if-above
    side="left"
  >
    <q-scroll-area
      id="scroll-area-with-virtual-scroll-1"
      style="height: 100%"
    >
      <q-virtual-scroll
        v-if="!loading"
        :items="result.categories"
        :virtual-scroll-item-size="32"
        scroll-target="#scroll-area-with-virtual-scroll-1 > .scroll"
        separator
      >
        <template #default="{ item, index }">
          <catalog-list-category
            :key="index"
            :category="item"
          />
        </template>
      </q-virtual-scroll>
    </q-scroll-area>
  </q-drawer>
</template>

<script lang="ts" setup>
import CatalogListCategory from 'components/catalog/CatalogListCategory.vue';
import { useGetCatalogueCategoriesQuery } from 'src/apollo/composition-functions';
import { useSites } from 'src/composables/useSites';
import { useSiteSettingsStore } from 'src/stores/settings';

const settings = useSiteSettingsStore();

const { currentSiteId } = useSites();

const { result, loading } = useGetCatalogueCategoriesQuery({
  siteId: currentSiteId.value,
});
</script>
