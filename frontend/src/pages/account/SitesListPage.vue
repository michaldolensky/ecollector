<script lang="ts" setup>
import SitesTable from 'components/dashboard/SitesTable.vue';
import AddSiteDialog from 'components/dashboard/AddSiteDialog.vue';
import DashboardPage from 'pages/site/DashboardPage.vue';
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
