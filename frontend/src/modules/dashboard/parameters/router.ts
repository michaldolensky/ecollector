import { i18n } from 'boot/i18n';
import { getParsedInt } from 'src/utils';
import { RouteRecordRaw } from 'vue-router';

const { t } = i18n.global;

export const DashboardParameterRoutes:RouteRecordRaw[] = [
  {
    name: 'DashBoardParameterList',
    path: 'parameters',
    component: () => import('src/modules/dashboard/parameters/pages/DashboardParametersListPage.vue'),
  },
  {
    name: 'DashBoardParameterEdit',
    path: 'parameters/edit/:paramId',
    props: (route) => ({
      paramId: getParsedInt(route.params.paramId),
      inEditMode: true,
      headerTitle: t('dashboard.headers.editParameter'),
    }),
    component: () => import('src/modules/dashboard/parameters/pages/EditParameterPage.vue'),
  },
  {
    name: 'DashBoardParameterCreate',
    path: 'parameters/new',
    props: () => ({
      headerTitle: t('dashboard.headers.createParameter'),
    }),
    component: () => import('src/modules/dashboard/parameters/pages/EditParameterPage.vue'),
  },
];
//
// export default (router:Router) => {
//   router.addRoute([DashboardItemRoutes]);
// };
