<template>
  <q-select
    v-model="value"
    :clearable="props.clearable"
    :label="$t('dashboard.parameters.input.label.parameterType')"
    :options="options"
    :rules="rules"
    emit-value
    input-debounce="0"
    map-options
    outlined
  />
</template>

<script lang="ts" setup>
import { useVModel } from '@vueuse/core';
import { ParameterType } from 'src/apollo/composition-functions';
import { validationHelper } from 'src/validationHelper';
import { computed, ref } from 'vue';

interface Props {
  modelValue: string | null
  required?: boolean
  clearable?: boolean
}

const props = defineProps<Props>();
const emit = defineEmits(['update:modelValue']);
const value = useVModel(props, 'modelValue', emit);
const options = ref([
  { value: ParameterType.Text, label: 'Text' },
]);

// Validation
const { required } = validationHelper;

const rules = computed(() => (props.required ? [required] : []));

</script>
