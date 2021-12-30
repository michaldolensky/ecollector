import { getParsedInt } from 'src/utils';
import { RouteRecordRaw } from 'vue-router';

export const DashboardSettingsRoutes:RouteRecordRaw[] = [
  {
    name: 'DashBoardSettings',
    path: 'settings',
    props: (route) => ({
      siteId: getParsedInt(route.params.siteId),
    }),
    component: () => import('src/modules/dashboard/settings/pages/SettingsPage.vue'),
  },
];
//
// export default (router:Router) => {
//   router.addRoute([DashboardItemRoutes]);
// };
