<script lang="ts" setup>
import { QForm, useQuasar } from "quasar";
import DashboardPageHeader from "src/modules/dashboard/components/DashboardPageHeader.vue";
import DashboardPage from "src/modules/dashboard/DashboardModule.vue";

import { useCategories } from "src/modules/dashboard/modules/categories/composables/useCategories";
import { useGetCategoryQuery } from "src/modules/dashboard/modules/categories/graphql/categoryDashboard.operations";
import { UpdateCategoryInput } from "src/types/graphql";
import { validationHelper } from "src/validationHelper";

import { reactive, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";

const router = useRouter();
const { updateCategory, createCategory } = useCategories();
const { required } = validationHelper;

const { notify } = useQuasar();

const { t } = useI18n();

interface Props {
  inEditMode?: boolean;
  categoryId?: number;
  header?: string;
}

const props = withDefaults(defineProps<Props>(), {
  header: "dashboard.headers.createCategory",
  categoryId: undefined,
});

const resetObject: UpdateCategoryInput = {
  id: 0,
  name: "",
  perex: "",
};

const category = reactive(resetObject);
const form = ref<QForm>();

const {
  data: resultData,
  fetching,
  then,
} = useGetCategoryQuery({
  pause: props.inEditMode,
  variables: {
    id: props.categoryId,
  },
});
then(({ data }) => {
  if (data.value?.category) {
    category.id = data.value.category.id;
    category.name = data.value.category.name;
    category.perex = data.value.category.perex;
  }
});

const onSubmit = () => {
  if (props.inEditMode) {
    void updateCategory(category).then((result) => {
      if (result) {
        notify({
          type: "positive",
          message: t(
            "dashboard.categories.notification.message.category_updated"
          ),
        });
      }
    });
  } else {
    delete category.id;
    void createCategory(category).then((result) => {
      if (result) {
        notify({
          type: "positive",
          message: t(
            "dashboard.categories.notification.message.category_created"
          ),
        });
        void router.push({
          name: "DashBoardCategoryEdit",
          params: { categoryId: resultData.createCategory.id },
        });
      }
    });
  }
};
</script>

<template>
  <dashboard-page>
    <dashboard-page-header :title="$t(props.header)">
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
                {{ $t("dashboard.categories.card.title.category_description") }}
              </div>
            </q-card-section>

            <q-separator />
            <q-card-section>
              <q-input
                v-model="category.name"
                :label="$t('dashboard.categories.input.label.category_name')"
                :rules="[required]"
                counter
                maxlength="100"
                outlined
                stack-label
              />

              <q-input
                v-model="category.perex"
                :label="
                  $t('dashboard.categories.input.label.short_description')
                "
                maxlength="250"
                outlined
                stack-label
                type="textarea"
              />
            </q-card-section>
          </q-card>
          <q-card />
        </div>
      </div>
    </q-form>
  </dashboard-page>
</template>
