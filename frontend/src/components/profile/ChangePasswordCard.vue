<template>
  <q-form
    ref="form"
    @submit="onSubmit"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6 text-weight-regular">
          Change password
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-input
          autocomplete="username"
          hidden
          square
          style="display: none"
        />
        <q-input
          v-model="auth.oldPassword"
          :label="$t('forms.auth.oldPassword')"
          :rules="[ required ]"
          autocomplete="current-password"
          lazy-rules
          outlined
          required
          square
          type="password"
        />
        <q-input
          v-model="auth.newPassword"
          :label="$t('forms.auth.newPassword')"
          :rules="[ required ]"
          autocomplete="new-password"
          lazy-rules

          outlined
          required
          square
          type="password"
        />
        <q-input
          v-model="auth.verifyPassword"
          :label="$t('forms.auth.confirm_password')"
          :rules="[required,checkIfPasswordsMatch]"
          autocomplete="new-password"
          lazy-rules
          outlined
          required
          square
          type="password"
        />
        <p
          v-if="authStore.hasError"
          class="text-negative"
        >
          {{ authStore.getErrorMessage }}
        </p>
      </q-card-section>
      <q-card-section>
        <q-btn
          color="secondary"
          label="Change"
          @click="onSubmit"
        />
      </q-card-section>
    </q-card>
  </q-form>
</template>

<script lang="ts" setup>
import { QForm, useQuasar } from 'quasar';
import { useAuthStore } from 'src/stores/auth';
import { validationHelper } from 'src/validationHelper';
import { reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

const authStore = useAuthStore();
authStore.authError = '';

const { t } = useI18n();
const { notify } = useQuasar();

const form = ref<QForm>();

const auth = reactive({
  oldPassword: '',
  newPassword: '',
  verifyPassword: '',
});

const onSubmit = () => {
  void authStore.changePassword(auth).then((res) => {
    if (res?.status === 200) {
      authStore.authError = '';
      auth.oldPassword = '';
      auth.newPassword = '';
      auth.verifyPassword = '';
      form.value?.resetValidation();
      notify({
        message: t('notifications.profile.password_changed'),
        type: 'positive',
      });
    }
  });
};
// Validation
const { required } = validationHelper;
const checkIfPasswordsMatch = (verifyPassword: string) => (auth.newPassword === verifyPassword) || t('forms.auth.errors.password_mismatch');

</script>
