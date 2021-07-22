import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') },
    ],
  },
  {
    path: '/site',
    component: () => import('layouts/SiteLayout.vue'),
    children: [{ path: '', component: () => import('pages/Index.vue') },
    ],
  },
  {
    path: '/auth/',
    component: () => import('layouts/MainLayout.vue'),
    redirect: '/auth/login',
    children: [
      { path: '/auth/login', component: () => import('pages/auth/Login.vue') },
      { path: '/auth/signup', component: () => import('pages/auth/Signup.vue') },
    ],
  },
  {
    path: '/stage',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/StagePage.vue') },
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
