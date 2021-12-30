<script lang="ts" setup>
import SitesTable from 'components/dashboard/tables/SitesTable.vue';
import AddSiteDialog from 'components/dashboard/forms/AddSiteDialog.vue';
import DashboardPage from 'pages/site/dashboard/DashboardPage.vue';
import DashboardPageHeader from 'components/dashboard/DashboardPageHeader.vue';

</script>

<template>
  <dashboard-page>
    <dashboard-page-header :title="$t('dashboard.navigation.sites')">
      <AddSiteDialog />
    </dashboard-page-header>
    <SitesTable />
  </dashboard-page>
</template>
