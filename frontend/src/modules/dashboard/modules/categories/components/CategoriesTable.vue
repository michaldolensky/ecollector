<script lang="ts" setup>
import { useDashboardCategories } from "src/modules/dashboard/modules/categories/composables/useDashboardCategories";
import { Category } from "src/types/graphql";
import { toRowDate } from "src/utils";
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";

const { loading, confirmDelete, categories, refetch } =
  useDashboardCategories();
void refetch();

const { t } = useI18n();

const CategoriesTableColumns = computed(() => [
  {
    name: "name",
    required: true,
    label: t("dashboard.categories.table.column.label.name"),
    align: "left",
    field: (item: Category) => item.name,
    format: (val: string): string => `${val}`,
    sortable: true,
  },
  {
    name: "Created",
    required: true,
    label: t("dashboard.categories.table.column.label.created"),
    align: "left",
    field: (item: Category) => item.createdAt,
    format: (val: string) => `${toRowDate(val)}`,
    sortable: true,
  },
  {
    name: "Updated",
    required: true,
    label: t("dashboard.categories.table.column.label.updated"),
    align: "left",
    field: (item: Category) => item.updatedAt,
    format: (row: string): string => `${toRowDate(row)}`,
    sortable: true,
  },
  {
    name: "Action",
    label: t("dashboard.categories.table.column.label.action"),
    field: "Action",
    sortable: false,
    align: "center",
  },
]);

const initialPagination = reactive({
  sortBy: "name",
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
            params: { categoryId: prop.row.id },
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
