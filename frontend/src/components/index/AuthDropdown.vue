<template>
  <div
    v-if="!isLoggedIn"
    class="q-gutter-md "
  >
    <q-btn
      :label="$t('auth.signup.button')"
      :to="{ name: 'signup' }"
      color="white"
      text-color="black"
    />
    <q-btn
      :label="$t('auth.login.button')"
      :to="{ name: 'login' }"
      color="white"
      text-color="black"
    />
  </div>

  <q-btn-dropdown
    v-else
    :label="fullName"
    color="white"
    icon="account_circle"
    text-color="black"
  >
    <q-list>
      <q-item
        v-close-popup
        :to="{name:'profile'}"
        clickable
      >
        <q-item-section>
          <q-item-label>Profile</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item
        v-close-popup
        :to="{name:'SitesList'}"
        clickable
      >
        <q-item-section>
          <q-item-label>Sites</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item>
        <q-item-section>
          <q-item-label @click="doLogout">
            Logout
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
<script lang="ts">
import useAuth from 'src/module/useAuth';
import { useRouter } from 'vue-router';

export default {
  name: 'AccountDropdown',
  setup() {
    const { fullName, logout, isLoggedIn } = useAuth();
    const router = useRouter();

    const doLogout = async () => {
      logout();
      await router.push('/auth/login');
    };
    return {
      doLogout,
      fullName,
      isLoggedIn,
    };
  },

};
</script>
