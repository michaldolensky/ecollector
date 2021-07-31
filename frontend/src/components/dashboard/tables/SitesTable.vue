<template>
  <q-table
    :columns="SitesTableColumns"
    :filter="filter"
    :no-data-label="t('dashboard.table.categories.notFound')"
    :pagination="initialPagination"
    :rows="sites"
    row-key="id"
    title="Your sites."
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
          :to="`/site/${props.row.id}/dashboard`"

          icon="edit"
          label="Manage"
          push
        />
        <q-btn
          :to="`/site/${props.row.id}/`"
          class="q-ml-sm"
          icon="open_in_new"
          label="Open"
          push
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
import { computed, defineComponent, ref } from 'vue';
import { useI18n } from 'src/boot/i18n';
import { SitesTableColumns } from 'components/dashboard/tables/SitesTableColumns';
import { Site } from 'src/module/useSites';
import { useStore } from 'src/store';

export default defineComponent({
  name: 'CategoriesTable',

  setup() {
    const store = useStore();
    const { t } = useI18n();

    return {
      t,
      sites: computed(() => store.state.auth.user?.sites as Site[]),
      filter: ref(''),
      SitesTableColumns,
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
