<template>
  <q-skeleton
    v-if="loading"
    type="QInput"
  />
  <q-select
    v-else
    v-model="value"
    :loading="loading"
    :options="options"
    :rules="[required]"
    clearable
    input-debounce="0"
    label="Category"
    map-options
    option-label="name"
    option-value="id"
    outlined
    use-input
    @filter="filterFn"
    @update:model-value="$emit('update:modelValue',value)"
  />
</template>

<script lang="ts">
import { useResult } from '@vue/apollo-composable';
import { Category, useCategories } from 'src/module/useCategories';
import { validationHelper } from 'src/validationHelper';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ItemCategorySelect',
  components: {},
  props: {
    modelValue: {
      type: Object,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {},
    },
  },
  emits: ['update:modelValue'],
  setup(props) {
    const value = ref(props.modelValue);
    const { getCategories } = useCategories();
    const options = ref();
    const { result, loading } = getCategories();

    const categories = useResult(result, null, (data) => {
      if (data !== undefined) {
        return data.categories;
      }
      return [];
    });

    return {
      value,
      ...validationHelper,
      result,
      options,
      loading,
      filterFn(val:string, update:unknown) {
        if (val === '') {
          // Update nemá type
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          update(() => {
            if (categories.value !== undefined) {
              options.value = categories.value;
            }
          });
        }
        // Update nemá type
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        update(() => {
          const needle: string = val.toLowerCase();
          if (categories.value != null) {
            options.value = categories.value
              .filter((v: Category) => v.name.toLowerCase().indexOf(needle) > -1);
          }
        });
      },
    };
  },
});
</script>
