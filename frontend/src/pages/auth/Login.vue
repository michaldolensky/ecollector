<template>
  <q-page padding>
  <div class="q-pa-md" style="max-width: 400px">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
    >
      <q-input
        filled
        v-model="email"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[ val => val && val.length > 0 || 'Please type something']"
       />

      <q-input
        filled
        v-model="password"
        label="Your age *"
      />

      <div>
        <q-btn label="Submit" type="submit" color="primary"/>
        <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      </div>
    </q-form>

  </div>
  </q-page>
</template>

<script lang="ts">
import { computed, ref, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import { LoginInterface } from 'src/store/auth/auth.interface';

export default defineComponent({
  name: 'Login',
  setup() {
    const $store = useStore();
    const $router = useRouter();

    const email = ref<string>('user2@example.com');
    const password = ref<string>('password');
    const message = ref<string>('');
    const accept = ref<boolean>(false);
    const loading = ref<boolean>(false);
    const loggedIn = ref<boolean>(false);

    if (loggedIn.value) {
      void $router.push('/profile');
    }

    return {
      email,
      password,
      accept,
      loading,
      message,
      loggedIn: computed(() => $store.state.auth.loggedIn),

      onSubmit() {
        const user: LoginInterface = {
          email: email.value,
          password: password.value,
        };

        loading.value = true;
        $store.dispatch('auth/login', user)
          .then(
            () => {
              void $router.push('/profile');
            },
            (error) => {
              loading.value = false;
              // eslint-disable-next-line no-console
              console.log(error);
            },
          );
      },

      onReset() {
        email.value = '';
        password.value = '';
        accept.value = false;
      },

    };
  },
});
</script>
