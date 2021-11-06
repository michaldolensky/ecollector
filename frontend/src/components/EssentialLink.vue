<template>
  <q-item
    :href="props.link"
    clickable
    tag="a"
  >
    <q-item-section
      v-if="props.icon"
      avatar
    >
      <q-icon :name="props.icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption>
        {{ props.caption }}
      </q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts" setup>
interface Props {
  icon?: string;
  title: string;
  caption?: string;
  link: string;
}

const props = withDefaults(defineProps<Props>(), {
  icon: '',
  caption: '',
  link: '#',
});
</script>
