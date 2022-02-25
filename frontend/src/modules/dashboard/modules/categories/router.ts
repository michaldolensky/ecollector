import { getParsedInt } from "src/utils";
import { RouteRecordRaw } from "vue-router";

export const DashboardCategoriesRoutes: RouteRecordRaw[] = [
  {
    name: "DashBoardCategoriesList",
    path: "categories",
    component: () =>
      import(
        "src/modules/dashboard/modules/categories/pages/DashboardCategoriesListPage.vue"
      ),
  },
  {
    name: "DashBoardCategoryEdit",
    path: "categories/edit/:categoryId",
    props: (route) => ({
      categoryId: getParsedInt(route.params.categoryId),
      inEditMode: true,
      header: "dashboard.headers.editCategory",
    }),
    component: () =>
      import(
        "src/modules/dashboard/modules/categories/pages/EditCategoryPage.vue"
      ),
  },
  {
    name: "DashBoardCategoryCreate",
    path: "categories/new",
    props: true,
    component: () =>
      import(
        "src/modules/dashboard/modules/categories/pages/EditCategoryPage.vue"
      ),
  },
];
