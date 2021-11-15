import { i18n } from 'boot/i18n';
import { Site } from 'src/composables/useSites';
import { toRowDate } from 'src/utils';

export const SitesTableColumns = [

  {
    name: 'name',
    required: true,
    label: i18n.global.t('account.sites.table.column.label.name'),
    align: 'left',
    field: (item:Site) => item.name,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'Created',
    required: true,
    label: i18n.global.t('account.sites.table.column.label.created'),
    align: 'left',
    field: (item:Site) => item.createdAt,
    format: (val:string) => `${toRowDate(val)}`,
    sortable: true,
  },

  {
    name: 'Action',
    label: i18n.global.t('account.sites.table.column.label.action'),
    field: 'Action',
    sortable: false,
    align: 'center',
  },

];
