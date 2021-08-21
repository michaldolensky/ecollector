import { getParsedInt } from 'src/utils';
import { useAuthStore } from 'src/stores/auth';

import { NavigationGuard, RouteRecordRaw, RouteLocationNormalized } from 'vue-router';

declare module 'vue-router' {
  interface RouteMeta {
    showDrawer?: boolean
  }
}

const validateItemId:NavigationGuard = (to, from, next) => {
  const siteId = getParsedInt(to.params.siteId);
  if (siteId > 0) {
    next();
  } else next({ name: 'Error404' });
};
const validateSiteId:NavigationGuard = (to, from, next) => {
  const siteId = getParsedInt(to.params.siteId);
  if (siteId > 0) {
    next();
  } else next({ name: 'Error404' });
};
const validateCategoryId:NavigationGuard = (to, from, next) => {
  const siteId = getParsedInt(to.params.categoryId);
  if (siteId > 0) {
    next();
  } else next({ name: 'Error404' });
};

const redirectToLogin = (to:RouteLocationNormalized, from: RouteLocationNormalized) => {
  console.log(from);
  return {
    name: 'login',
    query: { redirect: to.fullPath },
  };
};

const getRoutes = (): RouteRecordRaw[] => {
  const requireAuth:NavigationGuard = (to, from, next) => {
    const authStore = useAuthStore();
    if (!authStore.authState) {
      next(redirectToLogin(to, from));
    } else next();
  };
  const checkAuth:NavigationGuard = async (to, from, next) => {
    const authStore = useAuthStore();
    await authStore.me();
    next();
  };

  // const requireAdmin:NavigationGuard = (to, from, next) => {
  //   const authStore = useAuthStore();
  //   if (authStore.isAdmin) {
  //     next();
  //   } else {
  //     next(redirectToLogin(to));
  //   }
  // };
  const requireOwner:NavigationGuard = (to, from, next) => {
    const authStore = useAuthStore();
    if (authStore.isOwner(to) || authStore.isAdmin) {
      next();
    } else {
      next(redirectToLogin(to, from));
    }
  };

  return [
    {
      path: '',
      component: () => import('layouts/MainLayout.vue'),
      beforeEnter: [checkAuth],
      children: [
        { path: '', name: 'index', component: () => import('pages/MainPage.vue') },
        {
          path: '/site/:siteId/',
          component: () => import('layouts/SiteLayout.vue'),
          redirect: { name: 'catalog' },
          meta: {
            showDrawer: true,
          },
          children: [
            {
              path: 'catalog/',
              name: 'catalog',
              component: () => import('layouts/CatalogLayout.vue'),
              children: [
                {
                  name: 'CatalogIndex',
                  path: '/',
                  component: () => import('pages/site/catalog/CatalogItemsPage.vue'),
                },
                {
                  name: 'CatalogCategory',
                  path: ':categoryId/',
                  component: () => import('pages/site/catalog/CatalogItemsPage.vue'),
                },
              ],
            },
          ],
        },
        {
          path: 'site/:siteId/dashboard',
          component: () => import('layouts/DashboardLayout.vue'),
          beforeEnter: [validateSiteId, requireAuth, requireOwner],
          meta: {
            showDrawer: true,
          },
          children: [
            {
              name: 'DashBoardIndex',
              path: '',
              component: () => import('pages/site/dashboard/Index.vue'),
            },
            {
              name: 'DashBoardItems',
              path: 'items',
              component: () => import('pages/site/dashboard/DashboardItemsPage.vue'),
            },
            {
              name: 'DashBoardItemEdit',
              path: 'items/edit/:itemId',
              component: () => import('pages/site/dashboard/EditItemPage.vue'),
              beforeEnter: [validateItemId],
            },
            {
              name: 'DashBoardItemCreate',
              path: 'items/new/',
              component: () => import('pages/site/dashboard/EditItemPage.vue'),
            },
            {
              name: 'DashBoardCategories',
              path: 'categories',
              component: () => import('pages/site/dashboard/DashboardCategoriesPage.vue'),
            },
            {
              name: 'DashBoardCategoryEdit',
              path: 'categories/edit/:categoryId',
              component: () => import('pages/site/dashboard/EditCategoryPage.vue'),
              beforeEnter: [validateCategoryId],
            },
            {
              name: 'DashBoardCategoryCreate',
              path: 'categories/new/',
              component: () => import('pages/site/dashboard/EditCategoryPage.vue'),
            },
            {
              name: 'DashBoardSettings',
              path: 'settings',
              component: () => import('pages/site/dashboard/Settings.vue'),
            },
          ],
        },
        {
          path: 'account',
          component: () => import('layouts/MainLayout.vue'),
          beforeEnter: [requireAuth],
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
          children: [
            {
              path: 'login',
              alias: '/login',
              name: 'login',
              component: () => import('pages/auth/Login.vue'),
            },
            {
              path: 'signup',
              name: 'signup',
              component: () => import('pages/auth/Signup.vue'),
            },

          ],
        },
      ],
    },

    {
      path: '/error401',
      name: 'Error401',
      component: () => import('pages/Error401.vue'),
    },

    // Always leave this as last one,
    // but you can also remove it
    {
      path: '/:catchAll(.*)*',
      name: 'Error404',
      component: () => import('pages/Error404.vue'),
    },
  ];
};

export default getRoutes;
