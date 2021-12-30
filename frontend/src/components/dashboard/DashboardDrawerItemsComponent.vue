<script lang="ts" setup>
import NavigationItem from 'components/dashboard/NavigationItem.vue';

interface NavigationItemInterface {
  nameString: string,
  routeName: string
  icon: string
}

const DashboardNavigationItems: NavigationItemInterface[] = [
  {
    nameString: 'dashboard.navigation.home',
    icon: 'home',
    routeName: 'DashBoardIndex',
  },
  {
    nameString: 'dashboard.navigation.items',
    icon: 'list',
    routeName: 'DashBoardItemsList',
  },
  {
    nameString: 'dashboard.navigation.categories',
    icon: 'category',
    routeName: 'DashBoardCategoriesList',
  },
  {
    nameString: 'dashboard.navigation.parameters',
    icon: 'code',
    routeName: 'DashBoardParameterList',
  },
  {
    nameString: 'dashboard.navigation.settings',
    icon: 'settings',
    routeName: 'DashBoardSettings',
  },
  {
    nameString: 'dashboard.navigation.catalog',
    icon: 'open_in_new',
    routeName: 'catalog',
  },
];

</script>

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
