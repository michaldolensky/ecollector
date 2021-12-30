import { RouteRecordRaw, RouterView } from 'vue-router';

export const AccountModuleRoutes:RouteRecordRaw = {
  path: 'account',
  component: RouterView,
  meta: {
    requireAuth: true,
  },
  children: [
    {
      path: 'profile',
      name: 'profile',
      component: () => import('src/modules/account/pages/Profile.vue'),
    },
    {
      path: 'sites',
      name: 'SitesList',
      component: () => import('src/modules/account/pages/SitesListPage.vue'),
    },
  ],
};
