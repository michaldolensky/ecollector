import { useSites } from "src/composables/useSites";
import {
  useCreateCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useRemoveCategoryMutation,
  useUpdateCategoryMutation,
} from "src/modules/dashboard/modules/categories/graphql/categoryDashboard..operations.urql";
import { CreateCategoryInput, UpdateCategoryInput } from "src/types/graphql";

export function useCategories() {
  const { currentSiteId } = useSites();

  const getCategories = () =>
    useGetCategoriesQuery({
      variables: {
        siteId: currentSiteId.value,
      },
    });

  const { data, fetching } = useGetCategoriesQuery({
    variables: {
      siteId: currentSiteId.value,
    },
  });

  const getCategory = (id: number) =>
    useGetCategoryQuery({
      variables: {
        id,
      },
    });

  const { executeMutation: removeCategoryMutation } =
    useRemoveCategoryMutation();
  const { executeMutation: createCategoryMutation } =
    useCreateCategoryMutation();
  const { executeMutation: updateCategoryMutation } =
    useUpdateCategoryMutation();

  const removeCategory = (id: number) => {
    void removeCategoryMutation({
      deleteCategoryInput: {
        categoryId: id,
      },
      siteId: currentSiteId.value,
    });
  };

  // todo rename
  // eslint-disable-next-line max-len
  const createCategory = (createCategoryInput: CreateCategoryInput) =>
    createCategoryMutation({
      createCategoryInput,
      siteId: currentSiteId.value,
    });

  // eslint-disable-next-line max-len
  const updateCategory = (updateCategoryInput: UpdateCategoryInput) =>
    updateCategoryMutation({
      updateCategoryInput,
      siteId: currentSiteId.value,
    });

  return {
    data,
    fetching,
    getCategory,
    getCategories,
    removeCategory,
    createCategory,
    updateCategory,
  };
}
