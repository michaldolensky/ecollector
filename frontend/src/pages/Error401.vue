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
        Unauthorized
      </div>

      <q-btn
        class="q-mt-xl"
        color="white"
        label="Go Home"
        no-caps
        text-color="blue"
        to="/"
        unelevated
      />
      <q-btn
        class="q-mt-xl"
        color="white"
        label="Login"
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
