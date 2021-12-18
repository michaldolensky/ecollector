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
      ref="form"
      class="items-start full-width"
      @submit="onSubmit"
    >
      <div class="row">
        <div class="col-12 col-md-8 q-pa-md q-gutter-md">
          <q-card>
            <q-card-section>
              <div class="text-h6 text-weight-regular">
                {{ $t('dashboard.categories.card.title.category_description') }}
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
              <item-category-select
                v-model="parameter.categories"
                multiple
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
import ItemCategorySelect from 'components/dashboard/forms/select/ItemCategorySelect.vue';
import ParameterTypeSelect from 'components/dashboard/forms/select/ParameterTypeSelect.vue';
import DashboardPage from 'pages/site/dashboard/DashboardPage.vue';
import { QForm, useQuasar } from 'quasar';
import { ParameterType } from 'src/apollo/composition-functions';
import { useParameters } from 'src/composables/useParameters';
import { validationHelper } from 'src/validationHelper';

import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const router = useRouter();
const { createParameter } = useParameters();
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
  categories: [],
};

const parameter = reactive(resetObject);
const form = ref<QForm>();

const onSubmit = () => {
  delete parameter.id;
  void createParameter(parameter).then((result) => {
    if (result?.data) {
      notify({
        type: 'positive',
        message: t('dashboard.categories.notification.message.category_created'),
      });
      void router.push({
        name: 'DashBoardCategoryEdit',
        params: { paramId: result.data.createParameter.id },
      });
    }
  });
};

</script>
