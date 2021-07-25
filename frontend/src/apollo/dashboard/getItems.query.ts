import gql from 'graphql-tag';

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
