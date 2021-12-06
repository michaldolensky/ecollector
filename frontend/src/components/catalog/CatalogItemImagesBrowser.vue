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
    <q-scroll-area
      v-if="moreThanOneImage"
      id="gallery-thumbnail"
      style="height: 100px"
    >
      <q-virtual-scroll
        :items="images"
        scroll-target="#gallery-thumbnail > .scroll"
        separator
        virtual-scroll-horizontal
      >
        <template #default="{ item, index }">
          <q-img
            :key="index"
            :src="item.path"
            fit="contain"
            width="100px"
            @click="slide = index"
          />
        </template>
      </q-virtual-scroll>
    </q-scroll-area>
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
