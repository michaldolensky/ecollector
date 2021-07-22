<template>
  <q-page class="flex flex-center" padding>
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
          <q-avatar class="absolute-center shadow-10" size="120px">
            <q-icon color="grey-4" name="mdi-account-circle" size="120px"/>
          </q-avatar>
        </q-card-section>

        <q-card-section></q-card-section>

        <q-card-section>
          <div class="text-h6"> {{ $t('auth.signup.signup') }}</div>
          <q-input
            id="firstName"
            v-model.trim="firstName"
            :label="$t('auth.signup.firstName')"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            autofocus
            lazy-rules
            outlined
            required
            square
          />
          <q-input
            id="firstName"
            v-model.trim="lastName"
            :label="$t('auth.signup.lastName')"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            lazy-rules
            outlined
            required
            square
          />
          <q-input
            id="email"
            v-model.trim="email"
            :label="$t('auth.signup.email')"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            lazy-rules
            outlined
            required
            square
            type="email"
          />
          <q-input
            id="password"
            v-model="password"
            :label="$t('auth.signup.password')"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            outlined
            required
            square
            type="password"
          />
          <q-input
            id="verifyPassword"
            v-model="verifyPassword"
            :label="$t('auth.signup.verifyPassword')"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            outlined
            required
            square
            type="password"
          />
          <br>
          <q-btn
            :label="$t('form.buttons.reset')"
            class="q-ml-sm"
            color="primary"
            flat
            type="reset"
          />
        </q-card-section>
        <q-card-actions align="around">
          <router-link to="/auth/login">
            <q-btn :label="$t('auth.signup.button')" color="secondary"/>
          </router-link>
          <q-btn :label="$t('form.buttons.submit')" color="primary" type="submit"/>
        </q-card-actions>

      </q-form>
    </q-card>

  </q-page>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import { LoginInterface } from 'src/store/auth/auth.interface';
// TODO
export default defineComponent({
  name: 'Signup',
  setup() {
    const $store = useStore();
    const $router = useRouter();

    const firstName = ref<string>('firstName');
    const lastName = ref<string>('lastName');
    const email = ref<string>('user2@example.com');
    const password = ref<string>('password');
    const verifyPassword = ref<string>('password');
    const message = ref<string>('');
    const loading = ref<boolean>(false);
    const loggedIn = computed(() => $store.state.auth.loggedIn);

    if (loggedIn.value) {
      void $router.push('/profile');
    }

    const onSubmit = () => {
      const user: LoginInterface = {
        email: email.value,
        password: password.value,
      };

      loading.value = true;
      $store.dispatch('auth/signup', user)
        .then(
          () => {
            void $router.push('/auth/login');
          },
          (error) => {
            loading.value = false;
            // eslint-disable-next-line no-console
            console.log(error);
          },
        );
    };

    const onReset = () => {
      firstName.value = '';
      lastName.value = '';

      email.value = '';

      password.value = '';
      verifyPassword.value = '';
    };

    return {
      firstName,
      lastName,
      email,
      password,
      verifyPassword,
      loading,
      message,
      loggedIn,
      onSubmit,
      onReset,
    };
  },

});
</script>

<style lang="sass" scoped>
.login-card
  width: 100%
  max-width: 400px
  padding: 25px
</style>
