<template>
  <q-card
    class="my-card"
  >
    <q-img
      :src=" config.SERVER_URL+item.images[0].path"
      fit="scale-down"
      loading="lazy"
      style="max-height: 250px"
    >
      <q-badge
        color="purple"
        rounded
      >
        <q-icon
          color="white"
          name="swap_horiz"
        >
          <q-tooltip>
            Tooltip
          </q-tooltip>
        </q-icon>

        3
      </q-badge>
    </q-img>
    <q-card-section />
    <q-card-section>
      <div class="text-h6">
        {{ item.name }}
      </div>
      <div class="text-subtitle2">
        {{ item.shortDesc }}
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      {{ item.height }}
    </q-card-section>
  </q-card>
</template>
<script lang="ts">
import { config } from 'src/config';
import { CatalogItem } from 'src/module/useCatalog';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'CatelogItem',
  props: {
    item: {
      type: Array as PropType<CatalogItem[]>,
      default: () => [],
    },
  },
  setup() {
    return {
      config,
    };
  },
});
</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
