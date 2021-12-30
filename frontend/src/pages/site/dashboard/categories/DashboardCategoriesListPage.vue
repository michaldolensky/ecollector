<script lang="ts" setup>
import CategoriesTable from 'components/dashboard/tables/CategoriesTable.vue';
import DashboardPageHeader from 'components/dashboard/DashboardPageHeader.vue';
import DashboardPage from 'pages/site/dashboard/DashboardPage.vue';
import { useDashboardCategories } from 'src/composables/dashboard/useDashboardCategories';

const { filter, refetch, resetFilter } = useDashboardCategories();

</script>

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

    <q-card>
      <q-card-section>
        <div class="row">
          <div class="col">
            <q-input
              v-model="filter.name"
              :label="$t('filters.items.name')"
              debounce="300"
              outlined
              stack-label
            >
              <template #append>
                <q-icon name="search" />
              </template>
            </q-input>
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn @click="resetFilter">
          {{ $t('buttons.common.reset') }}
        </q-btn>
        <q-btn
          color="secondary"
          @click="refetch()"
        >
          {{ $t('buttons.common.filter') }}
        </q-btn>
      </q-card-actions>
    </q-card>

    <q-card>
      <categories-table />
    </q-card>
  </dashboard-page>
</template>
