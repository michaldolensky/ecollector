import { getParsedInt } from 'src/utils';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export function useRouteParams() {
  const route = useRoute();

  const siteId = computed<number>(() => getParsedInt(route.params.siteId));
  const itemId = computed<number>(() => getParsedInt(route.params.itemId));
  const categoryId = computed<number>(() => getParsedInt(route.params.categoryId));

  return {
    siteId, itemId, categoryId,
  };
}
