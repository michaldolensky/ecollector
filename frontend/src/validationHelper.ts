import { useI18n } from 'vue-i18n';

const { t } = useI18n();

export const validationHelper = {

  required: (val:string) => !!val || t('forms.validation.required'),

};
