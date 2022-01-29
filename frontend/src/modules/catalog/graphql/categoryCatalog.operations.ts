/* eslint-disable */
// noinspection ES6UnusedImports
import * as Types from '../../../types/graphql';

import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type ReactiveFunction<TParam> = () => TParam;
export type GetCatalogueCategoriesQueryVariables = Types.Exact<{
  siteId: Types.Scalars['Int'];
}>;


export type GetCatalogueCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: number, name: string }> };

export type GetCatalogItemsQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.ItemFilterInput>;
  siteId: Types.Scalars['Int'];
}>;


export type GetCatalogItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: number, name: string, numberForExchange: number, numberInCollection: number, internalNumber: string, createdAt: any, shortDesc: string, images?: Array<{ __typename?: 'Image', main: boolean, file: { __typename?: 'File', url: string } } | null | undefined> | null | undefined }> };

export type GetCatalogItemQueryVariables = Types.Exact<{
  itemId: Types.Scalars['Int'];
}>;


export type GetCatalogItemQuery = { __typename?: 'Query', item: { __typename?: 'Item', id: number, name: string, numberForExchange: number, numberInCollection: number, internalNumber: string, createdAt: any, shortDesc: string, longDesc: string, images?: Array<{ __typename?: 'Image', main: boolean, file: { __typename?: 'File', url: string } } | null | undefined> | null | undefined, itemParameters: Array<{ __typename?: 'ItemParameter', value: string, parameter: { __typename?: 'Parameter', name: string, id: number } }> } };


export const GetCatalogueCategoriesDocument = gql`
    query getCatalogueCategories($siteId: Int!) {
  categories(siteId: $siteId) {
    id
    name
  }
}
    `;

/**
 * __useGetCatalogueCategoriesQuery__
 *
 * To run a query within a Vue component, call `useGetCatalogueCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCatalogueCategoriesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCatalogueCategoriesQuery({
 *   siteId: // value for 'siteId'
 * });
 */
export function useGetCatalogueCategoriesQuery(variables: GetCatalogueCategoriesQueryVariables | VueCompositionApi.Ref<GetCatalogueCategoriesQueryVariables> | ReactiveFunction<GetCatalogueCategoriesQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetCatalogueCategoriesQuery, GetCatalogueCategoriesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCatalogueCategoriesQuery, GetCatalogueCategoriesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCatalogueCategoriesQuery, GetCatalogueCategoriesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetCatalogueCategoriesQuery, GetCatalogueCategoriesQueryVariables>(GetCatalogueCategoriesDocument, variables, options);
}
export type GetCatalogueCategoriesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetCatalogueCategoriesQuery, GetCatalogueCategoriesQueryVariables>;
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

/**
 * __useGetCatalogItemsQuery__
 *
 * To run a query within a Vue component, call `useGetCatalogItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCatalogItemsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCatalogItemsQuery({
 *   filter: // value for 'filter'
 *   siteId: // value for 'siteId'
 * });
 */
export function useGetCatalogItemsQuery(variables: GetCatalogItemsQueryVariables | VueCompositionApi.Ref<GetCatalogItemsQueryVariables> | ReactiveFunction<GetCatalogItemsQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetCatalogItemsQuery, GetCatalogItemsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCatalogItemsQuery, GetCatalogItemsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCatalogItemsQuery, GetCatalogItemsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetCatalogItemsQuery, GetCatalogItemsQueryVariables>(GetCatalogItemsDocument, variables, options);
}
export type GetCatalogItemsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetCatalogItemsQuery, GetCatalogItemsQueryVariables>;
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

/**
 * __useGetCatalogItemQuery__
 *
 * To run a query within a Vue component, call `useGetCatalogItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCatalogItemQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCatalogItemQuery({
 *   itemId: // value for 'itemId'
 * });
 */
export function useGetCatalogItemQuery(variables: GetCatalogItemQueryVariables | VueCompositionApi.Ref<GetCatalogItemQueryVariables> | ReactiveFunction<GetCatalogItemQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetCatalogItemQuery, GetCatalogItemQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCatalogItemQuery, GetCatalogItemQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCatalogItemQuery, GetCatalogItemQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetCatalogItemQuery, GetCatalogItemQueryVariables>(GetCatalogItemDocument, variables, options);
}
export type GetCatalogItemQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetCatalogItemQuery, GetCatalogItemQueryVariables>;