<script lang="ts" setup>
import { useDashboardCategories } from 'src/composables/dashboard/useDashboardCategories';
import {
  reactive,
} from 'vue';
import { useDashboardTableColumns } from 'src/composables/dashboard/useDashboardTableColumns';

const {
  loading,
  confirmDelete,
  categories,
  refetch,
} = useDashboardCategories();
void refetch();
const { CategoriesTableColumns } = useDashboardTableColumns();

const initialPagination = reactive({
  sortBy: 'name',
  descending: false,
  page: 1,
  rowsPerPage: 50,
});

</script>
<template>
  <q-table
    :columns="CategoriesTableColumns"
    :grid="$q.screen.xs"
    :loading="loading"
    :no-data-label="$t('dashboard.categories.table.not_found')"
    :pagination="initialPagination"
    :rows="categories"
    row-key="id"
  >
    <template #body-cell-Name="prop">
      <q-td :prop="prop">
        <q-item style="max-width: 420px">
          <q-item-section>
            <q-item-label>{{ prop.row.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-td>
    </template>

    <template #body-cell-Action="prop">
      <q-td :prop="prop">
        <q-btn
          :to="{
            name: 'DashBoardCategoryEdit',
            params: { categoryId: prop.row.id},
          }"
          dense
          flat
          icon="edit"
          size="sm"
        />
        <q-btn
          class="q-ml-sm"
          dense
          flat
          icon="delete"
          size="sm"
          @click="confirmDelete(prop.row)"
        />
      </q-td>
    </template>
  </q-table>
</template>
