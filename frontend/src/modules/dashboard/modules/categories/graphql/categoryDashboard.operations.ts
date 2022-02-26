/* eslint-disable */
// noinspection ES6UnusedImports
import * as Types from '../../../../../types/graphql';

import { gql } from '@urql/vue';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export function useCreateCategoryMutation() {
  return Urql.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument);
};
export const RemoveCategoryDocument = gql`
    mutation removeCategory($deleteCategoryInput: DeleteCategoryInput!, $siteId: Int!) {
  removeCategory(deleteCategoryInput: $deleteCategoryInput, siteId: $siteId) {
    id
  }
}
    `;

export function useRemoveCategoryMutation() {
  return Urql.useMutation<RemoveCategoryMutation, RemoveCategoryMutationVariables>(RemoveCategoryDocument);
};
export const UpdateCategoryDocument = gql`
    mutation updateCategory($updateCategoryInput: UpdateCategoryInput!, $siteId: Int!) {
  updateCategory(updateCategoryInput: $updateCategoryInput, siteId: $siteId) {
    id
    name
    perex
  }
}
    `;

export function useUpdateCategoryMutation() {
  return Urql.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument);
};
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

export function useGetCategoriesQuery(options: Omit<Urql.UseQueryArgs<never, GetCategoriesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCategoriesQuery>({ query: GetCategoriesDocument, ...options });
};
export const GetCategoriesForSelectorDocument = gql`
    query getCategoriesForSelector($siteId: Int!) {
  categories(siteId: $siteId) {
    id
    name
  }
}
    `;

export function useGetCategoriesForSelectorQuery(options: Omit<Urql.UseQueryArgs<never, GetCategoriesForSelectorQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCategoriesForSelectorQuery>({ query: GetCategoriesForSelectorDocument, ...options });
};
export const GetCategoryDocument = gql`
    query getCategory($id: Int!) {
  category(id: $id) {
    id
    name
    perex
  }
}
    `;

export function useGetCategoryQuery(options: Omit<Urql.UseQueryArgs<never, GetCategoryQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetCategoryQuery>({ query: GetCategoryDocument, ...options });
};