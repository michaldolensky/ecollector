import { useResult } from '@vue/apollo-composable';
import { useQuasar } from 'quasar';
import { useRouteParams } from 'src/composables/useRoute';

import {
  useGetParametersQuery,
  useRemoveParameterMutation,
} from 'src/modules/dashboard/modules/parameters/graphql/parameterDashboard.operations';
import { Parameter, ParameterFilterInput } from 'src/types/graphql';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const filter = reactive<ParameterFilterInput>({
  name: null,
});

export function useDashboardParameters() {
  const { siteId } = useRouteParams();
  const { dialog } = useQuasar();
  const { t } = useI18n();

  const { mutate: removeParameterMutation } = useRemoveParameterMutation({});

  const resetFilter = () => {
    filter.name = null;
  };

  const { result, loading, refetch } = useGetParametersQuery({
    siteId: siteId.value,
    filter,
  });
  const removeParameter = (id:number) => removeParameterMutation({
    deleteParameterInput: {
      parameterId: id,
    },
    siteId: siteId.value,
  });
  const confirmDelete = (parameter: Parameter) => {
    dialog({
      title: t('dialogs.titles.confirm', [parameter.name]),
      message: t('dashboard.parameters.dialogs.message.delete', [parameter.name]),
      cancel: true,
      persistent: true,
    }).onOk(() => {
      if (parameter.id != null) void removeParameter(parameter.id).then(() => void refetch());
    });
  };

  return {
    parameters: useResult(result, []),
    loading,
    refetch,
    filter,
    confirmDelete,
    resetFilter,
  };
}
