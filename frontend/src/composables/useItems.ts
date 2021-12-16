import {
  CreateItemInput,
  UpdateItemInput,
  useCreateItemMutation,
  useItemQuery,
  useUpdateItemMutation,
} from 'src/apollo/composition-functions';
import { Image } from 'src/composables/useImages';
import { useSites } from 'src/composables/useSites';

export interface Item {
  id:number
  name:string
  updatedAt:Date
  createdAt:Date
  categoryId:number | null
  shortDesc:string
  longDesc:string
  internalNumber:string
  numberForExchange:number
  numberInCollection:number
  category:{
    id:number
    name:string
  }
  images:Image[]
}

export function useItems() {
  const { currentSiteId } = useSites();

  const getItem = (id:number) => useItemQuery({
    id,
  });
  const { mutate: createItemMutation } = useCreateItemMutation({});
  const { mutate: updateItemMutation } = useUpdateItemMutation({});

  // eslint-disable-next-line max-len
  const createItem = (createItemInput:CreateItemInput) => createItemMutation({ createItemInput, siteId: currentSiteId.value });
  // eslint-disable-next-line max-len
  const updateItem = (updateItemInput:UpdateItemInput) => updateItemMutation({ updateItemInput, siteId: currentSiteId.value });

  return {
    getItem,
    updateItem,
    createItem,
  };
}
