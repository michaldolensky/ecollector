<template>
  <q-page
    class="q-pa-md col items-start q-gutter-md"
    padding
  >
    <div>
      <span class="text-h4 ">{{ $t('dashboard.navigation.items') }}</span>
      <div class="float-right">
        <q-btn
          :label="t('dashboard.items.addItem')"
          :to="{name:'DashBoardItemCreate'}"
          color="primary"
          icon="add"
        />
      </div>
    </div>

    <q-card class="q-pa-md">
      <q-input
        v-model="filter"
        :placeholder="t('filters.items.search')"
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
import { useI18n } from 'boot/i18n';
import ItemsTable from 'components/dashboard/tables/ItemsTable.vue';
import { useItems } from 'src/module/useItems';
import { ref } from 'vue';

const { result, loading } = useItems();
const { t } = useI18n();

const filter = ref('');

</script>
