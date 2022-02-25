<script lang="ts" setup>
import SitesTable from "src/modules/account/components/SitesTable.vue";
import AddSiteDialog from "src/modules/account/components/AddSiteDialog.vue";
import DashboardPage from "src/modules/dashboard/DashboardModule.vue";
import DashboardPageHeader from "src/modules/dashboard/components/DashboardPageHeader.vue";
</script>

<template>
  <dashboard-page>
    <dashboard-page-header :title="$t('dashboard.navigation.sites')">
      <AddSiteDialog />
    </dashboard-page-header>
    <SitesTable />
  </dashboard-page>
</template>
