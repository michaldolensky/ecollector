import { MutationTree } from 'vuex';
import { AuthStateInteface, UserStateInterface } from './state';

const mutation: MutationTree<AuthStateInteface> = {
  loginSuccess(state:AuthStateInteface, user) {
    state.loggedIn = true;
    state.user = user as UserStateInterface;
  },
  loginFailure(state) {
    state.loggedIn = false;
    state.user = null;
  },
};

export default mutation;
