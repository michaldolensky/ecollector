<script lang="ts" setup>
interface Props {
  title: string;
  icon?: string;
  routeName: string;
  caption?: string;
}

const props = withDefaults(defineProps<Props>(), {
  icon: "",
  routeName: "#",
  caption: "",
});
</script>

<template>
  <q-item v-ripple :to="{ name: props.routeName }" clickable exact tag="a">
    <q-item-section v-if="props.icon" avatar>
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>
