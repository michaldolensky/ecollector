/* eslint-disable */
// noinspection ES6UnusedImports
import * as Types from '../../../types/graphql';

import gql from 'graphql-tag';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export function useSiteQuery(options: Omit<Urql.UseQueryArgs<never, SiteQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<SiteQuery>({ query: SiteDocument, ...options });
};
export const CreateSiteDocument = gql`
    mutation createSite($createSiteInput: CreateSiteInput!) {
  createSite(createSiteInput: $createSiteInput) {
    id
    name
  }
}
    `;

export function useCreateSiteMutation() {
  return Urql.useMutation<CreateSiteMutation, CreateSiteMutationVariables>(CreateSiteDocument);
};
export const RemoveSiteDocument = gql`
    mutation removeSite($id: Int!) {
  removeSite(id: $id) {
    id
  }
}
    `;

export function useRemoveSiteMutation() {
  return Urql.useMutation<RemoveSiteMutation, RemoveSiteMutationVariables>(RemoveSiteDocument);
};
export const UpdateSiteDocument = gql`
    mutation updateSite($updateSiteInput: UpdateSiteInput!, $siteId: Int!) {
  updateSite(updateSiteInput: $updateSiteInput, siteId: $siteId) {
    id
    name
  }
}
    `;

export function useUpdateSiteMutation() {
  return Urql.useMutation<UpdateSiteMutation, UpdateSiteMutationVariables>(UpdateSiteDocument);
};