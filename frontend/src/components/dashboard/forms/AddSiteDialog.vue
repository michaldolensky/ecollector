<template>
  <q-btn
    :label="$t('account.sites.button.add_site')"
    @click="dialogOpen=true"
  />
  <q-dialog
    v-model="dialogOpen"
    square
  >
    <div style="width: 400px">
      <q-form
        @submit="onSubmit"
      >
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">
              {{ $t('account.sites.card.add_site') }}
            </div>
            <q-space />
            <q-btn
              v-close-popup
              dense
              flat
              icon="close"
              round
            />
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="site.name"
              :label="$t('account.sites.inputs.site_name')"
              :rules="[required]"
              autofocus
              filled
              lazy-rules
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              :label="$t('buttons.common.submit')"
              color="primary"
              type="submit"
            />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </q-dialog>
</template>
<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth';
import { validationHelper } from 'src/validationHelper';
import { reactive, ref } from 'vue';
import { useSites } from 'src/composables/useSites';

const { createSite } = useSites();
const authStore = useAuthStore();

const { required } = validationHelper;

const site = reactive({
  name: '',
});

const dialogOpen = ref(false);

const onSubmit = () => {
  void createSite(site).then(() => {
    void authStore.me();
    dialogOpen.value = false;
  });
};
</script>
