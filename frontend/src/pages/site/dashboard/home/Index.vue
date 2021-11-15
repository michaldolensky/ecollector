<template>
  <dashboard-page>
    <dashboard-page-header :title="$t('dashboard.headers.dashboard')" />
    <div
      v-if="!loading"
      class="q-pa-md row items-start q-gutter-md"
    >
      <dashboard-widget
        :count="result.site.stats.totalItems"
        :title="$t('dashboard.stats.item_count')"
      />
      <dashboard-widget
        :count="result.site.stats.totalCategories"
        :title="$t('dashboard.stats.categories_count')"
      />
    </div>
  </dashboard-page>
</template>

<script lang="ts" setup>
import DashboardPageHeader from 'components/dashboard/DashboardPageHeader.vue';
import DashboardWidget from 'components/dashboard/DashboardWidget.vue';
import DashboardPage from 'pages/site/dashboard/DashboardPage.vue';
import { useSites } from 'src/composables/useSites';

const { getSite, currentSiteId } = useSites();

const { result, loading, refetch } = getSite(currentSiteId.value);
void refetch();

</script>
