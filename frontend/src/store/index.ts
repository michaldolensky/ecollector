import { store } from 'quasar/wrappers';
import { InjectionKey } from 'vue';
import {
  createStore, Store, Store as VuexStore, useStore as vuexUseStore,
} from 'vuex';

import { AuthStateInterface } from 'src/store/auth/state';
import auth from './auth';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface StateInterface {
  auth: AuthStateInterface
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  // eslint-disable-next-line no-unused-vars
  interface ComponentCustomProperties {
    $store: VuexStore<StateInterface>
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<StateInterface>> = Symbol('vuex-key');

export default store((/* { ssrContext } */) => createStore<StateInterface>({
  modules: {
    auth,
  },

  // enable strict mode (adds overhead!)
  // for dev mode and --debug builds only
  strict: !!process.env.DEBUGGING,
}));

export function useStore(): Store<StateInterface> {
  return vuexUseStore(storeKey);
}
