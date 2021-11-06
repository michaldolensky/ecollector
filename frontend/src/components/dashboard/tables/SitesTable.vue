<template>
  <q-table
    :columns="SitesTableColumns"
    :filter="filter"
    :no-data-label="t('tables.notFound.sites')"
    :pagination="initialPagination"
    :rows="authStore.sites"

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
        borderless
        debounce="300"
        dense
        filled
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
import { reactive, ref } from 'vue';
import { useI18n } from 'src/boot/i18n';
import { SitesTableColumns } from 'components/dashboard/tables/SitesTableColumns';
import { useAuthStore } from 'src/stores/auth';

const authStore = useAuthStore();

const { t } = useI18n();

const filter = ref('');

const initialPagination = reactive({
  sortBy: 'name',
  descending: false,
  page: 1,
  rowsPerPage: 50,
});

</script>
