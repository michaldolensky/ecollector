<template>
  <q-table
    :columns="ItemsTableColumns"
    :filter="filter"
    :grid="$q.screen.xs"
    :loading="props.loading"
    :no-data-label="t('tables.notFound.items')"
    :pagination="initialPagination"
    :rows="props.items"
    row-key="id"
    title="Items"
  >
    <template #body-cell-image="props">
      <q-td :props="props">
        <q-item>
          <q-avatar
            v-if="props.row.images[0]"
            square
          >
            <img
              :src="serverUrl+props.row.images[0].path"
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

    <template #body-cell-action="props">
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
<script lang="ts" setup>
import { ItemsTableColumns } from 'components/dashboard/tables/ItemsTableColumns';
import { useQuasar } from 'quasar';
import { useI18n } from 'src/boot/i18n';
import { Item, useItems } from 'src/module/useItems';
import { reactive, ref } from 'vue';

interface Props {
  loading: boolean
  items: Item[]
}
const props = withDefaults(defineProps<Props>(), {
  items: () => [],
});

const { removeItem } = useItems();
const { t } = useI18n();
const serverUrl = process.env.SERVER_URL;

const filter = ref();
const initialPagination = reactive({
  sortBy: 'name',
  descending: false,
  page: 1,
  rowsPerPage: 50,
});

const confirmDelete = (item: Item) => {
  const $q = useQuasar();

  $q.dialog({
    title: 'Confirm',
    message: t('dialogs.dashboard.delete', [item.name]),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    if (item.id != null) void removeItem(item.id);
  });
};

</script>
