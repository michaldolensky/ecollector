/* eslint-disable */
// noinspection ES6UnusedImports
import * as Types from '../../../../../types/graphql';

import gql from 'graphql-tag';
import * as VueApolloComposable from '@vue/apollo-composable';
import * as VueCompositionApi from 'vue';
export type ReactiveFunction<TParam> = () => TParam;
export type RemoveImageMutationVariables = Types.Exact<{
  deleteImageInput: Types.DeleteImageInput;
  siteId: Types.Scalars['Int'];
}>;


export type RemoveImageMutation = { __typename?: 'Mutation', removeImage: { __typename?: 'Image', id: number } };

export type UploadFileMutationVariables = Types.Exact<{
  files: Array<Types.Scalars['Upload']> | Types.Scalars['Upload'];
  itemId: Types.Scalars['Int'];
  siteId: Types.Scalars['Int'];
}>;


export type UploadFileMutation = { __typename?: 'Mutation', uploadFile: boolean };


export const RemoveImageDocument = gql`
    mutation removeImage($deleteImageInput: DeleteImageInput!, $siteId: Int!) {
  removeImage(deleteImageInput: $deleteImageInput, siteId: $siteId) {
    id
  }
}
    `;

/**
 * __useRemoveImageMutation__
 *
 * To run a mutation, you first call `useRemoveImageMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useRemoveImageMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useRemoveImageMutation({
 *   variables: {
 *     deleteImageInput: // value for 'deleteImageInput'
 *     siteId: // value for 'siteId'
 *   },
 * });
 */
export function useRemoveImageMutation(options: VueApolloComposable.UseMutationOptions<RemoveImageMutation, RemoveImageMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<RemoveImageMutation, RemoveImageMutationVariables>>) {
  return VueApolloComposable.useMutation<RemoveImageMutation, RemoveImageMutationVariables>(RemoveImageDocument, options);
}
export type RemoveImageMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<RemoveImageMutation, RemoveImageMutationVariables>;
export const UploadFileDocument = gql`
    mutation UploadFile($files: [Upload!]!, $itemId: Int!, $siteId: Int!) {
  uploadFile(uploadImageInput: {files: $files, itemId: $itemId}, siteId: $siteId)
}
    `;

/**
 * __useUploadFileMutation__
 *
 * To run a mutation, you first call `useUploadFileMutation` within a Vue component and pass it any options that fit your needs.
 * When your component renders, `useUploadFileMutation` returns an object that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - Several other properties: https://v4.apollo.vuejs.org/api/use-mutation.html#return
 *
 * @param options that will be passed into the mutation, supported options are listed on: https://v4.apollo.vuejs.org/guide-composable/mutation.html#options;
 *
 * @example
 * const { mutate, loading, error, onDone } = useUploadFileMutation({
 *   variables: {
 *     files: // value for 'files'
 *     itemId: // value for 'itemId'
 *     siteId: // value for 'siteId'
 *   },
 * });
 */
export function useUploadFileMutation(options: VueApolloComposable.UseMutationOptions<UploadFileMutation, UploadFileMutationVariables> | ReactiveFunction<VueApolloComposable.UseMutationOptions<UploadFileMutation, UploadFileMutationVariables>>) {
  return VueApolloComposable.useMutation<UploadFileMutation, UploadFileMutationVariables>(UploadFileDocument, options);
}
export type UploadFileMutationCompositionFunctionResult = VueApolloComposable.UseMutationReturn<UploadFileMutation, UploadFileMutationVariables>;