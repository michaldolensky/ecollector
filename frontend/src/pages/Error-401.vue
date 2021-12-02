<template>
  <div class="fullscreen bg-red text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        401
      </div>

      <div
        class="text-h2"
        style="opacity:.4"
      >
        {{ $t('error.401.title') }}
      </div>

      <q-btn
        :label="$t('error.button.go_home')"
        class="q-mt-xl"
        color="white"
        no-caps
        text-color="blue"
        to="/"
        unelevated
      />
      <q-btn
        :label="$t('buttons.auth.login')"
        class="q-mt-xl"
        color="white"
        no-caps
        text-color="blue"
        to="/auth/login"
        unelevated
      />
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>
