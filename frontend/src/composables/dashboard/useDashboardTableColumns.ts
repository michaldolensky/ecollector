import { Category, Item, Parameter } from 'src/types/graphql';
import { toRowDate } from 'src/utils';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

export function useDashboardTableColumns() {
  const { t } = useI18n();

  const ItemsTableColumns = computed(() => [
    {
      name: 'image',
      required: true,
      label: t('dashboard.items.table.column.label.image'),
      align: 'left',
      field: (item:Item) => item.images,
      sortable: true,
    },
    {
      name: 'name',
      required: true,
      label: t('dashboard.items.table.column.label.name'),
      align: 'left',
      field: (item:Item) => item.name,
      sortable: true,
    },
    {
      name: 'Category',
      required: true,
      label: t('dashboard.items.table.column.label.category'),
      align: 'left',
      field: (item:Item) => item.category.name,
      sortable: true,
    },
    {
      name: 'availableForExchange',
      required: true,
      label: t('dashboard.items.table.column.label.available_for_exchange'),
      align: 'left',
      field: (item:Item) => item.numberForExchange,
      format: (val:string) => `${val}`,
      sortable: true,
    },
    {
      name: 'count',
      required: true,
      label: t('dashboard.items.table.column.label.count'),
      align: 'left',
      field: (item:Item) => item.numberInCollection,
      format: (val:string) => `${val}`,
      sortable: true,
    },
    {
      name: 'created',
      required: true,
      label: t('dashboard.items.table.column.label.created'),
      align: 'left',
      field: (item:Item) => item.createdAt,
      format: (row:string):string => `${toRowDate(row)}`,
      sortable: true,
    },
    {
      name: 'action',
      label: t('dashboard.items.table.column.label.action'),
      field: 'Action',
      sortable: false,
      align: 'center',
    },

  ]);

  const CategoriesTableColumns = computed(() => [
    {
      name: 'name',
      required: true,
      label: t('dashboard.categories.table.column.label.name'),
      align: 'left',
      field: (item:Category) => item.name,
      format: (val:string):string => `${val}`,
      sortable: true,
    },
    {
      name: 'Created',
      required: true,
      label: t('dashboard.categories.table.column.label.created'),
      align: 'left',
      field: (item:Category) => item.createdAt,
      format: (val:string) => `${toRowDate(val)}`,
      sortable: true,
    },
    {
      name: 'Updated',
      required: true,
      label: t('dashboard.categories.table.column.label.updated'),
      align: 'left',
      field: (item:Category) => item.updatedAt,
      format: (row:string):string => `${toRowDate(row)}`,
      sortable: true,
    },
    {
      name: 'Action',
      label: t('dashboard.categories.table.column.label.action'),
      field: 'Action',
      sortable: false,
      align: 'center',
    },

  ]);
  const ParametersTableColumns = computed(() => [
    {
      name: 'name',
      required: true,
      label: t('dashboard.parameters.table.column.label.name'),
      align: 'left',
      field: (row:Category) => row.name,
      sortable: true,
    },
    {
      name: 'type',
      required: true,
      label: t('dashboard.parameters.table.column.label.type'),
      align: 'left',
      field: (parameter:Parameter) => parameter.type,
      sortable: true,
    },

    {
      name: 'Action',
      label: t('dashboard.parameters.table.column.label.action'),
      field: 'Action',
      sortable: false,
      align: 'center',
    },

  ]);

  return {
    ItemsTableColumns,
    CategoriesTableColumns,
    ParametersTableColumns,
  };
}
