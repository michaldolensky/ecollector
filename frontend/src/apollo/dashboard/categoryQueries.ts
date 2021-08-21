import gql from 'graphql-tag';

export const CREATE_CATEGORY = gql`
  mutation createCategory($createCategoryInput:CreateCategoryInput!, $siteId: Int!){
    createCategory(createCategoryInput: $createCategoryInput, siteId:$siteId) {
      id
      name
      perex
    }
  }
`;
export const DELETE_CATAGORY = gql`
  mutation removeCategory($deleteCategoryInput:DeleteCategoryInput!,$siteId:Int!){
      removeCategory(deleteCategoryInput: $deleteCategoryInput,siteId: $siteId) {
      id
    }
  }
`;
export const UPDATE_CATEGORY = gql`
  mutation updateCategory($updateCategoryInput:UpdateCategoryInput!,$siteId:Int!){
    updateCategory(updateCategoryInput:  $updateCategoryInput,siteId: $siteId) {
      id
      name
      perex
    }
  }
`;
export const GET_CATEGORIES_QUERY = gql`
  query getCategories($siteId:Int!){
    categories(siteId:$siteId) {
      id
      createdAt
      updatedAt
      name
    }
  }
`;
export const GET_CATEGORY = gql`
  query getCategory($id:Int!){
    category(id:$id) {
      id
      name
      perex
    }
  }
`;
