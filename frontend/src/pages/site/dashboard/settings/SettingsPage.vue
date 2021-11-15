<template>
  <dashboard-page>
    <dashboard-page-header :title="$t('dashboard.navigation.settings')" />
    <div
      v-if="!loading"
      class=" items-start  full-width "
    >
      <div class="row">
        <div class="col-12 col-md-8 q-pa-md q-gutter-md">
          <q-form
            @submit="onSubmit"
          >
            <q-card>
              <q-card-section>
                <div class="text-h6 text-weight-regular">
                  Main description
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <q-input
                  v-model="currentSettings.name"
                  :loading="loading"
                  :rules="[required]"
                  label="Site name"
                  lazy-rules
                  outlined
                  stack-label
                />
              </q-card-section>
              <q-separator />
              <q-card-actions>
                <q-btn
                  color="primary"
                  label="Submit"
                  type="submit"
                />
              </q-card-actions>
            </q-card>
          </q-form>
        </div>
        <div class="col-12 col-md-4 q-pa-md q-gutter-md">
          <q-card>
            <q-card-section>
              <div class="text-h6 text-weight-regular">
                Delete site
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-btn
                color="negative"
                label="Delete site"
                @click="askForDelete"
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
    <q-inner-loading
      :showing="loading"
      color="primary"
      size="50px"
    />
  </dashboard-page>
</template>

<script lang="ts" setup>
import DashboardPageHeader from 'components/dashboard/DashboardPageHeader.vue';
import DashboardPage from 'pages/site/dashboard/DashboardPage.vue';
import { useQuasar } from 'quasar';
import { UpdateSiteInput, useSiteQuery } from 'src/apollo/composition-functions';
import { useSites } from 'src/composables/useSites';
import { validationHelper } from 'src/validationHelper';
import {
  reactive,
} from 'vue';

import { useRouter } from 'vue-router';

const {
  updateSite, removeSite,
} = useSites();
const { required } = validationHelper;

interface Props {
  siteId: number,
}
const props = defineProps<Props>();

const router = useRouter();
const { notify, dialog } = useQuasar();

const {
  loading, onResult, restart, refetch,
} = useSiteQuery(() => ({ id: props.siteId }));
void refetch();

const currentSettings = reactive<UpdateSiteInput>({
  name: '',
});

onResult((result) => {
  if (!result.loading) {
    const { name } = result.data.site;
    currentSettings.name = name;
  }
});
restart();

const onSubmit = () => {
  void updateSite(currentSettings).then((result) => {
    if (result?.data) {
      notify({
        type: 'positive',
        message: 'Settings saved',
      });
    }
  });
};

const askForDelete = () => {
  dialog({
    title: 'Confirm',
    message: 'Do you want to delete this site? This action is irreversible.',
    cancel: true,
    persistent: true,
  }).onOk(() => {
    void removeSite(props.siteId);
    void router.push({ name: 'SitesList' });
  });
};

</script>
