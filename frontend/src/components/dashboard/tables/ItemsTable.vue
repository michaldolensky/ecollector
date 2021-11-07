<template>
  <q-table
    :columns="ItemsTableColumns"
    :filter="props.filter"
    :grid="$q.screen.xs"
    :loading="props.loading"
    :no-data-label="$t('tables.notFound.items')"
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
          :to="`items/edit/${slotProps.row.id}`"
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
import { ItemsTableColumns } from 'components/dashboard/tables/ItemsTableColumns';
import { useQuasar } from 'quasar';
import { useI18n } from 'vue-i18n';
import { Item, useItems } from 'src/module/useItems';
import { reactive } from 'vue';
import { SERVER_URL } from 'src/module/useEnv';

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
    title: 'Confirm',
    message: t('dialogs.dashboard.delete', [item.name]),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    if (item.id != null) void removeItem(item.id);
  });
};

</script>
