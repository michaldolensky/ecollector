/* eslint-disable */
// noinspection ES6UnusedImports
import * as Types from '../../../../../types/graphql';

import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type ReactiveFunction<TParam> = () => TParam;
export type ItemQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type ItemQuery = { __typename?: 'Query', item: { __typename?: 'Item', id: number, name: string, numberForExchange: number, numberInCollection: number, internalNumber: string, longDesc: string, shortDesc: string, categoryId: number, updatedAt: any, createdAt: any, images?: Array<{ __typename?: 'Image', id: number, main: boolean, file: { __typename?: 'File', id: number, url: string } } | null | undefined> | null | undefined, itemParameters: Array<{ __typename?: 'ItemParameter', id: number, value: string, parameter: { __typename?: 'Parameter', id: number, name: string, type: Types.ParameterType } }> } };

export type CreateItemMutationVariables = Types.Exact<{
  createItemInput: Types.CreateItemInput;
  siteId: Types.Scalars['Int'];
}>;


export type CreateItemMutation = { __typename?: 'Mutation', createItem: { __typename?: 'Item', id: number, categoryId: number, name: string } };

export type RemoveItemMutationVariables = Types.Exact<{
  deleteItemInput: Types.DeleteItemInput;
  siteId: Types.Scalars['Int'];
}>;


export type RemoveItemMutation = { __typename?: 'Mutation', removeItem: { __typename?: 'Item', id: number } };

export type UpdateItemMutationVariables = Types.Exact<{
  updateItemInput: Types.UpdateItemInput;
  siteId: Types.Scalars['Int'];
}>;


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem: { __typename?: 'Item', id: number, name: string, numberForExchange: number, numberInCollection: number, internalNumber: string, longDesc: string, shortDesc: string, categoryId: number, updatedAt: any, createdAt: any, images?: Array<{ __typename?: 'Image', id: number, main: boolean, file: { __typename?: 'File', id: number, url: string } } | null | undefined> | null | undefined } };

export type GetItemsQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.ItemFilterInput>;
  siteId: Types.Scalars['Int'];
}>;


export type GetItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: number, name: string, createdAt: any, updatedAt: any, numberForExchange: number, numberInCollection: number, category: { __typename?: 'Category', name: string }, images?: Array<{ __typename?: 'Image', main: boolean, file: { __typename?: 'File', id: number, url: string } } | null | undefined> | null | undefined }> };


export const ItemDocument = gql`
    query item($id: Int!) {
  item(id: $id) {
    id
    name
    numberForExchange
    numberInCollection
    internalNumber
    longDesc
    shortDesc
    categoryId
    updatedAt
    createdAt
    images {
      id
      main
      file {
        id
        url
      }
    }
    itemParameters {
      id
      parameter {
        id
        name
        type
      }
      value
    }
  }
}
    `;

/**
 * __useItemQuery__
 *
 * To run a query within a Vue component, call `useItemQuery` and pass it any options that fit your needs.
 * When your component renders, `useItemQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useItemQuery({
 *   id: // value for 'id'
 * });
 */
export function useItemQuery(variables: ItemQueryVariables | VueCompositionApi.Ref<ItemQueryVariables> | ReactiveFunction<ItemQueryVariables>, options: VueApolloComposable.UseQueryOptions<ItemQuery, ItemQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<ItemQuery, ItemQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<ItemQuery, ItemQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<ItemQuery, ItemQueryVariables>(ItemDocument, variables, options);
}
export type ItemQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<ItemQuery, ItemQueryVariables>;
export const CreateItemDocument = gql`
    mutation createItem($createItemInput: CreateItemInput!, $siteId: Int!) {
  createItem(createItemInput: $createItemInput, siteId: $siteId) {
    id
    categoryId
    name
  }
}
    `;

/**
 * __useCreateItemMutation__
 *
 * To run a mutation, you first call `useCreateItemMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useCreateItemMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useCreateItemMutation({
 *   variables: {
 *     createItemInput: // value for 'createItemInput'
 *     siteId: // value for 'siteId'
 *   },
 * });
 */
export function useCreateItemMutation(options: VueApolloComposable.UseMutationOptions<CreateItemMutation, CreateItemMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<CreateItemMutation, CreateItemMutationVariables>>) {
  return VueApolloComposable.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument, options);
}
export type CreateItemMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<CreateItemMutation, CreateItemMutationVariables>;
export const RemoveItemDocument = gql`
    mutation removeItem($deleteItemInput: DeleteItemInput!, $siteId: Int!) {
  removeItem(deleteItemInput: $deleteItemInput, siteId: $siteId) {
    id
  }
}
    `;

/**
 * __useRemoveItemMutation__
 *
 * To run a mutation, you first call `useRemoveItemMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRemoveItemMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRemoveItemMutation({
 *   variables: {
 *     deleteItemInput: // value for 'deleteItemInput'
 *     siteId: // value for 'siteId'
 *   },
 * });
 */
export function useRemoveItemMutation(options: VueApolloComposable.UseMutationOptions<RemoveItemMutation, RemoveItemMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RemoveItemMutation, RemoveItemMutationVariables>>) {
  return VueApolloComposable.useMutation<RemoveItemMutation, RemoveItemMutationVariables>(RemoveItemDocument, options);
}
export type RemoveItemMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RemoveItemMutation, RemoveItemMutationVariables>;
export const UpdateItemDocument = gql`
    mutation updateItem($updateItemInput: UpdateItemInput!, $siteId: Int!) {
  updateItem(updateItemInput: $updateItemInput, siteId: $siteId) {
    id
    name
    numberForExchange
    numberInCollection
    internalNumber
    longDesc
    shortDesc
    categoryId
    updatedAt
    createdAt
    images {
      id
      file {
        id
        url
      }
      main
    }
  }
}
    `;

/**
 * __useUpdateItemMutation__
 *
 * To run a mutation, you first call `useUpdateItemMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUpdateItemMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUpdateItemMutation({
 *   variables: {
 *     updateItemInput: // value for 'updateItemInput'
 *     siteId: // value for 'siteId'
 *   },
 * });
 */
export function useUpdateItemMutation(options: VueApolloComposable.UseMutationOptions<UpdateItemMutation, UpdateItemMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UpdateItemMutation, UpdateItemMutationVariables>>) {
  return VueApolloComposable.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument, options);
}
export type UpdateItemMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UpdateItemMutation, UpdateItemMutationVariables>;
export const GetItemsDocument = gql`
    query getItems($filter: ItemFilterInput, $siteId: Int!) {
  items(filter: $filter, siteId: $siteId) {
    id
    name
    createdAt
    updatedAt
    numberForExchange
    numberInCollection
    category {
      name
    }
    images(main: true) {
      file {
        id
        url
      }
      main
    }
  }
}
    `;

/**
 * __useGetItemsQuery__
 *
 * To run a query within a Vue component, call `useGetItemsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetItemsQuery` returns an object from Apollo Client that contains result, loading and error properties
 * you can use to render your UI.
 *
 * @param variables that will be passed into the query
 * @param options that will be passed into the query, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/query.html#options;
 *
 * @example
 * const { result, loading, error } = useGetItemsQuery({
 *   filter: // value for 'filter'
 *   siteId: // value for 'siteId'
 * });
 */
export function useGetItemsQuery(variables: GetItemsQueryVariables | VueCompositionApi.Ref<GetItemsQueryVariables> | ReactiveFunction<GetItemsQueryVariables>, options: VueApolloComposable.UseQueryOptions<GetItemsQuery, GetItemsQueryVariables> | VueCompositionApi.Ref<VueApolloComposable.UseQueryOptions<GetItemsQuery, GetItemsQueryVariables>> | ReactiveFunction<VueApolloComposable.UseQueryOptions<GetItemsQuery, GetItemsQueryVariables>> = {}) {
  return VueApolloComposable.useQuery<GetItemsQuery, GetItemsQueryVariables>(GetItemsDocument, variables, options);
}
export type GetItemsQueryCompositionFunctionResult = VueApolloComposable.UseQueryReturn<GetItemsQuery, GetItemsQueryVariables>;