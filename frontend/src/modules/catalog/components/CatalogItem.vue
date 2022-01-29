<script lang="ts" setup>

import { Item } from 'src/types/graphql';

interface Props {
  item: Item
}

const props = defineProps<Props>();

</script>
<template>
  <q-card
    style="width: 100%; max-width: 250px"
  >
    <q-card-section>
      <router-link
        :to="{name:'CatalogItemDetail',params:{
          itemId:props.item.id,
        }}"
        class="no-decoration justify-center"
      >
        <q-img
          v-if="props.item.images[0].file.url"
          :src="props.item.images[0].file.url"
          fit="scale-down"
          loading="lazy"
          style="max-height: 250px"
        />
        <q-img
          v-else
          fit="scale-down"
          loading="lazy"
          placeholder-src="~/assets/missing-image.png"
          src="~/assets/missing-image.png"
          style="max-height: 250px"
        />
      </router-link>
      <div class="justify-around">
        <q-badge
          class="float-left"
          color="blue"
        >
          <q-tooltip>
            {{ $t('catalog.itemDetail.item.numberOfItemsForExchange') }}
          </q-tooltip>
          <q-icon
            left
            name="fas fa-exchange-alt"
          />
          {{ props.item.numberForExchange }}
        </q-badge>
        <q-badge
          class="float-right q-mr-5"
          color="green"
        >
          <q-tooltip>
            {{ $t('catalog.itemDetail.item.numberOfItemsInCollection') }}
          </q-tooltip>
          {{ props.item.numberInCollection }}
          <q-icon
            name="fas fa-layer-group"
            right
          />
        </q-badge>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="text-h6">
        {{ props.item.name }}
      </div>
      <div class="text-subtitle3 ellipsis-3-lines">
        {{ props.item.shortDesc }}
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.no-decoration{
  text-decoration: none;
}
</style>
