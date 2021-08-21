import { AxiosError, AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { defineStore } from 'pinia';
import { Site } from 'src/module/useSites';
import { LoginInterface } from 'src/types/auth.interface';

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

export const useAuthStore = defineStore({
  id: 'authStore',
  state: () => ({
    user: {} as UserStateInterface,
    authState: true,
  }),
  getters: {
    fullName: (state) => {
      if (state.user && state) {
        return `${state.user.firstName} ${state.user.lastName}`;
      }
      return '';
    },
    isAdmin: (state) => state.user?.role === 'Admin',
  },
  actions: {
    me() {
      const token = localStorage.getItem(localStorageTokenKey) ?? '';

      return api
        .get('/auth/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then(
          (response: AxiosResponse<UserStateInterface>) => {
            this.user = response.data;
            this.authState = true;
            return response;
          },
          (error: AxiosError) => {
            this.$patch({
              user: {},
              authState: false,
            });
            return error;
          },
        );
    },
    login(loginObject: LoginInterface) {
      return api
        .post('/auth/login', {
          email: loginObject.email,
          password: loginObject.password,
        }).then(
          (response: AxiosResponse<LoginResponseData>) => {
            this.authState = true;
            localStorage.setItem(localStorageTokenKey, response.data.accessToken);
            void this.me();
          },
          () => {
            this.$patch({
              user: {},
              authState: false,
            });
          },
        );
    },
    signup(loginObject: LoginInterface) {
      return api
        .post('/auth/signup', {
          email: loginObject.email,
          password: loginObject.password,
        }).then(
          (response: AxiosResponse<LoginResponseData>) => {
            this.authState = true;
            localStorage.setItem(localStorageTokenKey, response.data.accessToken);
            void this.me();
          },
          () => {
            this.$patch({
              user: {},
              authState: false,
            });
          },
        );
    },
    logout() {
      localStorage.setItem(localStorageTokenKey, '');
      this.authState = false;
    },
  },
});
