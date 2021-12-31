import { i18n } from 'boot/i18n';

export const validationHelper = {
  required: (val:string) => !!val || i18n.global.t('forms.validation.required'),
  minLength: (minLength:number) => (val:string) => val.length >= minLength || i18n.global.t('forms.validation.minLength', [minLength]),
  passportMismatch: (password:string) => (compPassword:string) => password === compPassword || i18n.global.t('forms.auth.errors.password_mismatch'),
};
