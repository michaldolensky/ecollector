<template>
  <dashboard-page>
    <dashboard-page-header :title="$t('pages.profile')" />
    <div
      class=" items-start  full-width "
    >
      <div class="row">
        <div class="col-12 col-md-8 q-pa-md q-gutter-md" />
        <div class="col-12 col-md-4 q-pa-md q-gutter-md">
          <change-password-card />
        </div>
      </div>
    </div>
  </dashboard-page>
</template>

<script lang="ts" setup>
import DashboardPageHeader from 'components/dashboard/DashboardPageHeader.vue';
import ChangePasswordCard from 'components/profile/ChangePasswordCard.vue';
import DashboardPage from 'pages/site/dashboard/DashboardPage.vue';

</script>
