<template>
  <q-header
    bordered
  >
    <q-toolbar>
      <q-toolbar-title shrink>
        <q-item
          clickable
          exact
          tag="a"
          to="/"
        >
          <q-item-section class="text-white">
            E-collector
          </q-item-section>
        </q-item>
      </q-toolbar-title>
      <q-space />

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
        :label="name"
        color="white"
        icon="account_circle"
        text-color="black"
      >
        <q-list>
          <q-item
            v-close-popup
            clickable
          >
            <q-item-section>
              <q-item-label>Profile</q-item-label>
            </q-item-section>
          </q-item>

          <q-item
            v-close-popup
            clickable
          >
            <q-item-section>
              <q-item-label>Articles</q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-item
            v-close-popup
            :to="{name:'index'}"
            clickable
          >
            <q-item-section>
              <q-item-label>Logout</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
    </q-toolbar>
  </q-header>
</template>
<script lang="ts">
export default {
  name: 'MainHeader',
  props: {
    isLoggedIn: {
      type: Boolean,
    },
    name: {
      type: String,
      default: 'FirstName Lastname',
    },
  },
};
</script>
