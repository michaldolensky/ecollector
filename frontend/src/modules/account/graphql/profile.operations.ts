/* eslint-disable */
// noinspection ES6UnusedImports
import * as Types from '../../../types/graphql';

import { gql } from '@urql/vue';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type DeleteUserMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type DeleteUserMutation = { __typename?: 'Mutation', removeUser: { __typename?: 'User', id: number } };

export type UpdateUserMutationVariables = Types.Exact<{
  updateUserInput: Types.UpdateUserInput;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', firstName?: string | null, lastName?: string | null } };


export const DeleteUserDocument = gql`
    mutation deleteUser {
  removeUser {
    id
  }
}
    `;

export function useDeleteUserMutation() {
  return Urql.useMutation<DeleteUserMutation, DeleteUserMutationVariables>(DeleteUserDocument);
};
export const UpdateUserDocument = gql`
    mutation updateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    firstName
    lastName
  }
}
    `;

export function useUpdateUserMutation() {
  return Urql.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument);
};