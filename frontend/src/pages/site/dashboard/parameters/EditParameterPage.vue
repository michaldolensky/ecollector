<template>
  <dashboard-page>
    <dashboard-page-header
      :title="$t(props.header)"
    >
      <q-btn
        :label="$t('buttons.common.save')"
        color="secondary"
        icon="save"
        @click="form?.submit()"
      />
    </dashboard-page-header>

    <q-form
      v-if="!loading"
      ref="form"
      class="items-start full-width"
      @submit="onSubmit"
    >
      <div class="row">
        <div class="col-12 col-md-8 q-pa-md q-gutter-md">
          <q-card>
            <q-card-section>
              <div class="text-h6 text-weight-regular">
                {{ $t('dashboard.parameters.card.title.parameterProperties') }}
              </div>
            </q-card-section>

            <q-separator />
            <q-card-section>
              <q-input
                v-model="parameter.name"
                :label=" $t('dashboard.parameters.table.column.label.name') "
                :rules="[required]"
                outlined
              />
              <parameter-type-select
                v-model="parameter.type"
                required
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-form>
  </dashboard-page>
</template>

<script lang="ts" setup>
import DashboardPageHeader from 'components/dashboard/DashboardPageHeader.vue';
import ParameterTypeSelect from 'components/dashboard/forms/select/ParameterTypeSelect.vue';
import DashboardPage from 'pages/site/dashboard/DashboardPage.vue';
import { QForm, useQuasar } from 'quasar';
import { ParameterType, useGetParameterQuery } from 'src/apollo/composition-functions';
import { useParameters } from 'src/composables/useParameters';
import { validationHelper } from 'src/validationHelper';

import { onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const { createParameter, updateParameter } = useParameters();
const { required } = validationHelper;

const { notify } = useQuasar();

const { t } = useI18n();

interface Props {
  inEditMode?: boolean,
  paramId?: number,
  header?:string
}

const props = withDefaults(defineProps<Props>(), {
  header: 'dashboard.headers.createParameter',
  paramId: undefined,
});

const resetObject = {
  id: 0,
  name: '',
  type: ParameterType.Text,
};

const parameter = reactive(resetObject);
const enableQuery = ref(false);
const form = ref<QForm>();

const { onResult, restart, loading } = useGetParameterQuery({
  id: props.paramId,
}, () => ({
  enabled: enableQuery.value,
}));
onMounted(() => {
  if (props.inEditMode) enableQuery.value = true;
});

onResult((result) => {
  if (!result.loading) {
    parameter.id = result.data.parameter.id;
    parameter.name = result.data.parameter.name;
    parameter.type = result.data.parameter.type;
  }
});
restart();

const onSubmit = () => {
  if (props.inEditMode) {
    void updateParameter(parameter).then((result) => {
      if (result?.data) {
        notify({
          type: 'positive',
          message: t('dashboard.parameters.notification.message.parameter_updated'),
        });
      }
    });
  } else {
    delete parameter.id;
    void createParameter(parameter).then((result) => {
      if (result?.data) {
        notify({
          type: 'positive',
          message: t('dashboard.parameters.notification.message.parameter_created'),
        });
        void router.push({
          name: 'DashBoardParameterEdit',
          params: { paramId: result.data.createParameter.id },
        });
      }
    });
  }
};

</script>
