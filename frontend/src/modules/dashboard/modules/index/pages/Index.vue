<script lang="ts" setup>
import DashboardPageHeader from "src/modules/dashboard/components/DashboardPageHeader.vue";
import DashboardWidget from "src/modules/dashboard/modules/index/components/DashboardWidget.vue";
import DashboardPage from "src/modules/dashboard/DashboardModule.vue";
import { useSites } from "src/composables/useSites";

const { getSite, currentSiteId } = useSites();

const { data, fetching } = getSite(currentSiteId.value);
</script>

<template>
  <dashboard-page>
    <dashboard-page-header :title="$t('dashboard.headers.dashboard')" />
    <div v-if="!fetching" class="q-pa-md row items-start q-gutter-md">
      <dashboard-widget
        :count="data.site.stats.totalItems"
        :title="$t('dashboard.stats.item_count')"
      />
      <dashboard-widget
        :count="data.site.stats.totalCategories"
        :title="$t('dashboard.stats.categories_count')"
      />
    </div>
  </dashboard-page>
</template>
