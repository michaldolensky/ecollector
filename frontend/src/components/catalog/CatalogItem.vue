<template>
  <q-card
    class="my-card"
  >
    <q-img
      :src="SERVER_URL+props.item.images[0].path"
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
        {{ props.item.name }}
      </div>
      <div class="text-subtitle2">
        {{ props.item.shortDesc }}
      </div>
    </q-card-section>
    <q-card-section class="q-pt-none">
      {{ props.item.height }}
    </q-card-section>
  </q-card>
</template>
<script lang="ts" setup>
import { CatalogItem } from 'src/module/useCatalog';
import { defineProps } from 'vue';
import { SERVER_URL } from 'src/module/useEnv';

interface Props{
  item:CatalogItem
}

const props = defineProps<Props>();

</script>
<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
