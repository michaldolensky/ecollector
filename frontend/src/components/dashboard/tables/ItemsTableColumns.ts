import { ItemInterface } from 'src/types/item.interface';

export const ItemsTableColumns = [

  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (item:ItemInterface) => item.name,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'Category',
    required: true,
    label: 'Category',
    align: 'left',
    field: (item:ItemInterface) => item.category.name,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'Created',
    required: true,
    label: 'Created',
    align: 'left',
    field: (item:ItemInterface) => item.createdAt,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'Updated',
    required: true,
    label: 'Updated',
    align: 'left',
    field: (item:ItemInterface) => item.updatedAt,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'Action', label: 'Actions', field: 'Action', sortable: false, align: 'center',
  },

];
