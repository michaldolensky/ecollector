<template>
  <q-card v-if="!loading">
    <q-card-section>
      <div class="text-h6 text-weight-regular">
        {{ $t('dashboard.items.card.title.parameters') }}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-input
        v-for="itemParameter in itemParameters"
        :key="itemParameter.parameter.id"
        v-model="itemParameter.value"
        :label="itemParameter.parameter.name"
        outlined
        @update:model-value="(val) => updateFunction(itemParameter.parameter.id, val)"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { useResult } from '@vue/apollo-composable';
import { ItemParameter, ItemParameterInput, useGetParametersQuery } from 'src/apollo/composition-functions';
import { useRouteParams } from 'src/composables/useRoute';
import { computed } from 'vue';

const { siteId } = useRouteParams();
const { result, loading, refetch } = useGetParametersQuery(() => ({ siteId: siteId.value }));
const parameters = useResult(result, []);
void refetch();

interface Props {
  modelValue: ItemParameter[];
}
const emit = defineEmits(['update:modelValue']);
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
});

const itemParameters = computed<ItemParameterInput[]>({
  get() {
    return parameters.value.map((parameter) => {
      const itemParameter = props.modelValue
        .find((modelParameter) => modelParameter.parameter.id === parameter.id);

      return {
        id: itemParameter?.id ?? null,
        parameter,
        value: itemParameter?.value ?? null,
      };
    });
  },
  set(value: ItemParameter[]) {
    const nonNullParameters = value.filter((itemParameter) => !((itemParameter.value == null || itemParameter.value === '') && itemParameter.id == null));
    emit('update:modelValue', nonNullParameters);
  },
});

const updateFunction = (inputId:number, value:string) => {
  itemParameters.value = itemParameters.value.map((item) => {
    if (item.parameter.id === inputId) {
      return {
        ...item,
        value,
      };
    }
    return item;
  });
};
</script>
