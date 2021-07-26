import { GET_ITEMS_QUERY } from 'src/apollo/dashboard/getItems.query';
import { useMutation, useQuery } from '@vue/apollo-composable';

import { CategoryInterface } from 'src/types/category.interface';
import { DELETE_ITEM } from 'src/apollo/dashboard/deleteItem';
import { CREATE_ITEM } from 'src/apollo/dashboard/createItem';
import { UPDATE_ITEM } from 'src/apollo/dashboard/updateItem';

export interface Item {
  id:number
  name:string
  updatedAt:Date
  createdAt:Date
  category:CategoryInterface
}

interface ItemData {
  items: Item[];
}
interface ItemsVars {
  siteId: number;
}
interface createItemVars {
  siteId: number;
  name: string;
  categoryId: number;
}
interface updateItemVars {
  id:number;
  siteId: number;
  name: string;
  categoryId: number;
}

export function useItems() {
  const { result, loading, refetch } = useQuery<ItemData, ItemsVars>(GET_ITEMS_QUERY);

  const { mutate: removeItemMutation } = useMutation(DELETE_ITEM);
  const { mutate: createItemMutation } = useMutation(CREATE_ITEM);
  const { mutate: updateItemMutation } = useMutation(UPDATE_ITEM);

  const removeItem = (id:number) => {
    void removeItemMutation({ itemId: id }).then(() => {
      void refetch();
    });
  };
  const addItem = (itemVars:createItemVars) => {
    void createItemMutation({ createItemInput: itemVars }).then(() => {
      void refetch();
    });
  };
  const updateItem = (itemVars:updateItemVars) => {
    void updateItemMutation({ updateItemInput: itemVars }).then(() => {
      void refetch();
    });
  };

  return {
    result,
    loading,
    removeItem,
    addItem,
  };
}
