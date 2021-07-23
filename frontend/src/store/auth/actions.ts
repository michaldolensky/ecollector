import { ActionTree } from 'vuex';
import { AuthStateInteface } from 'src/store/auth/state';
import { api } from 'boot/axios';
import { LoginInterface } from 'src/types/auth.interface';
import { StateInterface } from '../index';

const actions: ActionTree<AuthStateInteface, StateInterface> = {

  async login({ commit }, loginObject:LoginInterface) {
    return api
      .post('/auth/login', {
        email: loginObject.email,
        password: loginObject.password,
      }).then(
        (user) => {
          commit('loginSuccess', user.data);
          return Promise.resolve(user.data);
        },
        (error) => {
          commit('loginFailure');
          return Promise.reject(error);
        },
      );
  },
  // logout() {
  //
  // },
  // register() {
  //
  // },

};

export default actions;
