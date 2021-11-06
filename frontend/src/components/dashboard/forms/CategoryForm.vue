<template>
  <q-toolbar>
    <div
      v-if="inEditMode"
      class="text-h6 text-weight-regular"
    >
      Edit category
    </div>
    <div
      v-else
      class="text-h6 text-weight-regular"
    >
      Create category
    </div>
    <q-space />
    <q-btn
      color="secondary"
      @click="handleSave()"
    >
      Save
    </q-btn>
  </q-toolbar>

  <div class=" items-start  full-width ">
    <div class="row">
      <div class="col-12 col-md-8 q-pa-md q-gutter-md">
        <q-card>
          <q-card-section>
            <div class="text-h6 text-weight-regular">
              Item description
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
              v-model="category.shortDesc"
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
import { Category, CategoryInput } from 'src/module/useCategories';
import { validationHelper } from 'src/validationHelper';
import { computed, reactive } from 'vue';

const { required } = validationHelper;

interface Props {
  editCategory: Category
}

const props = defineProps<Props>();

const emit = defineEmits(['submit']);

const category = reactive<CategoryInput>({
  id: 0,
  name: '',
  perex: '',
});

const inEditMode = computed(() => (props.editCategory?.id) > 0);

if (inEditMode.value) {
  Object.assign(category, props.editCategory);
}

const handleSave = () => {
  let modifiedCategory:CategoryInput;

  if (inEditMode.value) {
    modifiedCategory = {
      ...category,
      id: props.editCategory?.id,
    };
  } else {
    modifiedCategory = {
      ...category,
    };
  }
  emit('submit', modifiedCategory);
};
</script>
