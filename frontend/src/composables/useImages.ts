import { useRemoveImageMutation } from 'src/apollo/composition-functions';
import { useSites } from 'src/composables/useSites';

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
