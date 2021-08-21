<template>
  <q-table
    :columns="CategoriesTableColumns"
    :filter="filter"
    :grid="$q.screen.xs"
    :loading="loading"
    :no-data-label="t('tables.notFound.categories')"
    :pagination="initialPagination"
    :rows="categories"
    row-key="id"
    title="Categories"
  >
    <template #body-cell-Name="props">
      <q-td :props="props">
        <q-item style="max-width: 420px">
          <q-item-section>
            <q-item-label>{{ props.row.name }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-td>
    </template>

    <template #body-cell-Action="props">
      <q-td :props="props">
        <q-btn
          :to="`categories/edit/${props.row.id}`"
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
          @click="confirmDelete(props.row)"
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
import { defineComponent, PropType, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useQuasar } from 'quasar';
import { useI18n } from 'src/boot/i18n';
import { CategoriesTableColumns } from 'components/dashboard/tables/CategoriesTableColumns';
import { Category, useCategories } from 'src/module/useCategories';

export default defineComponent({
  name: 'CategoriesTable',
  props: {
    loading: {
      type: Boolean,
    },
    categories: {
      type: Array as PropType<Category[]>,
      default: () => [],
    },
  },
  setup() {
    const $q = useQuasar();
    const { t } = useI18n();
    const { removeCategory } = useCategories();

    const confirmDelete = (category: Category) => {
      $q.dialog({
        title: 'Confirm',
        message: t('dialogs.dashboard.delete', [category.name]),
        cancel: true,
        persistent: true,
      }).onOk(() => {
        void removeCategory(category.id);
      });
    };

    return {
      t,
      confirmDelete,
      router: useRouter(),
      filter: ref(''),
      CategoriesTableColumns,
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
