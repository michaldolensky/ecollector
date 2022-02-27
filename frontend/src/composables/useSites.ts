import {
  useCreateSiteMutation,
  useRemoveSiteMutation,
  useSiteQuery,
  useUpdateSiteMutation,
} from "src/modules/account/graphql/sitesDashboard.operations";
import { CreateSiteInput, UpdateSiteInput } from "src/types/graphql";
import { getParsedInt } from "src/utils";
import { useRoute } from "vue-router";
import { computed } from "vue";

export function useSites() {
  const route = useRoute();
  const currentSiteId = computed<number>(() =>
    getParsedInt(route.params.siteId)
  );

  const { executeMutation: removeSiteMutation } = useRemoveSiteMutation();
  const { executeMutation: createSiteMutation } = useCreateSiteMutation();
  const { executeMutation: updateSiteMutation } = useUpdateSiteMutation();

  const getSite = (id: number) => useSiteQuery({ variables: { id } });

  const removeSite = (id: number) =>
    removeSiteMutation({
      id,
    });

  const createSite = (createSiteInput: CreateSiteInput) =>
    createSiteMutation({ createSiteInput });

  const updateSite = (updateSiteInput: UpdateSiteInput) =>
    updateSiteMutation({ updateSiteInput, siteId: currentSiteId.value });

  return {
    currentSiteId,
    createSite,
    updateSite,
    removeSite,
    getSite,
  };
}
