import { RouteRecordRaw } from "vue-router";

export const DashboardIndexRoutes: RouteRecordRaw[] = [
  {
    name: "DashBoardIndex",
    path: "",
    component: () =>
      import("src/modules/dashboard/modules/index/pages/Index.vue"),
  },
];
