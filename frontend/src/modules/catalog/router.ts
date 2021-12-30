import { getParsedInt } from 'src/utils';
import { RouteRecordRaw, RouterView } from 'vue-router';

export const CatalogModuleRoutes:RouteRecordRaw = {
  name: 'catalog',
  path: 'site/:siteId/catalog',
  components: {
    default: RouterView,
    drawer: () => import('src/modules/catalog/components/CatalogDrawer.vue'),
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
      component: () => import('src/modules/catalog/pages/CatalogItemsPage.vue'),
    },
    {
      name: 'CatalogCategory',
      path: 'cat/:categoryId',
      props: (route) => ({
        categoryId: getParsedInt(route.params.categoryId),
        siteId: getParsedInt(route.params.siteId),
      }),
      component: () => import('src/modules/catalog/pages/CatalogItemsPage.vue'),
    },
    {
      name: 'CatalogItemDetail',
      path: 'item/:itemId/',
      props: (route) => ({
        itemId: getParsedInt(route.params.itemId),
      }),
      component: () => import('src/modules/catalog/pages/CatalogItemDetail.vue'),
    },
  ],
};
