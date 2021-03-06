import { useSites } from "src/composables/useSites";
import {
  useCreateItemMutation,
  useItemQuery,
  useUpdateItemMutation,
} from "src/modules/dashboard/modules/items/graphql/ItemDashboard.operations";
import { CreateItemInput, UpdateItemInput } from "src/types/graphql";

export function useItems() {
  const { currentSiteId } = useSites();

  const getItem = (id: number) =>
    useItemQuery({
      variables: {
        id,
      },
    });
  const { executeMutation: createItemMutation } = useCreateItemMutation();
  const { executeMutation: updateItemMutation } = useUpdateItemMutation();

  const createItem = (createItemInput: CreateItemInput) =>
    createItemMutation({ createItemInput, siteId: currentSiteId.value });

  const updateItem = (updateItemInput: UpdateItemInput) =>
    updateItemMutation({ updateItemInput, siteId: currentSiteId.value });

  return {
    getItem,
    updateItem,
    createItem,
  };
}
