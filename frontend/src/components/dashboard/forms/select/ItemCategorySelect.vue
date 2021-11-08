<template>
  <q-select
    v-model="value"
    :options="options"
    :rules="[required]"
    emit-value
    input-debounce="0"
    label="Category"
    map-options
    option-label="name"
    option-value="id"
    outlined
    use-input
    @filter="filterFn"
  />
</template>

<script lang="ts" setup>
import { useResult } from '@vue/apollo-composable';
import { useVModel } from '@vueuse/core';

import { useGetCategoriesForSelectorQuery } from 'src/apollo/composition-functions';
import { useSites } from 'src/module/useSites';
import { FilterFn } from 'src/types/FilterFn.type';
import { validationHelper } from 'src/validationHelper';
import { ref } from 'vue';

const { required } = validationHelper;

const { currentSiteId } = useSites();

interface Props {
  modelValue: number
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const value = useVModel(props, 'modelValue', emit);
const options = ref();

const { result, onResult } = useGetCategoriesForSelectorQuery({ siteId: currentSiteId.value });
const categories = useResult(result, null, (data) => data.categories);

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
</script>
