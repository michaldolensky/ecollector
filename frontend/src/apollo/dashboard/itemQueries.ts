import gql from 'graphql-tag';

export const GET_ITEM = gql`
  query item($id:Int!){
  item(id: $id) {
    id
    name
    numberForExchange
    numberInCollection
    internalNumber
    longDesc
    shortDesc
    categoryId
    updatedAt
    createdAt
    category{
      id
      name
    }
    images{
      id
      path
      size
    }
  }
}
`;
export const CREATE_ITEM = gql`
  mutation createItem($createItemInput:CreateItemInput!, $siteId: Int!){
    createItem(createItemInput: $createItemInput,siteId:$siteId) {
      id
      categoryId
      name
    }
  }
`;
export const DELETE_ITEM = gql`
  mutation removeItem($deleteItemInput:DeleteItemInput!,$siteId:Int!){
    removeItem(deleteItemInput: $deleteItemInput,siteId: $siteId) {
      id
    }
  }
`;
export const UPDATE_ITEM = gql`
  mutation updateItem($updateItemInput:UpdateItemInput!,$siteId:Int!){
    updateItem(updateItemInput: $updateItemInput,siteId: $siteId) {
      id
      categoryId
      name
    }
  }
`;
export const GET_ITEMS_QUERY = gql`
  query getItems($siteId:Int!){
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
