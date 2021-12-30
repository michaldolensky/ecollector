import { AccountModuleRoutes } from 'src/modules/account/router';
import { AuthModuleRoutes } from 'src/modules/auth/router';
import { CatalogModuleRoutes } from 'src/modules/catalog/router';
import { DashboardModuleRoutes } from 'src/modules/dashboard/router';
import { RouteLocationNormalized, RouteRecordRaw } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    showDrawer?: boolean
    requireAuth?: boolean
  }
}

export const redirectToLogin = (to: RouteLocationNormalized) => ({
  name: 'login',
  query: { redirect: to.fullPath },
});

// const requireAdmin:NavigationGuard = (to, from, next) => {
//   const authStore = useAuthStore();
//   if (authStore.isAdmin) {
//     next();
//   } else {
//     next(redirectToLogin(to));
//   }
// };

const getRoutes = (): RouteRecordRaw[] => [
  {
    name: 'Home',
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'MainPage', component: () => import('pages/MainPage.vue') },
      {
        path: 'site/:siteId',
        redirect: { name: 'CatalogIndex' },
      },
      CatalogModuleRoutes,
      DashboardModuleRoutes,
      AccountModuleRoutes,
      AuthModuleRoutes,
    ],
  },

  {
    path: '/error401',
    name: 'Error401',
    component: () => import('pages/Error-401.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'Error404',
    component: () => import('pages/Error-404.vue'),
  },
];
export default getRoutes;
