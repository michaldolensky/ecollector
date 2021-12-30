import { DashboardRoutes } from 'src/modules/dashboard/router';
import { useAuthStore } from 'src/stores/auth';
import { getParsedInt } from 'src/utils';
import {
  NavigationGuard, RouteLocationNormalized, RouteRecordRaw, RouterView,
} from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    showDrawer?: boolean
  }
}

export const redirectToLogin = (to: RouteLocationNormalized) => ({
  name: 'login',
  query: { redirect: to.fullPath },
});

const getRoutes = (): RouteRecordRaw[] => {
  const redirectWhenLoggedIn: NavigationGuard = (to, from, next) => {
    const authStore = useAuthStore();
    if (authStore.isLoggedIn) {
      next({
        name: 'profile',
      });
    } else next();
  };

  // const requireAdmin:NavigationGuard = (to, from, next) => {
  //   const authStore = useAuthStore();
  //   if (authStore.isAdmin) {
  //     next();
  //   } else {
  //     next(redirectToLogin(to));
  //   }
  // };

  return [
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
        {
          name: 'catalog',
          path: 'site/:siteId/catalog',
          components: {
            default: RouterView,
            drawer: () => import('components/drawers/CatalogDrawer.vue'),
            subToolbar: () => import('components/SiteToolbar.vue'),
          },
          meta: {
            showDrawer: true,
          },
          children: [
            {
              name: 'CatalogIndex',
              path: '',
              props: (route) => ({
                siteId: getParsedInt(route.params.siteId),
              }),
              component: () => import('pages/site/catalog/CatalogItemsPage.vue'),
            },
            {
              name: 'CatalogCategory',
              path: 'cat/:categoryId',
              props: (route) => ({
                categoryId: getParsedInt(route.params.categoryId),
                siteId: getParsedInt(route.params.siteId),
              }),
              component: () => import('pages/site/catalog/CatalogItemsPage.vue'),
            },
            {
              name: 'CatalogItemDetail',
              path: 'item/:itemId/',
              props: (route) => ({
                itemId: getParsedInt(route.params.itemId),
              }),
              component: () => import('pages/site/catalog/CatalogItemDetail.vue'),
            },
          ],
        },
        ...DashboardRoutes,
        {
          path: 'account',
          component: RouterView,
          meta: {
            requireAuth: true,
          },
          children: [
            {
              path: 'profile',
              name: 'profile',
              component: () => import('pages/account/Profile.vue'),
            },
            {
              path: 'sites',
              name: 'SitesList',
              component: () => import('pages/account/SitesListPage.vue'),
            },
          ],
        },
        {
          path: 'auth',
          component: () => import('layouts/MainLayout.vue'),
          beforeEnter: [redirectWhenLoggedIn],
          children: [
            {
              path: 'login',
              alias: '/login',
              name: 'login',
              component: () => import('pages/auth/AuthLoginPage.vue'),
            },
            {
              path: 'signup',
              name: 'signup',
              component: () => import('pages/auth/AuthSignupPage.vue'),
            },

          ],
        },
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
};

export default getRoutes;
