import { Category } from 'src/module/useCategories';
import { toRowDate } from 'src/utils';

export const CategoriesTableColumns = [

  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (item:Category) => item.name,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'Created',
    required: true,
    label: 'Created',
    align: 'left',
    field: (item:Category) => item.createdAt,
    format: (val:string) => `${toRowDate(val)}`,
    sortable: true,
  },
  {
    name: 'Updated',
    required: true,
    label: 'Updated',
    align: 'left',
    field: (item:Category) => item.updatedAt,
    format: (val:string) => `${toRowDate(val)}`,
    sortable: true,
  },
  {
    name: 'Action', label: 'Actions', field: 'Action', sortable: false, align: 'center',
  },

];
