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
  mutation updateItem($updateItemInput:UpdateItemInput!,$siteId:Int!){
    updateItem(updateItemInput: $updateItemInput,siteId: $siteId) {
      id
      categoryId
      name
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
