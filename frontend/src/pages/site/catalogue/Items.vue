<template>
  <q-page>
    <q-scroll-area style="height: 80vh; width:100%">
      <div
        v-if="items"
        class="q-pa-md row items-start q-gutter-md"
      >
        <q-card
          v-for="item in items"
          :key="item.id"
          class="my-card"
        >
          <q-img
            :src="item.download_url"
            fit="scale-down"
            loading="lazy"
            style="max-height: 250px"
          >
            <q-badge
              color="purple"
              rounded
            >
              <q-icon
                color="white"
                name="swap_horiz"
              >
                <q-tooltip>
                  Tooltip
                </q-tooltip>
              </q-icon>

              3
            </q-badge>
          </q-img>
          <q-card-section />
          <q-card-section>
            <div class="text-h6">
              Our Changing Planet
            </div>
            <div class="text-subtitle2">
              by John Doe
            </div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            {{ item.height }}
          </q-card-section>
        </q-card>
      </div>
    </q-scroll-area>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  // name: 'PageName'

  setup() {
    // source https://picsum.photos/v2/list
    // eslint-disable-next-line no-unused-vars
    const items = ref([{
      id: '0', author: 'Alejandro Escamilla', width: 5616, height: 3744, url: 'https://unsplash.com/photos/yC-Yzbqy7PY', download_url: 'https://picsum.photos/id/0/5616/3744',
    }, {
      id: '1', author: 'Alejandro Escamilla', width: 5616, height: 3744, url: 'https://unsplash.com/photos/LNRyGwIJr5c', download_url: 'https://picsum.photos/id/1/5616/3744',
    }]);

    // eslint-disable-next-line max-len
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unused-vars
    return { items };
  },

});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
