<template>
  <q-page padding>
    <div v-if="loading">
      Loading...
    </div>
    <div
      v-else-if="true"
      class="q-pa-md"
    >
      <CategoriesTable
        :categories="result.categories"
        :loading="loading"
      />
      <q-page-sticky
        :offset="[18, 18]"
        position="bottom-right"
      >
        <q-btn
          :to="{name:'DashBoardCategoryCreate'}"
          color="accent"
          fab
          icon="add"
        />
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import CategoriesTable from 'components/dashboard/tables/CategoriesTable.vue';
import { useCategories } from 'src/module/useCategories';

export default defineComponent({
  components: { CategoriesTable },

  setup() {
    const { result, loading } = useCategories();
    return {
      result,
      loading,
    };
  },
});
</script>
