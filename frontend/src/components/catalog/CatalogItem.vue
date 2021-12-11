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
          v-if="props.item.images[0]"
          :src="SERVER_URL + props.item.images[0].path"
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
    </q-card-section>
    <q-card-section>
      <div class="text-h6">
        {{ props.item.name }}
      </div>
      <div class="text-subtitle2 ellipsis-3-lines">
        {{ props.item.shortDesc }}
      </div>
    </q-card-section>
  </q-card>
</template>
<script lang="ts" setup>
import { CatalogItem } from 'src/composables/useCatalog';
import { SERVER_URL } from 'src/composables/useEnv';

interface Props {
  item: CatalogItem
}

const props = defineProps<Props>();

</script>

<style scoped>
.no-decoration{
  text-decoration: none;
}
</style>
