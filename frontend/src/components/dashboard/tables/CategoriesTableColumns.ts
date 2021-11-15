import { i18n } from 'boot/i18n';
import { Category } from 'src/composables/useCategories';
import { toRowDate } from 'src/utils';

export const CategoriesTableColumns = [

  {
    name: 'name',
    required: true,
    label: i18n.global.t('dashboard.categories.table.column.label.name'),
    align: 'left',
    field: (item:Category) => item.name,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'Created',
    required: true,
    label: i18n.global.t('dashboard.categories.table.column.label.created'),
    align: 'left',
    field: (item:Category) => item.createdAt,
    format: (val:string) => `${toRowDate(val)}`,
    sortable: true,
  },
  {
    name: 'Updated',
    required: true,
    label: i18n.global.t('dashboard.categories.table.column.label.updated'),
    align: 'left',
    field: (item:Category) => item.updatedAt,
    format: (val:string) => `${toRowDate(val)}`,
    sortable: true,
  },
  {
    name: 'Action',
    label: i18n.global.t('dashboard.categories.table.column.label.action'),
    field: 'Action',
    sortable: false,
    align: 'center',
  },

];
