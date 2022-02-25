import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "src/modules/account/graphql/profile.operations";
import { UpdateUserInput } from "src/types/graphql";

export function useUsers() {
  const { mutate: deleteUserMutation } = useDeleteUserMutation({});
  const { mutate: updateUserMutation } = useUpdateUserMutation({});

  const removeUser = () => deleteUserMutation();

  const updateUser = (updateUserInput: UpdateUserInput) =>
    updateUserMutation({ updateUserInput });

  return {
    updateUser,
    removeUser,
  };
}
