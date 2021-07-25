<template>
  <q-page>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="error">
      Error: {{ error.message }}
    </div>
    <div
      v-else-if="result && result.items"
      class="q-pa-md"
    >
      <ItemsTable
        :items="result.items"
        :loading="loading"
      />
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { GET_ITEMS_QUERY } from 'src/apollo/dashboard/getItems.query';
import ItemsTable from 'components/dashboard/tables/ItemsTable.vue';
import { useRoute } from 'vue-router';

export default defineComponent({
  name: 'ItemDashboard',
  components: { ItemsTable },
  setup() {
    const $route = useRoute();
    const { result, loading, error } = useQuery(GET_ITEMS_QUERY, {
      siteId: parseInt($route.params.siteId, 10),
    });
    return {
      result,
      loading,
      error,
    };
  },
});
</script>
