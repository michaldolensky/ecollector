import { AxiosError, AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { Site } from 'src/module/useSites';
import { LoginInterface } from 'src/types/auth.interface';
import {
  computed, ComputedRef, reactive, readonly, watch,
} from 'vue';

export const localStorageTokenKey = 'token';

interface LoginReturn {
  accessToken: string
}

interface UserStateInterface {
  role: string
  email: string
  sitesIds: number[]
  sites: Site[]
  firstName: string
  lastName: string
}

interface stateIterface {
  fullname: ComputedRef<string>
  isLoggedIn: ComputedRef<boolean>
  user: Record<string, never> | UserStateInterface
  authState: boolean
}

const state = reactive<Partial<stateIterface>>({
  user: {},
  authState: false,
});

const useAuth = () => {
  const me = () => {
    const token = localStorage.getItem(localStorageTokenKey) ?? '';

    return api
      .get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(
        (response: AxiosResponse<UserStateInterface>) => {
          state.user = response.data;
          state.authState = true;
          return response;
        },
        (error: AxiosError) => {
          state.user = {};
          state.authState = false;
          return error;
        },
      );
  };
  watch(
    () => state.user,
    (value) => {
      console.log(value);
    },
  );

  const login = (loginObject: LoginInterface) => api
    .post('/auth/login', {
      email: loginObject.email,
      password: loginObject.password,
    }).then(
      (response: AxiosResponse<LoginReturn>) => {
        state.authState = true;
        localStorage.setItem(localStorageTokenKey, response.data.accessToken);
        void me();
      },
      () => {
        state.user = {};
        state.authState = false;
      },
    );
  const signup = (loginObject: LoginInterface) => api
    .post('/auth/signup', {
      email: loginObject.email,
      password: loginObject.password,
    }).then(
      (response: AxiosResponse<LoginReturn>) => {
        state.authState = true;
        localStorage.setItem(localStorageTokenKey, response.data.accessToken);
        void me();
      },
      () => {
        state.user = {};
        state.authState = false;
      },
    );

  const logout = () => {
    localStorage.setItem(localStorageTokenKey, '');
    state.authState = false;
  };

  return {
    state: readonly(state),
    fullName: computed(() => {
      if (state.user && state) {
        return `${state.user.firstName} ${state.user.lastName}`;
      }
      return '';
    }),
    isLoggedIn: state.authState,
    me,
    login,
    logout,
    signup,
  };
};

export default useAuth;
