import {
  CreateParameterInput,
  useCreateParameterMutation,
  useGetParametersQuery,
} from 'src/apollo/composition-functions';

export function useParameters() {
  const { result, loading, refetch } = useGetParametersQuery();

  const { mutate: createParameterMutation } = useCreateParameterMutation({});

  // eslint-disable-next-line max-len
  const createParameter = (createParameterInput:CreateParameterInput) => createParameterMutation({ createParameterInput });

  return {
    result,
    loading,
    refetch,
    createParameter,
  };
}
