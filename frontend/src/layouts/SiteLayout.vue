<template>
  <q-layout>
    <q-header>
      <q-toolbar>
        <q-toolbar-title shrink>
          SiteName
        </q-toolbar-title>
        <q-separator
          dark
          inset
          spaced="md"
          vertical
        />
        <q-tabs align="left">
          <q-route-tab
            :to="{name:'CatalogIndex',params:{siteId:1}}"
            label="Catalog"
          />
        </q-tabs>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SiteLayout',
  components: { },
  setup() {
    return { };
  },
});
</script>
