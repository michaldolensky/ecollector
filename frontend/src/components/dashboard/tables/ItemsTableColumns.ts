import { i18n } from 'boot/i18n';
import { Item } from 'src/composables/useItems';
import { toRowDate } from 'src/utils';

export const ItemsTableColumns = [
  {
    name: 'image',
    required: true,
    label: i18n.global.t('dashboard.items.table.column.label.image'),
    align: 'left',
    field: (item:Item) => item.images,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: i18n.global.t('dashboard.items.table.column.label.name'),
    align: 'left',
    field: (item:Item) => item.name,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'Category',
    required: true,
    label: i18n.global.t('dashboard.items.table.column.label.category'),
    align: 'left',
    field: (item:Item) => item.category.name,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'availableForExchange',
    required: true,
    label: i18n.global.t('dashboard.items.table.column.label.availeble_for_exchange'),
    align: 'left',
    field: (item:Item) => item.numberForExchange,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'count',
    required: true,
    label: i18n.global.t('dashboard.items.table.column.label.count'),
    align: 'left',
    field: (item:Item) => item.numberInCollection,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'created',
    required: true,
    label: i18n.global.t('dashboard.items.table.column.label.created'),
    align: 'left',
    field: (item:Item) => item.createdAt,
    format: (val:string) => `${toRowDate(val)}`,
    sortable: true,
  },
  {
    name: 'action',
    label: i18n.global.t('dashboard.items.table.column.label.action'),
    field: 'Action',
    sortable: false,
    align: 'center',
  },

];
