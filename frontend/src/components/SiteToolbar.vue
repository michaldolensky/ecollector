<template>
  <q-toolbar inset>
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
</template>
<script lang="ts" setup>

</script>
