<template>
  <q-page
    class="flex flex-center"
    padding
  >
    <q-card
      class="login-card"
      square
      tag="form"
      @submit="onSubmit"
    >
      <q-card-section class="text-center text-h2">
        {{ $t('pages.auth.login.title') }}
      </q-card-section>
      <q-card-section>
        <q-input
          id="email"
          v-model.trim="loginData.email"
          :label="$t('forms.auth.email')"
          :rules="[required]"
          autocomplete="username"
          autofocus
          lazy-rules
          outlined
          required
          square
          type="email"
        />
        <q-input
          id="password"
          v-model="loginData.password"
          :label="$t('forms.auth.password')"
          :rules="[required]"
          autocomplete="current-password"
          outlined
          required
          square
          type="password"
        />
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
  </q-page>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth';
import { LoginInterface } from 'src/types/auth.interface';
import { validationHelper } from 'src/validationHelper';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const { required } = validationHelper;

if (authStore.isLoggedIn) void router.push({ name: 'profile' });

const loginData = reactive<LoginInterface>({
  email: 'admin@example.com',
  password: 'password',
});

const onSubmit = () => {
  void authStore.login(loginData)
    .then(
      () => {
        void router.push({ name: 'profile' });
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
