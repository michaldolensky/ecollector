<template>
  <q-page padding>
 {{currentUser}}
  </q-page>
</template>

<script lang="ts">
import {
  computed, defineComponent, ref, onMounted,
} from 'vue';
import { useStore } from 'src/store';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'Profile',
  setup() {
    const $store = useStore();
    const $router = useRouter();

    const currentUser = ref($store.state.auth.user);

    const verifyIfUserExists = () => {
      if (!currentUser.value) {
        void $router.push('/login');
      }
    };

    onMounted(() => {
      verifyIfUserExists();
    });

    return {
      currentUser: computed(() => $store.state.auth.user),
    };
  },
});
</script>
