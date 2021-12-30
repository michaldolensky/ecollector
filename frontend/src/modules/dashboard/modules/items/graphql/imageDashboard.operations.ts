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