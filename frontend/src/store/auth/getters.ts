import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { AuthStateInterface } from './state';

const getters: GetterTree<AuthStateInterface, StateInterface> = {
  isLoggedIn(state:AuthStateInterface) {
    return state.loggedIn;
  },
  getFullName(state: AuthStateInterface) {
    let fullName = '';
    if (state.user) fullName = `${state.user.firstName} ${state.user.lastName}`;
    return fullName;
  },

};

export default getters;
