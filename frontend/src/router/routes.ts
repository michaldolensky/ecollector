import { getParsedInt } from 'src/utils';
import { useAuthStore } from 'src/stores/auth';
import {
  RouterView, NavigationGuard, RouteRecordRaw, RouteLocationNormalized,
} from 'vue-router';

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
    if (authStore.isLoggedIn) {
      next();
    } else next(redirectToLogin(to, from));
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
          path: 'site/:siteId',
          component: RouterView,
          children: [
            {
              path: '',
              component: () => import('layouts/SiteLayout.vue'),
              redirect: { name: 'CatalogIndex' },
              meta: {
                showDrawer: true,
              },
              children: [
                {
                  name: 'catalog',
                  path: 'catalog',
                  component: () => import('layouts/CatalogLayout.vue'),
                  children: [
                    {
                      name: 'CatalogIndex',
                      path: '',
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
              path: 'dashboard',
              component: () => import('pages/site/dashboard/DashboardPage.vue'),
              beforeEnter: [validateSiteId, requireAuth, requireOwner],
              meta: {
                showDrawer: true,
              },
              children: [
                {
                  name: 'DashBoardIndex',
                  path: '',
                  component: () => import('pages/site/dashboard/home/Index.vue'),
                },
                {
                  path: 'items',
                  component: RouterView,
                  children: [
                    {
                      name: 'DashBoardItems',
                      path: '',
                      component: () => import('pages/site/dashboard/items/DashboardItemsPage.vue'),
                    },
                    {
                      name: 'DashBoardItemEdit',
                      path: 'edit/:itemId',
                      component: () => import('pages/site/dashboard/items/EditItemPage.vue'),
                      beforeEnter: [validateItemId],
                    },
                    {
                      name: 'DashBoardItemCreate',
                      path: 'new',
                      component: () => import('pages/site/dashboard/items/EditItemPage.vue'),
                    },
                  ],
                },
                {
                  path: 'categories',
                  component: RouterView,
                  children: [
                    {
                      name: 'DashBoardCategories',
                      path: '',
                      component: () => import('pages/site/dashboard/categories/DashboardCategoriesPage.vue'),
                    },
                    {
                      name: 'DashBoardCategoryEdit',
                      path: 'edit/:categoryId',
                      component: () => import('pages/site/dashboard/categories/EditCategoryPage.vue'),
                      beforeEnter: [validateCategoryId],
                    },
                    {
                      name: 'DashBoardCategoryCreate',
                      path: 'new',
                      component: () => import('pages/site/dashboard/categories/EditCategoryPage.vue'),
                    },
                  ],
                },
                {
                  name: 'DashBoardSettings',
                  path: 'settings',
                  component: () => import('pages/site/dashboard/settings/Settings.vue'),
                },
              ],
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
