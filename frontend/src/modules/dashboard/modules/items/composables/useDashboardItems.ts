import { useRouteParams } from "src/composables/useRoute";
import { useRemoveItemMutation } from "src/modules/dashboard/modules/items/graphql/ItemDashboard.operations";

export function useDashboardItems() {
  const { mutate: removeItemMutation } = useRemoveItemMutation({});
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
