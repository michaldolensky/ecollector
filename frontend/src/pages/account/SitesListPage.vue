<template>
  <q-page padding>
    <SitesTable />
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import SitesTable from 'components/dashboard/tables/SitesTable.vue';

export default defineComponent({
  name: 'SiteListPage',
  components: { SitesTable },
  setup() {
    return {
    };
  },
});
</script>
