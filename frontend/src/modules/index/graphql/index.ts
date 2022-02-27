/* eslint-disable */
// noinspection ES6UnusedImports
import * as Types from '../../../types/graphql';

import { gql } from '@urql/vue';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type GetPublicSitesQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetPublicSitesQuery = { __typename?: 'Query', sites: Array<{ __typename?: 'Site', id: number, name: string, owner: { __typename?: 'User', firstName?: string | null, lastName?: string | null } }> };


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

export function useGetPublicSitesQuery(options: Omit<Urql.UseQueryArgs<never, GetPublicSitesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPublicSitesQuery>({ query: GetPublicSitesDocument, ...options });
};