import {
  CreateParameterInput, UpdateParameterInput,
  useCreateParameterMutation,
  useUpdateParameterMutation,
} from 'src/apollo/composition-functions';
import { useRouteParams } from 'src/composables/useRoute';

export function useParameters() {
  const { siteId } = useRouteParams();

  const { mutate: createParameterMutation } = useCreateParameterMutation({});
  const { mutate: updateParameterMutation } = useUpdateParameterMutation({});

  // eslint-disable-next-line max-len
  const createParameter = (createParameterInput:CreateParameterInput) => createParameterMutation({ createParameterInput, siteId: siteId.value });
  // eslint-disable-next-line max-len
  const updateParameter = (updateParameterInput:UpdateParameterInput) => updateParameterMutation({ updateParameterInput, siteId: siteId.value });

  return {
    createParameter,
    updateParameter,
  };
}
