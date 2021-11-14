import {
  useUpdateUserMutation, useDeleteUserMutation, UpdateUserInput,
} from 'src/apollo/composition-functions';

export function useUsers() {
  const { mutate: deleteUserMutation } = useDeleteUserMutation({});
  const { mutate: updateUserMutation } = useUpdateUserMutation({});

  const removeUser = (id: number) => deleteUserMutation({
    id,
  });

  const updateUser = (updateUserInput: UpdateUserInput) => updateUserMutation({ updateUserInput });

  return {
    updateUser, removeUser,
  };
}
