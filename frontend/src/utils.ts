import { Quasar } from "quasar";

export const toRowDate = (dateString: string) =>
  new Intl.DateTimeFormat(Quasar.lang.getLocale()).format(new Date(dateString));

export const getParsedInt = (paramId: string | string[]): number =>
  parseInt(<string>paramId, 10);

export const isParamPositiveInteger = (paramId: string | string[]): boolean => {
  const parsedInt = getParsedInt(paramId);
  return parsedInt > 0;
};
