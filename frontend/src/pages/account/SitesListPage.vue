<template>
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title>Your sites</q-toolbar-title>
      <AddSiteDialog :enable="SiteDialog" />
    </q-toolbar>
    <SitesTable />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SitesTable from 'components/dashboard/tables/SitesTable.vue';
import AddSiteDialog from 'components/dashboard/forms/AddSiteDialog.vue';

export default defineComponent({
  name: 'SiteListPage',
  components: { SitesTable, AddSiteDialog },
  setup() {
    return {
    };
  },
});
</script>
