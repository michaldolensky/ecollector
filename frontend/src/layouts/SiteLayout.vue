<template>
  <q-layout view="hHh lpR fFf">

    <q-header class="bg-primary text-white" elevated height-hint="98">
      <q-toolbar>
        <q-btn dense flat icon="menu" round @click="toggleLeftDrawer"/>
        <q-avatar>
          <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
        </q-avatar>

        <q-toolbar-title><strong>E</strong>collector</q-toolbar-title>

        <q-space/>

        <q-btn dense flat icon="person">
          <q-menu>
            <q-list style="min-width: 100px">
              <q-item v-close-popup clickable>
                <q-item-section>Dashboard</q-item-section>
              </q-item>
              <q-separator/>
              <q-item v-close-popup clickable>
                <q-item-section>Logout</q-item-section>
              </q-item>

            </q-list>
          </q-menu>
        </q-btn>

      </q-toolbar>
      <q-toolbar inset>
        <q-toolbar-title>
          SiteName
        </q-toolbar-title>
        <q-tabs align="left">
          <q-route-tab label="Page One" to="/page1"/>
          <q-route-tab label="Page Two" to="/page2"/>
          <q-route-tab label="Page Three" to="/page3"/>
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-drawer v-model="leftDrawerOpen" bordered show-if-above side="left">

      <template v-for="category in categories" :key="category.name">
        <CatalogueListCategory :category="category"/>
      </template>

    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>

  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import CatalogueListCategory from 'components/catalogue/CatalogueListCategory.vue';

export default defineComponent({

  components: {
    CatalogueListCategory,
  },
  setup() {
    const leftDrawerOpen = ref(false);

    const categories = ref([
      { name: 'Foo', id: 1, description: 'Cat1 Desc' },
      { name: 'Bar' },
    ]);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },

      categories,
    };
  },
});
</script>
