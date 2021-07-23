// This is just an example,
// so you can safely delete all default props below

import { I18nInterface } from 'src/types/i18n.interface';

export default {
  auth: {
    login: {
      button: 'Login',
      email: 'Email',
      password: 'Password',
    },
    signup: {
      signup: 'Sign up',
      firstName: 'First Name',
      lastName: 'Last Name',
      button: 'Signup',
      email: 'Email',
      password: 'Password',
      verifyPassword: 'Verify password',
    },
  },
  form: {
    buttons: {
      reset: 'Reset',
      submit: 'Submit',
    },
  },
  dashboard: {
    navigation: {
      home: 'Home',
      items: 'Items',
      categories: 'Categories',
      settings: 'Settings',
    },
  },
} as I18nInterface;
