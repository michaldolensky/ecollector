import { AxiosError } from 'axios';
import { api } from 'boot/axios';
import { defineStore } from 'pinia';
import { Site } from 'src/composables/useSites';
import { LoginInterface, SignUpInterface } from 'src/types/auth.interface';
import { getParsedInt } from 'src/utils';
import { RouteLocationNormalized } from 'vue-router';

export const localStorageTokenKey = 'token';

interface UserStateInterface {
  role: string
  email: string
  sitesIds: number[]
  sites: Site[]
  firstName: string
  lastName: string
}

interface LoginResponseData {
  accessToken: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {} as UserStateInterface,
    authState: false,
  }),
  getters: {
    fullName: (state) => {
      if (state.user && state) {
        return `${state.user.firstName} ${state.user.lastName}`;
      }
      return '';
    },
    isAdmin: (state) => state.user?.role === 'Admin',
    isLoggedIn: (state) => state.authState,
    sites: (state) => state.user?.sites as Site[],
  },
  actions: {
    isOwner(to:RouteLocationNormalized) {
      return this.user?.sitesIds.includes(getParsedInt(to.params.siteId));
    },

    me() {
      const token = localStorage.getItem(localStorageTokenKey) ?? '';
      if (token.length === 0) return Promise.resolve();

      return api
        .get<UserStateInterface>('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(
          (response) => {
            this.user = response.data;
            this.authState = true;
            return response;
          },
          (error: AxiosError) => {
            this.$reset();
            localStorage.setItem(localStorageTokenKey, '');
            return error;
          },
        );
    },
    login(loginData: LoginInterface) {
      return api
        .post<LoginResponseData>('/auth/login', loginData).then(
          (response) => {
            this.authState = true;
            localStorage.setItem(localStorageTokenKey, response.data.accessToken);
            void this.me();
          },
          () => {
            this.$reset();
          },
        );
    },
    signup(signupData: SignUpInterface) {
      return api
        .post<LoginResponseData>('/auth/signup', signupData).then(
          (response) => {
            this.authState = true;
            localStorage.setItem(localStorageTokenKey, response.data.accessToken);
            void this.me();
          },
          () => {
            this.$reset();
          },
        );
    },
    logout() {
      localStorage.setItem(localStorageTokenKey, '');
      this.$reset();
    },
  },
});
