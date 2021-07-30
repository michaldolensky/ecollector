import { useMutation, useQuery } from '@vue/apollo-composable';
import { CREATE_CATEGORY, DELETE_CATAGORY, GET_CATEGORIES_QUERY } from 'src/apollo/dashboard/categoryQueries';
import { useSites } from 'src/module/useSites';

export interface Category {
  id:number
  name:string
  updatedAt:Date
  createdAt:Date
}

interface CategoryData {
  categories: Category[];
}
interface CategorieVars {
  siteId: number;
}
interface createCategoryVars {
  name: string;
}
// interface updateItemVars {
//   id:number;
//   siteId: number;
//   name: string;
//   categoryId: number;
// }

export function useCategories() {
  const { currentSiteId } = useSites();

  const { result, loading, refetch } = useQuery<CategoryData, CategorieVars>(GET_CATEGORIES_QUERY, {
    siteId: currentSiteId.value,
  });

  const { mutate: removeCategoryMutation } = useMutation(DELETE_CATAGORY);
  const { mutate: createCategoryMutation } = useMutation(CREATE_CATEGORY);
  // const { mutate: updateItemMutation } = useMutation(UPDATE_ITEM);

  const removeCategory = (id:number) => {
    void removeCategoryMutation({ itemId: id, siteId: currentSiteId.value }).then(() => {
      void refetch();
    });
  };
  const addCategory = (createItemInput:createCategoryVars) => {
    // eslint-disable-next-line max-len
    void createCategoryMutation({ createCategoryInput: createItemInput, siteId: currentSiteId.value })
      .then(() => {
        void refetch();
      });
  };
  // const updateItem = (itemVars:updateItemVars) => {
  //   void updateItemMutation({ updateItemInput: itemVars }).then(() => {
  //     void refetch();
  //   });
  // };

  return {
    result,
    loading,
    removeCategory,
    addCategory,
  };
}
