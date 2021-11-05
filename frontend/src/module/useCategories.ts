import {
  CreateCategoryInput,
  UpdateCategoryInput,
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useRemoveCategoryMutation, useUpdateCategoryMutation,
} from 'src/apollo/composition-functions';

import { useSites } from 'src/module/useSites';

export interface Category {
  id:number
  name:string
  updatedAt:Date
  createdAt:Date
}

export interface CategoryInput{
  id:number
  name:string
  perex:string
}

export function useCategories() {
  const { currentSiteId } = useSites();

  const getCategories = useGetCategoriesQuery({
    siteId: currentSiteId.value,
  });

  const { result, loading, refetch } = useGetCategoriesQuery({
    siteId: currentSiteId.value,
  });

  const { mutate: removeCategoryMutation } = useRemoveCategoryMutation({});
  // eslint-disable-next-line max-len
  const { mutate: createCategoryMutation } = useCreateCategoryMutation({});
  // eslint-disable-next-line max-len
  const { mutate: updateCategoryMutation } = useUpdateCategoryMutation({});

  const removeCategory = (id:number) => {
    void removeCategoryMutation({
      deleteCategoryInput: {
        categoryId: id,
      },
      siteId: currentSiteId.value,
    }).then(() => {
      void refetch();
    });
  };

  // todo rename
  // eslint-disable-next-line max-len
  const createCategory = (createCategoryInput:CreateCategoryInput) => createCategoryMutation({ createCategoryInput, siteId: currentSiteId.value });

  // eslint-disable-next-line max-len
  const updateCategory = (updateCategoryInput:UpdateCategoryInput) => updateCategoryMutation({ updateCategoryInput, siteId: currentSiteId.value });

  return {
    result,
    loading,
    getCategories,
    removeCategory,
    createCategory,
    updateCategory,
  };
}
