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
import { ItemInterface } from 'src/types/item.interface';
import CatalogueItem from 'components/catalogue/CatalogueItem.vue';

export default defineComponent({
  name: 'ItemsPage',
  components: { CatalogueItem },
  props: {
    items: {
      type: Array as PropType<ItemInterface[]>,
      default: () => ([
        { name: 'item1', id: 1, description: 'Item 1 Desc' },
        { name: 'item2', id: 2, description: 'Item 1 Desc' },
      ]),
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
