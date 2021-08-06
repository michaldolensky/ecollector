import { useMutation } from '@vue/apollo-composable';
import { DELETE_IMAGE } from 'src/apollo/dashboard/imageQueries';
import { useSites } from 'src/module/useSites';

export interface Image{
  id: number,
  path: string,
  main: boolean
}
export function useImages() {
  const { currentSiteId } = useSites();

  const { mutate: removeImageMutation } = useMutation(DELETE_IMAGE);

  const removeImage = (id:number) => {
    void removeImageMutation({ deleteImageInput: { id }, siteId: currentSiteId.value });
  };

  return {
    removeImage,
  };
}
