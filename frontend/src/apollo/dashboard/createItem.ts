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
