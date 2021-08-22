<template>
  <q-page
    class="flex flex-center"
    padding
  >
    <q-card
      class="login-card"
      square
    >
      <q-form
        class="q-gutter-md"
        @reset="onReset"
        @submit="onSubmit"
      >
        <q-card-section>
          <q-avatar
            class="absolute-center shadow-10"
            size="120px"
          >
            <q-icon
              color="grey-4"
              name="mdi-account-circle"
              size="120px"
            />
          </q-avatar>
        </q-card-section>

        <q-card-section />

        <q-card-section>
          <div class="text-h6">
            {{ $t('pages.signup') }}
          </div>
          <q-input
            id="firstName"
            v-model.trim="registerData.firstName"
            :label="$t('forms.firstName')"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            autofocus
            lazy-rules
            outlined
            required
            square
          />
          <q-input
            id="firstName"
            v-model.trim="registerData.lastName"
            :label="$t('forms.lastName')"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            lazy-rules
            outlined
            required
            square
          />
          <q-input
            id="email"
            v-model.trim="registerData.email"
            :label="$t('forms.email')"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            lazy-rules
            outlined
            required
            square
            type="email"
          />
          <q-input
            id="password"
            v-model="registerData.password"
            :label="$t('forms.password')"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            outlined
            required
            square
            type="password"
          />
          <q-input
            id="verifyPassword"
            v-model="registerData.verifyPassword"
            :label="$t('forms.verifyPassword')"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            outlined
            required
            square
            type="password"
          />
          <br>
          <q-btn
            :label="$t('buttons.auth.reset')"
            class="q-ml-sm"
            color="primary"
            flat
            type="reset"
          />
        </q-card-section>
        <q-card-actions align="around">
          <router-link to="/auth/login">
            <q-btn
              :label="$t('buttons.auth.login')"
              color="secondary"
            />
          </router-link>
          <q-btn
            :label="$t('buttons.auth.submit')"
            color="primary"
            type="submit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth';
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { LoginInterface } from 'src/types/auth.interface';

const authStore = useAuthStore();
const router = useRouter();

if (authStore.isLoggedIn) void router.push('/profile');

const registerData = reactive({
  firstName: 'firstName',
  lastName: 'lastName',
  email: 'user2@example.com',
  password: 'password',
  verifyPassword: 'password',
});
const loading = ref<boolean>(false);

const onSubmit = () => {
  const user: LoginInterface = {
    email: registerData.email,
    password: registerData.password,
  };

  loading.value = true;

  authStore.signup(user)
    .then(
      () => {
        void router.push('/auth/login');
      },
      () => {
        loading.value = false;
      },
    );
};

const onReset = () => {
  registerData.firstName = '';
  registerData.lastName = '';
  registerData.email = '';
  registerData.password = '';
  registerData.verifyPassword = '';
};
</script>

<style lang="sass" scoped>
.login-card
  width: 100%
  max-width: 400px
  padding: 25px
</style>
