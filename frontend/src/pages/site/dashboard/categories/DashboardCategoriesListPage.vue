<template>
  <dashboard-page>
    <dashboard-page-header :title="$t('dashboard.navigation.categories')">
      <q-btn
        :label="$t('dashboard.categories.addCategory')"
        :to="{name:'DashBoardCategoryCreate'}"
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
  </dashboard-page>
</template>

<script lang="ts" setup>
import CategoriesTable from 'components/dashboard/tables/CategoriesTable.vue';
import DashboardPageHeader from 'components/dashboard/DashboardPageHeader.vue';
import DashboardPage from 'pages/site/dashboard/DashboardPage.vue';
import { useCategories } from 'src/composables/useCategories';
import { ref } from 'vue';

const { result, loading, refetch } = useCategories();
void refetch();

const filter = ref('');

</script>
