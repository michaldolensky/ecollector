<template>
  <q-page>
    <dashboard-page-header :title="$t('dashboard.navigation.categories')">
      <q-btn
        :label="$t('dashboard.items.addItem')"
        :to="{name:'DashBoardCategory',params:{category:'new'}}"
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
      <CategoriesTable :loading="loading" />
    </q-card>
    <q-card v-else>
      <CategoriesTable
        :categories="result.categories"
        :filter="filter"
      />
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import CategoriesTable from 'components/dashboard/tables/CategoriesTable.vue';
import DashboardPageHeader from 'components/dashboard/DashboardPageHeader.vue';
import { useCategories } from 'src/module/useCategories';
import { ref } from 'vue';

const { result, loading } = useCategories();

const filter = ref('');

</script>
