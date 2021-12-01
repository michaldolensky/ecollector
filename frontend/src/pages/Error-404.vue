<template>
  <div class="fullscreen bg-blue text-white text-center q-pa-md flex flex-center">
    <div>
      <div style="font-size: 30vh">
        404
      </div>

      <div
        class="text-h2"
        style="opacity:.4"
      >
        {{ $t('error.404.title') }}
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
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>
