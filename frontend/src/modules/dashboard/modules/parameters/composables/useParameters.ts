import { useRouteParams } from "src/composables/useRoute";
import {
  useCreateParameterMutation,
  useUpdateParameterMutation,
} from "src/modules/dashboard/modules/parameters/graphql/parameterDashboard.operations.urql";
import { CreateParameterInput, UpdateParameterInput } from "src/types/graphql";

export function useParameters() {
  const { siteId } = useRouteParams();

  const { executeMutation: createParameterMutation } =
    useCreateParameterMutation();
  const { executeMutation: updateParameterMutation } =
    useUpdateParameterMutation();

  // eslint-disable-next-line max-len
  const createParameter = (createParameterInput: CreateParameterInput) =>
    createParameterMutation({ createParameterInput, siteId: siteId.value });
  // eslint-disable-next-line max-len
  const updateParameter = (updateParameterInput: UpdateParameterInput) =>
    updateParameterMutation({ updateParameterInput, siteId: siteId.value });

  return {
    createParameter,
    updateParameter,
  };
}
