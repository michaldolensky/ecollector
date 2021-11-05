<template>
  <q-list
    bordered
  >
    <NavigationItem
      v-for="item in DashboardNavigationItems"
      :key="item.routeName"
      :icon="item.icon"
      :route-name="item.routeName"
      :title="$t(item.nameString)"
    />
  </q-list>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import { DashboardNavigationItems } from 'src/router/DashboardNavigationItems';
import NavigationItem from 'components/dashboard/NavigationItem.vue';

export default defineComponent({
  name: 'DashboardDrawerItemsComponent',
  components: { NavigationItem },
  setup() {
    return { DashboardNavigationItems };
  },
});
</script>
