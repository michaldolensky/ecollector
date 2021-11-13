<template>
  <q-item
    v-ripple
    :to="{name:'CatalogCategory',params:{categoryId:props.category.id,siteId:route.params.siteId}}"
    clickable
    exact
    tag="a"
  >
    <q-item-section avatar>
      <q-icon name="label" />
    </q-item-section>

    <q-item-section>
      {{ props.category.name }}
      <q-item-label caption>
        {{ props.category.description }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts" setup>

import { useRoute } from 'vue-router';

interface Category {
  id:number,
  name:string,
  description:string
}
interface Props{
  category:Category
}
const props = defineProps<Props>();

const route = useRoute();

</script>
