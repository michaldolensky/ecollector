<template>
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
          v-model.trim="profileData.firstName"
          :label="$t('forms.auth.first_name')"
          :rules="[ required]"
          autofocus
          lazy-rules
          outlined
          required
          square
        />
        <q-input
          v-model.trim="profileData.lastName"
          :label="$t('forms.auth.last_name')"
          :rules="[ required]"
          lazy-rules
          outlined
          required
          square
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
</template>

<script lang="ts" setup>
import { useQuasar } from 'quasar';
import { useUsers } from 'src/composables/useUsers';
import { useAuthStore } from 'src/stores/auth';
import { validationHelper } from 'src/validationHelper';
import { reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { notify } = useQuasar();
const authStore = useAuthStore();
const { updateUser } = useUsers();

const profileData = reactive({
  firstName: authStore.user.firstName,
  lastName: authStore.user.lastName,
});

const onSubmit = () => {
  void updateUser(profileData).then((result) => {
    if (result?.data) {
      notify({
        message: t('notifications.profile.updated'),
        type: 'positive',
      });
      void authStore.me();
    }
  });
};

// Validation
const { required } = validationHelper;

</script>

<style scoped>

</style>
