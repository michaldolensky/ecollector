<script lang="ts" setup>
import { useGetPublicSitesQuery } from "src/modules/index/graphql/index.urql";
import { Site } from "src/types/graphql";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const { fetching, data } = useGetPublicSitesQuery();

const columns = [
  {
    name: "name",
    required: true,
    label: t("mainPage.siteList.label.siteName"),
    align: "left",
    field: (row: Site) => row.name,
    sortable: true,
  },
  {
    name: "owner",
    required: true,
    label: t("mainPage.siteList.label.owner"),
    align: "left",
    field: (row: Site) => {
      if (row.owner.lastName && row.owner.firstName) {
        return `${row.owner.firstName} ${row.owner.lastName}`;
      }
      return "Unknown";
    },
    sortable: true,
  },
  {
    name: "Action",
    label: t("account.sites.table.column.label.action"),
    field: () => "Action",
    sortable: false,
    align: "center",
  },
];
</script>

<template>
  <q-page class="row items-center justify-evenly">
    <q-table
      v-if="!fetching && data.sites.length > 0"
      :columns="columns"
      :rows="data.sites"
      row-key="id"
    >
      <template #body-cell-Action="props">
        <q-td :props="props">
          <q-btn
            :to="`/site/${props.row.id}/`"
            class="q-ml-sm"
            flat
            icon="open_in_new"
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>
