import { NavigationItemInterface } from 'src/types/NavigationItem.interface';

export const DashboardNavigationItems:NavigationItemInterface[] = [
  {
    nameString: 'dashboard.navigation.home',
    icon: 'home',
    routeName: 'DashBoardIndex',
  },
  {
    nameString: 'dashboard.navigation.items',
    icon: 'list',
    routeName: 'DashBoardItems',
  },
  {
    nameString: 'dashboard.navigation.categories',
    icon: 'category',
    routeName: 'DashBoardCategories',
  },
  {
    nameString: 'dashboard.navigation.settings',
    icon: 'settings',
    routeName: 'DashBoardSettings',
  },
];
