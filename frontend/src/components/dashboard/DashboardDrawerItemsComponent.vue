<template>
  <q-list
    v-for="item in DashboardNavigationItems"
    :key="item.name"
    :separator="false"
    bordered
  >
    <NavigationItem
      :icon="item.icon"
      :route-name="item.routeName"
      :title="$t(item.nameString)"
    />
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { DashboardNavigationItems } from 'src/data/DashboardNavigationItems';
import NavigationItem from 'components/dashboard/NavigationItem.vue';

export default defineComponent({
  name: 'DashboardDrawerItemsComponent',
  components: { NavigationItem },
  setup() {
    return { DashboardNavigationItems };
  },
});
</script>
