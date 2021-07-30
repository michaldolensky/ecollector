import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { AuthStateInterface } from './state';

const getters: GetterTree<AuthStateInterface, StateInterface> = {
  isLoggedIn(state:AuthStateInterface) {
    return state.loggedIn;
  },
  isAdmin(state:AuthStateInterface) {
    return state.user?.role === 'Admin';
  },
};

export default getters;
