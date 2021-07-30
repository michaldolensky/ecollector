import { ActionTree } from 'vuex';
import { AuthStateInterface } from 'src/store/auth/state';
import { api } from 'boot/axios';
import { LoginInterface } from 'src/types/auth.interface';
import { StateInterface } from '../index';

const actions: ActionTree<AuthStateInterface, StateInterface> = {

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
  async me({ commit }) {
    return api
      .get('/auth/me').then(
        (user) => {
          commit('loginSuccess', user.data);
          return Promise.resolve(user.data);
        },
        () => {
          commit('loginFailure');
        },
      );
  },
  async logout({ commit }) {
    return api
      .post('/auth/logout').then(
        () => {
          commit('loginFailure');
          return Promise.resolve();
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
