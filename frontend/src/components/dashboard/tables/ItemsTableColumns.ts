import { Item } from 'src/module/useItems';
import { toRowDate } from 'src/utils';

export const ItemsTableColumns = [
  {
    name: 'image',
    required: true,
    label: 'Name',
    align: 'left',
    field: (item:Item) => item.images,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (item:Item) => item.name,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'Category',
    required: true,
    label: 'Category',
    align: 'left',
    field: (item:Item) => item.category.name,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'Available for exchange',
    required: true,
    label: 'Available for exchange',
    align: 'left',
    field: (item:Item) => item.numberForExchange,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'Count',
    required: true,
    label: 'Count',
    align: 'left',
    field: (item:Item) => item.numberInCollection,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'Created',
    required: true,
    label: 'Created',
    align: 'left',
    field: (item:Item) => item.createdAt,
    format: (val:string) => `${toRowDate(val)}`,
    sortable: true,
  },
  {
    name: 'Action', label: 'Actions', field: 'Action', sortable: false, align: 'center',
  },

];
