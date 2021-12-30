<script lang="ts" setup>
import { Site } from 'src/composables/useSites';
import { toRowDate } from 'src/utils';
import { computed, reactive, ref } from 'vue';
import { useAuthStore } from 'src/stores/auth';
import { useI18n } from 'vue-i18n';

const authStore = useAuthStore();

const filter = ref('');

const { t } = useI18n();

const initialPagination = reactive({
  sortBy: 'name',
  descending: false,
  page: 1,
  rowsPerPage: 50,
});

const SitesTableColumns = computed(() => [
  {
    name: 'name',
    required: true,
    label: t('account.sites.table.column.label.name'),
    align: 'left',
    field: (item: Site) => item.name,
    format: (val: string) => `${val}`,
    sortable: true,
  },
  {
    name: 'Created',
    required: true,
    label: t('account.sites.table.column.label.created'),
    align: 'left',
    field: (item: Site) => item.createdAt,
    format: (val: string) => `${toRowDate(val)}`,
    sortable: true,
  },

  {
    name: 'Action',
    label: t('account.sites.table.column.label.action'),
    field: 'Action',
    sortable: false,
    align: 'center',
  },
]);

</script>
<template>
  <q-table
    :columns="SitesTableColumns"
    :filter="filter"
    :no-data-label="$t('account.sites.table.not_found')"
    :pagination="initialPagination"
    :rows="authStore.userSites"

    row-key="id"
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
          flat
          icon="edit"
        />
        <q-btn
          :to="`/site/${props.row.id}/`"
          class="q-ml-sm"
          flat
          icon="open_in_new"
        />
      </q-td>
    </template>
    <template #top-right>
      <q-input
        v-model="filter"
        :placeholder="$t('account.sites.input.placeholder.search')"
        borderless
        debounce="300"
        dense
        filled
      >
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
    </template>
  </q-table>
</template>
