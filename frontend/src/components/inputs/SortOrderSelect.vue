<script lang="ts" setup>
import { useVModel } from "@vueuse/core";

type SortOrder = "asc" | "desc";

type Options = {
  label: string;
  value: SortOrder;
};

const options: Options[] = [
  { label: "A-Z", value: "asc" },
  { label: "Z-A", value: "desc" },
];

interface Props {
  modelValue: SortOrder;
}

const emit = defineEmits(["update:modelValue"]);

const props = withDefaults(defineProps<Props>(), {
  modelValue: "asc",
});

const sortOrder = useVModel(props, "modelValue", emit);
</script>

<template>
  <q-select
    v-model="sortOrder"
    :label="$t('forms.input.label.sortOrder')"
    :options="options"
    dense
    emit-value
    filled
    map-options
    options-dense
  />
</template>
