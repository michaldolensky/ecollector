import { useMutation, useQuery } from '@vue/apollo-composable';
import {
  CREATE_CATEGORY,
  DELETE_CATAGORY,
  GET_CATEGORIES_QUERY,
  UPDATE_CATEGORY,
} from 'src/apollo/dashboard/categoryQueries';
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

export interface CategoryInput{
  id:number
  name:string
  perex:string
}

interface updateCategoryVars {
  id:number;
  name: string;
  perex:string
}

export interface CategoryDataSingle {
  category: Category;
}

export interface IGetCategory{
  id:number
}

export function useCategories() {
  const { currentSiteId } = useSites();

  const getCategories = () => useQuery<CategoryData, CategorieVars>(GET_CATEGORIES_QUERY, {
    siteId: currentSiteId.value,
  });

  const { result, loading, refetch } = useQuery<CategoryData, CategorieVars>(GET_CATEGORIES_QUERY, {
    siteId: currentSiteId.value,
  });

  const { mutate: removeCategoryMutation } = useMutation(DELETE_CATAGORY);
  // eslint-disable-next-line max-len
  const { mutate: createCategoryMutation } = useMutation<{ createCategory: Category }>(CREATE_CATEGORY);
  // eslint-disable-next-line max-len
  const { mutate: updateCategoryMutation } = useMutation<{ updateCategory: Category }>(UPDATE_CATEGORY);

  const removeCategory = (id:number) => {
    void removeCategoryMutation({ itemId: id, siteId: currentSiteId.value }).then(() => {
      void refetch();
    });
  };
  // eslint-disable-next-line max-len
  const addCategory = (createItemInput:createCategoryVars) => createCategoryMutation({ createCategoryInput: createItemInput, siteId: currentSiteId.value });

  // eslint-disable-next-line max-len
  const updateCategory = (categoryVars:updateCategoryVars) => updateCategoryMutation({ updateItemInput: categoryVars, siteId: currentSiteId.value });

  return {
    result,
    loading,
    getCategories,
    removeCategory,
    addCategory,
    updateCategory,
  };
}
