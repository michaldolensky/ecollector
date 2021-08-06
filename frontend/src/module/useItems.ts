import { useMutation, useQuery } from '@vue/apollo-composable';
import {
  CREATE_ITEM, DELETE_ITEM, GET_ITEM, GET_ITEMS_QUERY, UPDATE_ITEM,
} from 'src/apollo/dashboard/itemQueries';
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

interface ItemData {
  items: Item[];
}
export interface ItemDataSingle {
  item: Item;
}
interface ItemsVars {
  siteId: number;
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

// interface updateItemVars {
//   id:number;
//   siteId: number;
//   name: string;
//   categoryId: number;
// }

export interface IGetItem{
  id:number
}

export function useItems() {
  const { currentSiteId } = useSites();

  const { result, loading, refetch } = useQuery<ItemData, ItemsVars>(GET_ITEMS_QUERY, {
    siteId: currentSiteId.value,
  });

  const getItem = (id:number) => useQuery<ItemDataSingle, IGetItem>(GET_ITEM, {
    id,
  });

  const { mutate: removeItemMutation } = useMutation(DELETE_ITEM);
  const { mutate: createItemMutation } = useMutation<{ createItem: Item } >(CREATE_ITEM);
  const { mutate: updateItemMutation } = useMutation<{ updateItem: Item } >(UPDATE_ITEM);

  const removeItem = (id:number) => {
    void removeItemMutation({ itemId: id, siteId: currentSiteId.value }).then(() => {
      void refetch();
    });
  };
  // eslint-disable-next-line max-len
  const createItem = (itemVars:ItemInput) => createItemMutation({ createItemInput: itemVars, siteId: currentSiteId.value });
  // eslint-disable-next-line max-len
  const updateItem = (itemVars:ItemInput) => updateItemMutation({ updateItemInput: itemVars, siteId: currentSiteId.value });

  return {
    getItem,
    result,
    loading,
    removeItem,
    updateItem,
    createItem,
  };
}
