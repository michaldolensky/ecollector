<template>
  <q-page
    class="flex flex-center"
  >
    <q-card
      class="login-card"
      square
      tag="form"
      @submit="onSubmit"
    >
      <q-card-section class="text-center text-h2">
        {{ $t('pages.auth.signup.title') }}
      </q-card-section>
      <q-card-section>
        <q-input
          v-model.trim="signupData.firstName"
          :label="$t('forms.auth.first_name')"
          :rules="[ required]"
          autofocus
          lazy-rules
          outlined
          required
          square
        />
        <q-input
          v-model.trim="signupData.lastName"
          :label="$t('forms.auth.last_name')"
          :rules="[ required]"
          lazy-rules
          outlined
          required
          square
        />
        <q-input
          v-model.trim="signupData.email"
          :label="$t('forms.auth.email')"
          :rules="[ required]"
          lazy-rules
          outlined
          required
          square
          type="email"
        />
        <q-input
          v-model="signupData.password"
          :label="$t('forms.auth.password')"
          :rules="[ required]"
          outlined
          required
          square
          type="password"
        />
        <q-input
          v-model="signupData.verifyPassword"
          :label="$t('forms.auth.confirm_password')"
          :rules="[required]"
          outlined
          required
          square
          type="password"
        />
        <q-separator />
      </q-card-section>
      <q-card-actions
        align="around"
      >
        <q-btn
          :label="$t('buttons.auth.login')"
          :to="{ name: 'login' }"
          color="primary"
          flat
        />
        <q-btn
          :label="$t('buttons.auth.signup')"
          class="q-px-xl q-py-xs"
          color="primary"
          type="submit"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth';
import { validationHelper } from 'src/validationHelper';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { SignUpInterface } from 'src/types/auth.interface';

const authStore = useAuthStore();
const router = useRouter();

const { required } = validationHelper;

if (authStore.isLoggedIn) void router.push('/profile');

const signupData = reactive<SignUpInterface>({
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'user2@example.com',
  password: 'password',
  verifyPassword: 'password',
});

const onSubmit = () => {
  void authStore.signup(signupData).then(
    () => {
      void router.push('/auth/login');
    },
  );
};
</script>

<style lang="sass" scoped>
.login-card
  width: 100%
  max-width: 400px
  padding: 25px
</style>
