<template>
  <div
    v-if="!isLoggedIn"
    class="q-gutter-md "
  >
    <q-btn
      :label="$t('auth.login.button')"
      :to="{ name: 'login' }"
      color="white"
      text-color="black"
    />
    <q-btn
      :label="$t('auth.signup.button')"
      :to="{ name: 'signup' }"
      color="white"
      text-color="black"
    />
  </div>

  <q-btn-dropdown
    v-else
    :label="FullName"
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
      <q-item
        :to="{name:'index'}"
      >
        <q-item-section>
          <q-item-label @click="logout">
            Logout
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>
<script lang="ts">
import { useRouter } from 'vue-router';
import { useStore } from 'src/store';
import { computed } from 'vue';

export default {
  name: 'AccountDropdown',
  setup() {
    const router = useRouter();
    const store = useStore();

    const logout = async () => {
      await store.dispatch('auth/logout');
      await router.push('/auth/login');
    };
    return {
      logout,
      isLoggedIn: computed(() => store.state.auth.loggedIn),
      // eslint-disable-next-line max-len
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
      FullName: computed(() => store.getters['auth/getFullName']),
    };
  },

};
</script>
