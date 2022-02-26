/* eslint-disable */
// noinspection ES6UnusedImports
import * as Types from '../../../../../types/graphql';

import { gql } from '@urql/vue';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
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

export function useCreateParameterMutation() {
  return Urql.useMutation<CreateParameterMutation, CreateParameterMutationVariables>(CreateParameterDocument);
};
export const RemoveParameterDocument = gql`
    mutation removeParameter($deleteParameterInput: DeleteParameterInput!, $siteId: Int!) {
  removeParameter(deleteParameterInput: $deleteParameterInput, siteId: $siteId) {
    id
  }
}
    `;

export function useRemoveParameterMutation() {
  return Urql.useMutation<RemoveParameterMutation, RemoveParameterMutationVariables>(RemoveParameterDocument);
};
export const UpdateParameterDocument = gql`
    mutation updateParameter($updateParameterInput: UpdateParameterInput!, $siteId: Int!) {
  updateParameter(updateParameterInput: $updateParameterInput, siteId: $siteId) {
    id
    name
    type
  }
}
    `;

export function useUpdateParameterMutation() {
  return Urql.useMutation<UpdateParameterMutation, UpdateParameterMutationVariables>(UpdateParameterDocument);
};
export const GetParametersDocument = gql`
    query getParameters($filter: ParameterFilterInput, $siteId: Int!) {
  parameters(filter: $filter, siteId: $siteId) {
    id
    name
    type
  }
}
    `;

export function useGetParametersQuery(options: Omit<Urql.UseQueryArgs<never, GetParametersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetParametersQuery>({ query: GetParametersDocument, ...options });
};
export const GetParameterDocument = gql`
    query getParameter($id: Int!) {
  parameter(id: $id) {
    id
    name
    type
  }
}
    `;

export function useGetParameterQuery(options: Omit<Urql.UseQueryArgs<never, GetParameterQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetParameterQuery>({ query: GetParameterDocument, ...options });
};