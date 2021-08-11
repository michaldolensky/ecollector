<template>
  <q-table
    :columns="ItemsTableColumns"
    :filter="filter"
    :grid="$q.screen.xs"
    :loading="loading"
    :no-data-label="t('dashboard.table.items.notFound')"
    :pagination="initialPagination"
    :rows="items"
    row-key="id"
    title="Items"
  >
    <template #body-cell-Image="props">
      <q-td :props="props">
        <q-item>
          <q-avatar
            v-if="props.row.images[0]"
            square
          >
            <img
              :src="config.SERVER_URL+props.row.images[0].path"
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

    <template #body-cell-Action="props">
      <q-td :props="props">
        <q-btn
          :to="`items/edit/${props.row.id}`"
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
          @click="confirmDelete(props.row.id)"
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
  </q-table>
</template>
<script lang="ts">
import { ItemsTableColumns } from 'components/dashboard/tables/ItemsTableColumns';
import { config } from 'src/config';
import { defineComponent, PropType, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useI18n } from 'src/boot/i18n';
import { Item, useItems } from 'src/module/useItems';

export default defineComponent({
  name: 'ItemsTable',
  props: {
    loading: {
      type: Boolean,
    },
    items: {
      type: Array as PropType<Item[]>,
      default: () => [],
    },
  },
  setup() {
    const $q = useQuasar();
    const { t } = useI18n();
    const { removeItem } = useItems();

    const confirmDelete = (item: Item) => {
      $q.dialog({
        title: 'Confirm',
        message: t('dashboard.dialog.delete', [item.name]),
        cancel: true,
        persistent: true,
      }).onOk(() => {
        if (item.id != null) void removeItem(item.id);
      });
    };

    return {
      t,
      confirmDelete,
      config,
      router: useRouter(),
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
});
</script>
