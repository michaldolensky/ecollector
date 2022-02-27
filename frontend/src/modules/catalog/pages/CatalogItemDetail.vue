<script lang="ts" setup>
import { useResult } from "src/composables/useResult";
import { useGetCatalogItemQuery } from "src/modules/catalog/graphql/categoryCatalog.operations";
import Breadcrumbs from "src/modules/catalog/components/Breadcrumbs.vue";
import CatalogItemImagesBrowser from "src/modules/catalog/components/CatalogItemImagesBrowser.vue";
import { useLocaleStore } from "src/stores/locale";
import { ItemParameter } from "src/types/graphql";

interface Props {
  itemId: number;
}

const localeStore = useLocaleStore();

const props = defineProps<Props>();

const { data, fetching } = useGetCatalogItemQuery({
  variables: {
    itemId: props.itemId,
  },
});

const item = useResult(data, {});

const columns = [
  {
    name: "name",
    required: true,
    align: "left",
    field: (row: ItemParameter) => row.parameter.name,
    sortable: true,
    classes: "text-bold",
  },
  {
    name: "value",
    align: "left",
    field: "value",
    sortable: true,
  },
];
</script>

<template>
  <q-page v-if="!fetching">
    <div class="row">
      <div class="col-12 q-px-md q-pt-md">
        <Breadcrumbs />
      </div>
    </div>
    <div class="row">
      <div class="col-12 q-pt-md q-px-md">
        <span class="text-h4">{{ item.name }}</span>
      </div>
    </div>
    <div class="row">
      <div class="col-12 col-md-6">
        <catalog-item-images-browser :images="item.images" />
      </div>
      <div class="col-12 col-md-6 q-pa-md">
        <q-card>
          <q-list bordered separator>
            <q-item>
              <q-item-section>
                <q-item-label>{{ item.shortDesc }}</q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label overline>
                  {{ $t("catalog.itemDetail.item.numberOfItemsForExchange") }}
                </q-item-label>
                <q-item-label>
                  {{ item.numberForExchange }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label overline>
                  {{ $t("catalog.itemDetail.item.numberOfItemsInCollection") }}
                </q-item-label>
                <q-item-label>
                  {{ item.numberInCollection }}
                </q-item-label>
              </q-item-section>
            </q-item>
            <q-item>
              <q-item-section>
                <q-item-label overline>
                  {{ $t("catalog.itemDetail.item.created") }}
                </q-item-label>
                <q-item-label>
                  {{ localeStore.getFormatedDate(item.createdAt) }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card>
      </div>
    </div>
    <div class="row">
      <div class="col-8 q-pa-md">
        <q-card>
          <q-card-section>
            <div class="text-h6">
              {{ $t("catalog.itemDetail.item.description") }}
            </div>
          </q-card-section>
          <q-separator />
          <q-card-section v-html="item.longDesc" />
        </q-card>
      </div>
      <div class="col-4 q-pa-md">
        <q-table
          :columns="columns"
          :row-key="(row) => row.parameter.id"
          :rows="item.itemParameters"
          :title="$t('catalog.itemDetail.item.parameters')"
          hide-bottom
          hide-header
          separator="horizontal"
        />
      </div>
    </div>
  </q-page>
</template>
