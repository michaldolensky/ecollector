<template>
  <q-layout view="hHh LpR fFf">
    <q-drawer
      :width="300"
      bordered
      elevated
      show-if-above
      side="left"
    >
      <q-scroll-area
        id="scroll-area-with-virtual-scroll-1"
        style="height: 80vh"
      >
        <q-virtual-scroll

          :items="heavyList"
          :virtual-scroll-item-size="32"
          scroll-target="#scroll-area-with-virtual-scroll-1 > .scroll"
          separator
        >
          <template #default="{ item, index }">
            <q-item
              :key="index"
              v-ripple
              clickable
            >
              <q-item-section>
                <q-item-label>{{ item.label }}</q-item-label>
                <q-item-label caption>
                  {{ item.caption }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </template>
        </q-virtual-scroll>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

// fixme
const maxSize = 1000;
const heavyList:{
  label: string,
  caption: string,
}[] = [];

for (let i = 0; i < maxSize; i += 1) {
  heavyList.push({
    label: `Option ${i + 1}`,
    caption: `Caption ${i + 1}`,
  });
}

export default defineComponent({
  // name: 'LayoutName',
  components: { },

  setup() {
    const leftDrawer = ref(false);
    return { leftDrawer, heavyList };
  },
});
</script>
