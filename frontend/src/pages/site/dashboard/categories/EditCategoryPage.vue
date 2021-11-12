<template>
  <dashboard-page>
    <dashboard-page-header
      :title="inEditMode?$t('dashboard.headers.editCategory'):$t('dashboard.headers.createCategory')"
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
                Category description
              </div>
            </q-card-section>

            <q-separator />
            <q-card-section>
              <q-input
                v-model="categoryObj.name"
                :rules="[required]"
                counter
                label="Item name"
                maxlength="100"
                outlined
                stack-label
              />

              <q-input
                v-model="categoryObj.perex"
                label="Short description"
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

<script lang="ts" setup>
import DashboardPageHeader from 'components/dashboard/DashboardPageHeader.vue';
import DashboardPage from 'pages/site/dashboard/DashboardPage.vue';
import { QForm, useQuasar } from 'quasar';
import {
  UpdateCategoryInput,
  useGetCategoryQuery,
} from 'src/apollo/composition-functions';
import { useCategories } from 'src/composables/useCategories';
import { validationHelper } from 'src/validationHelper';

import {
  ref, computed, reactive,
} from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { updateCategory, createCategory } = useCategories();
const { required } = validationHelper;

const { notify } = useQuasar();

interface Props {
  category: string
}

const props = defineProps<Props>();

const resetObject: UpdateCategoryInput = {
  id: 0,
  name: '',
  perex: '',
};

const categoryObj = reactive(resetObject);
const form = ref<QForm>();

const inEditMode = computed(() => props.category !== 'new');
const categoryId = computed(() => parseInt(props.category, 10));

const { onResult, restart, loading } = useGetCategoryQuery({
  id: categoryId.value,
}, () => ({
  enabled: inEditMode.value,
}));

onResult((result) => {
  if (!result.loading) {
    categoryObj.id = result.data.category.id;
    categoryObj.name = result.data.category.name;
    categoryObj.perex = result.data.category.perex;
  }
});
restart();

const onSubmit = () => {
  if (inEditMode.value) {
    void updateCategory(categoryObj).then((result) => {
      if (result?.data) {
        notify({
          type: 'positive',
          message: 'Category updated',
        });
      }
    });
  } else {
    delete categoryObj.id;
    void createCategory(categoryObj).then((result) => {
      if (result?.data) {
        notify({
          type: 'positive',
          message: 'Category created',
        });
        void router.push({
          name: 'DashBoardCategory',
          params: { category: result.data.createCategory.id },
        });
      }
    });
  }
};

</script>
