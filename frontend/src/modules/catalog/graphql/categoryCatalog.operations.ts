/* eslint-disable */
// noinspection ES6UnusedImports
import * as Types from '../../../types/graphql';

import { gql } from '@urql/vue';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetCatalogueCategoriesQueryVariables = Types.Exact<{
  siteId: Types.Scalars['Int'];
}>;


export type GetCatalogueCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: number, name: string }> };

export type GetCatalogItemsQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.ItemFilterInput>;
  siteId: Types.Scalars['Int'];
}>;


export type GetCatalogItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: number, name: string, numberForExchange: number, numberInCollection: number, internalNumber: string, createdAt: any, shortDesc: string, images?: Array<{ __typename?: 'Image', main: boolean, file: { __typename?: 'S3File', url: string } } | null> | null }> };

export type GetCatalogItemQueryVariables = Types.Exact<{
  itemId: Types.Scalars['Int'];
}>;


export type GetCatalogItemQuery = { __typename?: 'Query', item: { __typename?: 'Item', id: number, name: string, numberForExchange: number, numberInCollection: number, internalNumber: string, createdAt: any, shortDesc: string, longDesc: string, images?: Array<{ __typename?: 'Image', main: boolean, file: { __typename?: 'S3File', url: string } } | null> | null, itemParameters: Array<{ __typename?: 'ItemParameter', value: string, parameter: { __typename?: 'Parameter', name: string, id: number } }> } };


export const GetCatalogueCategoriesDocument = gql`
    query getCatalogueCategories($siteId: Int!) {
  categories(siteId: $siteId) {
    id
    name
  }
}
    `;

export function useGetCatalogueCategoriesQuery(options: Omit<Urql.UseQueryArgs<never, GetCatalogueCategoriesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCatalogueCategoriesQuery>({ query: GetCatalogueCategoriesDocument, ...options });
};
export const GetCatalogItemsDocument = gql`
    query getCatalogItems($filter: ItemFilterInput, $siteId: Int!) {
  items(filter: $filter, siteId: $siteId) {
    id
    name
    numberForExchange
    numberInCollection
    internalNumber
    createdAt
    shortDesc
    images(main: true) {
      file {
        url
      }
      main
    }
  }
}
    `;

export function useGetCatalogItemsQuery(options: Omit<Urql.UseQueryArgs<never, GetCatalogItemsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCatalogItemsQuery>({ query: GetCatalogItemsDocument, ...options });
};
export const GetCatalogItemDocument = gql`
    query getCatalogItem($itemId: Int!) {
  item(id: $itemId) {
    id
    name
    numberForExchange
    numberInCollection
    internalNumber
    createdAt
    shortDesc
    longDesc
    images {
      file {
        url
      }
      main
    }
    itemParameters {
      parameter {
        name
        id
      }
      value
    }
  }
}
    `;

export function useGetCatalogItemQuery(options: Omit<Urql.UseQueryArgs<never, GetCatalogItemQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCatalogItemQuery>({ query: GetCatalogItemDocument, ...options });
};