<template>
  <q-page
    padding
  >
    <div v-if="loading">
      Loading...
    </div>
    <!--    <div v-else-if="error">-->
    <!--      Error: {{ error.message }}-->
    <!--    </div>-->
    <div
      v-else-if="true"
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
import { useItems } from 'src/module/useItems';
import ItemsTable from 'components/dashboard/tables/ItemsTable.vue';

export default defineComponent({
  name: 'DashboardItemsPage',
  components: { ItemsTable },
  setup() {
    const { result, loading } = useItems();

    return {
      result,
      loading,
    };
  },
});
</script>
