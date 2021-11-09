<template>
  <dashboard-page>
    <dashboard-page-header :title="$t('dashboard.navigation.settings')">
      <q-btn
        :label="$t('buttons.common.save')"
        color="primary"
        icon="save"
        @click="save"
      />
    </dashboard-page-header>
    {{ currentSiteId }}
    {{ siteSettings }}
    <div class=" items-start  full-width ">
      <div class="row">
        <div class="col-12 col-md-8 q-pa-md q-gutter-md">
          <q-card>
            <q-card-section>
              <div class="text-h6 text-weight-regular">
                M description
              </div>
            </q-card-section>
            <q-card-section>
              <q-input
                v-model="siteSettings.name"
                :rules="[required]"
                label="Site name"
                outlined
                stack-label
              />
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </dashboard-page>
</template>

<script lang="ts" setup>
import DashboardPageHeader from 'components/dashboard/DashboardPageHeader.vue';
import DashboardPage from 'pages/site/dashboard/DashboardPage.vue';
import { useQuasar } from 'quasar';
import { UpdateSiteInput } from 'src/apollo/composition-functions';
import { useSites } from 'src/module/useSites';
import { validationHelper } from 'src/validationHelper';
import {
  onMounted, reactive,
} from 'vue';

const { updateSite, getSite, currentSiteId } = useSites();
const { required } = validationHelper;

const { notify } = useQuasar();

const resetObject:UpdateSiteInput = {
  id: 0,
  name: '',
};

const siteSettings = reactive(resetObject);

onMounted(() => {
  const { onResult } = getSite(currentSiteId.value);
  onResult((result) => {
    const reqSiteSettings = result.data.site;

    siteSettings.id = reqSiteSettings.id;
    siteSettings.name = reqSiteSettings.name;
  });
});

const save = () => {
  void updateSite(siteSettings).then((result) => {
    if (result?.data) {
      notify({
        type: 'positive',
        message: 'Settings saved',
      });
    }
  });
};

</script>
