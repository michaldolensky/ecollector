import { useResult } from '@vue/apollo-composable';
import { useQuasar } from 'quasar';
import { useRouteParams } from 'src/composables/useRoute';
import {
  useGetItemsQuery,
  useRemoveItemMutation,
} from 'src/modules/dashboard/modules/items/graphql/ItemDashboard.operations';
import { Item, ItemFilterInput } from 'src/types/graphql';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const filter = reactive<ItemFilterInput>({
  categoryId: null,
  internalNumber: null,
  name: null,
  numberForExchange: null,
  numberInCollection: null,
});

export function useDashboardItems() {
  const { siteId } = useRouteParams();
  const { dialog } = useQuasar();
  const { t } = useI18n();

  const { mutate: removeItemMutation } = useRemoveItemMutation({});

  const resetFilter = () => {
    filter.categoryId = null;
    filter.internalNumber = null;
    filter.name = null;
    filter.numberForExchange = null;
    filter.numberInCollection = null;
  };

  const { result, loading, refetch } = useGetItemsQuery({
    siteId: siteId.value,
    filter,
  });

  const removeItem = (id:number) => {
    void removeItemMutation({
      deleteItemInput: {
        itemId: id,
      },
      siteId: siteId.value,
    });
  };

  const confirmDelete = (item: Item) => {
    dialog({
      title: t('dialogs.titles.confirm', [item.name]),
      message: t('dashboard.items.dialogs.message.delete', [item.name]),
      cancel: true,
      persistent: true,
    }).onOk(() => {
      if (item.id != null) void removeItem(item.id);
    });
  };

  return {
    items: useResult(result, []),
    loading,
    refetch,
    filter,
    confirmDelete,
    resetFilter,
  };
}
