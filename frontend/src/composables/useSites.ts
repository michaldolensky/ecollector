import {
  CreateSiteInput, UpdateSiteInput, useCreateSiteMutation,
  useSiteQuery,
  useRemoveSiteMutation, useUpdateSiteMutation,
} from 'src/apollo/composition-functions';
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

  const { mutate: removeSiteMutation } = useRemoveSiteMutation({});
  const { mutate: createSiteMutation } = useCreateSiteMutation({});
  const { mutate: updateSiteMutation } = useUpdateSiteMutation({});

  const getSite = (id:number) => {
    console.log('123');
    return useSiteQuery({ id });
  };

  const removeSite = (id:number) => removeSiteMutation({
    id,
  });

  const createSite = (createSiteInput:CreateSiteInput) => createSiteMutation({ createSiteInput });
  const updateSite = (updateSiteInput:UpdateSiteInput) => updateSiteMutation({ updateSiteInput });

  return {
    currentSiteId, createSite, updateSite, removeSite, getSite,
  };
}
