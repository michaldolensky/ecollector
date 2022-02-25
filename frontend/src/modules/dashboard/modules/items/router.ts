import { getParsedInt } from "src/utils";
import { RouteRecordRaw } from "vue-router";

export const DashboardItemRoutes: RouteRecordRaw[] = [
  {
    name: "DashBoardItemsList",
    path: "items",
    component: () =>
      import(
        "src/modules/dashboard/modules/items/pages/DashboardItemsListPage.vue"
      ),
  },
  {
    name: "DashBoardItemEdit",
    path: "items/edit/:itemId",
    props: (route) => ({
      itemId: getParsedInt(route.params.itemId),
      inEditMode: true,
    }),
    component: () =>
      import("src/modules/dashboard/modules/items/pages/EditItemPage.vue"),
  },
  {
    name: "DashBoardItemCreate",
    path: "items/new",
    component: () =>
      import("src/modules/dashboard/modules/items/pages/EditItemPage.vue"),
  },
];
