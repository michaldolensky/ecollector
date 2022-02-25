<script lang="ts" setup>
import { useResult } from "@vue/apollo-composable";
import { useQuasar } from "quasar";
import { useRouteParams } from "src/composables/useRoute";
import DashboardPageHeader from "src/modules/dashboard/components/DashboardPageHeader.vue";
import ItemCategorySelect from "components/dashboard/ItemCategorySelect.vue";
import ItemsTable from "src/modules/dashboard/modules/items/components/ItemsTable.vue";
import DashboardPage from "src/modules/dashboard/DashboardModule.vue";
import { useDashboardItems } from "src/modules/dashboard/modules/items/composables/useDashboardItems";
import { useGetItemsQuery } from "src/modules/dashboard/modules/items/graphql/ItemDashboard.operations";
import { Item, ItemFilterInput } from "src/types/graphql";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";

const { dialog } = useQuasar();
const { t } = useI18n();
const { siteId } = useRouteParams();

const { removeItem } = useDashboardItems();

const resetFilterObject = {
  categoryId: null,
  internalNumber: null,
  name: null,
  numberForExchange: null,
  numberInCollection: null,
};

const filter = reactive<ItemFilterInput>({ ...resetFilterObject });

const resetFilter = () => {
  Object.assign(filter, resetFilterObject);
};

const { result, loading, refetch } = useGetItemsQuery({
  siteId: siteId.value,
  filter,
});
void refetch();

const items = useResult(result, []);

const confirmDelete = (item: Item) => {
  dialog({
    title: t("dialogs.titles.confirm", [item.name]),
    message: t("dashboard.items.dialogs.message.delete", [item.name]),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    void removeItem(item.id).then(() => {
      void refetch();
    });
  });
};
</script>

<template>
  <dashboard-page>
    <dashboard-page-header :title="$t('dashboard.navigation.items')">
      <q-btn
        :label="$t('dashboard.items.addItem')"
        :to="{ name: 'DashBoardItemCreate' }"
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
            <item-category-select v-model="filter.categoryId" clearable />
          </div>
        </div>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn @click="resetFilter">
          {{ $t("buttons.common.reset") }}
        </q-btn>
        <q-btn color="secondary" @click="refetch()">
          {{ $t("buttons.common.filter") }}
        </q-btn>
      </q-card-actions>
    </q-card>

    <q-card>
      <items-table
        :loading="loading"
        :items="items"
        @delete-row="confirmDelete"
      />
    </q-card>
  </dashboard-page>
</template>
