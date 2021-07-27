<template>
  <q-page>
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
      <q-page-sticky
        :offset="[18, 18]"
        position="bottom-right"
      >
        <q-btn
          color="accent"
          fab
          icon="add"
          @click="addItem(newItem)"
        />
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useItems } from 'src/module/useItems';
import ItemsTable from 'components/dashboard/tables/ItemsTable.vue';

export default defineComponent({
  name: 'ItemDashboard',
  components: { ItemsTable },
  setup() {
    const { result, loading, addItem } = useItems();

    const newItem = { name: 'name', categoryId: 1, siteId: 1 };

    return {
      result,
      loading,
      addItem,
      newItem,
    };
  },
});
</script>
