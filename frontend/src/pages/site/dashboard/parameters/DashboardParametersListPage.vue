<template>
  <dashboard-page>
    <dashboard-page-header :title="$t('dashboard.navigation.parameters')">
      <q-btn
        :label="$t('dashboard.parameters.addParameter')"
        :to="{name:'DashBoardParameterCreate'}"
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
      <parameters-table />
    </q-card>
  </dashboard-page>
</template>

<script lang="ts" setup>
import DashboardPageHeader from 'components/dashboard/DashboardPageHeader.vue';
import ParametersTable from 'components/dashboard/tables/ParametersTable.vue';
import DashboardPage from 'pages/site/dashboard/DashboardPage.vue';
import { useDashboardParameters } from 'src/composables/dashboard/useDashboardParameters';

const { filter, refetch, resetFilter } = useDashboardParameters();

</script>
