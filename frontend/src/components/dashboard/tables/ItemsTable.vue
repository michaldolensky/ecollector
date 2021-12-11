<template>
  <q-table
    :columns="ItemsTableColumns"
    :grid="$q.screen.xs"
    :loading="loading"
    :no-data-label="$t('dashboard.items.table.not_found')"
    :pagination="initialPagination"
    :rows="items"
    row-key="id"
  >
    <template #body-cell-image="slotProps">
      <q-td>
        <q-item>
          <q-avatar
            v-if="slotProps.row.images[0]"
            square
          >
            <img
              :alt="slotProps.row.name"
              :src="SERVER_URL+slotProps.row.images[0].path"
            >
          </q-avatar>
          <q-icon
            v-else
            color="grey-4"
            name="image"
            size="4em"
          />
        </q-item>
      </q-td>
    </template>

    <template #body-cell-action="slotProps">
      <q-td>
        <q-btn
          :to="{
            name: 'DashBoardItemEdit',
            params: { itemId: slotProps.row.id},
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
          @click="confirmDelete(slotProps.row)"
        />
      </q-td>
    </template>
  </q-table>
</template>
<script lang="ts" setup>
import { useDashboardItems } from 'src/composables/dashboard/useDashboardItems';
import { useDashboardTableColumns } from 'src/composables/dashboard/useDashboardTableColumns';
import { SERVER_URL } from 'src/composables/useEnv';
import { reactive } from 'vue';

const {
  loading,
  confirmDelete,
  items,
} = useDashboardItems();

const { ItemsTableColumns } = useDashboardTableColumns();

const initialPagination = reactive({
  sortBy: 'name',
  descending: false,
  page: 1,
  rowsPerPage: 50,
});

</script>
