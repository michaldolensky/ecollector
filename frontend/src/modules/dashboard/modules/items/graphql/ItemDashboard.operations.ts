/* eslint-disable */
// noinspection ES6UnusedImports
import * as Types from '../../../../../types/graphql';

import { gql } from '@urql/vue';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type ItemQueryVariables = Types.Exact<{
  id: Types.Scalars['Int'];
}>;


export type ItemQuery = { __typename?: 'Query', item: { __typename?: 'Item', id: number, name: string, numberForExchange: number, numberInCollection: number, internalNumber: string, longDesc: string, shortDesc: string, categoryId: number, updatedAt: any, createdAt: any, images?: Array<{ __typename?: 'Image', id: number, main: boolean, file: { __typename?: 'S3File', id: number, url: string } } | null> | null, itemParameters: Array<{ __typename?: 'ItemParameter', id: number, value: string, parameter: { __typename?: 'Parameter', id: number, name: string, type: Types.ParameterType } }> } };

export type EditItemImageFragment = { __typename?: 'Image', id: number, main: boolean, file: { __typename?: 'S3File', id: number, url: string } };

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


export type UpdateItemMutation = { __typename?: 'Mutation', updateItem: { __typename?: 'Item', id: number, name: string, numberForExchange: number, numberInCollection: number, internalNumber: string, longDesc: string, shortDesc: string, categoryId: number, updatedAt: any, createdAt: any, images?: Array<{ __typename?: 'Image', id: number, main: boolean, file: { __typename?: 'S3File', id: number, url: string } } | null> | null } };

export type GetItemsQueryVariables = Types.Exact<{
  filter?: Types.InputMaybe<Types.ItemFilterInput>;
  siteId: Types.Scalars['Int'];
}>;


export type GetItemsQuery = { __typename?: 'Query', items: Array<{ __typename?: 'Item', id: number, name: string, createdAt: any, updatedAt: any, numberForExchange: number, numberInCollection: number, category: { __typename?: 'Category', name: string }, images?: Array<{ __typename?: 'Image', id: number, main: boolean, file: { __typename?: 'S3File', id: number, url: string } } | null> | null }> };

export const EditItemImageFragmentDoc = gql`
    fragment EditItemImage on Image {
  id
  main
  file {
    id
    url
  }
}
    `;
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
      ...EditItemImage
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
    ${EditItemImageFragmentDoc}`;

export function useItemQuery(options: Omit<Urql.UseQueryArgs<never, ItemQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<ItemQuery>({ query: ItemDocument, ...options });
};
export const CreateItemDocument = gql`
    mutation createItem($createItemInput: CreateItemInput!, $siteId: Int!) {
  createItem(createItemInput: $createItemInput, siteId: $siteId) {
    id
    categoryId
    name
  }
}
    `;

export function useCreateItemMutation() {
  return Urql.useMutation<CreateItemMutation, CreateItemMutationVariables>(CreateItemDocument);
};
export const RemoveItemDocument = gql`
    mutation removeItem($deleteItemInput: DeleteItemInput!, $siteId: Int!) {
  removeItem(deleteItemInput: $deleteItemInput, siteId: $siteId) {
    id
  }
}
    `;

export function useRemoveItemMutation() {
  return Urql.useMutation<RemoveItemMutation, RemoveItemMutationVariables>(RemoveItemDocument);
};
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
      ...EditItemImage
    }
  }
}
    ${EditItemImageFragmentDoc}`;

export function useUpdateItemMutation() {
  return Urql.useMutation<UpdateItemMutation, UpdateItemMutationVariables>(UpdateItemDocument);
};
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
      ...EditItemImage
    }
  }
}
    ${EditItemImageFragmentDoc}`;

export function useGetItemsQuery(options: Omit<Urql.UseQueryArgs<never, GetItemsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetItemsQuery>({ query: GetItemsDocument, ...options });
};