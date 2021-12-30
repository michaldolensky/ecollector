<script lang="ts" setup>
import DashboardPageHeader from 'components/dashboard/DashboardPageHeader.vue';
import ItemCategorySelect from 'components/dashboard/ItemCategorySelect.vue';
import ItemsTable from 'src/modules/dashboard/items/components/ItemsTable.vue';
import DashboardPage from 'pages/site/DashboardPage.vue';
import { useDashboardItems } from 'src/composables/dashboard/useDashboardItems';

const { filter, refetch, resetFilter } = useDashboardItems();

</script>

<template>
  <dashboard-page>
    <dashboard-page-header :title="$t('dashboard.navigation.items')">
      <q-btn
        :label="$t('dashboard.items.addItem')"
        :to="{name:'DashBoardItemCreate'}"
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
          <div class="col">
            <item-category-select
              v-model="filter.categoryId"
              clearable
            />
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
      <items-table />
    </q-card>
  </dashboard-page>
</template>
