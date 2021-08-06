import { useRoute } from 'vue-router';
import { computed } from 'vue';
import { CREATE_SITE } from 'src/apollo/dashboard/siteQueries';
import { useMutation } from '@vue/apollo-composable';

export interface Site{
  id:number,
  name:string,
  createdAt:Date
  updateAt:Date
}

export interface CreateItemInput {
  name:string,
}

export function useSites() {
  const route = useRoute();
  const getSiteIdFromString = (siteIdParam: string):number => parseInt(siteIdParam, 10);
  const currentSiteId = computed<number>(() => getSiteIdFromString(<string>route.params.siteId));

  const { mutate: createSiteMutation } = useMutation(CREATE_SITE);

  const addSite = (siteInput:CreateItemInput) => {
    void createSiteMutation({ createSiteInput: siteInput });
  };

  return {
    getSiteIdFromString, currentSiteId, addSite,
  };
}
