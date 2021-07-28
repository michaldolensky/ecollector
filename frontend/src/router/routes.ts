import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') },
    ],
  },
  {
    path: '/site/:siteId/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      { name: 'DashBoardIndex', path: '', component: () => import('pages/site/dashboard/Index.vue') },
      { name: 'DashBoardItems', path: 'items', component: () => import('pages/site/dashboard/Items.vue') },
      { name: 'DashBoardItemEdit', path: 'items/edit/:itemId', component: () => import('pages/site/dashboard/EditItemPage.vue') },
      { name: 'DashBoardCategories', path: 'categories', component: () => import('pages/site/dashboard/Categories.vue') },
      { name: 'DashBoardSettings', path: 'settings', component: () => import('pages/site/dashboard/Settings.vue') },
    ],
  },
  {
    path: '/site',
    component: () => import('layouts/SiteLayout.vue'),
    children: [{ path: '', component: () => import('pages/ItemsPage.vue') },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/MainLayout.vue'),
    redirect: 'login',
    children: [
      {
        path: 'login',
        alias: '/login',
        component: () => import('pages/auth/Login.vue'),
      },
      { path: 'signup', component: () => import('pages/auth/Signup.vue') },
    ],
  },
  {
    path: '/profile',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Profile.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue'),
  },
];

export default routes;
