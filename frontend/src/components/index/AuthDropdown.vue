<template>
  <div
    v-if="!authStore.authState"
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
          <q-item-label>{{ $t('profile.name') }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item
        v-close-popup
        :to="{name:'SitesList'}"
        clickable
      >
        <q-item-section>
          <q-item-label>{{ $t('sites.name') }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-separator />
      <q-item
        :to="{name:'login'}"
        clickable
        @click="authStore.logout()"
      >
        <q-item-section>
          <q-item-label> {{ $t('auth.logout.button') }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-btn-dropdown>
</template>

<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth';

const authStore = useAuthStore();
</script>
