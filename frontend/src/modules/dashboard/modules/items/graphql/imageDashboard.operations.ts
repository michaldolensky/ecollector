/* eslint-disable */
// noinspection ES6UnusedImports
import * as Types from '../../../../../types/graphql';

import gql from 'graphql-tag';
import { EditItemImageFragmentDoc } from './ItemDashboard.operations';
import * as Urql from '@urql/vue';
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RemoveImageMutationVariables = Types.Exact<{
  deleteImageInput: Types.DeleteImageInput;
  siteId: Types.Scalars['Int'];
}>;


export type RemoveImageMutation = { __typename?: 'Mutation', removeImage: { __typename?: 'Image', id: number } };

export type UploadImageMutationVariables = Types.Exact<{
  files: Array<Types.Scalars['Upload']> | Types.Scalars['Upload'];
  itemId: Types.Scalars['Int'];
  siteId: Types.Scalars['Int'];
}>;


export type UploadImageMutation = { __typename?: 'Mutation', uploadImage: Array<{ __typename?: 'Image', id: number, main: boolean, file: { __typename?: 'S3File', id: number, url: string } }> };


export const RemoveImageDocument = gql`
    mutation removeImage($deleteImageInput: DeleteImageInput!, $siteId: Int!) {
  removeImage(deleteImageInput: $deleteImageInput, siteId: $siteId) {
    id
  }
}
    `;

export function useRemoveImageMutation() {
  return Urql.useMutation<RemoveImageMutation, RemoveImageMutationVariables>(RemoveImageDocument);
};
export const UploadImageDocument = gql`
    mutation uploadImage($files: [Upload!]!, $itemId: Int!, $siteId: Int!) {
  uploadImage(uploadImageInput: {files: $files, itemId: $itemId}, siteId: $siteId) {
    ...EditItemImage
  }
}
    ${EditItemImageFragmentDoc}`;

export function useUploadImageMutation() {
  return Urql.useMutation<UploadImageMutation, UploadImageMutationVariables>(UploadImageDocument);
};