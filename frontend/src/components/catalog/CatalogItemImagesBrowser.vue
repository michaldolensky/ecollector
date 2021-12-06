<template>
  <q-carousel
    v-model="slide"
    :arrows="moreThanOneImage"
    :fullscreen="fullscreen"
    animated
    control-color="primary"
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
        class="full-height"
        fit="contain"
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

          round
          text-color="primary"
          @click="fullscreen = false"
        />
      </q-carousel-control>
    </template>
  </q-carousel>
  <div class="col-12 q-px-md">
    <q-virtual-scroll
      v-if="moreThanOneImage"
      :items="images"
      class="row no-wrap justify-center"
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
  </div>
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
