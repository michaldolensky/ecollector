<template>
  <q-table
    :columns="ItemsTableColumns"
    :filter="props.filter"
    :grid="$q.screen.xs"
    :loading="props.loading"
    :no-data-label="$t('dashboard.items.table.not_found')"
    :pagination="initialPagination"
    :rows="props.items"
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
import { useQuasar } from 'quasar';
import { toRowDate } from 'src/utils';
import { useI18n } from 'vue-i18n';
import { Item, useItems } from 'src/composables/useItems';
import { computed, reactive } from 'vue';
import { SERVER_URL } from 'src/composables/useEnv';

interface Props {
  loading?: boolean
  items?: Item[]
  filter?: string
}
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  loading: false,
  filter: '',
});

const { removeItem } = useItems();
const { dialog } = useQuasar();
const { t } = useI18n();

const initialPagination = reactive({
  sortBy: 'name',
  descending: false,
  page: 1,
  rowsPerPage: 50,
});

const confirmDelete = (item: Item) => {
  dialog({
    title: t('dialogs.titles.confirm', [item.name]),
    message: t('dashboard.items.dialogs.message.delete', [item.name]),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    if (item.id != null) void removeItem(item.id);
  });
};

const ItemsTableColumns = computed(() => [
  {
    name: 'image',
    required: true,
    label: t('dashboard.items.table.column.label.image'),
    align: 'left',
    field: (item:Item) => item.images,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: t('dashboard.items.table.column.label.name'),
    align: 'left',
    field: (item:Item) => item.name,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'Category',
    required: true,
    label: t('dashboard.items.table.column.label.category'),
    align: 'left',
    field: (item:Item) => item.category.name,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'availableForExchange',
    required: true,
    label: t('dashboard.items.table.column.label.available_for_exchange'),
    align: 'left',
    field: (item:Item) => item.numberForExchange,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'count',
    required: true,
    label: t('dashboard.items.table.column.label.count'),
    align: 'left',
    field: (item:Item) => item.numberInCollection,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'created',
    required: true,
    label: t('dashboard.items.table.column.label.created'),
    align: 'left',
    field: (item:Item) => item.createdAt,
    format: (val:string) => `${toRowDate(val)}`,
    sortable: true,
  },
  {
    name: 'action',
    label: t('dashboard.items.table.column.label.action'),
    field: 'Action',
    sortable: false,
    align: 'center',
  },

]);

</script>
