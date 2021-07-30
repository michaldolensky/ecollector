import { useRoute } from 'vue-router';
import { computed } from 'vue';

export function useSites() {
  const route = useRoute();

  const getSiteIdFromString = (siteIdParam: string):number => parseInt(siteIdParam, 10);
  const currentSiteId = computed<number>(() => getSiteIdFromString(<string>route.params.siteId));

  return { getSiteIdFromString, currentSiteId };
}
