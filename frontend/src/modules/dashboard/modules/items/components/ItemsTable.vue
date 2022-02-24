<script lang="ts" setup>
import { Item } from 'src/types/graphql';
import { toRowDate } from 'src/utils';
import { computed, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

interface Props {
  items: Item[]
  loading: boolean
}
// eslint-disable-next-line
const emit = defineEmits<{
  (e: 'deleteRow', item: Item): void
}>();

const props = withDefaults(defineProps<Props>(), {
  items: () => [],
  loading: true,
});

const ItemsTableColumns = computed(() => [
  {
    name: 'image',
    required: true,
    label: t('dashboard.items.table.column.label.image'),
    align: 'left',
    field: (item:Item) => item.images,
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: t('dashboard.items.table.column.label.name'),
    align: 'left',
    field: (item:Item) => item.name,
    sortable: true,
  },
  {
    name: 'Category',
    required: true,
    label: t('dashboard.items.table.column.label.category'),
    align: 'left',
    field: (item:Item) => item.category.name,
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
    format: (row:string):string => `${toRowDate(row)}`,
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

const initialPagination = reactive({
  sortBy: 'name',
  descending: false,
  page: 1,
  rowsPerPage: 50,
});

</script>
<template>
  <q-table
    :columns="ItemsTableColumns"
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
              :src="slotProps.row.images[0].file.url"
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
            params: { itemId: slotProps.row.id}
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
          @click="emit('deleteRow',slotProps.row)"
        />
      </q-td>
    </template>
  </q-table>
</template>
