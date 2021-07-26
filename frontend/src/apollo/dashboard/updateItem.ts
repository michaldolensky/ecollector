import gql from 'graphql-tag';

export const UPDATE_ITEM = gql`
  mutation updateItem($updateItemInput:UpdateItemInput!){
    updateItem(updateItemInput:  $updateItemInput) {
      id
      categoryId
      name
    }
  }
`;
