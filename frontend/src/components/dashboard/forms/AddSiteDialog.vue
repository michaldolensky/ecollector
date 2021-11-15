<template>
  <q-btn
    label="Add new site"
    @click="dialogOpen=true"
  />
  <q-dialog
    v-model="dialogOpen"
    square
  >
    <div style="width: 400px">
      <q-form
        @submit="onSubmit"
      >
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">
              Add site
            </div>
            <q-space />
            <q-btn
              v-close-popup
              dense
              flat
              icon="close"
              round
            />
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="site.name"
              :rules="[required]"
              autofocus
              filled
              hint="Enter how your site will be named"
              label="Site name:"
              lazy-rules
            />
          </q-card-section>
          <q-card-actions align="right">
            <q-btn
              color="primary"
              label="Submit"
              type="submit"
            />
          </q-card-actions>
        </q-card>
      </q-form>
    </div>
  </q-dialog>
</template>
<script lang="ts" setup>
import { useAuthStore } from 'src/stores/auth';
import { validationHelper } from 'src/validationHelper';
import { reactive, ref } from 'vue';
import { useSites } from 'src/composables/useSites';

const { createSite } = useSites();
const authStore = useAuthStore();

const { required } = validationHelper;

const site = reactive({
  name: '',
});

const dialogOpen = ref(false);

const onSubmit = () => {
  void createSite(site).then(() => {
    void authStore.me();
  });
};
</script>
