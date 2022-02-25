<script lang="ts" setup>
import DashboardPageHeader from "src/modules/dashboard/components/DashboardPageHeader.vue";
import ParametersTable from "src/modules/dashboard/modules/parameters/components/ParametersTable.vue";
import DashboardPage from "src/modules/dashboard/DashboardModule.vue";
import { useDashboardParameters } from "src/modules/dashboard/modules/parameters/composables/useDashboardParameters";

const { filter, resetFilter } = useDashboardParameters();
</script>

<template>
  <dashboard-page>
    <dashboard-page-header :title="$t('dashboard.navigation.parameters')">
      <q-btn
        :label="$t('dashboard.parameters.addParameter')"
        :to="{ name: 'DashBoardParameterCreate' }"
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
          {{ $t("buttons.common.reset") }}
        </q-btn>
        <q-btn color="secondary" @click="alert('refetch')">
          {{ $t("buttons.common.filter") }}
        </q-btn>
      </q-card-actions>
    </q-card>

    <q-card>
      <parameters-table />
    </q-card>
  </dashboard-page>
</template>
