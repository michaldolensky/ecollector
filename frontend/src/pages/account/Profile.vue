<template>
  <q-page padding>
    <div class="q-pa-md">
      <div class="row">
        <div class="col">
          <SitesTable />
        </div>
        <div class="col" />
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import {
  computed, defineComponent, onMounted, ref,
} from 'vue';
import { useStore } from 'src/store';
import { useRouter } from 'vue-router';
import SitesTable from 'components/dashboard/tables/SitesTable.vue';

export default defineComponent({
  name: 'Profile',
  components: { SitesTable },
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
