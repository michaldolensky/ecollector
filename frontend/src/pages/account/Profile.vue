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
import useAuth from 'src/module/useAuth';
import {
  defineComponent, onMounted, ref,
} from 'vue';
import { useRouter } from 'vue-router';
import SitesTable from 'components/dashboard/tables/SitesTable.vue';

export default defineComponent({
  name: 'Profile',
  components: { SitesTable },
  setup() {
    const { state } = useAuth();
    const $router = useRouter();

    const currentUser = ref(state);

    const verifyIfUserExists = () => {
      if (!currentUser.value) {
        void $router.push('/login');
      }
    };

    onMounted(() => {
      verifyIfUserExists();
    });
  },
});
</script>
