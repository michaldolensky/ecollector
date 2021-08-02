import { useI18n } from 'boot/i18n';

const { t } = useI18n();

export const validationHelper = {

  required: (val:string) => !!val || t('validation.required'),

};
