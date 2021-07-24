import gql from 'graphql-tag';

export const GET_ITEM_QUERY = gql`
  query {
    item(id: 1){
      id,
      name
    }
  }
`;
