<template>
  <q-btn-dropdown
    v-if="authStore.isLoggedIn"
    :label="authStore.fullName"
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
          <q-item-label>{{ $t('pages.profile') }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item
        v-close-popup
        :to="{name:'SitesList'}"
        clickable
      >
        <q-item-section>
          <q-item-label>{{ $t('pages.sites') }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item
        :to="{name:'login'}"
        clickable
        @click="authStore.logout"
      >
        <q-item-section>
          <q-item-label> {{ $t('buttons.auth.logout') }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>

  <div
    v-else-if="!isOnAuthPage"
    class="q-gutter-md"
  >
    <q-btn
      :label="$t('buttons.auth.signup')"
      :to="{ name: 'signup' }"
      color="white"
      text-color="black"
    />
    <q-btn
      :label="$t('buttons.auth.login')"
      :to="{ name: 'login' }"
      color="white"
      text-color="black"
    />
  </div>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const authStore = useAuthStore();

const isOnAuthPage = computed(() => route.path.split('/')[1] === 'auth');

</script>
