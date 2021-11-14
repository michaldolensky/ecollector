<template>
  <q-card>
    <q-card-section>
      <div class="text-h4">
        {{ props.title }}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <div class="text-h1 text-center">
        {{ props.count }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>

interface Props {
  count: number
  title: string
}
const props = defineProps<Props>();

</script>

<style scoped>

</style>
