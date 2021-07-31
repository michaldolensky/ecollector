import gql from 'graphql-tag';

export const CREATE_SITE = gql`
  mutation createSite($createSiteInput:CreateSiteInput!){
  createSite(createSiteInput: $createSiteInput) {
    id
    name
  }
}
`;
export const DELETE_SITE = gql`
  mutation removeSite($id:Int!){
    removeSite(id: $id) {
      id
    }
  }
`;
export const UPDATE_SITE = gql`
  mutation updateSite($updateSiteInput:UpdateSiteInput!){
    updateSite(updateSiteInput: $updateSiteInput) {
      id
      name
    }
  }
`;
