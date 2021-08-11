<template>
  <q-item
    v-ripple
    :to="url"
    clickable
  >
    <q-item-section avatar>
      <q-icon name="label" />
    </q-item-section>

    <q-item-section>
      {{ category.name }}
      <q-item-label caption>
        {{ category.description }}ss
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

interface Category {
  id:number,
  name:string,
}

export default defineComponent({
  name: 'CatalogListCategory',
  components: { },
  props: {
    category: {
      type: Object as PropType<Category>,
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

<style lang="scss" scoped>

</style>
