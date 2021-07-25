<template>
  <q-table
    :columns="ItemsTableColumns"
    :filter="filter"
    :grid="$q.screen.xs"
    :loading="loading"
    :no-data-label="$t('dashboard.table.items.notFound')"
    :pagination="initialPagination"
    :rows="items"
    row-key="id"
    title="Items"
  >
    <template #body-cell-Name="props">
      <q-td :props="props">
        <q-item style="max-width: 420px">
          <!--          <q-item-section avatar>-->
          <!--            <q-avatar>-->
          <!--              <img :src="props.row.icon">-->
          <!--            </q-avatar>-->
          <!--          </q-item-section>-->

          <q-item-section>
            <q-item-label>{{ props.row.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-td>
    </template>

    <template #body-cell-Action="props">
      <q-td :props="props">
        <q-btn
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
        />
      </q-td>
    </template>
    <template #top-right>
      <q-input
        v-model="filter"
        borderless
        debounce="300"
        dense
        placeholder="Search"
      >
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
    {{ filter }}
  </q-table>
</template>
<script lang="ts">
import { ItemsTableColumns } from 'components/dashboard/tables/ItemsTableColumns';
import { PropType, ref } from 'vue';
import { ItemInterface } from 'src/types/item.interface';

export default {
  name: 'ItemsTable',
  props: {
    loading: {
      type: Boolean,
    },
    items: {
      type: Array as PropType<ItemInterface[]>,
      default: () => [],
    },
  },
  setup() {
    return {
      filter: ref(''),
      ItemsTableColumns,
      initialPagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 50,
      },
    };
  },
};
</script>
