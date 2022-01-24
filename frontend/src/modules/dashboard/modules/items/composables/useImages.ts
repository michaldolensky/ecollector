import { useSites } from 'src/composables/useSites';
import { useRemoveImageMutation } from 'src/modules/dashboard/modules/items/graphql/imageDashboard.operations';

export interface Image{
  id: number,
  path: string,
  main: boolean
}
export function useImages() {
  const { currentSiteId } = useSites();

  const { mutate: removeImageMutation } = useRemoveImageMutation({});

  const removeImage = (id:number) => {
    void removeImageMutation({ deleteImageInput: { id }, siteId: currentSiteId.value });
  };

  return {
    removeImage,
  };
}
