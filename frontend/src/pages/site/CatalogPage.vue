<template>
  <q-page>
    <q-drawer
      v-model="settings.drawerState"
      :width="300"
      bordered
      elevated
      show-if-above
      side="left"
    >
      <q-scroll-area
        id="scroll-area-with-virtual-scroll-1"
        style="height: 100%"
      >
        <q-virtual-scroll
          v-if="!loading"
          :items="result.categories"
          :virtual-scroll-item-size="32"
          scroll-target="#scroll-area-with-virtual-scroll-1 > .scroll"
          separator
        >
          <template #default="{ item, index }">
            <q-item
              :key="index"
              v-ripple
              :to="{params:{categoryId:item.id}}"
              clickable
            >
              <q-item-section>
                <q-item-label>{{ item.name }}</q-item-label>
                <q-item-label caption />
              </q-item-section>
            </q-item>
          </template>
        </q-virtual-scroll>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-page>
</template>

<script lang="ts" setup>
import { useGetCatalogueCategoriesQuery } from 'src/apollo/composition-functions';
import { useSites } from 'src/module/useSites';
import { useSiteSettingsStore } from 'src/stores/settings';

const settings = useSiteSettingsStore();

const { currentSiteId } = useSites();

// eslint-disable-next-line max-len
const { result, loading } = useGetCatalogueCategoriesQuery({
  siteId: currentSiteId.value,
});
</script>
