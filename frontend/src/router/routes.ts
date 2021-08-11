import { useSites } from 'src/module/useSites';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [

  {
    path: '',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', name: 'index', component: () => import('pages/MainPage.vue') },
      {
        path: '/site/:siteId/',
        component: () => import('layouts/SiteLayout.vue'),
        meta: {
          showDrawer: true,
        },
        children: [
          {
            path: 'catalogue/',
            component: () => import('layouts/CatalogueLayout.vue'),
            children: [
              {
                name: 'CatalogueIndex',
                path: '',
                component: () => import('pages/site/catalogue/Items.vue'),
              },
            ],
          },
        ],
      },
      {
        path: 'site/:siteId/dashboard',
        component: () => import('layouts/DashboardLayout.vue'),
        beforeEnter: (to, from, next) => {
          const { getSiteIdFromString } = useSites();
          const siteId = getSiteIdFromString(to.params.siteId as string);
          if (siteId > 0) {
            next();
          }
          next({ name: 'Error404' });
        },
        meta: {
          requireOwner: true,
          requireLogin: true,
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
          },
          {
            name: 'DashBoardItemCreate',
            path: 'items/new/',
            component: () => import('pages/site/dashboard/EditItemPage.vue'),
          },
          {
            name: 'DashBoardCategories',
            path: 'categories',
            component: () => import('pages/site/dashboard/Categories.vue'),
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
        meta: { requireOwner: true },
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

export default routes;
