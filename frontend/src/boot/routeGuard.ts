import { boot } from 'quasar/wrappers';
import { StateInterface } from 'src/store';
import { Store } from 'vuex';

export default boot(({ router, store }) => {
  const typedStore = store as Store<StateInterface>;
  const { auth } = typedStore.state;

  router.beforeEach(async (to, from, next) => {
    await typedStore.dispatch('auth/me');

    if (to.matched.some((record) => record.meta.requireLogin)) {
      if (!auth.loggedIn) {
        next({
          path: '/auth/login',
          params: { nextUrl: to.fullPath },
        });
      }
      const isOwner = () => auth.user?.sitesIds.includes(parseInt(<string>to.params.siteId, 10));
      const isAdmin = () => auth.user?.role === 'Admin';

      if (to.matched.some((record) => record.meta.requireAdmin)) {
        if (isAdmin()) {
          next();
        } else {
          next({
            path: '/auth/login',
            params: { nextUrl: to.fullPath },
          });
        }
      }

      if (to.matched.some((record) => record.meta.requireOwner && !record.meta.requireAdmin)) {
        if (isOwner() || isAdmin()) {
          next();
        } else {
          next({
            path: '/auth/login',
            params: { nextUrl: to.fullPath },
          });
        }
      }
    }

    next();
  });
});
