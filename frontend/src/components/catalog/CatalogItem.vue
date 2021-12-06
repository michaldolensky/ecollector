<template>
  <router-link
    :to="{name:'CatalogItemDetail',params:{
      itemId:props.item.id,
    }}"
  >
    <q-card
      style="width: 100%; max-width: 250px"
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
            <q-tooltip>{{ $t('catalog.item.badge.available_for_exchange') }}</q-tooltip>
          </q-icon>
          {{ item.numberForExchange }}
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
    </q-card>
  </router-link>
</template>
<script lang="ts" setup>
import { CatalogItem } from 'src/composables/useCatalog';
import { SERVER_URL } from 'src/composables/useEnv';

interface Props {
  item: CatalogItem
}

const props = defineProps<Props>();

</script>
