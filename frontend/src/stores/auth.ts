import { AxiosError, AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { i18n } from 'boot/i18n';
import { defineStore } from 'pinia';
import { Site } from 'src/composables/useSites';
import { LoginInterface, SignUpInterface } from 'src/types/auth.interface';
import { getParsedInt } from 'src/utils';
import { RouteLocationNormalized, RouteLocationNormalizedLoaded } from 'vue-router';

export const localStorageTokenKey = 'token';

interface UserStateInterface {
  id: number;
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

interface ChangePasswordInterface {
  oldPassword: string
  newPassword: string
  verifyPassword: string
}

export const useAuthStore = defineStore({
  id: 'auth',
  state: () => ({
    user: {
      id: 0,
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
    userSites: (state): Site[] => state.user?.sites,
    getErrorMessage: (state) => {
      if (state.authError === 'USER_EXISTS') return i18n.global.t('forms.auth.errors.user_exists');
      if (state.authError === 'INVALID_CREDENTIALS') return i18n.global.t('forms.auth.errors.invalid_credentials');
      if (state.authError === 'PASSWORD_MISMATCH') return i18n.global.t('forms.auth.errors.password_mismatch');
      if (state.authError === 'PASSWORD_CHANGE_MISMATCH') return i18n.global.t('forms.auth.errors.change_password_mismatch');
      if (state.authError === 'PASSWORD_CHANGE_SAME') return i18n.global.t('forms.auth.errors.change_password_same');
      if (state.authError === 'PASSWORD_CHANGE_CURRENT') return i18n.global.t('forms.auth.errors.change_current_invalid');
      return 'Unknown Error';
    },
    hasError: (state) => state.authError !== '',
  },
  actions: {
    isOwner(to: RouteLocationNormalized) {
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
        (error: AxiosError<APIErrorInterface>) => {
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
        .catch((error: AxiosError<APIErrorInterface>) => this.handleError(error));
    },
    signup(signupData: SignUpInterface) {
      this.authError = '';
      return api
        .post<LoginResponseData>('/auth/signup', signupData)
        .then((res) => this.handleSuccess(res))
        .catch((error: AxiosError<APIErrorInterface>) => this.handleError(error));
    },

    logout() {
      localStorage.setItem(localStorageTokenKey, '');
      this.$reset();
    },

    changePassword(changePasswordData: ChangePasswordInterface) {
      const token = localStorage.getItem(localStorageTokenKey) ?? '';

      return api
        .post('/auth/change-password', changePasswordData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res: AxiosResponse) => res)
        .catch((error: AxiosError<APIErrorInterface>) => this.handleError(error));
    },

    async handleSuccess(response: AxiosResponse<LoginResponseData>) {
      this.authState = true;
      localStorage.setItem(localStorageTokenKey, response.data.accessToken);
      await this.me();

      // eslint-disable-next-line max-len
      const redirect = (<RouteLocationNormalizedLoaded><unknown> this.router.currentRoute).query.redirect as string;

      if (redirect) {
        void this.router.push(redirect);
      } else {
        void this.router.push({ name: 'profile' });
      }
    },
    handleError(error: AxiosError<APIErrorInterface>) {
      const message = error?.response?.data.message;
      if (message !== null && message !== undefined) {
        this.authError = message;
      }
    },
  },
});
