<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth';
import { LoginInterface } from 'src/types/auth.interface';
import { validationHelper } from 'src/validationHelper';
import { reactive } from 'vue';

const authStore = useAuthStore();
const { required } = validationHelper;

authStore.authError = '';

const loginData = reactive<LoginInterface>({
  email: '',
  password: '',
});

const onSubmit = () => {
  void authStore.login(loginData);
};

</script>

<template>
  <q-page
    padding
  >
    <q-form
      class="flex flex-center"
      @submit="onSubmit"
    >
      <q-card
        class="login-card"
        square
      >
        <q-card-section class="text-center text-h2">
          {{ $t('pages.auth.login.title') }}
        </q-card-section>
        <q-card-section>
          <q-input
            v-model.trim="loginData.email"
            :label="$t('forms.auth.email')"
            :rules="[required]"
            autocomplete="username"
            autofocus
            lazy-rules
            outlined
            square
            type="email"
          />
          <q-input
            v-model="loginData.password"
            :label="$t('forms.auth.password')"
            :rules="[required]"
            autocomplete="current-password"
            outlined
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

        <q-card-actions align="around">
          <q-btn
            :label="$t('buttons.auth.signup')"
            :to="{ name: 'signup' }"
            color="primary"
            flat
          />
          <q-btn
            :label="$t('buttons.auth.login')"
            color="primary"
            type="submit"
          />
        </q-card-actions>
      </q-card>
    </q-form>
  </q-page>
</template>

<style lang="sass" scoped>
.login-card
  width: 100%
  max-width: 400px
  padding: 25px
</style>
