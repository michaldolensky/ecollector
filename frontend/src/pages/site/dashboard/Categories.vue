<template>
  <q-page padding>
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
      <CategoriesTable
        :categories="result.categories"
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
          @click="addCategory(newCategory)"
        />
      </q-page-sticky>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CategoriesTable from 'components/dashboard/tables/CategoriesTable.vue';
import { useCategories } from 'src/module/useCategories';

export default defineComponent({
  components: { CategoriesTable },

  setup() {
    const { result, loading, addCategory } = useCategories();

    const newCategory = ref({ name: 'name', perex: 'aa' });

    return {
      result,
      loading,
      addCategory,
      newCategory,
    };
  },
});
</script>
