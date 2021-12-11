import { Category } from 'src/composables/useCategories';
import { Item } from 'src/composables/useItems';
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      format: (val:string) => val,
      sortable: true,
    },
    {
      name: 'name',
      required: true,
      label: t('dashboard.items.table.column.label.name'),
      align: 'left',
      field: (item:Item) => item.name,
      format: (val:string) => `${val}`,
      sortable: true,
    },
    {
      name: 'Category',
      required: true,
      label: t('dashboard.items.table.column.label.category'),
      align: 'left',
      field: (item:Item) => item.category.name,
      format: (val:string) => `${val}`,
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore

      format: (val:string) => `${toRowDate(val)}`,
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      format: (val:string) => `${val}`,
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
      format: (val:string) => `${toRowDate(val)}`,
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

  return {
    ItemsTableColumns,
    CategoriesTableColumns,
  };
}
