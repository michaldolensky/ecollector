<script lang="ts" setup>
import { useResult } from "src/composables/useResult";
import { useRouteParams } from "src/composables/useRoute";
import { useGetParametersQuery } from "src/modules/dashboard/modules/parameters/graphql/parameterDashboard.operations";
import { ItemParameter, ItemParameterInput } from "src/types/graphql";
import { computed } from "vue";

const { siteId } = useRouteParams();
const { data, fetching } = useGetParametersQuery({
  variables: {
    siteId: siteId.value,
  },
});
const parameters = useResult(data, []);

interface Props {
  modelValue: ItemParameter[];
}
const emit = defineEmits(["update:modelValue"]);
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
});

const itemParameters = computed<ItemParameterInput[]>({
  get() {
    return parameters.value.map((parameter) => {
      const itemParameter = props.modelValue.find(
        (modelParameter) => modelParameter.parameter.id === parameter.id
      );

      return {
        id: itemParameter?.id ?? null,
        parameter,
        value: itemParameter?.value ?? null,
      };
    });
  },
  set(value: ItemParameter[]) {
    const nonNullParameters = value.filter(
      (itemParameter) =>
        !(
          (itemParameter.value == null || itemParameter.value === "") &&
          itemParameter.id == null
        )
    );
    emit("update:modelValue", nonNullParameters);
  },
});

const updateFunction = (inputId: number, value: string) => {
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

<template>
  <q-card v-if="!fetching">
    <q-card-section>
      <div class="text-h6 text-weight-regular">
        {{ $t("dashboard.items.card.title.parameters") }}
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
        @update:model-value="
          (val) => updateFunction(itemParameter.parameter.id, val)
        "
      />
    </q-card-section>
  </q-card>
</template>
