import { DashboardCategoriesRoutes } from 'src/modules/dashboard/modules/categories/router';
import { DashboardIndexRoutes } from 'src/modules/dashboard/modules/index/router';
import { DashboardItemRoutes } from 'src/modules/dashboard/modules/items/router';
import { DashboardParameterRoutes } from 'src/modules/dashboard/modules/parameters/router';
import { DashboardSettingsRoutes } from 'src/modules/dashboard/modules/settings/router';
import { redirectToLogin } from 'src/router/routes';
import { useAuthStore } from 'src/stores/auth';
import {
  NavigationGuard, RouteRecordRaw, RouterView,
} from 'vue-router';

const requireOwner: NavigationGuard = (to, from, next) => {
  const authStore = useAuthStore();
  if (authStore.isOwner(to) || authStore.isAdmin) {
    next();
  } else {
    next(redirectToLogin(to));
  }
};

export const DashboardModuleRoutes:RouteRecordRaw = {
  path: 'site/:siteId/dashboard/',
  redirect: { name: 'DashBoardIndex' },
  components: {
    default: RouterView,
    drawer: () => import('src/modules/dashboard/components/DashboardDrawer.vue'),
  },
  beforeEnter: [requireOwner],
  meta: {
    showDrawer: true,
    requireAuth: true,
  },
  children: [
    ...DashboardIndexRoutes,
    ...DashboardItemRoutes,
    ...DashboardCategoriesRoutes,
    ...DashboardParameterRoutes,
    ...DashboardSettingsRoutes,
  ],
};
