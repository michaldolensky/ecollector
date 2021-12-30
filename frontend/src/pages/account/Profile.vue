<script lang="ts" setup>
import DashboardPageHeader from 'components/dashboard/DashboardPageHeader.vue';
import ChangePasswordCard from 'components/profile/ChangePasswordCard.vue';
import DeleteAccountCard from 'components/profile/DeleteAccountCard.vue';
import EditProfileInformationCard from 'components/profile/EditProfileInformationCard.vue';
import DashboardPage from 'pages/site/DashboardPage.vue';

</script>

<template>
  <dashboard-page>
    <dashboard-page-header :title="$t('pages.profile')" />
    <div
      class=" items-start  full-width "
    >
      <div class="row">
        <div class="col-12 col-md-8 q-pa-md q-gutter-md">
          <edit-profile-information-card />
        </div>
        <div class="col-12 col-md-4 q-pa-md q-gutter-md">
          <change-password-card />
          <delete-account-card />
        </div>
      </div>
    </div>
  </dashboard-page>
</template>
