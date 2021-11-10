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
                v-model="category.name"
                :rules="[required]"
                counter
                label="Item name"
                maxlength="100"
                outlined
                stack-label
              />

              <q-input
                v-model="category.perex"
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
  categoryParam: string
}

const props = defineProps<Props>();

const resetObject: UpdateCategoryInput = {
  id: 0,
  name: '',
  perex: '',
};

const category = reactive(resetObject);
const form = ref<QForm>();

const inEditMode = computed(() => props.categoryParam !== 'new');
const categoryId = parseInt(props.categoryParam, 10);

const { onResult, restart, loading } = useGetCategoryQuery({
  id: categoryId,
}, () => ({
  enabled: inEditMode.value,
}));

onResult((result) => {
  if (!result.loading) {
    category.id = result.data.category.id;
    category.name = result.data.category.name;
    category.perex = result.data.category.perex;
  }
});
restart();

const onSubmit = () => {
  if (inEditMode.value) {
    void updateCategory(category).then((result) => {
      if (result?.data) {
        notify({
          type: 'positive',
          message: 'Category updated',
        });
      }
    });
  } else {
    delete category.id;
    void createCategory(category).then((result) => {
      if (result?.data) {
        notify({
          type: 'positive',
          message: 'Category created',
        });
        void router.push({
          name: 'DashboardCategory',
          params: { categoryParam: result.data.createCategory.id },
        });
      }
    });
  }
};

</script>
