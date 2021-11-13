<template>
  <q-drawer
    v-model="settings.$state.drawer"
    :width="300"
    bordered
    elevated
    show-if-above
    side="left"
    style="height: 100%"
  >
    <q-scroll-area
      id="scroll-area-with-virtual-scroll-1"
      style="height: 100%"
    >
      <q-virtual-scroll
        v-if="!loading"
        :items="sortedCategories"
        :virtual-scroll-item-size="32"
        scroll-target="#scroll-area-with-virtual-scroll-1 > .scroll"
        separator
      >
        <template #before>
          <q-item
            v-ripple
            :to="{name:'CatalogIndex'}"
            clickable
            exact
            tag="a"
          >
            <q-item-section avatar>
              <q-icon name="home" />
            </q-item-section>

            <q-item-section>
              Home
            </q-item-section>
          </q-item>
          <q-separator />

          <q-input
            v-model="filter"
            :debounce="500"
            clearable
            label="Category search"
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-separator size="5px" />
        </template>

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
import { useResult } from '@vue/apollo-composable';
import CatalogListCategory from 'components/catalog/CatalogListCategory.vue';
import { useGetCatalogueCategoriesQuery } from 'src/apollo/composition-functions';
import { useSites } from 'src/composables/useSites';
import { useSiteSettingsStore } from 'src/stores/settings';
import { computed, ref } from 'vue';

const settings = useSiteSettingsStore();

const { currentSiteId } = useSites();

const filter = ref('');

const { result, loading } = useGetCatalogueCategoriesQuery({
  siteId: currentSiteId.value,
});

const categories = useResult(result, []);

const sortedCategories = computed(() => categories.value
  .filter((item) => item.name.toLowerCase().includes(filter.value.toLowerCase()))
  .sort(
    (a, b) => a.name.localeCompare(b.name),
  ));
</script>
