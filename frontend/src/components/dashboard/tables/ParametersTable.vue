<template>
  <q-table
    :columns="ParametersTableColumns"
    :grid="$q.screen.xs"
    :loading="loading"
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
            params: { paramId: prop.row.id},
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
<script lang="ts" setup>
import { useDashboardParameters } from 'src/composables/dashboard/useDashboardParameters';
import { useDashboardTableColumns } from 'src/composables/dashboard/useDashboardTableColumns';
import { reactive } from 'vue';

const { ParametersTableColumns } = useDashboardTableColumns();

const {
  loading,
  confirmDelete,
  parameters,
  refetch,
} = useDashboardParameters();
void refetch();

const initialPagination = reactive({
  sortBy: 'name',
  descending: false,
  page: 1,
  rowsPerPage: 50,
});

</script>
