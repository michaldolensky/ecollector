import { useAuthStore } from 'src/stores/auth';
import { NavigationGuard, RouteRecordRaw } from 'vue-router';

const redirectWhenLoggedIn: NavigationGuard = (to, from, next) => {
  const authStore = useAuthStore();
  if (authStore.isLoggedIn) {
    next({
      name: 'profile',
    });
  } else next();
};

export const AuthModuleRoutes:RouteRecordRaw = {
  path: 'auth',
  component: () => import('layouts/MainLayout.vue'),
  beforeEnter: [redirectWhenLoggedIn],
  children: [
    {
      path: 'login',
      alias: '/login',
      name: 'login',
      component: () => import('src/modules/auth/pages/AuthLoginPage.vue'),
    },
    {
      path: 'signup',
      name: 'signup',
      component: () => import('src/modules/auth/pages/AuthSignupPage.vue'),
    },

  ],
};
