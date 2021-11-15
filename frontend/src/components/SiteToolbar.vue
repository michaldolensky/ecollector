<template>
  <q-toolbar inset>
    <q-toolbar-title shrink>
      <!--      todo-->
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
        :label="$t('catalog.navigation.tab.catalog')"
        :to="{name:'CatalogIndex',params:{siteId:1}}"
      />
    </q-tabs>
  </q-toolbar>
</template>
<script lang="ts" setup>

</script>
