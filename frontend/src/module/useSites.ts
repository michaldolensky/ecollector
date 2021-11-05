import { CreateSiteInput, useCreateSiteMutation } from 'src/apollo/composition-functions';
import { getParsedInt } from 'src/utils';
import { useRoute } from 'vue-router';
import { computed } from 'vue';

export interface Site{
  id:number,
  name:string,
  createdAt:Date
  updateAt:Date
}

export function useSites() {
  const route = useRoute();
  const currentSiteId = computed<number>(() => getParsedInt(route.params.siteId));

  const { mutate: createSiteMutation } = useCreateSiteMutation({});

  const createSite = (createSiteInput:CreateSiteInput) => createSiteMutation({ createSiteInput });

  return {
    currentSiteId, createSite,
  };
}
