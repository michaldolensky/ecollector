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

const validateItem: NavigationGuard = (to, from, next) => {
  const { itemId } = to.params;

  if (getParsedInt(itemId) > 0) {
    next();
  } else next({ name: 'Error404' });
};
const validateSiteId: NavigationGuard = (to, from, next) => {
  const siteId = getParsedInt(to.params.siteId);
  if (siteId > 0) {
    next();
  } else next({ name: 'Error404' });
};
const validateCategory: NavigationGuard = (to, from, next) => {
  const { categoryId } = to.params;

  if (getParsedInt(categoryId) > 0) {
    next();
  } else next({ name: 'Error404' });
};

const redirectToLogin = (to: RouteLocationNormalized) => ({
  name: 'login',
  query: { redirect: to.fullPath },
});

const getRoutes = (): RouteRecordRaw[] => {
  const requireAuth: NavigationGuard = (to, from, next) => {
    const authStore = useAuthStore();
    if (authStore.isLoggedIn) {
      next();
    } else next(redirectToLogin(to));
  };

  const checkAuth: NavigationGuard = async (to, from, next) => {
    const authStore = useAuthStore();
    await authStore.me();
    return next();
  };

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
  const requireOwner: NavigationGuard = (to, from, next) => {
    const authStore = useAuthStore();
    if (authStore.isOwner(to) || authStore.isAdmin) {
      next();
    } else {
      next(redirectToLogin(to));
    }
  };

  return [
    {
      name: 'Home',
      path: '/',
      component: () => import('layouts/MainLayout.vue'),
      beforeEnter: [checkAuth],
      children: [
        { path: '', name: 'CatalogIndex', component: () => import('pages/MainPage.vue') },
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
                siteId: parseInt(<string>route.params.siteId, 10),
              }),
              component: () => import('pages/site/catalog/CatalogItemsPage.vue'),
            },
            {
              name: 'CatalogCategory',
              path: 'cat/:categoryId',
              props: (route) => ({
                categoryId: parseInt(<string>route.params.categoryId, 10),
                siteId: parseInt(<string>route.params.siteId, 10),
              }),
              component: () => import('pages/site/catalog/CatalogItemsPage.vue'),
            },
            {
              name: 'CatalogItemDetail',
              path: 'item/:itemId/',
              props: (route) => ({
                itemId: parseInt(<string>route.params.itemId, 10),
              }),
              component: () => import('pages/site/catalog/CatalogItemDetail.vue'),
            },
          ],
        },
        {
          path: 'site/:siteId/dashboard/',
          redirect: { name: 'DashBoardIndex' },
          components: {
            default: RouterView,
            drawer: () => import('components/drawers/DashboardDrawer.vue'),
          },
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
              name: 'DashBoardItemsList',
              path: 'items',
              component: () => import('pages/site/dashboard/items/DashboardItemsListPage.vue'),
            },
            {
              name: 'DashBoardItemEdit',
              path: 'items/edit/:itemId',
              props: (route) => ({
                itemId: parseInt(<string>route.params.itemId, 10),
                inEditMode: true,
              }),
              component: () => import('pages/site/dashboard/items/EditItemPage.vue'),
              beforeEnter: [validateItem],
            },
            {
              name: 'DashBoardItemCreate',
              path: 'items/new',
              component: () => import('pages/site/dashboard/items/EditItemPage.vue'),
            },
            {
              name: 'DashBoardCategoriesList',
              path: 'categories',
              component: () => import('pages/site/dashboard/categories/DashboardCategoriesListPage.vue'),
            },
            {
              name: 'DashBoardCategoryEdit',
              path: 'categories/edit/:categoryId',
              props: (route) => ({
                categoryId: parseInt(<string>route.params.categoryId, 10),
                inEditMode: true,
                header: 'dashboard.headers.editCategory',
              }),
              component: () => import('pages/site/dashboard/categories/EditCategoryPage.vue'),
              beforeEnter: [validateCategory],
            },
            {
              name: 'DashBoardCategoryCreate',
              path: 'categories/new',
              props: true,
              component: () => import('pages/site/dashboard/categories/EditCategoryPage.vue'),
            },
            {
              name: 'DashBoardSettings',
              path: 'settings',
              props: (route) => ({
                siteId: parseInt(<string>route.params.siteId, 10),
              }),
              component: () => import('pages/site/dashboard/settings/SettingsPage.vue'),
            },
          ],
        },
        {
          path: 'account',
          component: RouterView,
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
