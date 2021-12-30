import { RouteRecordRaw } from 'vue-router';

export const DashboardIndexRoutes:RouteRecordRaw[] = [
  {
    name: 'DashBoardIndex',
    path: '',
    component: () => import('src/modules/dashboard/index/pages/Index.vue'),
  },
];
//
// export default (router:Router) => {
//   router.addRoute([DashboardItemRoutes]);
// };
