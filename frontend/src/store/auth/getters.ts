import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { AuthStateInteface } from './state';

const getters: GetterTree<AuthStateInteface, StateInterface> = {
  someGetter(/* context */) {
    // your code
  },
};

export default getters;
