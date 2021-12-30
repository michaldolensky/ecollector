<script lang="ts" setup>
import { useSiteQuery } from 'src/modules/account/graphql/sitesDashboard.operations';
import DashboardPageHeader from 'src/modules/dashboard/components/DashboardPageHeader.vue';
import DashboardPage from 'src/modules/dashboard/DashboardModule.vue';
import { useQuasar } from 'quasar';
import { useSites } from 'src/composables/useSites';
import { UpdateSiteInput } from 'src/types/graphql';
import { validationHelper } from 'src/validationHelper';
import {
  reactive,
} from 'vue';
import { useI18n } from 'vue-i18n';

import { useRouter } from 'vue-router';

const { t } = useI18n();

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
        message: t('notifications.settingsSaved'),
      });
    }
  });
};

const askForDelete = () => {
  dialog({
    title: t('dialogs.titles.confirm'),
    message: t('dialogs.messages.siteDelete'),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    void removeSite(props.siteId);
    void router.push({ name: 'SitesList' });
  });
};

</script>

<template>
  <dashboard-page>
    <dashboard-page-header :title="$t('dashboard.navigation.settings')" />
    <div
      v-if="!loading"
      class="items-start full-width "
    >
      <div class="row">
        <div class="col-12 col-md-8 q-pa-md q-gutter-md">
          <q-form
            @submit="onSubmit"
          >
            <q-card>
              <q-card-section>
                <div class="text-h6 text-weight-regular">
                  {{ $t('dashboard.settings.card.title.description') }}
                </div>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <q-input
                  v-model="currentSettings.name"
                  :label="$t('dashboard.settings.inputs.site_name')"
                  :loading="loading"
                  :rules="[required]"
                  lazy-rules
                  outlined
                  stack-label
                />
              </q-card-section>
              <q-separator />
              <q-card-actions>
                <q-btn
                  :label="$t('dashboard.settings.button.submit')"
                  color="primary"
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
                {{ $t('dashboard.settings.card.title.delete_site') }}
              </div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <q-btn
                :label="$t('dashboard.settings.button.delete_site')"
                color="negative"
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
