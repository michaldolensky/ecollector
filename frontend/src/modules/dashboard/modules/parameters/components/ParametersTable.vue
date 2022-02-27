<script lang="ts" setup>
import { useDashboardParameters } from "src/modules/dashboard/modules/parameters/composables/useDashboardParameters";
import { Category, Parameter } from "src/types/graphql";
import { computed, reactive } from "vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const ParametersTableColumns = computed(() => [
  {
    name: "name",
    required: true,
    label: t("dashboard.parameters.table.column.label.name"),
    align: "left",
    field: (row: Category) => row.name,
    sortable: true,
  },
  {
    name: "type",
    required: true,
    label: t("dashboard.parameters.table.column.label.type"),
    align: "left",
    field: (parameter: Parameter) => parameter.type,
    sortable: true,
  },

  {
    name: "Action",
    label: t("dashboard.parameters.table.column.label.action"),
    field: "Action",
    sortable: false,
    align: "center",
  },
]);
const { fetching, confirmDelete, parameters } = useDashboardParameters();

const initialPagination = reactive({
  sortBy: "name",
  descending: false,
  page: 1,
  rowsPerPage: 50,
});
</script>
<template>
  <q-table
    :columns="ParametersTableColumns"
    :grid="$q.screen.xs"
    :loading="fetching"
    :no-data-label="$t('dashboard.parameters.table.not_found')"
    :pagination="initialPagination"
    :rows="parameters"
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
            name: 'DashBoardParameterEdit',
            params: { paramId: prop.row.id },
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
