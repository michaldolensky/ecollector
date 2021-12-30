/* eslint-disable */
// noinspection ES6UnusedImports
import * as Types from '../../types/graphql';

import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type ReactiveFunction<TParam> = () => TParam;
export type GetPublicSitesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPublicSitesQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', id: number, name: string, owner: { __typename?: 'User', firstName?: string | null | undefined, lastName?: string | null | undefined } }> };


export const GetPublicSitesDocument = gql`
    query getPublicSites {
  sites {
    id
    name
    owner {
      firstName
      lastName
    }
  }
}
    `;

/**
 * __useGetPublicSitesQuery__
 *
 * To run a query within a Vue component, call `useGetPublicSitesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicSitesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetPublicSitesQuery();
 */
export function useGetPublicSitesQuery(options: VueApolloComposable.UseQueryOptions<GetPublicSitesQuery, GetPublicSitesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetPublicSitesQuery, GetPublicSitesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetPublicSitesQuery, GetPublicSitesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetPublicSitesQuery, GetPublicSitesQueryVariables>(GetPublicSitesDocument, {}, options);
}
export type GetPublicSitesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetPublicSitesQuery, GetPublicSitesQueryVariables>;