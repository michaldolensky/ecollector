import { RouteRecordRaw } from 'vue-router';

export const IndexModuleRoutes: RouteRecordRaw = {
  path: '',
  name: 'MainPage',
  component: () => import('src/modules/index/pages/MainPage.vue'),
};
