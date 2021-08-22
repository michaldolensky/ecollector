<template>
  <q-table
    :columns="CategoriesTableColumns"
    :filter="filter"
    :grid="q.screen.xs"
    :loading="props.loading"
    :no-data-label="t('tables.notFound.categories')"
    :pagination="initialPagination"
    :rows="props.categories"
    row-key="id"
    title="Categories"
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
          :to="`categories/edit/${prop.row.id}`"
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
import {
  defineProps, reactive, ref, withDefaults,
} from 'vue';
import { useQuasar } from 'quasar';
import { useI18n } from 'src/boot/i18n';
// noinspection ES6UnusedImports
import { CategoriesTableColumns } from 'components/dashboard/tables/CategoriesTableColumns';
import { Category, useCategories } from 'src/module/useCategories';

interface Props{
  categories:Category[]
  loading: boolean
}
const props = withDefaults(defineProps<Props>(), {
  categories: () => [],
});

const q = useQuasar();
const { t } = useI18n();
const { removeCategory } = useCategories();

const filter = ref('');

const initialPagination = reactive({
  sortBy: 'name',
  descending: false,
  page: 1,
  rowsPerPage: 50,
});

const confirmDelete = (category: Category) => {
  q.dialog({
    title: 'Confirm',
    message: t('dialogs.dashboard.delete', [category.name]),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    void removeCategory(category.id);
  });
};

</script>
