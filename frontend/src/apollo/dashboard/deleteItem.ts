import gql from 'graphql-tag';

export const DELETE_ITEM = gql`
  mutation removeItem($itemId:Int!){
    removeItem(itemId:$itemId) {
      id
    }
  }
`;
