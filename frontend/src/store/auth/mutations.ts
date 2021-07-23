import { MutationTree } from 'vuex';
import { AuthStateInterface, UserStateInterface } from './state';

const mutation: MutationTree<AuthStateInterface> = {
  loginSuccess(state:AuthStateInterface, user) {
    state.loggedIn = true;
    state.user = user as UserStateInterface;
  },
  loginFailure(state) {
    state.loggedIn = false;
    state.user = null;
  },
};

export default mutation;
