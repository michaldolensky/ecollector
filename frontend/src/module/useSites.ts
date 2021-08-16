import { getParsedInt } from 'src/utils';
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
  const currentSiteId = computed<number>(() => getParsedInt(route.params.siteId));

  const { mutate: createSiteMutation } = useMutation(CREATE_SITE);

  const addSite = (siteInput:CreateItemInput) => {
    void createSiteMutation({ createSiteInput: siteInput });
  };

  return {
    currentSiteId, addSite,
  };
}
