<template>
  <q-page
    class="q-pa-md col items-start q-gutter-md"
    padding
  >
    <div>
      <span class="text-h4 ">Items</span>
      <div class="float-right">
        <q-btn
          :to="{name:'DashBoardItemCreate'}"
          color="primary"
          icon="add"
          label="Add item"
        />
      </div>
    </div>

    <q-card class="q-pa-md">
      <q-input
        v-model="filter"
        debounce="300"
        placeholder="Search"
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
import ItemsTable from 'components/dashboard/tables/ItemsTable.vue';
import { useItems } from 'src/module/useItems';
import { ref } from 'vue';

const { result, loading } = useItems();
const filter = ref('');

</script>
