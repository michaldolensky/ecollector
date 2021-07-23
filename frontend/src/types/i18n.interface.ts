export interface I18nInterface{
  auth: {
    login: {
      button: string,
      email: string
      password: string,
    },

    signup: {
      signup: string,
      firstName: string,
      lastName: string,
      button: string,
      email: string,
      password: string,
      verifyPassword: string,
    },
  },
  form: {
    buttons: {
      reset: string,
      submit: string,
    },
  },
  dashboard: {
    navigation: {
      home: string,
      items: string,
      categories: string
      settings: string
    }
  }
}
