import {
  CreateItemInput, UpdateItemInput,
  useCreateItemMutation,
  useGetItemsQuery, useItemQuery,
  useRemoveItemMutation, useUpdateItemMutation,
} from 'src/apollo/composition-functions';
import { Image } from 'src/module/useImages';
import { useSites } from 'src/module/useSites';

export interface Item {
  id:number
  name:string
  updatedAt:Date
  createdAt:Date
  categoryId:number|null
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

export interface ItemInput extends Partial<Item>{
  id?: number
  name: string;
  categoryId: number|null;
  shortDesc:string
  longDesc:string
  internalNumber:string
  numberForExchange:number
  numberInCollection:number
}

export function useItems() {
  const { currentSiteId } = useSites();

  const { result, loading, refetch } = useGetItemsQuery({
    siteId: currentSiteId.value,
  });

  const getItem = (id:number) => useItemQuery({
    id,
  });
  const { mutate: removeItemMutation } = useRemoveItemMutation({ });
  const { mutate: createItemMutation } = useCreateItemMutation({});
  const { mutate: updateItemMutation } = useUpdateItemMutation({});

  const removeItem = (id:number) => {
    void removeItemMutation({
      deleteItemInput: {
        itemId: id,
      },
      siteId: currentSiteId.value,
    }).then(() => {
      void refetch();
    });
  };
  // eslint-disable-next-line max-len
  const createItem = (createItemInput:CreateItemInput) => createItemMutation({ createItemInput, siteId: currentSiteId.value });
  // eslint-disable-next-line max-len
  const updateItem = (updateItemInput:UpdateItemInput) => updateItemMutation({ updateItemInput, siteId: currentSiteId.value });

  return {
    getItem,
    result,
    loading,
    removeItem,
    updateItem,
    createItem,
  };
}
