<template>
  <q-page padding>
    <template
      v-for="item in items"
      :key="item.id"
    >
      <CatalogueItem :item="item" />
    </template>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import CatalogueItem from 'components/catalogue/CatalogueItem.vue';
import { Item } from 'src/module/useItems';

export default defineComponent({
  name: 'ItemsPage',
  components: { CatalogueItem },
  props: {
    items: {
      type: Array as PropType<Item[]>,
      required: true,
    },
  },
  setup(props) {
    return {
      ...props,
    };
  },
});
</script>
