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
      component: () => import('../modules/account/pages/Profile.vue'),
    },
    {
      path: 'sites',
      name: 'SitesList',
      component: () => import('../modules/account/pages/SitesListPage.vue'),
    },
  ],
};
