import { useResult } from '@vue/apollo-composable';
import { CategoryFilterInput, useGetCategoriesQuery } from 'src/apollo/composition-functions';
import { useRouteParams } from 'src/composables/useRoute';
import { reactive } from 'vue';

const filter = reactive<CategoryFilterInput>({
  name: null,
});

export function useDashboardParameters() {
  const { siteId } = useRouteParams();

  const resetFilter = () => {
    filter.name = null;
  };

  const { result, loading, refetch } = useGetCategoriesQuery({
    siteId: siteId.value,
    // filter,
  });

  return {
    parameters: useResult(result, []),
    loading,
    refetch,
    filter,
    resetFilter,
  };
}
