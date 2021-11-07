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
      {{ props.category.name }}
      <q-item-label caption>
        {{ props.category.description }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts" setup>
interface Category {
  id:number,
  name:string,
  description:string
}
interface Props{
  category:Category
}

const props = defineProps<Props>();

</script>

<style lang="scss" scoped>

</style>
