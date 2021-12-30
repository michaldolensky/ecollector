/* eslint-disable */
// noinspection ES6UnusedImports
import * as Types from '../../../types/graphql';

import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type ReactiveFunction<TParam> = () => TParam;
export type SiteQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type SiteQuery = { __typename?: 'Query', site: { __typename?: 'Site', id: number, name: string, createdAt: any, updatedAt: any, stats: { __typename?: 'SiteStats', totalCategories: number, totalItems: number } } };

export type CreateSiteMutationVariables = Types.Exact<{
  createSiteInput: Types.CreateSiteInput;
}>;


export type CreateSiteMutation = { __typename?: 'Mutation', createSite: { __typename?: 'Site', id: number, name: string } };

export type RemoveSiteMutationVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type RemoveSiteMutation = { __typename?: 'Mutation', removeSite: { __typename?: 'Site', id: number } };

export type UpdateSiteMutationVariables = Types.Exact<{
  updateSiteInput: Types.UpdateSiteInput;
  siteId: Types.Scalars['Int'];
}>;


export type UpdateSiteMutation = { __typename?: 'Mutation', updateSite: { __typename?: 'Site', id: number, name: string } };


export const SiteDocument = gql`
    query site($id: Int!) {
  site(id: $id) {
    id
    name
    createdAt
    updatedAt
    stats {
      totalCategories
      totalItems
    }
  }
}
    `;

/**
 * __useSiteQuery__
 *
 * To run a query within a Vue component, call `useSiteQuery` and pass it any options that fit your needs.
 * When your component renders, `useSiteQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useSiteQuery({
 *   id: // value for 'id'
 * });
 */
export function useSiteQuery(variables: SiteQueryVariables | VueCompositionApi.Ref<SiteQueryVariables> | ReactiveFunction<SiteQueryVariables>, options: VueApolloComposable.UseQueryOptions<SiteQuery, SiteQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<SiteQuery, SiteQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<SiteQuery, SiteQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<SiteQuery, SiteQueryVariables>(SiteDocument, variables, options);
}
export type SiteQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<SiteQuery, SiteQueryVariables>;
export const CreateSiteDocument = gql`
    mutation createSite($createSiteInput: CreateSiteInput!) {
  createSite(createSiteInput: $createSiteInput) {
    id
    name
  }
}
    `;

/**
 * __useCreateSiteMutation__
 *
 * To run a mutation, you first call `useCreateSiteMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateSiteMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateSiteMutation({
 *   variables: {
 *     createSiteInput: // value for 'createSiteInput'
 *   },
 * });
 */
export function useCreateSiteMutation(options: VueApolloComposable.UseMutationOptions<CreateSiteMutation, CreateSiteMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateSiteMutation, CreateSiteMutationVariables>>) {
  return VueApolloComposable.useMutation<CreateSiteMutation, CreateSiteMutationVariables>(CreateSiteDocument, options);
}
export type CreateSiteMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateSiteMutation, CreateSiteMutationVariables>;
export const RemoveSiteDocument = gql`
    mutation removeSite($id: Int!) {
  removeSite(id: $id) {
    id
  }
}
    `;

/**
 * __useRemoveSiteMutation__
 *
 * To run a mutation, you first call `useRemoveSiteMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRemoveSiteMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRemoveSiteMutation({
 *   variables: {
 *     id: // value for 'id'
 *   },
 * });
 */
export function useRemoveSiteMutation(options: VueApolloComposable.UseMutationOptions<RemoveSiteMutation, RemoveSiteMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RemoveSiteMutation, RemoveSiteMutationVariables>>) {
  return VueApolloComposable.useMutation<RemoveSiteMutation, RemoveSiteMutationVariables>(RemoveSiteDocument, options);
}
export type RemoveSiteMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RemoveSiteMutation, RemoveSiteMutationVariables>;
export const UpdateSiteDocument = gql`
    mutation updateSite($updateSiteInput: UpdateSiteInput!, $siteId: Int!) {
  updateSite(updateSiteInput: $updateSiteInput, siteId: $siteId) {
    id
    name
  }
}
    `;

/**
 * __useUpdateSiteMutation__
 *
 * To run a mutation, you first call `useUpdateSiteMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateSiteMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateSiteMutation({
 *   variables: {
 *     updateSiteInput: // value for 'updateSiteInput'
 *     siteId: // value for 'siteId'
 *   },
 * });
 */
export function useUpdateSiteMutation(options: VueApolloComposable.UseMutationOptions<UpdateSiteMutation, UpdateSiteMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateSiteMutation, UpdateSiteMutationVariables>>) {
  return VueApolloComposable.useMutation<UpdateSiteMutation, UpdateSiteMutationVariables>(UpdateSiteDocument, options);
}
export type UpdateSiteMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateSiteMutation, UpdateSiteMutationVariables>;