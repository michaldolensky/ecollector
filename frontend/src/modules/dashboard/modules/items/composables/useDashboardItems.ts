import { useRouteParams } from "src/composables/useRoute";
import { useRemoveItemMutation } from "src/modules/dashboard/modules/items/graphql/ItemDashboard.operations.urql";

export function useDashboardItems() {
  const { executeMutation: removeItemMutation } = useRemoveItemMutation();
  const { siteId } = useRouteParams();

  const removeItem = (id: number) =>
    removeItemMutation({
      deleteItemInput: {
        itemId: id,
      },
      siteId: siteId.value,
    });

  return {
    removeItem,
  };
}
