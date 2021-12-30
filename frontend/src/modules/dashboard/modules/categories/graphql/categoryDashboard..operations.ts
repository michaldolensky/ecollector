/* eslint-disable */
// noinspection ES6UnusedImports JSUnusedGlobalSymbols

import * as Types from '../../../../../types/graphql';

import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type ReactiveFunction<TParam> = () => TParam;
export type CreateCategoryMutationVariables = Types.Exact<{
  createCategoryInput: Types.CreateCategoryInput;
  siteId: Types.Scalars['Int'];
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory: { __typename?: 'Category', id: number, name: string, perex: string } };

export type RemoveCategoryMutationVariables = Types.Exact<{
  deleteCategoryInput: Types.DeleteCategoryInput;
  siteId: Types.Scalars['Int'];
}>;


export type RemoveCategoryMutation = { __typename?: 'Mutation', removeCategory: { __typename?: 'Category', id: number } };

export type UpdateCategoryMutationVariables = Types.Exact<{
  updateCategoryInput: Types.UpdateCategoryInput;
  siteId: Types.Scalars['Int'];
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'Category', id: number, name: string, perex: string } };

export type GetCategoriesQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.CategoryFilterInput>;
  siteId: Types.Scalars['Int'];
}>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: number, createdAt: any, updatedAt: any, name: string }> };

export type GetCategoriesForSelectorQueryVariables = Types.Exact<{
  siteId: Types.Scalars['Int'];
}>;


export type GetCategoriesForSelectorQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', id: number, name: string }> };

export type GetCategoryQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type GetCategoryQuery = { __typename?: 'Query', category: { __typename?: 'Category', id: number, name: string, perex: string } };


export const CreateCategoryDocument = gql`
    mutation createCategory($createCategoryInput: CreateCategoryInput!, $siteId: Int!) {
  createCategory(createCategoryInput: $createCategoryInput, siteId: $siteId) {
    id
    name
    perex
  }
}
    `;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateCategoryMutation({
 *   variables: {
 *     createCategoryInput: // value for 'createCategoryInput'
 *     siteId: // value for 'siteId'
 *   },
 * });
 */
export function useCreateCategoryMutation(options: VueApolloComposable.UseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>>) {
  return VueApolloComposable.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
}
export type CreateCategoryMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const RemoveCategoryDocument = gql`
    mutation removeCategory($deleteCategoryInput: DeleteCategoryInput!, $siteId: Int!) {
  removeCategory(deleteCategoryInput: $deleteCategoryInput, siteId: $siteId) {
    id
  }
}
    `;

/**
 * __useRemoveCategoryMutation__
 *
 * To run a mutation, you first call `useRemoveCategoryMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRemoveCategoryMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRemoveCategoryMutation({
 *   variables: {
 *     deleteCategoryInput: // value for 'deleteCategoryInput'
 *     siteId: // value for 'siteId'
 *   },
 * });
 */
export function useRemoveCategoryMutation(options: VueApolloComposable.UseMutationOptions<RemoveCategoryMutation, RemoveCategoryMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RemoveCategoryMutation, RemoveCategoryMutationVariables>>) {
  return VueApolloComposable.useMutation<RemoveCategoryMutation, RemoveCategoryMutationVariables>(RemoveCategoryDocument, options);
}
export type RemoveCategoryMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RemoveCategoryMutation, RemoveCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation updateCategory($updateCategoryInput: UpdateCategoryInput!, $siteId: Int!) {
  updateCategory(updateCategoryInput: $updateCategoryInput, siteId: $siteId) {
    id
    name
    perex
  }
}
    `;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateCategoryMutation({
 *   variables: {
 *     updateCategoryInput: // value for 'updateCategoryInput'
 *     siteId: // value for 'siteId'
 *   },
 * });
 */
export function useUpdateCategoryMutation(options: VueApolloComposable.UseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>>) {
  return VueApolloComposable.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
}
export type UpdateCategoryMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const GetCategoriesDocument = gql`
    query getCategories($filter: CategoryFilterInput, $siteId: Int!) {
  categories(filter: $filter, siteId: $siteId) {
    id
    createdAt
    updatedAt
    name
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a Vue component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCategoriesQuery({
 *   filter: // value for 'filter'
 *   siteId: // value for 'siteId'
 * });
 */
export function useGetCategoriesQuery(variables: GetCategoriesQueryVariables | VueCompositionApi.Ref<GetCategoriesQueryVariables> | ReactiveFunction<GetCategoriesQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetCategoriesQuery, GetCategoriesQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCategoriesQuery, GetCategoriesQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCategoriesQuery, GetCategoriesQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, variables, options);
}
export type GetCategoriesQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoriesForSelectorDocument = gql`
    query getCategoriesForSelector($siteId: Int!) {
  categories(siteId: $siteId) {
    id
    name
  }
}
    `;

/**
 * __useGetCategoriesForSelectorQuery__
 *
 * To run a query within a Vue component, call `useGetCategoriesForSelectorQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesForSelectorQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCategoriesForSelectorQuery({
 *   siteId: // value for 'siteId'
 * });
 */
export function useGetCategoriesForSelectorQuery(variables: GetCategoriesForSelectorQueryVariables | VueCompositionApi.Ref<GetCategoriesForSelectorQueryVariables> | ReactiveFunction<GetCategoriesForSelectorQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetCategoriesForSelectorQuery, GetCategoriesForSelectorQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCategoriesForSelectorQuery, GetCategoriesForSelectorQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCategoriesForSelectorQuery, GetCategoriesForSelectorQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetCategoriesForSelectorQuery, GetCategoriesForSelectorQueryVariables>(GetCategoriesForSelectorDocument, variables, options);
}
export type GetCategoriesForSelectorQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetCategoriesForSelectorQuery, GetCategoriesForSelectorQueryVariables>;
export const GetCategoryDocument = gql`
    query getCategory($id: Int!) {
  category(id: $id) {
    id
    name
    perex
  }
}
    `;

/**
 * __useGetCategoryQuery__
 *
 * To run a query within a Vue component, call `useGetCategoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetCategoryQuery({
 *   id: // value for 'id'
 * });
 */
export function useGetCategoryQuery(variables: GetCategoryQueryVariables | VueCompositionApi.Ref<GetCategoryQueryVariables> | ReactiveFunction<GetCategoryQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetCategoryQuery, GetCategoryQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetCategoryQuery, GetCategoryQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetCategoryQuery, GetCategoryQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetCategoryQuery, GetCategoryQueryVariables>(GetCategoryDocument, variables, options);
}
export type GetCategoryQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetCategoryQuery, GetCategoryQueryVariables>;
