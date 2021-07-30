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

      <AccountDropdown />
    </q-toolbar>
  </q-header>
</template>
<script lang="ts">
import AccountDropdown from 'components/index/AuthDropdown.vue';

export default {
  name: 'MainHeader',
  components: { AccountDropdown },

};
</script>
