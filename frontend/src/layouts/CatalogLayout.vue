<template>
  <q-layout view="hHh LpR fFf">
    <q-drawer
      v-model="drawerState"
      :width="300"
      bordered
      elevated
      show-if-above
      side="left"
    >
      <q-scroll-area
        id="scroll-area-with-virtual-scroll-1"
        style="height: 80vh"
      >
        <q-virtual-scroll
          v-if="!loading"
          :items="result.categories"
          :virtual-scroll-item-size="32"
          scroll-target="#scroll-area-with-virtual-scroll-1 > .scroll"
          separator
        >
          <template #default="{ item, index }">
            <q-item
              :key="index"
              v-ripple
              :to="{params:{categoryId:item.id}}"
              clickable
            >
              <q-item-section>
                <q-item-label>{{ item.name }}</q-item-label>
                <q-item-label caption />
              </q-item-section>
            </q-item>
          </template>
        </q-virtual-scroll>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts" setup>
import { GET_CATALOG_CATEGORIES } from 'src/apollo/catalog/categoryQueries';
import { CatalogCategoryVars, CategoryData } from 'src/module/useCatalog';
import useDrawers from 'src/module/useDrawers';
import { useSites } from 'src/module/useSites';
import { useQuery } from '@vue/apollo-composable';

const { drawerState } = useDrawers();
const { currentSiteId } = useSites();

// eslint-disable-next-line max-len
const { result, loading } = useQuery<CategoryData, CatalogCategoryVars>(GET_CATALOG_CATEGORIES, {
  siteId: currentSiteId.value,
});
</script>
