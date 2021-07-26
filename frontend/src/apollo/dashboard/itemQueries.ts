import gql from 'graphql-tag';

export const CREATE_ITEM = gql`
  mutation createItem($createItemInput:CreateItemInput!){
    createItem(createItemInput: $createItemInput) {
      id
      categoryId
      name
    }
  }
`;
export const DELETE_ITEM = gql`
  mutation removeItem($itemId:Int!){
    removeItem(itemId:$itemId) {
      id
    }
  }
`;
export const UPDATE_ITEM = gql`
  mutation updateItem($updateItemInput:UpdateItemInput!){
    updateItem(updateItemInput:  $updateItemInput) {
      id
      categoryId
      name
    }
  }
`;
export const GET_ITEMS_QUERY = gql`
  query getItems($siteId:Int){
    items(siteId:$siteId) {
      id
      createdAt
      updatedAt
      name
      category{
        name
      }
    }
  }
`;
