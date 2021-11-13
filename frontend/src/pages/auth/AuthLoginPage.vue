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
            id="email"
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
            id="password"
            v-model="loginData.password"
            :label="$t('forms.auth.password')"
            :rules="[required]"
            autocomplete="current-password"
            outlined
            square
            type="password"
          />
          <p
            v-if="showError"
            class="text-negative"
          >
            {{ $t('forms.auth.errors.invalid_credentials') }}
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

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth';
import { LoginInterface } from 'src/types/auth.interface';
import { validationHelper } from 'src/validationHelper';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();
const { required } = validationHelper;
const showError = ref(false);
if (authStore.isLoggedIn) void router.push({ name: 'profile' });

const loginData = reactive<LoginInterface>({
  email: 'admin@example.com',
  password: 'password',
});

const onSubmit = async () => {
  showError.value = false;
  const result = await authStore.login(loginData);
  if (result?.response?.status === 401) showError.value = true;

  void await router.push({ name: 'profile' });
};

</script>

<style lang="sass" scoped>
.login-card
  width: 100%
  max-width: 400px
  padding: 25px
</style>
