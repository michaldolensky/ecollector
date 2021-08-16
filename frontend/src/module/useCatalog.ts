import { GET_CATALOG_CATEGORIES } from 'src/apollo/catalog/categoryQueries';
import { useSites } from 'src/module/useSites';
import { reactive } from 'vue';
import { useQuery } from '@vue/apollo-composable';

export interface CatalogCategory {
  id:number
  name:string
  updatedAt:Date
  createdAt:Date
}

export interface CategoryData {
  categories: CatalogCategory[]
}

export interface CatalogState{
  currentCategory:CatalogCategory|null
  categories:CatalogCategory[]|null
  loading:boolean
}

export interface CatalogCategoryVars {
  siteId: number;
}

export interface CatalogItem {
  id:number
  name:string
  shortDesc:string
  updatedAt:Date
  createdAt:Date
}

export interface ItemData {
  items: CatalogItem[]
}

export interface CatalogItemVars {
  siteId: number;
  categoryId: number;
}

const CatalogStateData = reactive<CatalogState>({
  categories: null,
  currentCategory: null,
  loading: false,
});

const useCatalog = () => {
  const { currentSiteId } = useSites();

  // eslint-disable-next-line max-len
  const { onResult, loading: load } = useQuery<CategoryData, CatalogCategoryVars>(GET_CATALOG_CATEGORIES, {
    siteId: currentSiteId.value,
  });

  onResult((result) => {
    CatalogStateData.categories = result.data.categories;
  });

  const catalogState: CatalogState = {
    currentCategory: CatalogStateData.currentCategory,
    categories: CatalogStateData.categories,
    loading: load.value,
  };

  return catalogState;
};

export default useCatalog;
