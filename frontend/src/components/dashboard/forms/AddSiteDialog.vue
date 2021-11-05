<template>
  <q-btn
    label="Add new site"
    @click="SiteDialogOpen=true"
  />
  <q-dialog
    v-model="SiteDialogOpen"
    square
    @hide="onReset"
  >
    <q-card class="my-card">
      <q-form

        class="q-gutter-md"
        @reset="onReset"
        @submit="onSubmit"
      >
        <q-card-section>
          <div class="text-h6">
            Add site
          </div>
        </q-card-section>

        <q-separator />
        <q-card-section>
          <q-input
            v-model="site.name"
            :rules="[ val => val && val.length > 5 || 'Please type something']"
            autofocus
            filled
            hint="Enter how your site will be named"
            label="Site name:"
            lazy-rules
          />
        </q-card-section>
        <q-separator />

        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="Submit"
            type="submit"
          />
          <q-btn
            class="q-ml-sm"
            color="primary"
            flat
            label="Reset"
            type="reset"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { useSites } from 'src/module/useSites';

const SiteDialogOpen = ref(false);
const { createSite } = useSites();
const site = reactive({
  name: '',
});

const onReset = () => {
  site.name = '';
};

const onSubmit = () => {
  void createSite(site);
};

</script>
