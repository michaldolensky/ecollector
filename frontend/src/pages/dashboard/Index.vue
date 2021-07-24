<template>
  <q-page class="row items-center justify-evenly">
    <div v-if="loading">
      Loading...
    </div>
    <div v-else-if="error">
      Error: {{ error.message }}
    </div>
    <div v-else-if="result && result.item">
      {{ result }}
      <div>id: {{ result.item.id }}</div>
      <div>name: {{ result.item.name }}</div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useQuery } from '@vue/apollo-composable';
import { GET_ITEM_QUERY } from 'src/apollo/items/getItem.query';

export default defineComponent({
  // name: 'PageName'
  setup() {
    const { result, loading, error } = useQuery(GET_ITEM_QUERY);
    return { result, loading, error };
  },
});
</script>
