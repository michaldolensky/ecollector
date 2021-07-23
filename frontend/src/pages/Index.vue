<template>
  <q-page class="row items-center justify-evenly">
    <q-list>
      <q-list>
        >
        <template
          v-for="route in allRoutes"
          :key="route.path"
        >
          <EssentialLink
            :link="route.path"
            :title="route.path"
          />
        </template>
      </q-list>
    </q-list>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import EssentialLink from 'components/EssentialLink.vue';

export default defineComponent({
  name: 'PageIndex',
  components: { EssentialLink },
  setup() {
    const $router = useRouter();
    const allRoutes = $router.getRoutes();
    return { allRoutes };
  },
});
</script>
