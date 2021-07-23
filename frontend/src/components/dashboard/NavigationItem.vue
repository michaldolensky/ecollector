<template>
  <q-item
    v-ripple
    :to="{name:routeName}"
    clickable
    exact
    tag="a"
  >
    <q-item-section
      v-if="icon"
      avatar
    >
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'NavigationItem',
  props: {
    title: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      default: '',
    },
    routeName: {
      type: String,
      default: '#',
    },
    icon: {
      type: String,
      default: '',
    },
  },
});
</script>
