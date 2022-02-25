<script lang="ts" setup>
import DashboardPageHeader from "src/modules/dashboard/components/DashboardPageHeader.vue";
import ParameterTypeSelect from "src/modules/dashboard/modules/parameters/components/ParameterTypeSelect.vue";
import DashboardPage from "src/modules/dashboard/DashboardModule.vue";
import { QForm, useQuasar } from "quasar";
import { useParameters } from "src/modules/dashboard/modules/parameters/composables/useParameters";
import { useGetParameterQuery } from "src/modules/dashboard/modules/parameters/graphql/parameterDashboard.operations.urql";
import { ParameterType } from "src/types/graphql";
import { validationHelper } from "src/validationHelper";

import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter();
const { createParameter, updateParameter } = useParameters();
const { required } = validationHelper;

const { notify } = useQuasar();

const { t } = useI18n();

interface Props {
  inEditMode?: boolean;
  paramId?: number;
  headerTitle: string;
}

const props = withDefaults(defineProps<Props>(), {
  paramId: undefined,
});

const resetObject = {
  id: 0,
  name: "",
  type: ParameterType.Text,
};

const parameter = reactive(resetObject);
const form = ref<QForm>();

const { fetching, then } = useGetParameterQuery({
  pause: props.inEditMode,
  variables: {
    id: props.paramId,
  },
});

then((result) => {
  if (result.data.value?.parameter) {
    parameter.id = result.data.value.parameter.id;
    parameter.name = result.data.value.parameter.name;
    parameter.type = result.data.value.parameter.type;
  }
});

const onSubmit = () => {
  if (props.inEditMode) {
    void updateParameter(parameter).then((result) => {
      if (result?.data) {
        notify({
          type: "positive",
          message: t(
            "dashboard.parameters.notification.message.parameter_updated"
          ),
        });
      }
    });
  } else {
    delete parameter.id;
    void createParameter(parameter).then((result) => {
      if (result?.data) {
        notify({
          type: "positive",
          message: t(
            "dashboard.parameters.notification.message.parameter_created"
          ),
        });
        void router.push({
          name: "DashBoardParameterEdit",
          params: { paramId: result.data.createParameter.id },
        });
      }
    });
  }
};
</script>

<template>
  <dashboard-page>
    <dashboard-page-header :title="props.headerTitle">
      <q-btn
        :label="$t('buttons.common.save')"
        color="secondary"
        icon="save"
        @click="form?.submit()"
      />
    </dashboard-page-header>

    <q-form
      v-if="!fetching"
      ref="form"
      class="items-start full-width"
      @submit="onSubmit"
    >
      <div class="row">
        <div class="col-12 col-md-8 q-pa-md q-gutter-md">
          <q-card>
            <q-card-section>
              <div class="text-h6 text-weight-regular">
                {{ $t("dashboard.parameters.card.title.parameterProperties") }}
              </div>
            </q-card-section>

            <q-separator />
            <q-card-section>
              <q-input
                v-model="parameter.name"
                :label="$t('dashboard.parameters.table.column.label.name')"
                :rules="[required]"
                outlined
              />
              <parameter-type-select v-model="parameter.type" required />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-form>
  </dashboard-page>
</template>
