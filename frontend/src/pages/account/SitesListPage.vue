<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>Your sites</q-toolbar-title>
      <AddSiteDialog :enable="SiteDialog" />
    </q-toolbar>
    <SitesTable />
  </q-page>
</template>

<script lang="ts" setup>
import SitesTable from 'components/dashboard/tables/SitesTable.vue';
import AddSiteDialog from 'components/dashboard/forms/AddSiteDialog.vue';

</script>
