import { Quasar } from 'quasar';

// eslint-disable-next-line max-len
export const toRowDate = (dateString:string) => new Intl.DateTimeFormat(Quasar.lang.getLocale()).format(new Date(dateString));
// eslint-disable-next-line max-len
export const getParsedInt = (siteIdParam: string|string[]):number => parseInt(<string>siteIdParam, 10);
