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
    emit-value
    input-debounce="0"
    label="Category"
    map-options
    option-label="name"
    option-value="id"
    outlined
    use-input
    @filter="filterFn"
    @update:model-value="handleInput"
  />
</template>

<script lang="ts">
import { useResult } from '@vue/apollo-composable';
import { Category, useCategories } from 'src/module/useCategories';
import { validationHelper } from 'src/validationHelper';
import { defineComponent, ref, SetupContext } from 'vue';

export default defineComponent({
  name: 'ItemCategorySelect',
  components: {},
  props: {
    modelValue: {
      type: Number,
      default: 0,
    },
  },
  emits: ['update:modelValue'],
  setup(props, ctx: SetupContext) {
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

    const handleInput = () => {
      ctx.emit('update:modelValue', value.value);
    };

    return {
      value,
      ...validationHelper,
      result,
      handleInput,
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

<style lang="scss" scoped>

</style>
