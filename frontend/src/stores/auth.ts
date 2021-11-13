import { AxiosError, AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { i18n } from 'boot/i18n';
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

interface APIErrorInterface {
  message: string
  status: number
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {
      role: '',
      email: '',
      sitesIds: [],
      sites: [],
      firstName: '',
      lastName: '',
    } as UserStateInterface,
    authState: false,
    authError: '',
  }),
  getters: {
    fullName: (state) => {
      if (state.authState) {
        return `${state.user.firstName} ${state.user.lastName}`;
      }
      return '';
    },
    isAdmin: (state) => state.user?.role === 'Admin',
    isLoggedIn: (state) => state.authState,
    userSites: (state):Site[] => state.user?.sites,
    getErrorMessage: (state) => {
      if (state.authError === 'USER_EXISTS') return i18n.global.t('forms.auth.errors.user_exists');
      if (state.authError === 'INVALID_CREDENTIALS') return i18n.global.t('forms.auth.errors.invalid_credentials');
      if (state.authError === 'PASSWORD_MISMATCH') return i18n.global.t('forms.auth.errors.password_mismatch');
      return 'Unknown Error';
    },
    hasError: (state) => state.authError !== '',
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
      this.authError = '';
      return api
        .post<LoginResponseData>('/auth/login', loginData)
        .then((res) => this.handleSuccess(res))
        .catch((error) => this.handleError(error));
    },
    signup(signupData: SignUpInterface) {
      this.authError = '';
      return api
        .post<LoginResponseData>('/auth/signup', signupData)
        .then((res) => this.handleSuccess(res))
        .catch((error) => this.handleError(error));
    },

    logout() {
      localStorage.setItem(localStorageTokenKey, '');
      this.$reset();
    },
    handleSuccess(response: AxiosResponse<LoginResponseData>) {
      this.authState = true;
      localStorage.setItem(localStorageTokenKey, response.data.accessToken);
      void this.me();
      void this.router.push({ name: 'profile' });
    },
    handleError(error: AxiosError<APIErrorInterface>) {
      const message = error?.response?.data.message;
      if (message !== null && message !== undefined) {
        this.authError = message;
      }
    },
  },
});
