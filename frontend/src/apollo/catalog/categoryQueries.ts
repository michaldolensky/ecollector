import gql from 'graphql-tag';

export const GET_CATALOG_CATEGORIES = gql`
  query getCategories($siteId:Int!){
    categories(siteId:$siteId) {
      id
      name
    }
  }
`;
