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

        <q-card-section>

        </q-card-section>

        <q-card-section>
          <div class="text-h6"> {{ $t('auth.login.login') }}</div>
          <q-input
            id="email"
            v-model.trim="email"
            :label="$t('auth.login.email')"
            :rules="[ val => val && val.length > 0 || 'Please type something']"
            autofocus
            lazy-rules
            outlined
            required
            square
            type="email"
          />
          <q-input
            id="password"
            v-model="password"
            :label="$t('auth.login.password')"
            outlined
            required
            square
            type="password"
          />
          <br>
          <q-btn
            :label="$t('auth.reset')"
            class="q-ml-sm"
            color="primary"
            flat
            type="reset"
          />
        </q-card-section>
        <q-card-actions align="around">
          <router-link to="/auth/signup">
            <q-btn :label="$t('form.buttons.reset')" color="secondary"/>
          </router-link>
          <q-btn :label="$t('form.buttons.submit')" color="primary" type="submit"/>
        </q-card-actions>

      </q-form>
    </q-card>

  </q-page>
</template>

<script lang="ts">
import {
  computed, defineComponent, reactive, ref, toRaw, toRefs,
} from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import { LoginInterface } from 'src/store/auth/auth.interface';
// TODO
export default defineComponent({
  name: 'Login',
  setup() {
    const $store = useStore();
    const $router = useRouter();

    const LoginData = reactive<LoginInterface>({
      email: 'user2@example.com',
      password: 'password',
    });

    const message = ref<string>('');
    const loading = ref<boolean>(false);
    const loggedIn = computed(() => $store.state.auth.loggedIn);

    if (loggedIn.value) {
      void $router.push('/profile');
    }

    const onSubmit = () => {
      loading.value = true;
      $store.dispatch('auth/login', toRaw(LoginData))
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
    };

    const onReset = () => {
      LoginData.email = '';
      LoginData.password = '';
    };

    return {
      ...toRefs(LoginData),
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
