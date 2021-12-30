<script lang="ts" setup>

interface Props {
  title?: string
}

const props = defineProps<Props>();

</script>

<template>
  <header>
    <slot name="title">
      <span class="text-h4">{{ props.title }}</span>
    </slot>
    <div
      v-if="$slots.default"
      class="float-right"
    >
      <slot />
    </div>
  </header>
</template>
