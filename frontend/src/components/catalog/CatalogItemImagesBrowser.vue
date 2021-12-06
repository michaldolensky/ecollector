<template>
  <q-carousel
    v-model="slide"
    :arrows="moreThanOneImage"
    :fullscreen="fullscreen"
    animated
    control-color="primary"
    height="250px"
    infinite
    swipeable
  >
    <q-carousel-slide
      v-for="(image, index) in images"
      :key="index"
      :name="index"
    >
      <q-img
        :src="image.path"
        class="rounded-borders col-6 full-height"
        fit="contain"
        max-height="100%"
        max-width="100%"
        @click="toggleFullscreen"
      />
    </q-carousel-slide>

    <template #control>
      <q-carousel-control
        v-if="fullscreen"
        :offset="[18, 18]"
        position="top-right"
      >
        <q-btn
          color="white"
          dense
          icon="close"
          push
          round
          text-color="primary"
          @click="fullscreen = false"
        />
      </q-carousel-control>
    </template>
  </q-carousel>
  <q-virtual-scroll
    v-if="moreThanOneImage"
    :items="images"
    class="row no-wrap q-gutter-x-sm"
    style="overflow-x: auto; overflow-y: visible;"
    virtual-scroll-horizontal
  >
    <template #default="{ item, index }">
      <q-img
        :key="index"
        :src="item.path"
        fit="contain"
        height="50px"
        style="padding-right: 10px; padding-left: 10px"
        width="50px"
        @click="slide = index"
      />
    </template>
  </q-virtual-scroll>
</template>

<script lang="ts" setup>

import { toRefs, useToggle } from '@vueuse/core';
import { Image } from 'src/apollo/composition-functions';
import { computed, ref } from 'vue';

interface Props {
  images: Image[]
}

const props = withDefaults(defineProps<Props>(), {
  images: () => [],
});
const { images } = toRefs(props);

const moreThanOneImage = computed((): boolean => images.value.length > 1);

const slide = ref(0);

const [fullscreen, toggleFullscreen] = useToggle();

</script>
