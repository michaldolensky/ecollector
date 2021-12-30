<script lang="ts" setup>

import { useSiteQuery } from 'src/modules/account/graphql/sitesDashboard.operations';
import { useSites } from 'src/composables/useSites';

const { currentSiteId } = useSites();
const { result } = useSiteQuery({ id: currentSiteId.value });

</script>
<template>
  <q-toolbar inset>
    <q-toolbar-title
      v-if="result"
      shrink
    >
      {{ result.site.name }}
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
        :to="{name:'CatalogIndex',params:{siteId:currentSiteId}}"
      />
    </q-tabs>
  </q-toolbar>
</template>
