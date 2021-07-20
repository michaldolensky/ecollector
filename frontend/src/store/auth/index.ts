import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { AuthStateInteface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const exampleModule: Module<AuthStateInteface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default exampleModule;
