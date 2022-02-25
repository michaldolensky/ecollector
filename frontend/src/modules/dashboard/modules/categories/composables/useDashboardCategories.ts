import { useResult } from "@vue/apollo-composable";
import { useQuasar } from "quasar";

import { useRouteParams } from "src/composables/useRoute";
import {
  useGetCategoriesQuery,
  useRemoveCategoryMutation,
} from "src/modules/dashboard/modules/categories/graphql/categoryDashboard..operations.urql";
import { Category, CategoryFilterInput } from "src/types/graphql";
import { reactive } from "vue";
import { useI18n } from "vue-i18n";

const filter = reactive<CategoryFilterInput>({
  name: null,
});

export function useDashboardCategories() {
  const { siteId } = useRouteParams();
  const { dialog } = useQuasar();
  const { t } = useI18n();

  const { executeMutation: removeCategoryMutation } =
    useRemoveCategoryMutation();

  const resetFilter = () => {
    filter.name = null;
  };

  const { data, fetching } = useGetCategoriesQuery({
    variables: {
      siteId: siteId.value,
      filter,
    },
  });

  const removeCategory = (id: number) => {
    void removeCategoryMutation({
      deleteCategoryInput: {
        categoryId: id,
      },
      siteId: siteId.value,
    });
  };

  const confirmDelete = (category: Category) => {
    dialog({
      title: t("dialogs.titles.confirm", [category.name]),
      message: t("dashboard.categories.dialogs.message.delete", [
        category.name,
      ]),
      cancel: true,
      persistent: true,
    }).onOk(() => {
      if (category.id != null) void removeCategory(category.id);
    });
  };

  return {
    categories: useResult(data, []),
    fetching,
    filter,
    confirmDelete,
    resetFilter,
  };
}
