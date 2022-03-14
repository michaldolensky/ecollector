import { route } from "quasar/wrappers";
import { useAuthStore } from "src/stores/auth";
import { isParamPositiveInteger } from "src/utils";
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from "vue-router";
import getRoutes, { redirectToLogin } from "./routes";

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes: getRoutes(),

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to, from, next) => {
    const authStore = useAuthStore();
    await authStore.me();

    const { siteId, itemId, categoryId } = to.params;

    if (Object.keys(to.params).length !== 0) {
      let error = false;
      if (siteId && !isParamPositiveInteger(siteId)) error = true;
      if (itemId && !isParamPositiveInteger(itemId)) error = true;
      if (categoryId && !isParamPositiveInteger(categoryId)) error = true;
      if (error) next({ name: "Error404" });
    }

    if (to.meta.requiresAuth && !authStore.isLoggedIn)
      next(redirectToLogin(to));

    next();
  });

  return Router;
});
