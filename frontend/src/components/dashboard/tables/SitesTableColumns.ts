import { Site } from 'src/composables/useSites';
import { toRowDate } from 'src/utils';

export const SitesTableColumns = [

  {
    name: 'name',
    required: true,
    label: 'Name',
    align: 'left',
    field: (item:Site) => item.name,
    format: (val:string) => `${val}`,
    sortable: true,
  },
  {
    name: 'Created',
    required: true,
    label: 'Created',
    align: 'left',
    field: (item:Site) => item.createdAt,
    format: (val:string) => `${toRowDate(val)}`,
    sortable: true,
  },

  {
    name: 'Action', label: 'Actions', field: 'Action', sortable: false, align: 'center',
  },

];
