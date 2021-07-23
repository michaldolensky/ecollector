<template>
  <q-card flat bordered class="my-card">
    <q-card-section>
      <div class="text-h6">Our Changing Planet</div>
    </q-card-section>

    <q-card-section class="q-pt-none">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
    </q-card-section>

    <q-separator inset />

    <q-card-section>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua.
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
