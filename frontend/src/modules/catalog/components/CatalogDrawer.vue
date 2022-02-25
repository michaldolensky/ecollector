<script lang="ts" setup>
import { useResult } from "@vue/apollo-composable";
import CatalogListCategory from "src/modules/catalog/components/CatalogListCategory.vue";
import { useGetCatalogueCategoriesQuery } from "src/modules/catalog/graphql/categoryCatalog.operations.urql";
import { useSites } from "src/composables/useSites";
import { useSiteSettingsStore } from "src/stores/settings";
import { computed, ref } from "vue";

const settings = useSiteSettingsStore();

const { currentSiteId } = useSites();

const filter = ref("");

const { data, fetching } = useGetCatalogueCategoriesQuery({
  variables: {
    siteId: currentSiteId.value,
  },
});

const categories = useResult(data, [], (data) => data.categories);

const sortedCategories = computed(() =>
  categories.value
    .filter((item) =>
      item.name.toLowerCase().includes(filter.value.toLowerCase())
    )
    .sort((a, b) => a.name.localeCompare(b.name))
);
</script>

<template>
  <q-drawer
    v-model="settings.$state.drawer"
    :width="300"
    bordered
    elevated
    show-if-above
    side="left"
  >
    <div style="flex: 0 1 auto">
      <q-item v-ripple :to="{ name: 'CatalogIndex' }" clickable exact tag="a">
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>

        <q-item-section>{{
          $t("catalog.navigation.item.home")
        }}</q-item-section>
      </q-item>
      <q-separator />

      <q-input
        v-model="filter"
        :debounce="500"
        :label="$t('catalog.input.category_search')"
        clearable
      >
        <template #prepend>
          <q-icon name="search" />
        </template>
      </q-input>

      <q-separator size="5px" />
    </div>
    <q-virtual-scroll
      v-if="!fetching"
      :items="sortedCategories"
      :virtual-scroll-item-size="32"
      scroll-target="#scroll-area-with-virtual-scroll-1 > .scroll"
      separator
    >
      <template #default="{ item, index }">
        <catalog-list-category :key="index" :category="item" />
      </template>
    </q-virtual-scroll>
  </q-drawer>
</template>
