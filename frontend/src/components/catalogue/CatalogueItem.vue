<template>
  <q-card
    bordered
    flat
  >
    <q-card-section>
      <h3>{{ item.name }}</h3>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { ItemInterface } from 'src/types/item.interface';

export default defineComponent({
  name: 'CatalogueItem',
  components: { },
  props: {
    item: {
      type: Object as PropType<ItemInterface>,
      default: () => ({}),
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
