<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="row">
        <div class="col">
          <SitesTable />
        </div>
        <div class="col" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {
  defineComponent,
} from 'vue';
import SitesTable from 'components/dashboard/tables/SitesTable.vue';

export default defineComponent({
  name: 'Profile',
  components: { SitesTable },
});
</script>
