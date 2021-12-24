<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-weight-regular">
        {{ $t('dashboard.items.card.title.parameters') }}
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section
      v-for="parameter in parameters"
      :key="parameter.id"
    >
      <q-input
        :label="parameter.name"
        outlined
      />
    </q-card-section>
  </q-card>
</template>
<script lang="ts" setup>
import { useResult } from '@vue/apollo-composable';
import { useGetParametersQuery } from 'src/apollo/composition-functions';
import { useRouteParams } from 'src/composables/useRoute';

const { siteId } = useRouteParams();

const { result, loading } = useGetParametersQuery(() => ({ siteId: siteId.value }));

const parameters = useResult(result, []);

</script>
