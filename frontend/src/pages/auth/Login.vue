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
            {{ $t('pages.login') }}
          </div>
          <q-input
            id="email"
            v-model.trim="email"
            :label="$t('forms.email')"
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
            :label="$t('forms.password')"
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
          <router-link to="/auth/signup">
            <q-btn
              :label="$t('buttons.auth.reset')"
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

<script lang="ts">
import { useAuthStore } from 'src/stores/auth';
import { LoginInterface } from 'src/types/auth.interface';
import {
  computed, defineComponent, reactive, ref, toRaw, toRefs,
} from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Login',
  setup() {
    const authStore = useAuthStore();

    const $router = useRouter();

    const LoginData = reactive<LoginInterface>({
      email: 'admin@example.com',
      password: 'password',
    });

    const message = ref<string>('');
    const loading = ref<boolean>(false);
    const loggedIn = computed(() => authStore.authState);

    if (authStore.authState) {
      void $router.push({ name: 'profile' });
    }

    const onSubmit = () => {
      loading.value = true;
      authStore.login(toRaw(LoginData))
        .then(
          () => {
            void $router.push({ name: 'profile' });
          },
          () => {
            loading.value = false;
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
