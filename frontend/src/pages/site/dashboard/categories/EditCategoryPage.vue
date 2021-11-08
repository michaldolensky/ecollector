<template>
  <dashboard-page-header
    :title="inEditMode?$t('dashboard.headers.editCategory'):$t('dashboard.headers.createCategory')"
  >
    <q-btn
      :label="$t('buttons.common.save')"
      color="secondary"
      icon="save"
      @click="save()"
    />
  </dashboard-page-header>

  <div class=" items-start  full-width ">
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
  </div>
</template>

<script lang="ts" setup>
import DashboardPageHeader from 'components/dashboard/DashboardPageHeader.vue';
import { useQuasar } from 'quasar';
import { UpdateCategoryInput } from 'src/apollo/composition-functions';
import { useCategories } from 'src/module/useCategories';
import { validationHelper } from 'src/validationHelper';
import { DeepNullable } from 'ts-essentials';

import {
  onMounted, ref, computed, reactive,
} from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();
const editCategory = ref();
const { updateCategory, createCategory, getCategory } = useCategories();
const { required } = validationHelper;

const { notify } = useQuasar();

const resetObject: DeepNullable<UpdateCategoryInput> = {
  id: 0,
  name: '',
  perex: '',
};

const category = reactive(resetObject);

const categoryParam = computed(() => route.params.category);
const inEditMode = computed(() => categoryParam.value !== 'new');
const categoryId = parseInt(<string>categoryParam.value, 10);

onMounted(() => {
  if (inEditMode.value) {
    const { onResult } = getCategory(categoryId);
    onResult((result) => {
      const reqCategory = result.data.category;
      category.id = reqCategory.id;
      category.name = reqCategory.name;
      category.perex = reqCategory.perex;
    });
  }
});

const save = () => {
  if (inEditMode.value) {
    void updateCategory(category).then((result) => {
      if (result?.data) {
        notify({
          type: 'positive',
          message: 'Category updated',
        });
        editCategory.value = result.data.updateCategory;
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
          params: { category: result.data.createCategory.id },
        });
      }
    });
  }
};

</script>
