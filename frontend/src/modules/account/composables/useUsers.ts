import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "src/modules/account/graphql/profile.operations.urql";
import { UpdateUserInput } from "src/types/graphql";

export function useUsers() {
  const { executeMutation: deleteUserMutation } = useDeleteUserMutation();
  const { executeMutation: updateUserMutation } = useUpdateUserMutation();

  const removeUser = () => deleteUserMutation({});

  const updateUser = (updateUserInput: UpdateUserInput) =>
    updateUserMutation({ updateUserInput });

  return {
    updateUser,
    removeUser,
  };
}
