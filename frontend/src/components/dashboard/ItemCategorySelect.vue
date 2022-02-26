<script lang="ts" setup>
import { useResult } from "@vue/apollo-composable";
import { useVModel } from "@vueuse/core";

import { useRouteParams } from "src/composables/useRoute";
import { useGetCategoriesForSelectorQuery } from "src/modules/dashboard/modules/categories/graphql/categoryDashboard.operations";
import { FilterFn } from "src/types/FilterFn.type";
import { validationHelper } from "src/validationHelper";
import { computed, ref } from "vue";

const { siteId } = useRouteParams();

interface Props {
  modelValue: number | null;
  required?: boolean;
  clearable?: boolean;
  multiple?: boolean;
}

const props = defineProps<Props>();

const emit =
  defineEmits<{ (e: "update:modelValue", id: number | null): void }>();
const model = useVModel(props, "modelValue", emit);

const { data } = useGetCategoriesForSelectorQuery({
  variables: {
    siteId: siteId.value,
  },
});
const categories = useResult(data, [], (value) =>
  value.categories.map((category) => ({
    value: category.id,
    label: category.name,
  }))
);

const options = ref(categories.value);

const computedModel = computed({
  get() {
    const rs = options.value.filter((row) => row.value === model.value);
    return rs.length === 1 ? rs[0] : rs;
  },
  set(v: { value: number; label: string } | null) {
    if (v === null) {
      model.value = null;
      return;
    }
    model.value = v.value;
  },
});

const filterFn: FilterFn = (val, update) => {
  if (val === "") {
    update(() => {
      options.value = categories.value;
    });
    return;
  }

  update(() => {
    const needle = val.toLowerCase();
    options.value = categories.value.filter(
      (v) => v.label.toLowerCase().indexOf(needle) > -1
    );
  });
};

// Validation
const { required } = validationHelper;

const rules = computed(() => (props.required ? [required] : []));
</script>

<template>
  <q-select
    v-model="computedModel"
    :clearable="props.clearable"
    :label="$t('dashboard.items.input.label.category')"
    :multiple="props.multiple"
    :options="options"
    :rules="rules"
    input-debounce="0"
    outlined
    use-input
    @filter="filterFn"
  />
</template>
