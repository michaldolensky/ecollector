import { i18n } from 'boot/i18n';
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

const redirectToLogin = (to: RouteLocationNormalized) => ({
  name: 'login',
  query: { redirect: to.fullPath },
});

const getRoutes = (): RouteRecordRaw[] => {
  const { t } = i18n.global;

  const requireAuth: NavigationGuard = (to, from, next) => {
    const authStore = useAuthStore();
    if (authStore.isLoggedIn) {
      next();
    } else next(redirectToLogin(to));
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
        {
          path: 'site/:siteId/dashboard/',
          redirect: { name: 'DashBoardIndex' },
          components: {
            default: RouterView,
            drawer: () => import('components/drawers/DashboardDrawer.vue'),
          },
          beforeEnter: [requireAuth, requireOwner],
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
                itemId: getParsedInt(route.params.itemId),
                inEditMode: true,
              }),
              component: () => import('pages/site/dashboard/items/EditItemPage.vue'),
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
                categoryId: getParsedInt(route.params.categoryId),
                inEditMode: true,
                header: 'dashboard.headers.editCategory',
              }),
              component: () => import('pages/site/dashboard/categories/EditCategoryPage.vue'),
            },
            {
              name: 'DashBoardCategoryCreate',
              path: 'categories/new',
              props: true,
              component: () => import('pages/site/dashboard/categories/EditCategoryPage.vue'),
            },
            {
              name: 'DashBoardParameterList',
              path: 'parameters',
              component: () => import('pages/site/dashboard/parameters/DashboardParametersListPage.vue'),
            },
            {
              name: 'DashBoardParameterEdit',
              path: 'parameters/edit/:paramId',
              props: (route) => ({
                paramId: getParsedInt(route.params.paramId),
                inEditMode: true,
                headerTitle: t('dashboard.headers.editParameter'),
              }),
              component: () => import('pages/site/dashboard/parameters/EditParameterPage.vue'),
            },
            {
              name: 'DashBoardParameterCreate',
              path: 'parameters/new',
              props: () => ({
                headerTitle: t('dashboard.headers.createParameter'),
              }),
              component: () => import('pages/site/dashboard/parameters/EditParameterPage.vue'),
            },
            {
              name: 'DashBoardSettings',
              path: 'settings',
              props: (route) => ({
                siteId: getParsedInt(route.params.siteId),
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
