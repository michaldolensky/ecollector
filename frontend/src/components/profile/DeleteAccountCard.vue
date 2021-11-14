<template>
  <q-card>
    <q-card-section>
      <div class="text-h6 text-weight-regular">
        Delete account
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <q-btn
        color="negative"
        label="Delete "
        @click="deleteAccount()"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { useUsers } from 'src/composables/useUsers';
import { useAuthStore } from 'src/stores/auth';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

const { t } = useI18n();
const { notify, dialog } = useQuasar();
const authStore = useAuthStore();
const { removeUser } = useUsers();
const router = useRouter();

const deleteAccount = () => {
  dialog({
    title: t('dialogs.titles.confirm'),
    message: t('dialogs.messages.profile-delete'),
    cancel: true,
    persistent: true,
  }).onOk(() => {
    void removeUser(authStore.user.id).then((result) => {
      if (result?.data) {
        notify({
          message: t('notifications.profile.deleted'),
          type: 'positive',
        });
        void authStore.$reset();
        void router.replace('login');
      }
    });
  });
};
</script>
