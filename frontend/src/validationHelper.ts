import { i18n } from 'boot/i18n';

export const validationHelper = {

  required: (val:string) => !!val || i18n.global.t('forms.validation.required'),

};
