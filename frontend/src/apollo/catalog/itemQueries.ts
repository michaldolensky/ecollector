import gql from 'graphql-tag';

export const GET_CATALOG_ITEMS = gql`
  query items($categoryId:Int,$siteId:Int!){
  items( categoryId: $categoryId, siteId: $siteId) {
    id
    name
    numberForExchange
    numberInCollection
    internalNumber
    createdAt
    shortDesc
    images(main: true){
      path
      main
    }
  }
}`;
