<script lang="ts" setup>
import { useResult } from '@vue/apollo-composable';
import { useVModel } from '@vueuse/core';

import { useGetCategoriesForSelectorQuery } from 'src/apollo/composition-functions';
import { useRouteParams } from 'src/composables/useRoute';
import { FilterFn } from 'src/types/FilterFn.type';
import { validationHelper } from 'src/validationHelper';
import { computed, ref } from 'vue';

const { siteId } = useRouteParams();

interface Props {
  modelValue: number | null
  required?: boolean
  clearable?: boolean
  multiple?: boolean
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const value = useVModel(props, 'modelValue', emit);
const options = ref();

const { result, onResult, refetch } = useGetCategoriesForSelectorQuery({ siteId: siteId.value });
const categories = useResult(result, null, (data) => data.categories);
void refetch();
onResult(() => {
  options.value = categories.value;
});

const filterFn: FilterFn = (val, update) => {
  if (val === '') {
    update(() => {
      options.value = categories.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    if (categories.value !== null) {
      options.value = categories.value
        .filter((v) => v.name.toLowerCase().indexOf(needle) > -1);
    }
  });
};

// Validation
const { required } = validationHelper;

const rules = computed(() => (props.required ? [required] : []));

</script>

<template>
  <q-select
    v-model="value"
    :clearable="props.clearable"
    :label="$t('dashboard.items.input.label.category')"
    :multiple="props.multiple"
    :options="options"
    :rules="rules"
    emit-value
    input-debounce="0"
    map-options
    option-label="name"
    option-value="id"
    outlined
    use-input
    @filter="filterFn"
  />
</template>
