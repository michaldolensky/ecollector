/* eslint-disable */
// noinspection ES6UnusedImports
import * as Types from '../../../../../types/graphql';

import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type ReactiveFunction<TParam> = () => TParam;
export type CreateParameterMutationVariables = Types.Exact<{
  createParameterInput: Types.CreateParameterInput;
  siteId: Types.Scalars['Int'];
}>;


export type CreateParameterMutation = { __typename?: 'Mutation', createParameter: { __typename?: 'Parameter', id: number, type: Types.ParameterType, name: string } };

export type RemoveParameterMutationVariables = Types.Exact<{
  deleteParameterInput: Types.DeleteParameterInput;
  siteId: Types.Scalars['Int'];
}>;


export type RemoveParameterMutation = { __typename?: 'Mutation', removeParameter: { __typename?: 'Parameter', id: number } };

export type UpdateParameterMutationVariables = Types.Exact<{
  updateParameterInput: Types.UpdateParameterInput;
  siteId: Types.Scalars['Int'];
}>;


export type UpdateParameterMutation = { __typename?: 'Mutation', updateParameter: { __typename?: 'Parameter', id: number, name: string, type: Types.ParameterType } };

export type GetParametersQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.ParameterFilterInput>;
  siteId: Types.Scalars['Int'];
}>;


export type GetParametersQuery = { __typename?: 'Query', parameters: Array<{ __typename?: 'Parameter', id: number, name: string, type: Types.ParameterType }> };

export type GetParameterQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type GetParameterQuery = { __typename?: 'Query', parameter: { __typename?: 'Parameter', id: number, name: string, type: Types.ParameterType } };


export const CreateParameterDocument = gql`
    mutation createParameter($createParameterInput: CreateParameterInput!, $siteId: Int!) {
  createParameter(createParameterInput: $createParameterInput, siteId: $siteId) {
    id
    type
    name
  }
}
    `;

/**
 * __useCreateParameterMutation__
 *
 * To run a mutation, you first call `useCreateParameterMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateParameterMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateParameterMutation({
 *   variables: {
 *     createParameterInput: // value for 'createParameterInput'
 *     siteId: // value for 'siteId'
 *   },
 * });
 */
export function useCreateParameterMutation(options: VueApolloComposable.UseMutationOptions<CreateParameterMutation, CreateParameterMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateParameterMutation, CreateParameterMutationVariables>>) {
  return VueApolloComposable.useMutation<CreateParameterMutation, CreateParameterMutationVariables>(CreateParameterDocument, options);
}
export type CreateParameterMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateParameterMutation, CreateParameterMutationVariables>;
export const RemoveParameterDocument = gql`
    mutation removeParameter($deleteParameterInput: DeleteParameterInput!, $siteId: Int!) {
  removeParameter(deleteParameterInput: $deleteParameterInput, siteId: $siteId) {
    id
  }
}
    `;

/**
 * __useRemoveParameterMutation__
 *
 * To run a mutation, you first call `useRemoveParameterMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRemoveParameterMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRemoveParameterMutation({
 *   variables: {
 *     deleteParameterInput: // value for 'deleteParameterInput'
 *     siteId: // value for 'siteId'
 *   },
 * });
 */
export function useRemoveParameterMutation(options: VueApolloComposable.UseMutationOptions<RemoveParameterMutation, RemoveParameterMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RemoveParameterMutation, RemoveParameterMutationVariables>>) {
  return VueApolloComposable.useMutation<RemoveParameterMutation, RemoveParameterMutationVariables>(RemoveParameterDocument, options);
}
export type RemoveParameterMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RemoveParameterMutation, RemoveParameterMutationVariables>;
export const UpdateParameterDocument = gql`
    mutation updateParameter($updateParameterInput: UpdateParameterInput!, $siteId: Int!) {
  updateParameter(updateParameterInput: $updateParameterInput, siteId: $siteId) {
    id
    name
    type
  }
}
    `;

/**
 * __useUpdateParameterMutation__
 *
 * To run a mutation, you first call `useUpdateParameterMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateParameterMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateParameterMutation({
 *   variables: {
 *     updateParameterInput: // value for 'updateParameterInput'
 *     siteId: // value for 'siteId'
 *   },
 * });
 */
export function useUpdateParameterMutation(options: VueApolloComposable.UseMutationOptions<UpdateParameterMutation, UpdateParameterMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateParameterMutation, UpdateParameterMutationVariables>>) {
  return VueApolloComposable.useMutation<UpdateParameterMutation, UpdateParameterMutationVariables>(UpdateParameterDocument, options);
}
export type UpdateParameterMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateParameterMutation, UpdateParameterMutationVariables>;
export const GetParametersDocument = gql`
    query getParameters($filter: ParameterFilterInput, $siteId: Int!) {
  parameters(filter: $filter, siteId: $siteId) {
    id
    name
    type
  }
}
    `;

/**
 * __useGetParametersQuery__
 *
 * To run a query within a Vue component, call `useGetParametersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetParametersQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetParametersQuery({
 *   filter: // value for 'filter'
 *   siteId: // value for 'siteId'
 * });
 */
export function useGetParametersQuery(variables: GetParametersQueryVariables | VueCompositionApi.Ref<GetParametersQueryVariables> | ReactiveFunction<GetParametersQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetParametersQuery, GetParametersQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetParametersQuery, GetParametersQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetParametersQuery, GetParametersQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetParametersQuery, GetParametersQueryVariables>(GetParametersDocument, variables, options);
}
export type GetParametersQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetParametersQuery, GetParametersQueryVariables>;
export const GetParameterDocument = gql`
    query getParameter($id: Int!) {
  parameter(id: $id) {
    id
    name
    type
  }
}
    `;

/**
 * __useGetParameterQuery__
 *
 * To run a query within a Vue component, call `useGetParameterQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetParameterQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetParameterQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetParameterQuery(variables: GetParameterQueryVariables | VueCompositionApi.Ref<GetParameterQueryVariables> | ReactiveFunction<GetParameterQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetParameterQuery, GetParameterQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetParameterQuery, GetParameterQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetParameterQuery, GetParameterQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetParameterQuery, GetParameterQueryVariables>(GetParameterDocument, variables, options);
}
export type GetParameterQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetParameterQuery, GetParameterQueryVariables>;