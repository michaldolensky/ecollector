<template>
  <q-page>
    <dashboard-page-header :title="$t('dashboard.navigation.items')">
      <q-btn
        :label="$t('dashboard.items.addItem')"
        :to="{name:'DashBoardItem',params:{item:'new'}}"
        color="primary"
        icon="add"
      />
    </dashboard-page-header>

    <q-card class="q-pa-md">
      <q-input
        v-model="filter"
        :placeholder="$t('filters.items.search')"
        debounce="300"
        stack-label
      >
        <template #append>
          <q-icon name="search" />
        </template>
      </q-input>
    </q-card>

    <q-card v-if="loading">
      <items-table :loading="loading" />
    </q-card>
    <q-card v-else>
      <items-table
        :filter="filter"
        :items="result.items"
      />
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import DashboardPageHeader from 'components/dashboard/DashboardPageHeader.vue';
import ItemsTable from 'components/dashboard/tables/ItemsTable.vue';
import { useItems } from 'src/module/useItems';
import { ref } from 'vue';

const { result, loading } = useItems();

const filter = ref('');

</script>
