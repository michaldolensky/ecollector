import gql from 'graphql-tag';

export const DELETE_IMAGE = gql`
  mutation removeImage($deleteImageInput:DeleteImageInput!,$siteId:Int!){
    removeImage(deleteImageInput: $deleteImageInput,siteId: $siteId) {
      id
    }
  }
`;
